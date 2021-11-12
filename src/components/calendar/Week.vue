<template>
  <v-row align="stretch" align-content="stretch" justify="center">
    <v-col v-for="day in days" :key="day.getDay()" cols="12" lg="3" md="4" sm="6">
      <DayCard :day="day" :entries="entries.filter(entry => entry.date.getTime() === day.getTime())"/>
    </v-col>
  </v-row>
</template>

<script>
import DayCard from '@/components/calendar/DayCard'

export default {
  name: "Week",
  components: {DayCard},
  props: {
    day: Date,
    days: Array,
    entries: Array,
  },
}
</script>

<style>

</style>