<template>
  <v-container fluid>
    <Week :day="new Date()" :days="days" :entries="entries"/>
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
    <AddEntryDialog v-model="showDialog" @add-entry="refreshEntries"/>
  </v-container>
</template>

<script>
import Week from '@/components/calendar/Week'
import AddEntryDialog from '@/components/calendar/AddEntryDialog'
import axiosInstance from '@/config/axios'

export default {
  name: "Calendar",
  components: {AddEntryDialog, Week},
  data() {
    return {
      showDialog: false,
      start: this.getStartDate(new Date()),
      entries: [],
    }
  },

  computed: {
    days() {
      return [0, 1, 2, 3, 4, 5, 6].map(n => {
        const clone = new Date(this.start.getTime())
        clone.setDate(clone.getDate() + n)
        return clone
      })
    },
  },

  methods: {
    openAddEntryDialog() {
      this.showDialog = true
    },

    getStartDate(day) {
      return new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate() - (day.getDay() + 6) % 7))
    },

    async getEntries() {
      const end = new Date(this.start.getTime())
      end.setDate(this.start.getDate() + 6)
      const response = await axiosInstance.get('/api/entry', {
        params: {
          from: this.start.toISOString().split('T')[0],
          to: end.toISOString().split('T')[0],
        },
      })
      return response.data.map(item => {
        return {
          amount: item.amount,
          date: new Date(item.date),
          category: item.category !== null ? `${item.category} - ${item.subcategory}` : item.subcategory,
        }
      })
    },

    async refreshEntries() {
      this.entries = await this.getEntries()
    },
  },
  mounted: async function () {
    this.entries = await this.getEntries()
  },
}
</script>

<style>

</style>