<template>
  <div class="flex flex-col gap-3 text-greenC text-sm">
    <CheckboxComponent v-model="widgetData.linked" :name="`checkbox-${widgetData.id}`">
      <template #label>
        <div class="flex gap-0.5">
          <span>Link to Public Profile</span>

          <TooltipComponent>
            <template #content>
              <article class="flex flex-col items-center justify-center text-center gap-3">
                <p class="text-black cursor-text">
                  This widget links directly to your public profile so that you can easily share
                  your impact with your customers. Turn it off here if you do not want the badge to
                  link to it.
                </p>

                <a
                  class="font-bold text-greenC"
                  href="https://example.com/"
                  target="_blank"
                  @click.stop
                >
                  View Public Profile
                </a>
              </article>
            </template>
          </TooltipComponent>
        </div>
      </template>
    </CheckboxComponent>

    <ColorSwitchComponent v-model="widgetData.selectedColor" :name="`radio-${widgetData.id}`">
      <template #label>
        <span>Badge colour</span>
      </template>
    </ColorSwitchComponent>

    <ToggleComponent v-model="widgetData.active" :name="`toggle-${widgetData.id}`">
      <template #label>
        <span>Activate badge</span>
      </template>
    </ToggleComponent>
  </div>
</template>

<script lang="ts">
import type { WidgetInterface } from '@/interfaces/WidgetInterface'

export default {
  name: 'WidgetSettingsComponent',
  props: {
    data: {
      type: Object as () => WidgetInterface,
      required: true,
    },
  },
  emits: ['update'],
  data() {
    return {
      widgetData: this.data as WidgetInterface,
    }
  },
  watch: {
    widgetData: {
      deep: true,
      handler() {
        this.$emit('update', this.widgetData)
      },
    },
  },
}
</script>
