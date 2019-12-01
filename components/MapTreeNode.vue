<template lang="pug">
  li
    slot(name="parent-line" :node="node" :parentNode="parentNode")
    .tree-node
      slot(name="node-view" :node="node" :depth="depth")
    ul(v-if="node.children && node.children.length")
      map-tree-node(v-for="child,i in node.children" :key="`child-${i}`" :node="child" :parentNode="node" :depth="depth+1")
        template(v-slot:node-view="{node, depth}")
          slot(name="node-view" :node="node" :depth="depth")
        template(v-slot:parent-line="{node, parentNode}")
          slot(name="parent-line" :node="node" :parentNode="parentNode")
</template>

<script>

export default {
  props: ["node", "parentNode", "depth"],
}
</script>

<style>
  .parent-line {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>
