<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="2">
        <DayCard/>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="2">
        <DayCard/>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="2">
        <DayCard/>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="2">
        <DayCard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DayCard from '@/components/calendar/DayCard'

export default {
  name: "Calendar",
  components: {DayCard},
}
</script>

<style>

</style>