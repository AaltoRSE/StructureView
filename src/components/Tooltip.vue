<template>
  <div v-if="showToolTip" class="overlay" :style="overlayStyle">
    <div ref="overlayContent">
      <div v-if="isText">
        {{ tooltipText }}
      </div>
      <div v-else>
        <div v-for="entry of tooltipText">
          {{ entry }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'OverlayComponent',
  props: {
    showToolTip: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      default: { x: 0, y: 0, maxX: 0, maxY: 0 }
    },
    tooltipText: {
      type: [String, Array],
      default: ''
    }
  },
  setup() {
    const overlayContent = ref(null)
    return { overlayContent }
  },
  computed: {
    overlayStyle() {
      return {
        left: `${this.leftPosition}px`,
        top: `${this.topPosition}px`
      }
    },
    overlaySize() {
      return this.overlayContent
        ? {
            width: this.overlayContent.offsetWidth,
            height: this.overlayContent.offsetHeight
          }
        : { width: 0, height: 0 }
    },
    leftPosition() {
      if (this.position.x + this.overlaySize.width + 20 > this.position.maxX) {
        return this.position.x - this.overlaySize.width - 30
      } else {
        return this.position.x + 10
      }
    },
    topPosition() {
      if (this.position.y + this.overlaySize.height + 20 > this.position.maxY) {
        return this.position.y - this.overlaySize.height - 10
      } else {
        return this.position.y + 10
      }
    },
    isText() {
      return typeof tooltipText === 'string'
    }
  }
}
</script>

<style>
.overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
