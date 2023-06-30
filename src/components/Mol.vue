<template>
  <div>
    <MolViewer
      v-if="selectedPotential != null"
      :moleculeData="moleculeData"
      width="500px"
      height="500px"
    />
  </div>
</template>

<script>
import MolViewer from './MolViewer.vue'

export default {
  components: {
    MolViewer
  },
  props: {
    selectedPotential: {
      type: [Number, null],
      default: null
    }
  },
  data() {
    return {
      availableMoleculeData: [
        [
          { x: 10, y: 10, z: 10, radius: 5, color: 'red' },
          {
            x: 12,
            y: 12,
            z: 15,
            radius: 3,
            color: { r: 0.5, g: 0.5, b: 0.5 }
          }
        ],
        [
          { x: 13, y: 7, z: 10, radius: 5, color: 'orange' },
          {
            x: 12,
            y: 12,
            z: 15,
            radius: 7,
            color: { r: 0.5, g: 0.2, b: 0.7 }
          }
        ],
        [
          { x: 1, y: 8, z: 10, radius: 5, color: 'blue' },
          {
            x: 12,
            y: 8,
            z: 11,
            radius: 10,
            color: { r: 0.9, g: 0.2, b: 0.7 }
          }
        ],
        [
          { x: 13, y: 7, z: 10, radius: 5, color: 'purple' },
          {
            x: 12,
            y: 12,
            z: 15,
            radius: 7,
            color: { r: 0.5, g: 0.9, b: 0.7 }
          }
        ]
      ]
    }
  },
  computed: {
    moleculeData() {
      return this.availableMoleculeData[this.selectedPotential]
    }
  }
}
</script>
