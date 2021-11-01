<template>
  <v-container fluid>
    <Week :day="new Date()"/>
    <v-btn
        class="ma-4"
        color="primary"
        fab
        elevation="4"
        large
        fixed
        bottom
        right
        @click.stop="openAddEntryDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <AddEntryDialog v-model="showDialog"/>
  </v-container>
</template>

<script>
import Week from '@/components/calendar/Week'
import AddEntryDialog from '@/components/calendar/AddEntryDialog'

export default {
  name: "Calendar",
  components: {AddEntryDialog, Week},
  data() {
    return {
      showDialog: false,
    }
  },

  methods: {
    openAddEntryDialog() {
      this.showDialog = true
    },
  },
}
</script>

<style>

</style>