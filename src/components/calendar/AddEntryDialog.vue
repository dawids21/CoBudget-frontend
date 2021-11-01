<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title>
        Add entry
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-radio-group row mandatory>
            <v-radio label="Expense" color="secondary" value="expense"/>
            <v-radio label="Income" color="primary" value="income"/>
          </v-radio-group>
          <v-text-field type="number" label="Amount"/>
          <v-text-field type="date" label="Date"/>
          <v-select :items="categories" item-value="id" item-text="name" label="Category"/>
          <v-text-field label="Subcategory"/>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
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
}
</script>

<style>

</style>