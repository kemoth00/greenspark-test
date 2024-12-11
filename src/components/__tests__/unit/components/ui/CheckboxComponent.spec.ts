import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CheckboxComponent from '@/components/ui/CheckboxComponent.vue'
import SvgIcon from '@/components/essentials/SvgIcon.vue'

describe('CheckboxComponent', () => {
  it('renders the component correctly with the given props', () => {
    const wrapper = mount(CheckboxComponent, {
      props: {
        name: 'test-checkbox',
        modelValue: false,
      },
      global: {
        components: { SvgIcon },
      },
    })

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('label').attributes('for')).toBe('test-checkbox')
  })

  it('binds the modelValue to the checkbox state', async () => {
    const wrapper = mount(CheckboxComponent, {
      props: {
        name: 'test-checkbox',
        modelValue: true,
      },
      global: {
        components: { SvgIcon },
      },
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)

    await wrapper.setProps({ modelValue: false })
    expect((input.element as HTMLInputElement).checked).toBe(false)
  })

  it('emits update:modelValue with the correct value on change', async () => {
    const wrapper = mount(CheckboxComponent, {
      props: {
        name: 'test-checkbox',
        modelValue: false,
      },
      global: {
        components: { SvgIcon },
      },
    })

    const input = wrapper.find('input[type="checkbox"]')

    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted && emitted[0]).toEqual([true])

    await input.setValue(false)
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
    const emittedUpdateModelValue = wrapper.emitted('update:modelValue')
    expect(emittedUpdateModelValue && emittedUpdateModelValue[1]).toEqual([false])
  })

  it('renders the SvgIcon component when the checkbox is checked', async () => {
    const wrapper = mount(CheckboxComponent, {
      props: {
        name: 'test-checkbox',
        modelValue: false,
      },
      global: {
        components: { SvgIcon },
      },
    })

    expect(wrapper.findComponent(SvgIcon).exists()).toBe(false)

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.findComponent(SvgIcon).exists()).toBe(true)
  })
})
