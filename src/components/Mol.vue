<template>
  <MolViewer v-if="currentPotential != null" :moleculeData="currentPotential.atoms" />
</template>

<script>
import MolViewer from './MolViewer.vue'
import { usePotentialStore } from '../stores/potentialStore'
import { storeToRefs } from 'pinia'

export default {
  components: {
    MolViewer
  },
  data() {
    return {}
  },
  setup() {
    const potentialStore = usePotentialStore()
    const { currentPotential } = storeToRefs(potentialStore)
    return {
      potentialStore,
      currentPotential
    }
  }
}
</script>
