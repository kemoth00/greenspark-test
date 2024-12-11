import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ToggleComponent from '@/components/ui/ToggleComponent.vue'

describe('ToggleComponent', () => {
  it('renders the component correctly with the given props', () => {
    const wrapper = mount(ToggleComponent, {
      props: {
        name: 'test-toggle',
        modelValue: false,
      },
    })

    expect(wrapper.find('label').attributes('for')).toBe('test-toggle')
    expect(wrapper.find('.w-11').exists()).toBe(true)
  })

  it('applies the correct classes based on the modelValue', async () => {
    const wrapper = mount(ToggleComponent, {
      props: {
        name: 'test-toggle',
        modelValue: false,
      },
    })

    const toggle = wrapper.find('.w-11')
    expect(toggle.classes()).toContain('bg-whiteC')
    expect(toggle.classes()).toContain('toggle-unchecked')

    await wrapper.setProps({ modelValue: true })
    expect(toggle.classes()).toContain('bg-greenC')
    expect(toggle.classes()).toContain('toggle-checked')
  })

  it('emits update:modelValue with the correct value on click', async () => {
    const wrapper = mount(ToggleComponent, {
      props: {
        name: 'test-toggle',
        modelValue: false,
      },
    })

    const toggleContainer = wrapper.find('.flex.cursor-pointer')

    await toggleContainer.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])

    await wrapper.setProps({ modelValue: true })
    await toggleContainer.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false])
  })
})
