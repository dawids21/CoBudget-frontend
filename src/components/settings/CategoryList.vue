<template>
  <v-list>
    <v-list-group v-for="category in categories" :key="category.id" no-action prepend-icon="mdi-circle-medium">
      <template v-slot:activator>
        <v-list-item-title class="text-subtitle-1" v-text="category.name"></v-list-item-title>
        <v-list-item-action>
          <v-btn icon @click.stop="deleteCategory(category.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
      <v-list-item v-for="subcategory in category.subcategories" :key="subcategory.id">
        <v-list-item-title class="text-subtitle-2" v-text="subcategory.name"></v-list-item-title>
        <v-list-item-action>
          <v-btn icon @click="deleteCategory(subcategory.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
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
import axiosInstance from '@/config/axios'

export default {
  name: "CategoryList",
  data() {
    return {
      categories: [],
      newCategory: null,
      newSubcategory: null,
    }
  },
  methods: {
    async addCategory() {
      if (!this.newCategory) {
        return
      }
      const category = {
        name: this.newCategory,
        parentId: null,
      }
      await axiosInstance.post('/api/category', category)
      this.newCategory = null
      this.categories = await this.getCategories()
    },
    async addSubcategory(parentId) {
      if (!this.newSubcategory) {
        return
      }
      const category = {
        name: this.newSubcategory,
        parentId,
      }
      await axiosInstance.post('/api/category', category)
      this.newSubcategory = null
      this.categories = await this.getCategories()
    },
    async getCategories() {
      const response = await axiosInstance.get('/api/category/all')
      return response.data
    },
    async deleteCategory(categoryId) {
      const response = await axiosInstance.delete(`/api/category/${categoryId}`)
      if (response.status !== 204) {
        return
      }
      this.categories = await this.getCategories()
    },
  },
  async mounted() {
    this.categories = await this.getCategories()
  },
}
</script>

<style>

</style>