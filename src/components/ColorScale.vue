<template>
  <div class="mb-2">
    {{ title }}
  </div>
  <div ref="scale" class="grid">
    <div
      v-if="colorScale && continous"
      v-for="(color, index) in colorStops"
      :key="index"
      :style="{
        backgroundColor: getColorString(color),
        height: boxStyle.height + 'px',
        width: boxStyle.width + 'px'
      }"
      :class="isHorizontal ? 'row' : 'column'"
    ></div>
    <div v-if="colorScale && !continous" class="w-full" :class="isHorizontal ? 'row' : 'column'">
      <div class="flex justify-content-between">
        <div
          v-for="(color, index) in colorStops"
          :key="index"
          :style="{
            backgroundColor: getColorString(color),
            height: '20px',
            width: '50px'
          }"
        ></div>
      </div>
    </div>
    <div class="w-full" :class="isHorizontal ? 'row' : 'column'">
      <div v-if="continous" class="flex justify-content-between">
        <div class="label">{{ colorPoints[0].toFixed(2) }}</div>
        <div class="label">{{ colorPoints[colorPoints.length - 1].toFixed(2) }}</div>
      </div>
      <div v-else class="flex justify-content-between">
        <div v-for="(label, index) in colorPoints" :key="index" class="label">{{ label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useColorStore } from '../stores/colorStore'
import { ref } from 'vue'

export default {
  props: {
    title: {
      type: String,
      default: 'Some prop'
    }
  },
  computed: {
    continous() {
      return this.colorScale ? this.colorScale.isContinous() : null
    },
    colorStops() {
      return this.colorScale ? this.colorScale.getColors() : null
    },
    colorPoints() {
      return this.colorScale ? this.colorScale.getSteps() : null
    },
    boxStyle() {
      const colorCount = this.colorStops ? this.colorStops.length : 1
      if (this.isHorizontal) {
        return {
          height: 20,
          width: this.scaleWidth / (colorCount + 1)
        }
      } else {
        return {
          height: this.scaleHeight / (colorCount + 1),
          width: 50
        }
      }
    },
    isHorizontal() {
      return this.scaleHeight < this.scaleWidth
    }
  },
  methods: {
    getColorString(color) {
      return `rgb(${color.r},${color.g},${color.b})`
    },
    handleResize() {
      this.scaleWidth = this.scale.clientWidth
      this.scaleHeight = this.scale.clientHeight
    }
  },
  setup() {
    const colorStore = useColorStore()
    const scale = ref(null)
    const { colorScale, colorOptions } = storeToRefs(colorStore)

    return { colorScale, colorOptions, colorStore, scale }
  },
  data() {
    return {
      scaleHeight: 0,
      scaleWidth: 0
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.color-scale {
  display: flex;
}

.color-block {
  width: 50px;
  height: 20px;
}

.label-container {
  margin-top: 5px;
}

.label {
  text-align: center;
  width: 50px;
}
</style>
