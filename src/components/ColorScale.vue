<template>
  <div v-if="colorScale" class="flex align-content-between justify-content-between">
    <div
      v-for="(color, index) in colorStops"
      :key="index"
      :style="{ backgroundColor: getColorString(color) }"
      class="color-block"
    ></div>
  </div>
  <div v-if="continous" class="flex justify-content-between">
    <div class="label">{{ colorPoints[0] }}</div>
    <div class="label">{{ colorPoints[colorPoints.length - 1] }}</div>
  </div>
  <div v-else class="flex justify-content-between">
    <div v-for="(label, index) in colorPoints" :key="index" class="label">{{ label }}</div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useColorStore } from '../stores/colorStore'

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
    }
  },
  methods: {
    getColorString(color) {
      return `rgb(${color.r},${color.g},${color.b})`
    }
  },
  setup() {
    const colorStore = useColorStore()
    const { colorScale, colorOptions } = storeToRefs(colorStore)
    return { colorScale, colorOptions, colorStore }
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
