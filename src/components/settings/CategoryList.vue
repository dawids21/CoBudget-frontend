<template>
  <v-list>
    <v-list-group v-for="category in categories" :key="category.id" no-action prepend-icon="mdi-circle-medium">
      <template v-slot:activator>
        <v-list-item-title class="text-h6" v-text="category.name"></v-list-item-title>
      </template>
      <v-list-item v-for="subcategory in category.subcategories" :key="subcategory.id">
        <v-list-item-title class="text-subtitle-1" v-text="subcategory.name"></v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <v-text-field v-model="newSubcategory" label="Add subcategory"
                        @focusout="newSubcategory = null" @keyup.enter="addSubcategory(category.id)"></v-text-field>
        </v-list-item-title>
      </v-list-item>
    </v-list-group>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-plus</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        <v-text-field v-model="newCategory" label="Add category" @keyup.enter="addCategory"></v-text-field>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "CategoryList",
  data() {
    return {
      categories: this.getCategories(),
      newCategory: null,
      newSubcategory: null,
    }
  },
  methods: {
    addCategory() {
      if (!this.newCategory) {
        return
      }
      console.log(`name: ${this.newCategory}`)
      this.newCategory = null
      this.getCategories()
    },
    addSubcategory(parentId) {
      if (!this.newSubcategory) {
        return
      }
      console.log(`name: ${this.newSubcategory}, parentId: ${parentId}`)
      this.newSubcategory = null
      this.getCategories()
    },
    getCategories() {
      return [
        {
          id: 1,
          name: 'Food',
          subcategories: [
            {
              id: 3,
              name: 'Home',
            },
            {
              id: 4,
              name: 'Work',
            },
          ],
        },
        {
          id: 2,
          name: 'Clothes',
          subcategories: [
            {
              id: 5,
              name: 'Shirts',
            },
            {
              id: 6,
              name: 'Shoes',
            },
          ],
        },
      ]
    },


  },
}
</script>

<style>

</style>