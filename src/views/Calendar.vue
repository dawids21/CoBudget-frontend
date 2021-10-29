<template>
  <v-container fluid>
    <Week :day="new Date()"/>
  </v-container>
</template>

<script>
import Week from '@/components/calendar/Week'

export default {
  name: "Calendar",
  components: {Week},
}
</script>

<style>

</style>