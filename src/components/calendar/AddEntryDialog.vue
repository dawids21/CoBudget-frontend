<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title>
        Add entry
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-radio-group v-model="type" mandatory row>
            <v-radio color="secondary" label="Expense" value="expense"/>
            <v-radio color="primary" label="Income" value="income"/>
          </v-radio-group>
          <v-text-field v-model="amount" :rules="rules.amountRules" label="Amount" required type="number"/>
          <v-text-field v-model="date" label="Date" type="date"/>
          <v-select v-model="category" :items="categories" :rules="[v => !!v || 'Category is required']"
                    item-text="name" item-value="id"
                    label="Category" @change="getSubcategories"/>
          <v-select v-model="subcategory" :items="subcategories" :rules="[v => !!v || 'Subcategory is required']"
                    item-text="name" item-value="id"
                    label="Subcategory"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click.stop="show = false">Close</v-btn>
        <v-spacer/>
        <v-btn :disabled="!valid" color="primary" type="submit" @click="addEntry">Add</v-btn>
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
    showSnackbar: Function,
  },
  data() {
    return {
      valid: true,
      rules: {
        amountRules: [v => !!v || 'Amount is required', v => v > 0 || 'Amount must be greater than 0'],
      },
      categories: [],
      subcategories: [],
      type: "expense",
      amount: null,
      date: new Date().toISOString().split('T')[0],
      category: null,
      subcategory: null,
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
        categoryId: this.subcategory ?? this.category,
      }
    },
    async addEntry() {
      if (!this.$refs.form.validate()) {
        return
      }
      const entry = this.getEntry()
      try {
        await axiosInstance.post('/api/entry', entry)
        this.$emit('add-entry')
        this.showSnackbar("Added entry", "primary")
      } catch (e) {
        this.showSnackbar("Problem with adding entry", "secondary darken-1")
      }
      this.show = false
    },
    async getSubcategories() {
      this.subcategory = null
      const response = await axiosInstance.get(`/api/category/${this.category}/subcategory`)
      this.subcategories = response.data
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