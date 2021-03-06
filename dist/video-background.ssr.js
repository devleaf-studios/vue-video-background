'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = {
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
  setup: function setup(props) {
    var sources = vue.ref([]);
    var videoElem = vue.ref();
    var isLowPower = vue.ref(true);
    vue.onMounted(function () {
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

      var isPlaying = function isPlaying() {
        var _videoElem$value;

        isLowPower.value = false;
        (_videoElem$value = videoElem.value) === null || _videoElem$value === void 0 ? void 0 : _videoElem$value.removeEventListener('playing', isPlaying);
      };

      videoElem.value.addEventListener('playing', isPlaying);
    });
    return {
      sources: sources,
      videoElem: videoElem,
      isLowPower: isLowPower,
      poster: props.fallback,
      position: props.position
    };
  }
};var _withId = /*#__PURE__*/vue.withScopeId("data-v-36ebb809");

var render = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Fragment, null, [vue.createVNode("video", {
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
  }, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($setup.sources, function (source, i) {
    return vue.openBlock(), vue.createBlock("source", {
      key: i,
      src: source.src,
      type: source.mime
    }, null, 8, ["src", "type"]);
  }), 128))], 12, ["poster"]), $setup.poster ? (vue.openBlock(), vue.createBlock("div", {
    key: 0,
    class: "low-power-fallback",
    style: {
      backgroundImage: "url(".concat($setup.poster, ")"),
      display: $setup.isLowPower ? 'block' : 'none',
      position: $setup.position
    }
  }, null, 4)) : vue.createCommentVNode("", true)], 64);
});function styleInject(css, ref) {
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
}var css_248z = "\n.background-video[data-v-36ebb809] {\n  object-fit: cover;\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: -1;\n}\n.low-power-fallback[data-v-36ebb809] {\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  z-index: 0;\n  background-size: cover;\n  background-position: center;\n}\n";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-36ebb809";// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('VideoBackground', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;