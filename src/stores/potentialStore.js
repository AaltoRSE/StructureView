// stores/counter.js
import { defineStore } from 'pinia'
import { getParticle, getFullAtomData, getParticles, isReady } from '@/backend/mockBackend.js'

async function waitForData() {
  // Create a promise that resolves when the asynchronous action is done
  return new Promise(async (resolve, reject) => {
    // Simulate an asynchronous action (e.g., fetching data)
    while (true) {
      if (isReady()) {
        // Resolve the promise with the result of the asynchronous action
        resolve(true)
        return
      } else {
        await new Promise((waiting) => setTimeout(waiting, 200))
      }
    }
  })
}

const colorFieldOptions = [
  { id: 'local_energy', label: 'Local Energy' },
  { id: 'clmds_cluster', label: 'Cluster ID' },
  { id: 'clmds_medoid', label: 'Cluster Medoid' },
  { id: 'medoid', label: 'Particle Medoid' },
  { id: 'species', label: 'Species' },
  { id: 'surface', label: 'Surface Atom' }
]
const cooridnateFieldOptions = [
  {
    id: 'clmds_coordinates',
    xlabel: 'Clustering x coordinate',
    yLabel: 'Clustering y coordinate'
  }
]

export const usePotentialStore = defineStore('potentials', {
  state: () => {
    return {
      colorFieldOptions: colorFieldOptions,
      cooridnateFieldOptions: cooridnateFieldOptions,
      currentPotential: null,
      coordinateField: cooridnateFieldOptions[0],
      colorValueField: colorFieldOptions[0],
      atomData: [],
      coordinateData: [],
      atomColorValues: [],
      particleData: [],
      selectedIndices: [],
      updating: false
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    /**
     * Get the data of a specific Potential
     * @param {*} potentialID
     * @returns
     */
    getPotential(potentialID) {
      return getParticle(potentialID)
    },
    /**
     * Set the Coordinate Field
     * @param {*} coordinateField
     * @param {*} xLabel
     * @param {*} yLabel
     */
    selectCoordinates(coordinateField, xLabel, yLabel) {
      this.coordinateField = { id: coordinateField, xLabel, yLabel }
      this.updateCoordinates()
    },
    /**
     * Set the Coordinate Field
     * @param {*} colorValueField
     * @param {*} xLabel
     * @param {*} yLabel
     */
    selectLabeling(colorValueField) {
      this.colorValueField = this.colorFieldOptions.find((field) => field.id === colorValueField.id)
      this.updateColors()
    },
    /**
     *
     */
    updateSelection(minX, maxX, minY, maxY, count, zoomIn) {
      const matchingIndices = this.coordinateData
        .map((x, index) => index)
        .filter(
          (index) =>
            this.coordinateData[index].x < maxX &&
            this.coordinateData[index].x > minX &&
            this.coordinateData[index].y < maxY &&
            this.coordinateData[index].y > minY
        )

      // add everything that is already in, except if we are extending the search space...
      const existingMatches = zoomIn
        ? this.selectedIndices.filter((x) => matchingIndices.includes(x))
        : []
      // now, remove those elements from the matchingIndices
      const possibleIndices = matchingIndices.filter((x) => !existingMatches.includes(x))
      // Shuffle the indices, for a random draw
      for (let i = possibleIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[possibleIndices[i], possibleIndices[j]] = [possibleIndices[j], possibleIndices[i]]
      }
      // and fill up to count
      if (existingMatches.length < count) {
        this.selectedIndices = existingMatches.concat(
          possibleIndices.slice(0, count - existingMatches.length)
        )
      } else {
        this.selectedIndices = existingMatches.slice(0, count)
      }
    },
    /**
     * Select the current displayed potential
     * @param {*} id the id of the potential
     */
    selectPotential(id) {
      this.currentPotential = this.particleData[id]
    },

    /**
     * Select the current displayed potential
     * @param {*} id the id of the potential
     */
    unselectPotential(id) {
      this.selectPotential = null
    },

    updateParticleData() {
      this.particleData = getParticles([...new Set(this.atomData.map((atom) => atom.moleculeID))])
    },
    updateCoordinates() {
      this.coordinateData = this.atomData.map((atom) => {
        return { x: atom[this.coordinateField.id][0], y: atom[this.coordinateField.id][1] }
      })
    },
    updateColors() {
      this.atomColorValues = this.atomData.map((atom) => atom[this.colorValueField.id])
    },
    updateAtomData() {
      this.updating = true
      waitForData().then(() => {
        getFullAtomData()
          .then((data) => {
            this.atomData = data
            this.updateColors()
            this.updateCoordinates()
            this.updateParticleData()
            this.updating = false
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    init() {
      this.updateAtomData()
    },
    async ready() {
      // Create a promise that resolves when the asynchronous action is done
      return new Promise(async (resolve, reject) => {
        // Simulate an asynchronous action (e.g., fetching data)
        while (true) {
          if (this.updating || this.atomData.length == 0) {
            await new Promise((waiting) => setTimeout(waiting, 200))
          } else {
            // Resolve the promise with the result of the asynchronous action
            resolve(true)
            break
          }
        }
      })
    }
  }
})
