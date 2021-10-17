<template>
  <v-row justify="center">
    <v-col v-for="day in days" :key="day.getDay()" cols="12" sm="6" md="4" lg="2">
      <DayCard :day="day"/>
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