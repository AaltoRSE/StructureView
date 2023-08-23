export class ColorScale {
  colorValues = []
  colorStops = []
  colors = []
  continous = false
  baseColors = []
  init(values, colors) {
    this.baseColors = colors
    const unique = [...new Set(values)]
    if (typeof values[0] === 'string') {
      this.colorValues = unique.sort()
      this.colors = colorStops(unique.length, colors)
      this.colorStops = this.colors
      this.continous = false
    } else if (unique.length <= colors.length) {
      this.colorValues = unique.sort((a, b) => a - b)
      this.colors = colors.slice(0, this.colorValues.length)
      this.colorStops = this.colors
      this.continous = false
    } else {
      this.colors = colors.map((color) => {
        return { r: color.r, g: color.g, b: color.b }
      })
      const minmax = findMinAndMax(values)
      const dist = minmax.max - minmax.min
      this.colorValues = colors.map((color) => minmax.min + dist * color.pos)
      this.colorStops = colorStops(100, colors)
      this.continous = true
    }
  }
  update(values) {
    this.init(values, this.baseColors)
  }
  /**
   * Get the color for a specific value.
   * @param {*} value
   * @returns
   */
  getColorForValue(value) {
    if (!this.continous) {
      return this.colors[this.colorValues.indexOf(value)]
    } else {
      const largerIndex = this.colorValues.findIndex((x) => x > value)
      if (largerIndex == -1) {
        return this.colors[this.colors.length - 1]
      } else {
        if (largerIndex == 0) {
          return this.colors[0]
        }
        return getColor(
          this.colorValues[largerIndex - 1],
          this.colors[largerIndex - 1],
          this.colorValues[largerIndex],
          this.colors[largerIndex],
          value
        )
      }
    }
  }
  /**
   * Get colors for display. In a discrete case this will be a few colors, in a
   * continous case these will be 100 elements representing the palette.
   * @returns
   */
  getColors() {
    return this.colorStops
  }
  /**
   * Get the steps associated with the colors.
   * Discrete: 1 per color from getColors
   * continous: Min and max values.
   * @returns
   */
  getSteps() {
    if (this.continous) {
      const minmax = findMinAndMax(this.colorValues)
      return [minmax.min, minmax.max]
    } else {
      return this.colorValues
    }
  }
  isContinous() {
    return this.continous
  }
}

/**
 * Get a number of steps
 * @param {*} count How many steps
 * @param {Object} colors RGB colors with an additional "position" indicator pos. pos must be between 0 and 1
 * @returns
 */
function colorStops(count, colors) {
  if (colors.length >= count) {
    return colors
      .map((color) => {
        return { r: color.r, g: color.g, b: color.b }
      })
      .slice(0, count)
  } else {
    const colorStops = []
    const tempColors = colors.map((color) => {
      return { r: color.r, g: color.g, b: color.b }
    })
    for (let i = 0; i < count; ++i) {
      const largerIndex = colors.findIndex((x) => x.pos > i / count)
      if (largerIndex == -1) {
        colorStops.push(tempColors[colors.length - 1])
      } else {
        if (largerIndex == 0) {
          colorStops.push(tempColors[0])
        } else {
          colorStops.push(
            getColor(
              colors[largerIndex - 1].pos,
              colors[largerIndex - 1],
              colors[largerIndex].pos,
              colors[largerIndex],
              i / count
            )
          )
        }
      }
    }
    return colorStops
  }
}
/**
 * Get a color between two vcolors assigned to specific values based on a value given.
 * The value given should be within the range smallerValue < value < largerValue
 * @param {*} smallerValue
 * @param {*} smallerColor
 * @param {*} largerValue
 * @param {*} largerColor
 * @param {*} value
 * @returns
 */
function getColor(smallerValue, smallerColor, largerValue, largerColor, value) {
  const percentage = (value - smallerValue) / (largerValue - smallerValue)
  const r = interpolate(smallerColor.r, largerColor.r, percentage)
  const g = interpolate(smallerColor.g, largerColor.g, percentage)
  const b = interpolate(smallerColor.b, largerColor.b, percentage)
  return { r, g, b }
}
/**
 * Interpolate the number and round between start and end given a percentage of end.
 * @param {*} start
 * @param {*} end
 * @param {*} percentage
 * @returns
 */

function interpolate(start, end, percentage) {
  return Math.floor(start + (end - start) * percentage)
}

/**
 * Find the minimum and maximum of an array of numbers
 * @param {Array} array
 * @returns
 */
function findMinAndMax(array) {
  if (array.length === 0) {
    return { min: undefined, max: undefined }
  }

  let min = array[0]
  let max = array[0]

  for (let i = 1; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i]
    }

    if (array[i] > max) {
      max = array[i]
    }
  }

  return { min, max }
}
