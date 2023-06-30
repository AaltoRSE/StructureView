<script setup>
import StructureSelection from './StructureSelection.vue'
import Mol from './Mol.vue'
import { ref } from 'vue'

const selectedPotential = ref(null)
</script>

<template>
  <div class="grid">
    <div class="col">
      <StructureSelection
        @selectPotential="
          (event) => {
            console.log(event)
            selectedPotential = event
          }
        "
        @unSelect="selectedPotential = null"
      ></StructureSelection>
    </div>
    <div class="col w-screen">
      <Mol :selectedPotential="selectedPotential"></Mol>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
