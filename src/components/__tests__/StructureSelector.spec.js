// Testing imports
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// Class imports
import { Scatter, getElementAtEvent } from 'vue-chartjs'
import StructureSelector from '../StructureSelector.vue'

// Data imports
import { potentialData } from './testData'


describe('StructureSelector', () => {
    it('emits selectPotential event when a data point is clicked', async () => {
 
      // Mocking the getElementAtEvent function      
      
      const wrapper = mount(StructureSelector, {
        props: {
          potentialData
        }
      })
      
      await nextTick()
      wrapper.vm.getElementAtEvent = vi.fn((chart,event) => [{index : 1}])      
      // Simulate a click event
      await wrapper.findComponent(Scatter).trigger('click')      

      // Expect selectPotential event to be emitted with the correct index
      expect(wrapper.emitted('selectPotential')).toHaveLength(1)
      expect(wrapper.emitted('selectPotential')[0][0]).toBe(1)
    })
  
    it('emits unSelect event when a click event happens outside the data points', async () => {
        
      const wrapper = mount(StructureSelector, {
        props: {
          potentialData
        }
      })
      await nextTick()
      // Mocking the getElementAtEvent function
      wrapper.vm.getElementAtEvent = vi.fn(() => [])
  
      // Simulate a click event
      await wrapper.findComponent(Scatter).trigger('click')
  
      // Expect unSelect event to be emitted
      expect(wrapper.emitted('unSelect')).toHaveLength(1)
    })
  
    it('displays the correct point background colors', () => {
        
      const wrapper = mount(StructureSelector, {
        props: {
          potentialData
        }
      })
  
      const pointBackgroundColors = wrapper.vm.chartOptions.pointBackgroundColor
  
      // Check the colors for each data point
      for (let i = 0; i < potentialData.length; i++) {
        const pointColor = pointBackgroundColors({ dataIndex: i })
        expect(pointColor).toBe(potentialData[i].color)
      }
    })
  
    // Add more tests as needed
  
  })