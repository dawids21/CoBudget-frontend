<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title>
        Add entry
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-radio-group v-model="type" mandatory row>
            <v-radio color="secondary" label="Expense" value="expense"/>
            <v-radio color="primary" label="Income" value="income"/>
          </v-radio-group>
          <v-text-field v-model="amount" label="Amount" type="number"/>
          <v-text-field v-model="date" label="Date" type="date"/>
          <v-select v-model="category" :items="categories" item-text="name" item-value="id" label="Category"/>
          <v-text-field v-model="subcategory" label="Subcategory"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click.stop="show = false">Close</v-btn>
        <v-spacer/>
        <v-btn color="primary" type="submit" @click="addEntry">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axiosInstance from '@/config/axios'

export default {
  name: "AddEntryDialog",
  props: {
    value: Boolean,
  },
  data() {
    return {
      categories: [],
      type: "expense",
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      category: null,
      subcategory: "",
    }
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
  methods: {
    getEntry() {
      return {
        amount: this.type === 'expense' ? -Math.abs(this.amount) : Math.abs(this.amount),
        date: this.date,
        categoryId: this.category,
        subcategory: this.subcategory,
      }
    },
    async addEntry() {

      const entry = this.getEntry()
      await axiosInstance.post('/api/entry', entry)
      this.show = false
    },
  },
  mounted: async function () {
    const response = await axiosInstance.get("/api/category")
    this.categories = response.data
  },
}
</script>

<style>

</style>