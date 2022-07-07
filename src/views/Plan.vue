<template>
  <div class="d-flex flex-column align-center justify-start" style="height: 100%">
    <MonthAndYear :date="start"/>
    <ChangeWeek :next-callback="nextMonth" :previous-callback="previousMonth" class="ma-3"/>
    <NotPlannedInfo :month="monthName"/>
  </div>
</template>

<script>
import ChangeWeek from '@/components/calendar/ChangeWeek'
import MonthAndYear from '@/components/calendar/MonthAndYear'
import NotPlannedInfo from '@/components/plan/NotPlannedInfo'

export default {
  name: "Plan",
  components: {NotPlannedInfo, MonthAndYear, ChangeWeek},
  data() {
    return {
      start: this.getStartDate(new Date()),
    }
  },

  computed: {
    monthName() {
      return this.start.toLocaleDateString('default', {month: 'long'})
    },
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

