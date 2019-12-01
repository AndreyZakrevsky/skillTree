<template lang="pug">
  svg.icon-badge(width="38" height="47" fill="none" xmlns="http://www.w3.org/2000/svg")
    path.halo(stroke="#ffdbac" stroke-width="6" d="M3 7.449v16.198c0 3.284.969 6.514 2.815 9.386 1.847 2.872 4.51 5.292 7.74 7.033L19 43l5.445-2.934c3.23-1.74 5.893-4.16 7.74-7.033C34.03 30.161 35 26.931 35 23.647V7.449L19 4 3 7.449z")
    path(:fill="color" d="M10.5 14.445v9.138c0 1.852.515 3.674 1.496 5.295.98 1.62 2.396 2.985 4.112 3.967L19 34.5l2.892-1.655c1.716-.982 3.131-2.347 4.112-3.967a10.206 10.206 0 0 0 1.496-5.295v-9.138L19 12.5l-8.5 1.945z")
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#3b99fc'
    }
  },
}
</script>
