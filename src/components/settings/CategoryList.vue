<template>
  <v-list>
    <v-list-group v-for="category in categories" :key="category.id" no-action prepend-icon="mdi-circle-medium">
      <template v-slot:activator>
        <v-list-item-title class="text-h6" v-text="category.name"></v-list-item-title>
      </template>
      <v-list-item v-for="subcategory in category.subcategories" :key="subcategory.id">
        <v-list-item-title class="text-subtitle-1" v-text="subcategory.name"></v-list-item-title>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  name: "CategoryList",
  data() {
    return {
      categories: [
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
      ],
    }
  },
}
</script>

<style>

</style>