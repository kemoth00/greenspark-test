import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WidgetComponent from '@/components/WidgetComponent.vue'
import WidgetBadgeComponent from '@/components/WidgetBadgeComponent.vue'
import WidgetSettingsComponent from '@/components/WidgetSettingsComponent.vue'
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

describe('WidgetComponent', () => {
  it('renders WidgetBadgeComponent and WidgetSettingsComponent with correct props', () => {
    const wrapper = mount(WidgetComponent, {
      props: { data: mockData },
    })

    const badge = wrapper.findComponent(WidgetBadgeComponent)
    expect(badge.exists()).toBe(true)
    expect(badge.props('data')).toEqual(mockData)

    const settings = wrapper.findComponent(WidgetSettingsComponent)
    expect(settings.exists()).toBe(true)
    expect(settings.props('data')).toEqual(mockData)
  })

  it('emits update and updateActive events correctly', async () => {
    const wrapper = mount(WidgetComponent, {
      props: { data: mockData },
    })

    const updatedData = { ...mockData, amount: 20 }
    const settings = wrapper.findComponent(WidgetSettingsComponent)

    await settings.vm.$emit('update', updatedData)

    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')?.[0]).toEqual([updatedData])

    if (mockData.active) {
      expect(wrapper.emitted('updateActive')).toBeTruthy()
      expect(wrapper.emitted('updateActive')?.[0]).toEqual([updatedData])
    }
  })
})
