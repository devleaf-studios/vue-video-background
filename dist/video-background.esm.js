import { ref, onMounted, openBlock, createBlock, Fragment, createVNode, renderList, createCommentVNode, withScopeId } from 'vue';

var script = {
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
      type: Array
    },
    position: {
      type: String,
      default: 'fixed'
    }
  },

  setup(props) {
    const sources = ref([]);
    const videoElem = ref();
    const isLowPower = ref(true);
    onMounted(() => {
      // first let's get the src ready for expansion in HTML.
      if (props.multiSrc) {
        sources.value = props.multiSrc;
      } else if (props.src) {
        sources.value = [{
          src: props.src,
          mime: props.mime
        }];
      } // check if implementor want's low battery support?


      if (!props.lowBatterySupport) return; // nmake sure there is a fallback picture.

      if (!props.fallback) return console.error('Could not implement low battery mode as no fallback was defined'); // make sure we have access to the video element

      if (!videoElem.value) return console.error('Video element not linked'); // run check for low power

      const isPlaying = () => {
        isLowPower.value = false;
        videoElem.value?.removeEventListener('playing', isPlaying);
      };

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

};

const _withId = /*#__PURE__*/withScopeId("data-v-36ebb809");

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock(Fragment, null, [createVNode("video", {
    ref: "videoElem",
    class: "background-video",
    style: {
      position: $setup.position
    },
    poster: $setup.poster,
    playsinline: "",
    autoplay: "",
    muted: "",
    loop: ""
  }, [(openBlock(true), createBlock(Fragment, null, renderList($setup.sources, (source, i) => {
    return openBlock(), createBlock("source", {
      key: i,
      src: source.src,
      type: source.mime
    }, null, 8, ["src", "type"]);
  }), 128))], 12, ["poster"]), $setup.poster ? (openBlock(), createBlock("div", {
    key: 0,
    class: "low-power-fallback",
    style: {
      backgroundImage: `url(${$setup.poster})`,
      display: $setup.isLowPower ? 'block' : 'none',
      position: $setup.position
    }
  }, null, 4)) : createCommentVNode("", true)], 64);
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.background-video[data-v-36ebb809] {\n  object-fit: cover;\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: -1;\n}\n.low-power-fallback[data-v-36ebb809] {\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  z-index: 0;\n  background-size: cover;\n  background-position: center;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-36ebb809";

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('VideoBackground', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
