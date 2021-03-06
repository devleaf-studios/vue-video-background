import { DefineComponent, Plugin } from 'vue';

declare const VideoBackground: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default VideoBackground;
