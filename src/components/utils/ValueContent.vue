<template>
  <div>
    <div v-if="type === 'number' || type === 'string'">
      {{ value }}
    </div>
    <FixedCheckBox
      v-else-if="type === 'logical'"
      :isChecked="value === 'T' || (typeof value === 'boolean' && value)"
    >
    </FixedCheckBox>
    <div v-else-if="type === 'point'">
      {{ `x: ${value[0]} / y: ${value[1]}` + (value.length > 2 ? ` / z: ${value[2]}` : '') }}
    </div>
    <div v-else-if="type === 'array'">{{ value.join(', ') }}</div>
  </div>
</template>

<script>
import Column from 'primevue/column'
import FixedCheckBox from './FixedCheckBox.vue'

export default {
  components: { FixedCheckBox, Column },

  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      required: true
    }
  }
}
</script>
