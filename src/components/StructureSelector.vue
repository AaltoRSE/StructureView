<template>
  <Scatter
    v-if="chartData"
    ref="scatter"
    :data="chartData"
    :options="chartOptions"
    @click="handleEvent"
  ></Scatter>
  <color-scale></color-scale>
</template>

<script>
import { Scatter, getElementAtEvent } from 'vue-chartjs'
import ColorScale from './ColorScale.vue'
import zoomPlugin from 'chartjs-plugin-zoom'

import { Chart as ChartJS, Title, Tooltip, Legend, LinearScale, PointElement } from 'chart.js'

import { ref } from 'vue'

ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement, zoomPlugin)

export default {
  props: {
    atomData: {
      type: Array,
      required: true
    },
    colorData: {
      type: Array,
      required: true
    },
    coordinateData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: null
    }
  },
  components: { Scatter, ColorScale },

  computed: {
    chart() {
      return this.scatter.chart
    }
  },
  watch: {
    coordinateData(newValue) {
      this.updateData()
    },
    colorData(newValue) {
      this.scatter.chart.update()
    }
  },
  emits: ['selectPotential', 'unSelect'],
  methods: {
    updateData() {
      this.chartOptions = {
        responsive: true,
        pointBackgroundColor: (context) => {
          return this.colorData[context.dataIndex]
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              display: false
            }
          }
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'xy'
            }
          },
          legend: {
            display: false,
            position: 'right'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return this.getLabel(context.dataIndex)
              }
            },
            mode: 'index',
            displayColors: false
          },
          gradient: {}
        }
      }
      this.chartData = {
        datasets: [
          {
            label: 'Current Dataset',
            data: this.coordinateData,
            backgroundColor: 'rgb(255, 99, 132)'
          }
        ]
      }
    },
    handleEvent(event) {
      const selectedElement = this.getElementAtEvent(event)
      if (selectedElement.length > 0) {
        this.$emit('selectPotential', selectedElement[0].index)
      } else {
        this.$emit('unSelect')
      }
    },
    getLabel(index) {
      const data = this.atomData[index]
      return [
        `Cluster: ${data.cluster}`,
        `Local_energy: ${data.local_energy}`,
        `Medoid: ${data.medoid}`,
        `Species: ${data.species}`,
        `Surface: ${data.surface}`
      ]
    },
    getElementAtEvent(event) {
      // this is mainly for allowing better testing, by wrapping the external
      // dependency and thus being able to mock the call properly
      return getElementAtEvent(this.chart, event)
    }
  },
  setup() {
    const scatter = ref(null)
    return {
      scatter
    }
  },
  mounted() {
    this.updateData()
  }
}
</script>
