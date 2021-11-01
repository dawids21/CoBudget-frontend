<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title>
        Add entry
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-radio-group v-model="type" row mandatory>
            <v-radio label="Expense" color="secondary" value="expense"/>
            <v-radio label="Income" color="primary" value="income"/>
          </v-radio-group>
          <v-text-field v-model="amount" type="number" label="Amount"/>
          <v-text-field v-model="date" type="date" label="Date"/>
          <v-select v-model="category" :items="categories" item-value="id" item-text="name" label="Category"/>
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
import axios from 'axios'

export default {
  name: "AddEntryDialog",
  props: {
    value: Boolean,
  },
  data() {
    return {
      categories: [
        {id: 1, name: "Food"},
        {id: 2, name: "Clothes"},
        {id: 3, name: "House"},
      ],
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
    async addEntry() {
      const accessToken = this.$auth.getAccessToken()
      await axios.post(
          'http://localhost:8081/api/entry',
          {
            amount: this.type === 'expense' ? -Math.abs(this.amount) : Math.abs(this.amount),
            date: this.date,
            categoryId: this.category,
            subcategory: this.subcategory,
          },
          {headers: {Authorization: `Bearer ${accessToken}`}},
      )
      this.show = false
    },
  },
}
</script>

<style>

</style>