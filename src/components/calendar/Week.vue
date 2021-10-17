<template>
  <v-row justify="center" align="stretch" align-content="stretch">
    <v-col v-for="day in days" :key="day.getDay()" cols="12" sm="6" md="4" lg="3">
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
    entries: Array,
  },
  computed: {
    days() {
      const start = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() - (this.day.getDay() + 6) % 7)
      return [0, 1, 2, 3, 4, 5, 6].map(n => {
        const clone = new Date(start.getTime())
        clone.setDate(clone.getDate() + n)
        return clone
      })
    },
  },
}
</script>

<style>

</style>