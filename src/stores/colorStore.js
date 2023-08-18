// stores/counter.js
import { defineStore } from 'pinia'
import { getParticle, getAtomData, getPotentialData } from '@/backend/mockBackend.js'
import { ColorScale } from './ColorScale'

const colorScales = [
  {
    name: 'standard',
    colors: [
      { pos: 0, r: 0, g: 12, b: 12 },
      { pos: 0.1, r: 0, g: 0, b: 255 },
      { pos: 0.25, r: 179, g: 217, b: 230 },
      { pos: 0.4, r: 0, g: 191, b: 0 },
      { pos: 0.5, r: 255, g: 255, b: 0 },
      { pos: 0.7, r: 255, g: 0, b: 0 },
      { pos: 0.9, r: 125, g: 125, b: 125 },
      { pos: 1.0, r: 250, g: 250, b: 250 }
    ]
  },
  {
    name: 'pm3d',
    colors: [
      { pos: 0, r: 0, g: 0, b: 0 },
      { pos: 0.25, r: 129, g: 4, b: 255 },
      { pos: 0.5, r: 180, g: 32, b: 0 },
      { pos: 1, r: 255, g: 255, b: 0 }
    ]
  },
  {
    name: 'hot',
    colors: [
      { pos: 0, r: 0, g: 0, b: 0 },
      { pos: 0.25, r: 255, g: 0, b: 0 },
      { pos: 0.5, r: 255, g: 255, b: 0 },
      { pos: 1, r: 255, g: 255, b: 255 }
    ]
  }
]

export const useColorStore = defineStore('colors', {
  state: () => {
    return {
      colorScale: null,
      colorOptions: colorScales
    }
  },
  actions: {
    /**
     * Extract the range of values from a range of values
     * @param {Array} values
     * @returns
     */
    setScale(scaleID, values) {
      const scale = colorScales.find((scale) => scale.name === scaleID)
      const colorScale = new ColorScale()
      colorScale.init(values, scale.colors)
      console.log(colorScale.getColors())
      this.colorScale = colorScale
      console.log(this.colorScale)
      console.log(this)
    }
  }
})
