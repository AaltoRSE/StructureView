<script setup>
import StructureSelection from './StructureSelection.vue'
import Mol from './Mol.vue'
import { ref } from 'vue'

const selectedPotential = ref(null)
</script>

<template>
  <div class="grid">
    <div class="col w-6">
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
    <div class="col w-6">
      <Mol :selectedPotential="selectedPotential"></Mol>
    </div>
  </div>
</template>
