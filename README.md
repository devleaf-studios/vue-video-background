# vue-video-background
This component is created for > Vue 3 due to it using the composition API. Unfortunately Vue2 is not supported due to Vue 3 being pretty widely used at this point. It shouldn't be difficult to take the source code for this component and translate it to Vue 2 however.

A component to easily create a background video of either Relative or Fixed position, allowing you 
to post content over the top. This component can accept multiple video sources, fallback image and even applies a 
fallback to iOS low power mode by using the `playing` event listener on component mounting to see if a pause happens. 

The component also adheres to all browsers autoplay requirements with the following properties: `playsinline autoplay muted loop`

## Installation

**Install with NPM**
```
npm i @devleaf-labs/vue-video-background
```
**Use in your project**
```
<script>
import VideoBackground from '@devleaf-labs/vue-video-background';
...
export default {
  components: { VideoBackground },
  ...
}
</script>

<template>
  <video-background src="your-video-source" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | String | - | The source of the video you want to play |
| mime | String | `'video/mp4'` | The MIME Type of the video you are trying to play |
| fallback | String | - | A fallback image to display if the user is on low power mode or the video is loading |
| lowBatterySupport | Boolean | `true` | Whether to support detection of iOS' Low Power Mode |
| position | `'fixed'|'relative'|'absolute'` | `'fixed'` | The CSS position of the background video |
| multiSrc | Array | - | An array of multiple video sources to display (cannot use with `:src` and `:mime` properties [see multiple sources below]) |

### Using multiple sources for your video
If you want to have multiple sources on your video (for example WebM and MP4), you can do so using the `:multiSrc` prop, this takes an object of `src` and `mime` per video source and will place them in the order you pass them.

**For Example:**
```
<video-background
  :multiSrc="[{ src: './link-to-webm-video.webm', mime: 'video/webm' }, { src: './link-to-mp4-video.mp4', mime: 'video/mp4 }]"
/>
```
Will provide two sources, one WebM and the other MP4.

**⚠️ Something to Note ⚠️**

If you are using the `:multiSrc` prop you should not use `:src` and `:mime` as this will conflict with the prior. This will be handled gracefully by prioritising the `:multiSrc` over the `:src` but it should be seen as bad practice.

### Closing Remarks
This project is supplied by Devleaf Studios' Open Source Labs initiative, and is therefore provided under the Apache 2.0 Licence, with no warranty. We will honor keeping the project alive but may require pull requests from time to time to keep this project up to date with the latest versions of Vue.