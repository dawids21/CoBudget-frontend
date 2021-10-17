<template>
  <v-container fluid>
    <Week :day="new Date()" :entries="entries"/>
  </v-container>
</template>

<script>
import Week from '@/components/calendar/Week'

export default {
  name: "Calendar",
  components: {Week},
  data() {
    return {
      entries: [
        {id: 1, amount: -100, date: new Date(2021, 9, 11), category: "Food", subcategory: "Home"},
        {id: 2, amount: -10, date: new Date(2021, 9, 11), category: "Transport", subcategory: "Car"},
        {id: 3, amount: 2000, date: new Date(2021, 9, 13), category: "Income", subcategory: "Work"},
        {id: 4, amount: -210, date: new Date(2021, 9, 12), category: "Clothes", subcategory: "Shoes"},
        {id: 5, amount: -23, date: new Date(2021, 9, 16), category: "Services", subcategory: "Swimming pool"},
      ],
    }
  },
}
</script>

<style>

</style>