<template lang="pug">
  svg(:width="haloSize" :height="haloSize" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink")
    circle.halo(:cx="halfHaloSize" :cy="halfHaloSize" :r="halfHaloSize - 3" fill="none" stroke="#ffdbac" stroke-width="6")
    circle(:cx="halfHaloSize" :cy="halfHaloSize" :r="halfHaloSize - 14" fill="#ffffff" :stroke="color" stroke-width="6")
    line(:x1="halfHaloSize" :y1="halfHaloSize" :x2="halfHaloSize" :y2="halfHaloSize" stroke="#74b7fd" stroke-width="2" stroke-linecap="square")
    //path.badge(stroke-width="2" stroke="#ffffff" transform="translate(17.5, 17.5) scale(0.75)" d="M 10.625 23.5 V 14.599 L 19 12.6284 L 27.375 14.599 V 23.5 C 27.375 25.3134 26.885 27.0975 25.9504 28.6844 C 25.0158 30.2715 23.6672 31.6096 22.0306 32.5723 L 19 34.355 L 15.9694 32.5723 C 14.3328 31.6096 12.9842 30.2715 12.0496 28.6844 C 11.115 27.0975 10.625 25.3134 10.625 23.5 Z")
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 100
    },
    color: {
      type: String,
      default: '#3b99fc'
    }
  },
  computed: {
    haloSize() {
      return this.size + 20
    },
    halfHaloSize() {
      return this.haloSize / 2
    },
  }
}
</script>
