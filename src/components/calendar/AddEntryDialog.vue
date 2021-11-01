<template>
  <v-dialog v-model="show">
    Add entry
  </v-dialog>
</template>

<script>
export default {
  name: "AddEntryDialog",
  props: {
    value: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style>

</style>