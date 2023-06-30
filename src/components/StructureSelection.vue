<template>
  <StructureSelector
    :potentialData="currentData"
    @selectPotential="(event) => $emit('selectPotential', event)"
    @unSelect="$emit('unSelect')"
  ></StructureSelector>
  <button @click="selected = !selected">switch dataset</button>
</template>

<script>
import StructureSelector from "./StructureSelector.vue";

export default {
  props: {
    potentialID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: false,
      data1: [
        {
          x: -10,
          y: 0,
          color: "red",
        },
        {
          x: 0,
          y: 10,
          color: "rgb(0,255,0,1)",
        },
        {
          x: 10,
          y: 5,
          color: "rgb(0,0,255,1)",
        },
        {
          x: 0.5,
          y: 5.5,
          color: "orange",
        },
      ],

      data2: [
        {
          x: 10,
          y: 0,
          color: "orange",
        },
        {
          x: 0,
          y: -10,
          color: "blue",
        },
        {
          x: -10,
          y: 5,
          color: "green",
        },
        {
          x: -0.5,
          y: 5.5,
          color: "yellow",
        },
      ],
    };
  },
  components: { StructureSelector },
  computed: {
    currentData() {
      return this.selected ? this.data1 : this.data2;
    },
  },
  emits: ["selectPotential", "unSelect"],
  methods: {},
};
</script>
