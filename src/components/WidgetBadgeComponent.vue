<template>
  <div
    class="min-w-fit flex items-center gap-3 p-3 rounded-md text-nowrap"
    :class="`bg-${data.selectedColor}C text-${data.selectedColor}Text`"
  >
    <SvgIcon name="GreensparkLogo" class="min-w-10 w-10" />

    <div class="flex flex-col">
      <span class="text-xs">This product collects</span>
      <span class="font-bold text-lg">
        {{ data.amount }}
        {{ dataTypeToText }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import type { WidgetInterface } from '@/interfaces/WidgetInterface'

export default {
  name: 'WidgetBadgeComponent',
  props: {
    data: {
      type: Object as () => WidgetInterface,
      required: true,
    },
  },
  computed: {
    dataTypeToText() {
      const pluralize = (count: number, singular: string, plural: string) =>
        count === 1 ? singular : plural

      switch (this.data.type) {
        case 'plastic':
          return pluralize(this.data.amount, 'plastic bottle', 'plastic bottles')
        case 'carbon':
          return pluralize(this.data.amount, 'kg of carbon', 'kgs of carbon')
        case 'trees':
          return pluralize(this.data.amount, 'tree', 'trees')
        default:
          return this.data.type
      }
    },
  },
}
</script>
