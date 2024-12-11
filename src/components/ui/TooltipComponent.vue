<template>
  <div
    class="relative w-fit h-fit"
    @mouseleave="hideTooltip"
    @mouseenter="showTooltip"
    @click.prevent
  >
    <SvgIcon name="IconInfo" class="min-w-3 w-3" />

    <transition name="fade" appear>
      <div
        v-if="isVisible"
        class="absolute bottom-6 -right-28 w-60 bg-whiteC rounded shadow-lg py-6 px-4"
        @mouseenter="cancelHideTooltip"
        @mouseleave="hideTooltip"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TooltipComponent',
  data() {
    return {
      isVisible: false as boolean,
      hideTimeout: null as number | null,
    }
  },
  methods: {
    showTooltip() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
        this.hideTimeout = null
      }
      this.isVisible = true
    },
    hideTooltip() {
      this.hideTimeout = window.setTimeout(() => {
        this.isVisible = false
      }, 200)
    },
    cancelHideTooltip() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
        this.hideTimeout = null
      }
    },
  },
}
</script>
