<template>
  <div>
    <v-container fluid>
      <Week :day="new Date()"/>
    </v-container>

    <v-btn
        class="ma-4"
        color="primary"
        fab
        large
        fixed
        bottom
        right
        @click.stop="openAddEntryDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Week from '@/components/calendar/Week'

export default {
  name: "Calendar",
  components: {Week},

  methods: {
    openAddEntryDialog() {
      console.log("open")
    },
  },
}
</script>

<style>

</style>