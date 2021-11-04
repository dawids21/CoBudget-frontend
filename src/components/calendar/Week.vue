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
import axiosInstance from '@/config'

function getStartDate(day) {
  return new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate() - (day.getDay() + 6) % 7))
}

async function getEntries() {
  const end = new Date(this.start.getTime())
  end.setDate(this.start.getDate() + 6)
  const response = await axiosInstance.get('/api/entry', {
    params: {
      from: this.start.toISOString().split('T')[0],
      to: end.toISOString().split('T')[0],
    },
  })
  return response.data.map(item => {
    return {
      amount: item.amount,
      date: new Date(item.date),
      category: item.category ?? "Unknown",
      subcategory: item.subcategory,
    }
  })
}

export default {
  name: "Week",
  components: {DayCard},
  props: {
    day: Date,
  },
  data() {
    return {
      start: getStartDate(this.day),
      entries: [],
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
  },
  mounted: async function () {
    this.entries = await getEntries.call(this)
  },
}
</script>

<style>

</style>