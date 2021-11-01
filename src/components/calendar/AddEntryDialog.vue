<template>
  <v-dialog v-model="show">
    Add entry
  </v-dialog>
</template>

<script>
export default {
  name: "AddEntryDialog",
  props: {
    show: Boolean,
  },
}
</script>

<style>

</style>