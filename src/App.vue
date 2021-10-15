<template>
  <v-app>
    <TopNav/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
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
}
</script>
