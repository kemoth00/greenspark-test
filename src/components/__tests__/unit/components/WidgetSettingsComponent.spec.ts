import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WidgetSettingsComponent from '@/components/WidgetSettingsComponent.vue'
import CheckboxComponent from '@/components/ui/CheckboxComponent.vue'
import ColorSwitchComponent from '@/components/ui/ColorSwitchComponent.vue'
import ToggleComponent from '@/components/ui/ToggleComponent.vue'
import TooltipComponent from '@/components/ui/TooltipComponent.vue'
import type { WidgetInterface } from '@/interfaces/WidgetInterface'

const mockData = {
  id: 1,
  type: 'carbon',
  amount: 10,
  action: 'offsets',
  active: true,
  linked: false,
  selectedColor: 'green',
} as WidgetInterface

describe('WidgetSettingsComponent', () => {
  it('renders all child components with correct props', () => {
    const wrapper = mount(WidgetSettingsComponent, {
      props: { data: mockData },
    })

    const checkbox = wrapper.findComponent(CheckboxComponent)
    expect(checkbox.exists()).toBe(true)
    expect(checkbox.props()).toHaveProperty('modelValue', mockData.linked)
    expect(checkbox.props()).toHaveProperty('name', `checkbox-${mockData.id}`)

    const colorSwitch = wrapper.findComponent(ColorSwitchComponent)
    expect(colorSwitch.exists()).toBe(true)
    expect(colorSwitch.props()).toHaveProperty('modelValue', mockData.selectedColor)
    expect(colorSwitch.props()).toHaveProperty('name', `radio-${mockData.id}`)

    const toggle = wrapper.findComponent(ToggleComponent)
    expect(toggle.exists()).toBe(true)
    expect(toggle.props()).toHaveProperty('modelValue', mockData.active)
    expect(toggle.props()).toHaveProperty('name', `toggle-${mockData.id}`)
  })

  it('emits update event when widgetData changes', async () => {
    const wrapper = mount(WidgetSettingsComponent, {
      props: { data: mockData },
    })

    // Update linked property
    const checkbox = wrapper.findComponent(CheckboxComponent)
    await checkbox.vm.$emit('update:modelValue', true)
    expect(wrapper.emitted('update')).toBeTruthy()
    expect((wrapper.emitted('update')?.[0]?.[0] as WidgetInterface).linked).toBe(true)

    // Update selectedColor property
    const colorSwitch = wrapper.findComponent(ColorSwitchComponent)
    await colorSwitch.vm.$emit('update:modelValue', 'blue')
    expect((wrapper.emitted('update')?.[1]?.[0] as WidgetInterface).selectedColor).toBe('blue')

    // Update active property
    const toggle = wrapper.findComponent(ToggleComponent)
    await toggle.vm.$emit('update:modelValue', false)
    expect((wrapper.emitted('update')?.[2]?.[0] as WidgetInterface).active).toBe(false)
  })

  it('renders the TooltipComponent inside CheckboxComponent label slot', async () => {
    const wrapper = mount(WidgetSettingsComponent, {
      props: { data: mockData },
    })

    const checkbox = wrapper.findComponent(CheckboxComponent)
    const tooltip = checkbox.findComponent(TooltipComponent)

    expect(tooltip.exists()).toBe(true)
    await tooltip.setData({ isVisible: true })
    expect(tooltip.text()).toContain('This widget links directly to')
  })
})
