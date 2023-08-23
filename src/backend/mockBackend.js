import { parseXYZ } from './xyzparser'

var particleData = null

export async function loadData() {
  const response = await fetch(
    'https://raw.githubusercontent.com/mcaroba/turbogap/master/tutorials/PtAu_NPs_MDS/db2.xyz'
    //'https://api.github.com/repos/mcaroba/turbogap/contents/tutorials/PtAu_NPs_MDS/db2.xyz'
  )
  const xyzData = await response.text()
  particleData = parseXYZ(xyzData)
}

export function isReady() {
  return particleData != null
}

/**
 * Get the Atom data pointing back to the ID of a
 * @returns
 */
export async function getAtomData(fieldNames) {
  var usedFields = fieldNames
  if (!Array.isArray(fieldNames)) {
    usedFields = [fieldNames]
  }
  if (isReady()) {
    return particleData.flatMap((molecule) => {
      const moleculeID = molecule.moleculeProperties.id
      return molecule.atoms.map((atom) => {
        const extractedData = { moleculeID }
        usedFields.forEach((fieldName) => {
          extractedData[fieldName] = atom[fieldName]
        })
        return extractedData
      })
    })
  } else {
    return null
  }
}

/**
 * Get the Atom data pointing back to the ID of a
 * @returns
 */
export async function getFullAtomData() {
  if (isReady()) {
    return particleData.flatMap((molecule) => {
      const moleculeID = molecule.moleculeProperties.id
      return molecule.atoms.map((atom) => {
        atom['moleculeID'] = moleculeID
        return atom
      })
    })
  } else {
    return null
  }
}

/**
 * Get the Atom data pointing back to the ID of a
 * @returns
 */
export async function getParticle(particleID) {
  return particleData.find((x) => x.id === particleID)
}

/**
 * Get the Atom data pointing back to the ID of a
 * @returns
 */
export function getPotentialData() {
  return particleData
}

export function getParticles(particleIDs) {
  return particleData.filter((particle) => particleIDs.includes(particle.moleculeProperties.id))
}
