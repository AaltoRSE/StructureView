<template>
  <div ref="viewerContainer" class="flex h-full w-full" style="position: relative"></div>
</template>

<script>
import { Color, builtinColorSchemes } from '3dmol'
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
      test: Chem,
      selectedSphere: null,
      selectedElement: null
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
        const callback = this.handleAtomSelection.bind(this)
        this.viewer.addSphere({
          center: { x: element.pos[0], y: element.pos[1], z: element.pos[2] },
          opacity: element.surface ? 0.65 : 1,
          clickable: true,
          callback: function (event) {
            callback(element, event)
          },
          color: Chem.elementColors.Jmol[element.species],
          info: element
        })
      }
      this.viewer.zoomTo()
      this.viewer.render()
    },
    handleAtomSelection(element, sphereObject) {
      if (this.selectedSphere) {
        this.selectedSphere.opacity = this.selectedElement.surface ? 0.65 : 1
        this.selectedSphere.color = new Color(Chem.elementColors.Jmol[this.selectedElement.species])
      }
      this.selectedSphere = sphereObject
      this.selectedElement = element
      sphereObject.color = new Color(255, 255, 0)
      sphereObject.opacity = 1
      this.viewer.render()
      this.$emit('atomSelected', element)
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
