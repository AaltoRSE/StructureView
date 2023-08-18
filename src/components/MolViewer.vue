<template>
  <div ref="viewerContainer" style="width: 100%; height: 100%; position: relative"></div>
</template>

<script>
import * as Chem from '3dmol/build/3Dmol'

export default {
  name: 'MolViewer',
  props: {
    moleculeData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      viewer: null,
      test: Chem
    }
  },
  mounted() {
    this.initializeViewer()
    this.loadStructure()
  },
  methods: {
    initializeViewer() {
      this.viewer = Chem.createViewer(this.$refs.viewerContainer, {})
      this.viewer.setBackgroundColor(0xffffff)
    },
    loadStructure() {
      this.viewer.clear()
      for (const element of this.moleculeData) {
        this.viewer.addSphere({
          center: { x: element.pos[0], y: element.pos[1], z: element.pos[2] },
          opacity: element.surface ? 0.65 : 1,
          color: Chem.elementColors.Jmol[element.species]
        })
      }
      this.viewer.zoomTo()
      this.viewer.render()
    }
  },
  watch: {
    moleculeData() {
      this.loadStructure()
    }
  }
}
</script>

<style scoped>
/* Add any custom styles for the component here */
</style>
