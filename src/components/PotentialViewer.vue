<script setup>
import StructureSelection from './StructureSelection.vue'
import Mol from './Mol.vue'
import { ref } from 'vue'

const selectedPotential = ref(null)
const loading = ref(true)
const potentialData = ref(null)
function processData(data) {
  potentialData.value = data
  loading.value = false
}
</script>

<template>
  <!--  <div class="flex h-full w-full justify-content-center align-items-center" v-if="loading">
    <BackendMock @parsed="processData"></BackendMock>
    <ProgressSpinner />
  </div>-->

  <div class="grid">
    <div class="col w-6 h-full">
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
    <div class="col w-6 h-full">
      <Mol :selectedPotential="selectedPotential"></Mol>
    </div>
  </div>
</template>
