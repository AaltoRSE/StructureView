<template>
  <div>
    <Checkbox :binary="true" v-model="placeHolder" :disabled="true" />
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox'
export default {
  data() {
    return {
      placeHolder: this.isChecked // Set this to the property's value
    }
  },
  watch: {
    isChecked(newValue) {
      this.placeHolder = newValue
    }
  },
  components: { Checkbox },
  props: {
    isChecked: Boolean, // Assuming the property is a Boolean
    required: true
  }
}
</script>
