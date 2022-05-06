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
      return "May 2022"
    }
  }
}
</script>

<style>

</style>