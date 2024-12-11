<template>
  <div class="flex items-center justify-between">
    <label :for="name" class="text-sm text-text w-full">
      <slot name="label" />
    </label>
    <div class="flex gap-1">
      <input
        v-for="color in colors"
        :id="`${name}-${color}`"
        :key="`${name}-${color}`"
        type="radio"
        class="h-4 w-4 min-w-4 min-h-4 appearance-none cursor-pointer hover:opacity-80 checked:border-2 checked:border-radioSelected"
        :class="`bg-${color}C`"
        :name="name"
        :value="color"
        :checked="modelValue === color"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { COLORS } from '@/constants/colors'

export default {
  name: 'ColorSwitchComponent',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      colors: COLORS,
    }
  },
  methods: {
    handleChange(event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('update:modelValue', target.value)
    },
  },
}
</script>
