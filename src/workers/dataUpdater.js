self.onmessage = function (e) {
  // Receive data from the main thread
  const data = e.data
  const result = {}
  if (data.updateSelection) {
    result.selectedIndices = updateSelection(
      data.coordinateData,
      data.selectedIndices,
      data.minX,
      data.maxX,
      data.minY,
      data.maxY,
      data.count,
      data.zoomIn
    )
  }
  if (data.updateCoordinates) {
    result.coordinates = updateCoordinates(data.atomData, data.coordinateField)
  }
  if (data.updateColors) {
    result.colors = updateCoordinates(data.atomData, data.colorValueField)
  }

  // Send the result back to the main thread
  self.postMessage(result)
}

function updateSelection(coordinateData, selectedIndices, minX, maxX, minY, maxY, count, zoomIn) {
  console.log('Updating selection')
  const matchingIndices = coordinateData
    .filter((coord) => coord.x < maxX && coord.x > minX && coord.y < maxY && coord.y > minY)
    .map((x, index) => index)
  // add everything that is already in, except if we are extending the search space...
  const existingMatches = zoomIn ? selectedIndices.filter((x) => matchingIndices.includes(x)) : []
  // now, remove those elements from the matchingIndices
  const possibleIndices = matchingIndices.filter((x) => !existingMatches.includes(x))
  // Shuffle the indices, for a random draw
  for (let i = possibleIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[possibleIndices[i], possibleIndices[j]] = [possibleIndices[j], possibleIndices[i]]
  }
  // and fill up to count
  if (existingMatches.length < count) {
    return existingMatches.concat(possibleIndices.slice(0, count - existingMatches.length))
  } else {
    return existingMatches.slice(0, count)
  }
}

function updateCoordinates(atomData, coordinateField) {
  return atomData.map((atom) => {
    return { x: atom[coordinateField][0], y: atom[coordinateField][1] }
  })
}
function updateColors(atomData, colorValueField) {
  return atomData.map((atom) => atom[colorValueField])
}
