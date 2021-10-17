<template>
  <v-sheet style="height: 100%" elevation="4" rounded>
    <v-container class="d-flex flex-column justify-center align-center">
      <div class="rounded-pill primary white--text pa-2">{{ day.getDate() }}</div>
      <h3 class="primary--text text--darken-2 my-2">{{ dayNames[day.getDay()] }}</h3>
      <Entry v-for="entry in entries" :key="entry.id" :data="entry"/>
    </v-container>
  </v-sheet>
</template>

<script>
import Entry from '@/components/calendar/Entry'

export default {
  name: "DayCard",
  components: {Entry},
  props: {
    day: Date,
    entries: Array,
  },
  data() {
    return {
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }
  },
}
</script>