<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <MonthAndYear :date="start"/>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <ChangeWeek :next-callback="nextMonth" :previous-callback="previousMonth"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChangeWeek from '@/components/calendar/ChangeWeek'
import MonthAndYear from '@/components/calendar/MonthAndYear'

export default {
  name: "Plan",
  components: {MonthAndYear, ChangeWeek},
  data() {
    return {
      start: this.getStartDate(new Date()),
    }
  },

  methods: {
    getStartDate(day) {
      return new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate() - (day.getDay() + 6) % 7))
    },

    async previousMonth() {
      const result = new Date(this.start.getTime())
      result.setMonth(result.getMonth() - 1)
      this.start = this.getStartDate(result)
    },

    async nextMonth() {
      const result = new Date(this.start.getTime())
      result.setMonth(result.getMonth() + 1)
      this.start = this.getStartDate(result)
    },
  },
}
</script>

<style>

</style>