<template>
  <div class="h-full">
    <D3Scatter
      :minX="minmaxCoords.minX"
      :maxX="minmaxCoords.maxX"
      :minY="minmaxCoords.minY"
      :maxY="minmaxCoords.maxY"
      @selected="selectPotential"
      @zooming="updateSelection"
      :colorData="d3ColorData"
      :coordinateData="d3CoordinateData"
    ></D3Scatter>
  </div>
</template>

<script>
import D3Scatter from './D3Scatter.vue'
import { storeToRefs } from 'pinia'
import { usePotentialStore } from '../stores/potentialStore'

export default {
  props: {
    colorScale: {
      type: Object
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
      atomColors: [],
      atomsToSelect: 5000
    }
  },
  components: { D3Scatter },

  computed: {
    d3CoordinateData() {
      return this.selectedIndices
        .map((index) => this.coordinateData[index])
        .map((coord, index) => {
          return { x: coord.x, y: coord.y, tooltip: this.getLabel(index), index: index }
        })
    },
    d3ColorData() {
      return this.selectedIndices.map((index) => this.atomColors[index])
    },
    minmaxCoords() {
      if (this.coordinateData.length > 0) {
        return this.findMinAndMax(this.coordinateData)
      } else {
        return { minX: -1, maxX: 1, minY: -1, maxY: 1 }
      }
    }
  },
  emits: ['selectPotential', 'unSelect'],
  watch: {
    atomColorValues(newValues) {
      if (this.colorScale != null) {
        this.colorScale.update(newValues)
      }
      this.updateColors()
    },
    colorScale(newValue) {
      console.log('New ColorScale')
      this.updateColors()
    },
    minmaxCoords(newValue) {
      this.potentialStore.updateSelection(
        newValue.minX,
        newValue.maxX,
        newValue.minY,
        newValue.maxY,
        this.atomsToSelect,
        false
      )
    }
  },
  methods: {
    selectPotential(event) {
      this.$emit('selectPotential', event)
    },
    getLabel(index) {
      const data = this.selectedData[index]
      return [
        `Cluster: ${data.cluster}`,
        `Local_energy: ${data.local_energy}`,
        `Medoid: ${data.medoid}`,
        `Species: ${data.species}`,
        `Surface: ${data.surface}`
      ]
    },
    updateColors() {
      this.atomColors = this.atomColorValues.map((atomColor) => {
        const color = this.colorScale
          ? this.colorScale.getColorForValue(atomColor)
          : { r: 0, g: 0, b: 255 }

        return `rgb(${color.r},${color.g},${color.b})`
      })
    },
    findMinAndMax(coords) {
      var minX = coords[0].x
      var minY = coords[0].y
      var maxX = coords[0].x
      var maxY = coords[0].y
      coords.forEach((coord) => {
        if (coord.x > maxX) {
          maxX = coord.x
        }
        if (coord.x < minX) {
          minX = coord.x
        }
        if (coord.y > maxY) {
          maxY = coord.y
        }
        if (coord.y < minY) {
          minY = coord.y
        }
      })
      return { minX, maxX, minY, maxY }
    },
    updateSelection(event) {
      this.potentialStore.updateSelection(
        event.XRange[0],
        event.XRange[1],
        event.YRange[0],
        event.YRange[1],
        this.atomsToSelect,
        event.zoomIn
      )
    }
  },
  setup() {
    const potentialStore = usePotentialStore()
    const { selectedData, coordinateData, atomColorValues, selectedIndices } =
      storeToRefs(potentialStore)
    return {
      selectedData,
      coordinateData,
      atomColorValues,
      selectedIndices,
      potentialStore
    }
  },
  mounted() {
    this.updateColors()
    this.potentialStore.updateSelection(
      this.minmaxCoords.minX,
      this.minmaxCoords.maxX,
      this.minmaxCoords.minY,
      this.minmaxCoords.maxY,
      this.atomsToSelect,
      false
    )
  }
}
</script>
