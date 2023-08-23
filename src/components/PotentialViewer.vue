<script setup>
import StructureSelection from './StructureSelection.vue'
import Mol from './Mol.vue'
import { ref } from 'vue'
</script>

<template>
  <!--  <div class="flex h-full w-full justify-content-center align-items-center" v-if="loading">
    <BackendMock @parsed="processData"></BackendMock>
    <ProgressSpinner />
  </div>-->

  <div class="grid">
    <div class="col w-6 h-full">
      <StructureSelection></StructureSelection>
    </div>
    <div class="col w-6 h-full">
      <Mol></Mol>
    </div>
  </div>
</template>
