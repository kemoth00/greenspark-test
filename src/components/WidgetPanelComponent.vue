<template>
  <section
    v-if="widgets.length"
    class="min-w-fit w-full sm:w-4/5 lg:w-3/5 bg-background p-9 rounded-lg shadow-2xl flex flex-col items-center gap-5"
  >
    <h1
      class="w-full font-bold text-3xl text-title border-b-2 border-divider pb-3 text-center lg:text-start"
    >
      Per product widgets
    </h1>

    <section class="grid lg:grid-cols-3 grid-cols-1 w-full gap-14">
      <WidgetComponent
        v-for="widget in widgets"
        :key="widget.id"
        :data="widget"
        @update="updateWidget"
        @update-active="updateActive"
      />
    </section>
  </section>

  <SvgIcon v-else name="LoaderIcon" />
</template>

<script lang="ts">
import type { WidgetInterface } from '@/interfaces/WidgetInterface'
import axios from 'axios'

export default {
  name: 'WidgetPanelComponent',
  data() {
    return {
      widgets: [] as WidgetInterface[],
    }
  },
  mounted() {
    if (localStorage.getItem('widgets')) {
      this.widgets = JSON.parse(localStorage.getItem('widgets') as string)
    } else {
      this.setInitialData()
    }
  },
  methods: {
    setInitialData() {
      axios
        .get(import.meta.env.VITE_BASE_URL + '/product-widgets')
        .then((response) => {
          this.widgets = response.data
          localStorage.setItem('widgets', JSON.stringify(this.widgets))
        })
        .catch((error) => {
          console.error(error)
        })
    },
    updateWidget(updatedWidget: WidgetInterface) {
      this.widgets = this.widgets.map((widget) => {
        if (widget.id === updatedWidget.id) {
          return updatedWidget
        }

        return widget
      })

      // Here we can send the updated widget or all the widgets to the server with an API call, but for now, we will just save it in the localStorage.
      localStorage.setItem('widgets', JSON.stringify(this.widgets))
    },
    updateActive(updatedWidget: WidgetInterface) {
      if (updatedWidget.active) {
        this.widgets.forEach((widget) => {
          if (widget.id !== updatedWidget.id) {
            widget.active = false
          }
        })
      }
    },
  },
}
</script>
