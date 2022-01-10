<template>
  <div>
    <v-btn class="mr-2" color="primary" elevation="4" @click="previousCallback">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn class="ml-2" color="primary" elevation="4" @click="nextCallback">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ChangeWeek",
  props: {
    previousCallback: Function,
    nextCallback: Function,
  },
}
</script>

<style>

</style>