<template>
  <component :is="dynamicComponent" />
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    dynamicComponent() {
      const { name } = this
      return defineAsyncComponent({
        loader: () => import(`@/assets/icons/${name}.vue`),
        onError: (error) => {
          console.error(`Error loading icon "${name}":`, error)
        },
      })
    },
  },
}
</script>
