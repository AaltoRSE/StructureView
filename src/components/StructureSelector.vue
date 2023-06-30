<template>
  <Scatter
    ref="scatter"
    :data="data"
    :options="chartOptions"
    @click="handleEvent"
  ></Scatter>
</template>

<script>
import { Scatter, getElementAtEvent } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
} from "chart.js";

import { ref } from "vue";

ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement);

export default {
  props: {
    potentialData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: { Scatter },
  computed: {
    colors() {
      return this.potentialData.map((x) => x.color);
    },
    chartOptions() {
      const options = {
        responsive: true,
        pointBackgroundColor: (context) => {
          const currentIndex = context.dataIndex;
          return this.colors[currentIndex];
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return this.getLabel(context.dataIndex);
              },
            },
            displayColors: false,
          },
        },
      };
      return options;
    },
    chart() {
      return this.scatter.chart;
    },
    data() {
      return {
        datasets: [
          {
            label: "Current Dataset",
            data: this.potentialData.map((potential) => {
              return { x: potential.x, y: potential.y };
            }),
            backgroundColor: "rgb(255, 99, 132)",
          },
        ],
      };
    },
  },
  emits: ["selectPotential", "unSelect"],
  methods: {
    handleEvent(event) {
      console.log("click received");
      console.log(getElementAtEvent(this.chart, event));
      const selectedElement = getElementAtEvent(this.chart, event);
      console.log(selectedElement);
      if (selectedElement.length > 0) {
        console.log("Emitting selection");
        this.$emit("selectPotential", selectedElement[0].index);
      } else {
        console.log("Emitting Unselection");
        this.$emit("unSelect");
      }
    },
    getLabel(index) {
      return "" + index;
    },
  },
  setup() {
    const scatter = ref(null);
    return {
      scatter,
    };
  },
};
</script>
