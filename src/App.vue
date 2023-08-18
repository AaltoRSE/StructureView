<script setup>
import PotentialViewer from './components/PotentialViewer.vue'
import { usePotentialStore } from '@/stores/potentialStore.js'
const potentialStore = usePotentialStore()

potentialStore.init()
</script>

<template>
  <PotentialViewer class="w-screen h-screen"></PotentialViewer>
</template>
