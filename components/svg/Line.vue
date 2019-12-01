<template lang="pug">
  svg(width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink")
    template(v-if="isCircle")
      line(:x1="begin.x" :y1="begin.y" :x2="end.x" :y2="end.y" stroke="#ccd0dc" stroke-width="1" stroke-linecap="square")
      line.halo(:x1="begin.x" :y1="begin.y" :x2="end.x" :y2="end.y" stroke="#ffdbac" stroke-width="6" stroke-linecap="square")

    template(v-else)
      line(:x1="begin.x" :y1="begin.y" :x2="angle" :y2="begin.y" stroke="#ccd0dc" stroke-width="1" stroke-linecap="square")
      line(:x1="angle" :y1="begin.y" :x2="end.x" :y2="end.y" stroke="#ccd0dc" stroke-width="1" stroke-linecap="square")
      line.halo(:x1="begin.x" :y1="begin.y" :x2="angle" :y2="begin.y" stroke="#ffdbac" stroke-width="6" stroke-linecap="square")
      line.halo(:x1="angle" :y1="begin.y" :x2="end.x" :y2="end.y" stroke="#ffdbac" stroke-width="6" stroke-linecap="square")
</template>

<script>
export default {
  props: {
    begin: {
      type: Object,
      default: {x:0, y:0}
    },
    end: {
      type: Object,
      default: {x:0, y:0}
    },
    isCircle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    angle() {
      return this.end.x + Math.abs(this.end.y - this.begin.y)
    },
  }
}
</script>
