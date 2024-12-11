import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TooltipComponent from '@/components/ui/TooltipComponent.vue'

describe('TooltipComponent', () => {
  it('shows the tooltip on mouseenter and hides it on mouseleave', async () => {
    const wrapper = mount(TooltipComponent, {
      global: {
        stubs: ['SvgIcon'],
      },
    })

    const tooltip = wrapper.find('div.relative')
    expect(wrapper.find('.absolute').exists()).toBe(false)

    await tooltip.trigger('mouseenter')
    expect(wrapper.find('.absolute').exists()).toBe(true)

    await tooltip.trigger('mouseleave')
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(wrapper.find('.absolute').exists()).toBe(false)
  })

  it('cancels hiding the tooltip when mouseenter on tooltip itself', async () => {
    const wrapper = mount(TooltipComponent, {
      global: {
        stubs: ['SvgIcon'],
      },
    })

    const tooltipTrigger = wrapper.find('div.relative')

    await tooltipTrigger.trigger('mouseenter')
    const tooltipContent = wrapper.find('.absolute')
    expect(tooltipContent.exists()).toBe(true)

    await tooltipContent.trigger('mouseenter')
    expect(wrapper.vm.isVisible).toBe(true)

    await tooltipContent.trigger('mouseleave')
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(wrapper.vm.isVisible).toBe(false)
  })
})
