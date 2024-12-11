import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WidgetPanelComponent from '@/components/WidgetPanelComponent.vue'
import WidgetComponent from '@/components/WidgetComponent.vue'
import SvgIcon from '@/components/essentials/SvgIcon.vue'
import type { WidgetInterface } from '@/interfaces/WidgetInterface'

// Mock data for testing
const mockWidgets = [
  {
    id: 1,
    type: 'carbon',
    amount: 10,
    action: 'offsets',
    active: true,
    linked: false,
    selectedColor: 'green',
  },
  {
    id: 2,
    type: 'plastic',
    amount: 5,
    action: 'collects',
    active: false,
    linked: true,
    selectedColor: 'blue',
  },
] as WidgetInterface[]

describe('WidgetPanelComponent', () => {
  it('renders the loader icon when widgets list is empty', () => {
    const wrapper = mount(WidgetPanelComponent, {
      data() {
        return { widgets: [] }
      },
    })

    const loaderIcon = wrapper.findComponent(SvgIcon)
    expect(loaderIcon.exists()).toBe(true)
    expect(loaderIcon.props('name')).toBe('LoaderIcon')
  })

  it('renders the widgets when the list is populated', () => {
    const wrapper = mount(WidgetPanelComponent, {
      data() {
        return { widgets: mockWidgets }
      },
    })

    const widgetComponents = wrapper.findAllComponents(WidgetComponent)
    expect(widgetComponents.length).toBe(mockWidgets.length)

    widgetComponents.forEach((widget, index) => {
      expect(widget.props('data')).toEqual(mockWidgets[index])
    })
  })

  it('calls updateWidget method when update event is emitted by a WidgetComponent', async () => {
    const wrapper = mount(WidgetPanelComponent, {
      data() {
        return { widgets: mockWidgets }
      },
    })

    const updatedWidget = { ...mockWidgets[0], amount: 20 }
    const widgetComponent = wrapper.findComponent(WidgetComponent)

    await widgetComponent.vm.$emit('update', updatedWidget)

    expect(wrapper.vm.widgets[0].amount).toBe(20)
    expect(localStorage.getItem('widgets')).toContain(JSON.stringify(wrapper.vm.widgets))
  })

  it('calls updateActive method when update-active event is emitted by a WidgetComponent', async () => {
    const wrapper = mount(WidgetPanelComponent, {
      data() {
        return { widgets: mockWidgets }
      },
    })

    const updatedWidget = { ...mockWidgets[0], active: true }
    const widgetComponent = wrapper.findComponent(WidgetComponent)

    await widgetComponent.vm.$emit('update-active', updatedWidget)

    wrapper.vm.widgets.forEach((widget) => {
      if (widget.id !== updatedWidget.id) {
        expect(widget.active).toBe(false)
      }
    })
  })
})
