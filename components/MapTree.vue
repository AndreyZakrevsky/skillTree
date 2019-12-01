<template lang="pug">
  ul.map-tree
    map-tree-node(:node="tree" :depth="1")
      template(v-slot:node-view="{node, depth}")
        slot(name="node-view" :node="node" :depth="depth")
      template(v-slot:parent-line="{node, parentNode}")
        slot(name="parent-line" :node="node" :parentNode="parentNode")
</template>

<script>
export default {
  props: {
    tree: {
      type: Object,
      default: {},
    },
  },
}
</script>

<style>
  .map-tree li {
    list-style: none;
  }
</style>
