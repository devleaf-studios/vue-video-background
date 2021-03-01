import { DefineComponent, Plugin } from 'vue';

declare const FixedVideoBackground: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default FixedVideoBackground;
