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
      viewer: null
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
          center: { x: element.x, y: element.y, z: element.z },
          radius: element.radius,
          color: element.color
        })
      }
      this.viewer.zoomTo()
      this.viewer.render()
      console.log(this.viewer)
      console.log(this.viewer.getModelList())
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
