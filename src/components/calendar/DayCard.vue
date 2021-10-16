<template>
  <v-sheet elevation="4" rounded>
    <v-container class="d-flex flex-column justify-center align-center">
      <div class="rounded-pill primary white--text pa-2">1</div>
      <h3 class="primary--text text--darken-2 my-2">Monday</h3>
      <Entry/>
      <Entry/>
    </v-container>
  </v-sheet>
</template>

<script>
import Entry from '@/components/calendar/Entry'

export default {
  name: "DayCard",
  components: {Entry},
}
</script>