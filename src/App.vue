<template>
  <v-app>
    <TopNav/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app>

    </v-footer>
  </v-app>
</template>

<script>
import TopNav from '@/components/TopNav'

export default {
  name: 'App',
  components: {TopNav},
  watch: {
    '$route': {
      handler: (to) => document.title = to.meta.title || 'CoBudget',
      immediate: true,
    },
  },
}
</script>

<style>
html, body {
  overflow-y: auto !important;
}
</style>