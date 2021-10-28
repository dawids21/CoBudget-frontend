<template>
  <v-container fluid>
    <Week v-if="entries.length !== 0" :day="new Date()" :entries="entries"/>
    <h3 v-else>Loading...</h3>
  </v-container>
</template>

<script>
import Week from '@/components/calendar/Week'

export default {
  name: "Calendar",
  components: {Week},
  data() {
    return {
      entries: [],
    }
  },
}
</script>

<style>

</style>