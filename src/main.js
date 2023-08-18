//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  isReady,
  getAtomData,
  getFullAtomData,
  getPotentialData,
  getParticles
} from '@/backend/mockBackend'

console.log(isReady())
import App from './App.vue'
import PrimeVue from 'primevue/config'

// PrimeVue theme (will probably need to be overwritten for Aalto Look and Feel)
import 'primevue/resources/themes/lara-light-indigo/theme.css'
// Primevue core css
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia).use(PrimeVue, { ripple: true })
app.mount('#app')
