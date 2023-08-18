import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import MolViewer from '@/components/MolViewer.vue'

const moleculeData = [
  [
    { pos: [10, 10, 10], surface: false, type: 'Au' },
    { pos: [12, 12, 15], surface: true, type: 'Pb' }
  ],
  [
    { pos: [13, 7, 10], surface: true, type: 'Fe' },
    { pos: [12, 12, 15], surface: false, type: 'Au' }
  ],
  [
    { pos: [12, 8, 11], surface: true, type: 'Fe' },
    { pos: [7, 3, 4], surface: true, type: 'C' }
  ],
  [
    { pos: [13, 7, 10], surface: true, type: 'Au' },
    { pos: [12, 12, 15], surface: true, type: 'Pb' }
  ]
]

describe('MolViewer', () => {
  // Mock molecule data for testing
  it('renders the component', () => {
    const wrapper = mount(MolViewer, {
      propsData: {
        moleculeData: moleculeData[0]
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('initializes the viewer on mount', () => {
    const initializeViewer = vi.spyOn(MolViewer.methods, 'initializeViewer')

    mount(MolViewer, {
      propsData: {
        moleculeData: moleculeData[0]
      }
    })

    expect(initializeViewer).toHaveBeenCalled()
  })

  it('loads the structure when mounted', () => {
    const loadStructure = vi.spyOn(MolViewer.methods, 'loadStructure')

    mount(MolViewer, {
      propsData: {
        moleculeData: moleculeData[0]
      }
    })

    expect(loadStructure).toHaveBeenCalled()
  })

  it('renders the molecule data', () => {
    const wrapper = mount(MolViewer, {
      propsData: {
        moleculeData: moleculeData[0]
      }
    })

    // Assert that the molecule data is rendered correctly
    const viewer = wrapper.vm.viewer
    expect(viewer.getModelList().length).toBe(moleculeData.length)
  })

  it('updates the structure when moleculeData prop changes', async () => {
    const wrapper = mount(MolViewer, {
      propsData: {
        moleculeData: moleculeData[0]
      }
    })

    // Modify the molecule data

    wrapper.setProps({ moleculeData: moleculeData[1] })
    await wrapper.vm.$nextTick()

    // Assert that the updated molecule data is rendered correctly
    const viewer = wrapper.vm.viewer
    expect(viewer.getModelList().length).toBe(newMoleculeData.length)
  })
})
