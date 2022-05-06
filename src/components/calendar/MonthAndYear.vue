<template>
<div>
  <p>{{this.toDisplay}}</p>
</div>
</template>

<script>
export default {
  name: "MonthAndYear",
  props: {
    date: Date
  },
  computed: {
    toDisplay() {
      return this.date.toLocaleDateString('default', {month: 'long', year: 'numeric'})
    }
  }
}
</script>

<style>

</style>