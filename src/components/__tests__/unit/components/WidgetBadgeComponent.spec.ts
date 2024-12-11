import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WidgetBadgeComponent from '@/components/WidgetBadgeComponent.vue'
import type { WidgetInterface } from '@/interfaces/WidgetInterface'

// Mock data for testing
const mockData = {
  id: 1,
  type: 'carbon',
  amount: 10,
  action: 'offsets',
  active: true,
  linked: false,
  selectedColor: 'green',
} as WidgetInterface

describe('WidgetBadgeComponent', () => {
  it('renders correctly with provided props', () => {
    const wrapper = mount(WidgetBadgeComponent, {
      props: { data: mockData },
    })

    expect(wrapper.text()).toContain('This product collects')
    expect(wrapper.text()).toContain('10 kgs of carbon')
  })

  it('applies the correct classes based on selectedColor', () => {
    const wrapper = mount(WidgetBadgeComponent, {
      props: { data: mockData },
    })

    const div = wrapper.find('div')
    expect(div.classes()).toContain('bg-greenC')
    expect(div.classes()).toContain('text-greenText')
  })

  it('pluralizes the text correctly based on data type and amount', () => {
    const testCases = [
      { type: 'carbon', amount: 1, expected: '1 kg of carbon' },
      { type: 'carbon', amount: 10, expected: '10 kgs of carbon' },
      { type: 'plastic', amount: 1, expected: '1 plastic bottle' },
      { type: 'plastic', amount: 5, expected: '5 plastic bottles' },
      { type: 'trees', amount: 1, expected: '1 tree' },
      { type: 'trees', amount: 3, expected: '3 trees' },
    ]

    testCases.forEach(({ type, amount, expected }) => {
      const wrapper = mount(WidgetBadgeComponent, {
        props: {
          data: { ...mockData, type: type as 'carbon' | 'plastic' | 'trees', amount },
        },
      })

      expect(wrapper.text()).toContain(expected)
    })
  })
})
