<template>
  <div>
    <h3 class="primary--text text--darken-2 mt-2">{{ this.toDisplay }}</h3>
  </div>
</template>

<script>
export default {
  name: "MonthAndYear",
  props: {
    date: Date,
  },
  computed: {
    toDisplay() {
      return this.date.toLocaleDateString('default', {month: 'long', year: 'numeric'})
    },
  },
}
</script>

<style>

</style>