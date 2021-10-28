<template>
  <v-row v-if="entries.length !== 0" justify="center" align="stretch" align-content="stretch">
    <v-col v-for="day in days" :key="day.getDay()" cols="12" sm="6" md="4" lg="3">
      <DayCard :day="day" :entries="entries.filter(entry => entry.date.getTime() === day.getTime())"/>
    </v-col>
  </v-row>
  <h3 v-else>Loading...</h3>
</template>

<script>
import DayCard from '@/components/calendar/DayCard'

export default {
  name: "Week",
  components: {DayCard},
  props: {
    day: Date,
  },
  data() {

    function getStartDate() {
      return new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() - (this.day.getDay() + 6) % 7)
    }

    return {
      start: getStartDate.call(this),
    }
  },
  computed: {

    days() {
      return [0, 1, 2, 3, 4, 5, 6].map(n => {
        const clone = new Date(this.start.getTime())
        clone.setDate(clone.getDate() + n)
        return clone
      })
    },

    entries() {
      function getEntries(start) {
        return []
      }

      return getEntries(this.start)
    },
  },
}
</script>

<style>

</style>