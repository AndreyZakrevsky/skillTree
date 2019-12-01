<template lang="pug">
  div.map-wrapper(@mousedown="mouseDown" @mouseup="mouseUp" @mousemove="mouseMove")
    map-tree(v-if="globalTree.children" :tree="globalTree" :style="shift | setTranslate")
      template(v-slot:node-view="{node, depth}")
        span.node-content.el-center(
          @click="selectNode(node)"
          :title="node.props.name"
          :style="node.props.pos | coordsZoom(zoom) | setPos"
          :class="{'node-selected': isSelected(node), 'node-visible': isVisible(node), 'dragged': draggedNode == node}"
          draggable="true"
          @dragstart="dragStartNode($event, node)"
          @dragend="dragNode"
        )
          template(v-if="isCircle(node)")
            icon-circle( :size="120 / depth" :color="getChainColor(node)")
          template(v-else)
            badge-stars(v-if="zoom > .8" :color="getChainColor(node)" :class="{['level' + node.props.level]: node.props.level != 0}"
              )
          span.node-name(
            v-if="depth <= 3 || zoom >= 1.5"
            :class="{['depth' + Math.min(depth, 5)]: true}"
          ) {{ node.props.name }}
      template(v-slot:parent-line="{node, parentNode}")
        svg-line.parent-line(
          v-if="parentNode && (isCircle(node) || zoom > .8)"
          :begin="parentNode.props.pos | coordsZoom(zoom)"
          :end="node.props.pos | coordsZoom(zoom)"
          :isCircle="isCircle(node)"
          :class="{'line-selected': isSelected(node)}"
        )

</template>

<script>
    import {mapState, mapActions} from 'vuex'

    import MapTree from '~/components/MapTree.vue'
    import iconCircle from '~/components/svg/Circle.vue'
    import BadgeStars from '~/components/svg/BadgeStars.vue'
    import svgLine from '~/components/svg/Line.vue'

    import Api from '~/assets/js/api'

    export default {
        data() {
            return {
                cursorNode: {},
                zoom: 1,
                shift: {x: -1000, y: -1000},
                dragged: false,
                draggedNode: {},
            }
        },
        computed: {
            ...mapState('trees', ['globalTree', 'lastItem', 'bounds']),
            cursorNodeType() {
                return this.isCircle(this.cursorNode) ? 'category' : 'badge'
            }
        },
        filters: {
            coordsZoom({x, y}, zoom = 1) {
                return {
                    x: x * zoom,
                    y: y * zoom,
                }
            },
            setPos({x, y}) {

                return {
                    left: x + 'px',
                    top: y + 'px',
                }
            },
            setTranslate({x, y}) {
                return {
                    transform: `translate(${x}px, ${y}px)`
                }
            },
            setBounds({min, max}) {
                return {
                    position: 'absolute',
                    left: min.x + 'px',
                    top: min.y + 'px',
                    width: (max.x - min.x) + 'px',
                    height: (max.y - min.y) + 'px',
                }
            },
        },
        async mounted() {
            let tree = await Api.getBadgesTree()
            this.loadFromApi(tree)
            this.fitMobileHeightToPanel('.mobile-position-bottom')
        },
        methods: {
            ...mapActions('trees', ['loadFromApi', 'moveSubtree']),
            selectLastNode() {
                let maxId = 0
                let maxNode = {}
                let findMax = (node) => {
                    if (node.props.id > maxId) {
                        maxId = node.props.id
                        maxNode = node
                    }
                    if (node.children) {
                        node.children.forEach(findMax)
                    }
                }
                setTimeout(_ => {
                    findMax(this.globalTree)
                    debugger
                }, 600)

            },
            dragStartNode(e, node) {
                this.dragged = true
                this.startPos = {x: e.clientX / this.zoom, y: e.clientY / this.zoom}
                this.draggedNode = node
            },
            dragNode(e) {
                let pos = {
                    x: e.clientX / this.zoom - this.shift.x / this.zoom,
                    y: e.clientY / this.zoom - this.shift.y / this.zoom
                }
                let shift = {
                    x: pos.x - this.startPos.x + this.shift.x / this.zoom,
                    y: pos.y - this.startPos.y + this.shift.y / this.zoom,
                }

                this.moveSubtree({node: this.draggedNode, shift})
            },
            checkEvent(e) {
                if (e.target.classList) {
                    if (!(e.target.classList.contains('map-wrapper') || e.target.classList.contains('parent-line'))) return false
                } else {
                    if (!(e.target.className.baseVal.includes('map-wrapper') || e.target.className.baseVal.includes('parent-line'))) return false
                }
                return true
            },
            mouseDown(e, node) {

                if (!this.checkEvent(e)) return
                this.dragged2 = true
                this.startPos2 = {x: e.clientX, y: e.clientY}
            },
            mouseUp(e, node) {

                if (!this.checkEvent(e)) return
                this.dragged2 = false
            },
            mouseMove(e, node) {

                if (!this.checkEvent(e)) return
                if (!this.dragged2) return false

                let pos = {x: e.clientX, y: e.clientY}
                let shift = {x: pos.x - this.startPos2.x, y: pos.y - this.startPos2.y}

                this.moveMap(shift)
                this.startPos2 = pos
            },
            moveMap(shift) {
                this.shift.x += shift.x
                this.shift.y += shift.y
            },
            isCircle(node) {
                if (node.props && node.props.badgeTypeId)
                    return node.props.badgeTypeId == 2
                return Boolean(node.children && node.children.length)
            },
            selectNode(node) {
                this.cursorNode = node
            },
            isSelected(node) {
                if (!this.cursorNode.props) return false
                let editChainNodes = [this.cursorNode, ...this.cursorNode.parents]
                return editChainNodes.some(chainNode => chainNode == node)
            },
            isVisible(node) {
                let chainNodes = [node, ...node.parents]
                let invisibleNode = chainNodes.find(chainNode => chainNode.props.invisible)
                return !invisibleNode
            },
            getChainColor(node) {
                let chainNodes = [node, ...node.parents]
                let colorNode = chainNodes.find(chainNode => chainNode.props.color)
                return colorNode ? colorNode.props.color : undefined
            },
            fitMobileHeightToPanel(panelSelector) {
                if (window.innerWidth > 800) return false
                let bottomPanel = document.querySelector(panelSelector)
                let fullSize = bottomPanel.offsetTop + bottomPanel.offsetHeight
                this.$el.style.height = fullSize + 'px'
            },
        },
        components: {
            MapTree,
            iconCircle,
            BadgeStars,
            svgLine,
        },
    };
</script>

<style lang="scss">
    .avatar {
        position: absolute;
        left: 300px;
        top: 200px;
        width: 30px;
        height: 30px;
        border: 1px dashed gray;
        border-radius: 30px;
        z-index: 2;

        &.show {
            opacity: 1;
        }
    }

    input.node-name {
        border-radius: 10px;
        transform: translate(0, -150%);
        width: 100%;
        border: 1px solid silver;
        padding: 5px 8px;
        outline: none;
    }
</style>
