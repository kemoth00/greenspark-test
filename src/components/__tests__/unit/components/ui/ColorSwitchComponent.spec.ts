import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ColorSwitchComponent from '@/components/ui/ColorSwitchComponent.vue'
import { COLORS } from '@/constants/colors'

describe('ColorSwitchComponent', () => {
  it('renders the component with the correct number of radio buttons', () => {
    const wrapper = mount(ColorSwitchComponent, {
      props: {
        name: 'color-switch',
        modelValue: 'green',
      },
      data() {
        return { colors: COLORS }
      },
    })

    const radios = wrapper.findAll('input[type="radio"]')
    expect(radios.length).toBe(COLORS.length)
  })

  it('binds the modelValue to the correct radio button', async () => {
    const wrapper = mount(ColorSwitchComponent, {
      props: {
        name: 'color-switch',
        modelValue: 'green',
      },
      data() {
        return { colors: COLORS }
      },
    })

    const checkedRadio = wrapper.find('input[type="radio"]:checked')
    expect((checkedRadio.element as HTMLInputElement).value).toBe('green')

    await wrapper.setProps({ modelValue: 'blue' })
    const newCheckedRadio = wrapper.find('input[type="radio"]:checked')
    expect((newCheckedRadio.element as HTMLInputElement).value).toBe('blue')
  })

  it('emits update:modelValue when a radio button is selected', async () => {
    const wrapper = mount(ColorSwitchComponent, {
      props: {
        name: 'color-switch',
        modelValue: 'green',
      },
      data() {
        return { colors: COLORS }
      },
    })

    const blueRadio = wrapper.find('input[type="radio"][value="blue"]')
    await blueRadio.setValue()

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    const emittedEvents = wrapper.emitted('update:modelValue')
    expect(emittedEvents).toBeTruthy()
    expect(emittedEvents![0]).toEqual(['blue'])
  })
})
