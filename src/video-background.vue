<template>
  <video ref="videoElem" class="background-video" :style="{ position }" :poster="poster" playsinline autoplay muted loop>
    <source v-for="(source, i) in sources" :key="i" :src="source.src" :type="source.mime" />
  </video>
  <div v-if="poster" class="low-power-fallback" :style="{ backgroundImage: `url(${poster})`, display: isLowPower ? 'block' : 'none' }"></div>
</template>

<script lang="ts">
import { onMounted, ref, Ref } from 'vue';

interface VideoSources {
  src: string;
  mime: string;
}

export default {
  name: 'VideoBackground',
  props: {
    src: {
      type: String
    },
    mime: {
      type: String,
      default: 'video/mp4'
    },
    fallback: {
      type: String
    },
    lowBatterySupport: {
      type: Boolean,
      default: true
    },
    multiSrc: {
      type: Array as () => VideoSources[]
    },
    position: {
      type: String as () => 'fixed'|'relative',
      default: 'fixed'
    }
  },
  setup(props: any) {
    const sources: Ref<VideoSources[]> = ref([]);
    const videoElem: Ref<HTMLVideoElement|undefined> = ref();
    const isLowPower: Ref<boolean> = ref(true);

    onMounted(() => {
      // first let's get the src ready for expansion in HTML.
      if (props.multiSrc) {
        sources.value = props.multiSrc;
      } else if (props.src) {
        sources.value = [{ src: props.src, mime: props.mime }];
      }

      // check if implementor want's low battery support?
      if (!props.lowBatterySupport) return

      // nmake sure there is a fallback picture.
      if (!props.fallback) return console.error('Could not implement low battery mode as no fallback was defined');

      // make sure we have access to the video element
      if (!videoElem.value) return console.error('Video element not linked');

      // run check for low power
      const isPlaying = () => {
          isLowPower.value = false;
          videoElem.value?.removeEventListener('playing', isPlaying);
      }
      videoElem.value.addEventListener('playing', isPlaying);

    });

    return {
      sources,
      videoElem,
      isLowPower,
      poster: props.fallback,
      position: props.position
    };
  }
}
</script>

<style scoped>
.background-video {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.low-power-fallback {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
}
</style>