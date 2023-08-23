<template>
  <div class="grid">
    <div class="col">
      <DataTable :value="selectedParticleProperties">
        <template #header> Particle Properties </template>
        <Column field="propertyName" header="Property"></Column>
        <Column field="value" header="Value">
          <template #body="slotProps">
            <ValueContent :type="slotProps.data.type" :value="slotProps.data.value"></ValueContent>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable v-if="selectedAtom" :value="selectedAtomProperties">
        <template #header> Atom Properties </template>
        <Column field="propertyName" header="Property"></Column>
        <Column field="value" header="Value">
          <template #body="slotProps">
            <ValueContent :type="slotProps.data.type" :value="slotProps.data.value"></ValueContent>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ValueContent from './utils/ValueContent.vue'

export default {
  components: { DataTable, Column, ValueContent },
  props: {
    particleData: {
      type: Object
    },
    selectedAtom: {
      type: Object
    }
  },
  computed: {
    selectedParticleProperties() {
      if (!this.particleData) {
        return []
      }
      const res = []
      for (const element in this.particleProperties) {
        let value = this.particleData.moleculeProperties[element]
        const type = this.particleProperties[element].type
        const propertyName = this.particleProperties[element].label
        if (type === 'point' || type === 'array') {
          value = value.split(' ')
        }
        res.push({ type, value, propertyName })
      }
      return res
    },
    selectedAtomProperties() {
      if (!this.selectedAtom) {
        return []
      }
      const res = []
      for (const element in this.atomProperties) {
        let value = this.selectedAtom[element]
        const type = this.atomProperties[element].type
        const propertyName = this.atomProperties[element].label
        res.push({ type, value, propertyName })
      }
      return res
    }
  },
  data() {
    return {
      particleProperties: {
        clmds_cluster: {
          label: 'Cluster',
          type: 'number'
        },
        clmds_coordinates: {
          label: 'Clustering Coordinates',
          type: 'point'
        },
        clmds_medoid: {
          label: 'Cluster Medoid',
          type: 'logical'
        },
        energy: {
          label: 'Particle Energy',
          type: 'number'
        },
        volume: {
          label: 'Particle Volume',
          type: 'number'
        }
      },
      atomProperties: {
        local_energy: {
          type: 'number',
          label: 'Local Energy'
        },
        medoid: {
          label: 'Particle Medoid',
          type: 'logical'
        },
        species: { label: 'Species', type: 'string' },
        surface: { label: 'Surface Atom', type: 'logical' }
      }
    }
  }
}
</script>
