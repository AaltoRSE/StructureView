import { v4 as uuid } from 'uuid'

export function parseXYZ(xyzData) {
  const entries = []
  const lines = xyzData.trim().split('\n')

  let i = 0
  while (i < lines.length) {
    const numAtoms = parseInt(lines[i])
    i++

    const moleculePropertiesLine = lines[i]
    const moleculeProperties = parseMoleculeProperties(moleculePropertiesLine)
    moleculeProperties.id = entries.length
    const atomProps = buildAtomTypeArray(moleculeProperties.Properties)
    //console.log(atomProps)
    i++

    const atoms = []
    for (let j = 0; j < numAtoms; j++) {
      const atom = {}
      const atomLine = lines[i + j]
      const atomProperties = atomLine.split(/ +/)
      //console.log(atomProperties)
      for (let pos = 0; pos < atomProperties.length; pos++) {
        const cProp = atomProps[pos]
        //console.log(pos)
        //console.log(cProp)
        if (!cProp.isArray) {
          atom[cProp.propertyName] = getPropertyValue(atomProperties[pos], cProp.propertyType)
        } else {
          if (!atom[cProp.propertyName]) {
            atom[cProp.propertyName] = []
          }
          atom[cProp.propertyName].push(getPropertyValue(atomProperties[pos], cProp.propertyType))
        }
      }
      atoms.push(atom)
    }
    i += numAtoms

    entries.push({
      moleculeProperties,
      atoms
    })
  }

  return entries
}

function buildAtomTypeArray(atomProps) {
  const atomProperties = []
  const regex = /(.*?):(.):([0-9]+)(:|$)/g
  let match

  while ((match = regex.exec(atomProps)) !== null) {
    const propertyName = match[1].trim()
    const propertyType = match[2].trim()
    const propertyCount = match[3].trim()
    const isArray = propertyCount > 1
    for (let i = 0; i < propertyCount; ++i) {
      atomProperties.push({ propertyName, propertyType, isArray })
    }
  }

  return atomProperties
}

function parseMoleculeProperties(propertyString) {
  const moleculeProperties = {}
  const regex = /(.*?)=(.*?)((?=([^ ]+=)|$))/g
  let match

  while ((match = regex.exec(propertyString)) !== null) {
    const propertyName = match[1].trim()
    const propertyValue = match[2].trim()
    moleculeProperties[propertyName] = parsePropertyValue(propertyValue)
  }

  return moleculeProperties
}

function parsePropertyValue(value) {
  if (value === 'T' || value === 'F') {
    return value === 'T'
  } else if (!isNaN(parseFloat(value))) {
    return parseFloat(value)
  } else {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.substring(1, value.length - 1)
    } else {
      return value
    }
  }
}

function getPropertyValue(value, type) {
  switch (type) {
    case 'L':
      return value === 'T'
    case 'I':
      return parseInt(value)
    case 'R':
      return parseFloat(value)
    case 'S':
      return value
  }
}
