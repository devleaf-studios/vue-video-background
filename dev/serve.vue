<script lang="ts">
import { defineComponent } from 'vue';
import VideoBackground from '@/video-background.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VideoBackground
  }
});
</script>

<template>
  <div id="app">
    <video-background src="https://temp.media/video/?height=400&width=500&length=10&text=" position="fixed" />
    <p>Test</p>
  </div>
</template>
