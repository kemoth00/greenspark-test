<template>
  <div class="flex items-center justify-between">
    <label :for="name" class="text-sm text-text w-full">
      <slot name="label" />
    </label>
    <div
      class="flex justify-between items-center cursor-pointer"
      @click="handleChange(!modelValue)"
    >
      <div
        class="w-11 h-[1.3rem] flex items-center rounded-full duration-300 ease-in-out shadow-[inset_0_1px_7px_rgba(0,0,0,0.15)]"
        :class="{
          'bg-greenC toggle-checked': modelValue,
          'bg-whiteC toggle-unchecked': !modelValue,
        }"
      >
        <div
          class="relative group bg-whiteC w-6 h-6 -ml-1 rounded-full shadow transform duration-300 ease-in-out border hover:shadow-[0_0_0_6.5px_rgba(var(--checkbox-hover-rgba),0.5)]"
          :class="{
            'translate-x-7 border-greenC': modelValue,
            'border-toggleCircleBorder': !modelValue,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ToggleComponent',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleChange(test: boolean) {
      this.$emit('update:modelValue', test)
    },
  },
}
</script>
