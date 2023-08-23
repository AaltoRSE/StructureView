<template>
  <div class="scatter-plot-container" ref="d3container">
    <svg ref="chart">
      <g ref="graphics"></g>
    </svg>
    <Tooltip
      :showToolTip="showToolTip"
      :position="tooltipPosition"
      :tooltipText="tooltipText"
    ></Tooltip>
  </div>
</template>

<script>
import * as d3 from 'd3'
import Tooltip from './Tooltip.vue'
import { ref } from 'vue'

export default {
  name: 'FlexibleScatterPlot',
  props: {
    coordinateData: {
      type: Array,
      required: true
    },
    colorData: {
      type: Array,
      required: true
    },
    minX: {
      type: Number,
      default: -1
    },
    maxX: {
      type: Number,
      default: 1
    },
    minY: {
      type: Number,
      default: -1
    },
    maxY: {
      type: Number,
      default: 1
    }
  },
  setup() {
    const d3container = ref(null)
    return { d3container }
  },
  emits: ['selected', 'zooming'],
  data() {
    return {
      graphics: null,
      svg: null,
      xScale: null,
      yScale: null,
      tooltipPosition: { x: 0, y: 0 },
      showToolTip: false,
      tooltipText: '',
      zoom: null,
      width: 0,
      height: 0,
      lastZoom: 1,
      xAxis: null,
      yAxis: null
    }
  },
  mounted() {
    this.initPlot()
    window.addEventListener('resize', this.handleResize)
  },
  watch: {
    colorData: {
      handler: 'updateColors',
      deep: true
    },
    coordinateData: {
      handler: 'updatePlot',
      deep: true
    },
    width() {
      this.updatePlot()
    },
    height() {
      this.updatePlot()
    }
  },
  methods: {
    handleResize() {
      this.width = this.d3container ? this.d3container.clientWidth : 600
      this.height = this.d3container ? this.d3container.clientHeight : 400
      this.updatePlot()
    },
    initPlot() {
      this.width = this.d3container ? this.d3container.clientWidth : 600
      this.height = this.d3container ? this.d3container.clientHeight : 400
      this.svg = d3.select(this.$refs.chart)
      this.graphics = d3.select(this.$refs.graphics)
      this.svg.attr('width', this.width).attr('height', this.height)
      this.graphics
        .on('mouseover', (event, d) => {
          d3.select(event.target).attr('r', 8)
          this.showTooltip(event.target.__data__.tooltip, event.clientX, event.clientY)
        })
        .on('mouseout', (event, d) => {
          d3.select(event.target).attr('r', 5)
          this.hideTooltip()
        })
        .on('click', (event) => {
          this.$emit('selected', event.target.__data__.index)
        })

      this.zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .translateExtent([
          [0, 0],
          [this.width, this.height]
        ])
        .on('zoom', this.handleZoom)
      this.svg.call(this.zoom)

      this.updatePlot()
      this.updateColors()
    },
    handleZoom(event) {
      const { transform } = event
      const XRange = transform.rescaleX(this.xScale).domain()
      const YRange = transform.rescaleY(this.yScale).domain()
      const zoomIn = transform.k >= this.lastZoom
      this.$emit('zooming', { XRange, YRange, zoomIn })
      this.graphics.attr('transform', transform)
      // remember the last zoom.
      this.lastZoom = transform.k
      //}
    },
    showTooltip(text, x, y) {
      if (this.d3container) {
        this.tooltipText = text
        this.tooltipPosition = {
          x,
          y,
          maxX: this.width + this.d3container.offsetLeft,
          maxY: this.height + this.d3container.offsetTop
        }
        this.showToolTip = true
      }
    },
    hideTooltip() {
      // Implement tooltip hide logic here
      this.showToolTip = false
    },
    updatePlot() {
      if (!this.svg) return
      this.xScale = d3.scaleLinear().domain([this.minX, this.maxX]).range([0, this.width])
      this.yScale = d3.scaleLinear().domain([this.minY, this.maxY]).range([this.height, 0])
      d3.select(this.$refs.chart).attr('width', this.width).attr('height', this.height)
      const circles = this.graphics.selectAll('circle').data(this.coordinateData)
      circles
        .enter()
        .append('circle')
        .merge(circles)
        .attr('cx', (d) => this.xScale(d.x))
        .attr('cy', (d) => this.yScale(d.y))
        .attr('r', 5)
      circles.exit().remove()
    },
    updateColors() {
      if (!this.graphics) return
      const circles = this.graphics.selectAll('circle').data(this.coordinateData)
      circles.attr('fill', (d, i) => this.colorData[i])
      circles.exit().remove()
    }
  },
  components: { Tooltip },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
/* Add any custom styles here */
.scatter-plot-container {
  width: 100%;
  height: 100%;
}
</style>
