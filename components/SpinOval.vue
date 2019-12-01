<template lang="pug">
  div
    div.container(v-if="animated" @animationend="animated = false")
      circle-spin.spin
    button(@click="animate") Click
</template>

<script>
import CircleSpin from "~/components/svg/CircleSpin.vue";

export default {
  components: {
    CircleSpin,
  },
  data () {
    return {
      animated: false,
    }
  },
  methods: {
    animate() {
      this.animated = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 110px;
  height: 110px;
  top: 150px;
  left: 150px;
}

button {
  margin-left: 300px;
  margin-top: 50px;
}

.spin {
  animation: spin 3s linear 0.5;
}

@keyframes spin { 
  100% { 
    transform: rotate(-360deg);
  }
}
</style>
