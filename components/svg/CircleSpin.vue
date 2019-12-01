<template lang="pug">
svg(:width="haloSize" :height="haloSize" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve")
  circle(:cx="halfHaloSize" :cy="halfHaloSize" :r="halfHaloSize - 3" fill="none" :stroke="color" stroke-width="1" :stroke-dasharray="halfHaloSize - 3" )
  circle.ie11up(:cx="halfHaloSize" :cy="halfHaloSize" :r="halfHaloSize - 3" fill="none" :stroke="color" stroke-width="5" :stroke-dasharray="dasharraySize" stroke-dashoffset="1" stroke-linecap="round")
  //- circle(:cx="halfHaloSize" :cy="halfHaloSize" :r="halfHaloSize - 10" fill="#ffffff" :stroke="color" stroke-width="4")
</template>

<script>
export default {
props: {
  size: {
    type: Number,
    default: 100
  },
  dash: {
    type: Number,
    default: 2
  },
  color: {
    type: String,
    default: '#3b99fc'
  }
},
computed: {
  haloSize() {
    return this.size
  },
  halfHaloSize() {
    return this.haloSize / 2
  },
  dasharraySize() {
    return [1, (this.halfHaloSize - 3) * this.dash]
  },

}
}
</script>

<style lang="scss" scoped>
_:-ms-fullscreen, :root .ie11up { 
  display: none; 
}
</style>

