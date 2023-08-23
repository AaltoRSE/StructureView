// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { usePotentialStore } from '@/stores/potentialStore'

describe('Potential Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    const potentialStore = usePotentialStore()
    potentialStore.init()
  })

  it('loads', async () => {
    const potentialStore = usePotentialStore()
    await potentialStore.ready()
    expect(potentialStore.atomData.length).toBeGreaterThan(0)
    expect(potentialStore.atomData.length).toEqual(potentialStore.atomColorValues.length)
    expect(potentialStore.atomData.length).toEqual(potentialStore.coordinateData.length)
  })
  it('Gets an appropriate selection and updates it ok', async () => {
    const potentialStore = usePotentialStore()
    await potentialStore.ready()
    potentialStore.updateSelection(-0.5, 0.5, -0.5, 0.5, 50, true)
    expect(
      potentialStore.selectedIndices.filter(
        (index) => potentialStore.coordinateData[index].x < -0.5
      ).length
    ).toBe(0)
    expect(
      potentialStore.selectedIndices.filter((index) => potentialStore.coordinateData[index].x > 0.5)
        .length
    ).toBe(0)
    expect(
      potentialStore.selectedIndices.filter(
        (index) => potentialStore.coordinateData[index].y < -0.5
      ).length
    ).toBe(0)
    expect(
      potentialStore.selectedIndices.filter((index) => potentialStore.coordinateData[index].y > 0.5)
        .length
    ).toBe(0)
    potentialStore.updateSelection(-0.25, 0.25, -0.25, 0.25, 50, true)
    expect(
      potentialStore.selectedIndices.filter(
        (index) => potentialStore.coordinateData[index].x < -0.25
      ).length
    ).toBe(0)
    expect(
      potentialStore.selectedIndices.filter(
        (index) => potentialStore.coordinateData[index].x > 0.25
      ).length
    ).toBe(0)
    expect(
      potentialStore.selectedIndices.filter(
        (index) => potentialStore.coordinateData[index].y < -0.25
      ).length
    ).toBe(0)
    expect(
      potentialStore.selectedIndices.filter(
        (index) => potentialStore.coordinateData[index].y > 0.25
      ).length
    ).toBe(0)
  })
})
