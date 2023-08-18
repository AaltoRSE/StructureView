<template>
  <StructureSelector
    v-if="colorScale"
    :atomData="atomData"
    :coordinateData="coordinateData"
    :colorData="atomColors"
    @selectPotential="selectPotential"
    @unSelect="potentialStore.unselectPotential()"
  ></StructureSelector>
  <div v-else class="flex justify-content-center">
    <ProgressSpinner></ProgressSpinner>
  </div>
  <div class="w-full flex justify-content-between">
    <div>
      <label for="ColorScaleSelection"> Color Scale: </label>
      <DropDown
        id="ColorScaleSelection"
        v-model="selectedScale"
        :options="colorScaleOptions"
        placeholder="Select a color Scale"
      ></DropDown>
    </div>
    <div>
      <label for="ColorValue"> Color Value based on </label>
      <DropDown
        id="ColorValue"
        v-model="colorField"
        :options="colorFieldOptions"
        optionLabel="label"
      ></DropDown>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { usePotentialStore } from '../stores/potentialStore'
import { useColorStore } from '../stores/colorStore'
import StructureSelector from './StructureSelector.vue'

import DropDown from 'primevue/dropdown'
import ProgressSpinner from 'primevue/progressspinner'

export default {
  props: {
    potentialID: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
      selectedField: null,
      selectedScale: null,
      atomColors: []
    }
  },
  components: { StructureSelector, DropDown, ProgressSpinner },
  computed: {
    colorScaleOptions() {
      console.log(this.colorOptions)
      return this.colorOptions.map((option) => option.name)
    },
    colorValueOptions() {
      return this.colorFieldOptions.map((option) => option.id)
    },
    colorField: {
      set(newValue) {
        this.potentialStore.selectLabeling(newValue)
      },
      get() {
        return this.colorValueField
      }
    }
  },
  setup() {
    const potentialStore = usePotentialStore()
    const colorStore = useColorStore()
    const { atomData, coordinateData, atomColorValues, colorFieldOptions, colorValueField } =
      storeToRefs(potentialStore)
    const { colorScale, colorOptions } = storeToRefs(colorStore)
    return {
      potentialStore,
      atomData,
      coordinateData,
      colorFieldOptions,
      colorValueField,
      atomColorValues,
      colorScale,
      colorOptions,
      colorStore
    }
  },
  watch: {
    selectedScale(newValue) {
      this.colorStore.setScale(newValue, this.atomColorValues)
    },
    colorScale() {
      this.updateColors()
    },
    atomColorValues(newValues) {
      if (this.colorScale != null) {
        this.colorScale.update(newValues)
      }
      this.updateColors()
    }
  },
  emits: ['selectPotential', 'unSelect'],
  methods: {
    updateColors() {
      this.atomColors = this.atomColorValues.map((atomColor) => {
        const color = this.colorScale
          ? this.colorScale.getColorForValue(atomColor)
          : { r: 0, g: 0, b: 255 }

        return `rgb(${color.r},${color.g},${color.b})`
      })
    },
    selectPotential(atomPosition) {
      console.log(this.atomData[atomPosition].moleculeID)
      this.potentialStore.selectPotential(this.atomData[atomPosition].moleculeID)
    }
  },
  mounted() {
    this.potentialStore.ready().then(() => {
      this.selectedScale = this.colorOptions[0].name
    })
  }
}
</script>
