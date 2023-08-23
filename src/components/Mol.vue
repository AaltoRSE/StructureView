<template>
  <div class="flex h-full flex-column">
    <MolViewer
      @atomSelected="selectAtom"
      v-if="currentPotential != null"
      :moleculeData="currentPotential.atoms"
    />
    <ParticleDetailViewer
      :particleData="currentPotential"
      :selectedAtom="selectedAtom"
    ></ParticleDetailViewer>
  </div>
</template>

<script>
import MolViewer from './MolViewer.vue'
import { usePotentialStore } from '../stores/potentialStore'
import { storeToRefs } from 'pinia'
import ParticleDetailViewer from './ParticleDetailViewer.vue'

export default {
  components: {
    MolViewer,
    ParticleDetailViewer
  },
  data() {
    return {
      selectedAtom: null
    }
  },
  setup() {
    const potentialStore = usePotentialStore()
    const { currentPotential } = storeToRefs(potentialStore)
    return {
      potentialStore,
      currentPotential
    }
  },
  methods: {
    selectAtom(index) {
      this.selectedAtom = index
    }
  }
}
</script>
