<template>
  <div class="flex flex-col gap-3">
    <WidgetBadgeComponent :data="widgetData" />
    <WidgetSettingsComponent :data="widgetData" @update="updateWidget" />
  </div>
</template>

<script lang="ts">
import type { WidgetInterface } from '@/interfaces/WidgetInterface'

export default {
  name: 'WidgetComponent',
  props: {
    data: {
      type: Object as () => WidgetInterface,
      required: true,
    },
  },
  emits: ['update', 'updateActive'],
  data() {
    return {
      widgetData: this.data as WidgetInterface,
    }
  },
  methods: {
    updateWidget(updatedWidget: WidgetInterface) {
      this.$emit('update', updatedWidget)

      if (this.widgetData.active) {
        this.$emit('updateActive', updatedWidget)
      }
    },
  },
}
</script>
