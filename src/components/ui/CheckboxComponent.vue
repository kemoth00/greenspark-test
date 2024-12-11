<template>
  <div class="flex items-center justify-between">
    <label :for="name" class="text-sm text-text w-full">
      <slot name="label" />
    </label>
    <div class="relative group">
      <input
        :id="name"
        type="checkbox"
        class="h-5 w-5 min-w-5 min-h-5 appearance-none border-2 border-black rounded-sm checked:bg-greenC checked:border-transparent shrink-0 cursor-pointer"
        :name="name"
        :checked="modelValue"
        @change="handleChange"
      />

      <SvgIcon
        v-if="modelValue"
        class="absolute w-4 h-4 top-0 left-0.5 mt-0.5 pointer-events-none text-white"
        name="IconCheckboxTick"
      />

      <div
        class="absolute -bottom-[0.2rem] -right-2 w-9 h-9 bg-checkboxHover opacity-0 group-hover:opacity-50 rounded-full pointer-events-none transition-opacity duration-200"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CheckboxComponent',
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
    handleChange(event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('update:modelValue', target.checked)
    },
  },
}
</script>
