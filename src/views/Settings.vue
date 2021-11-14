<template>
  <v-container fluid>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6">Categories</v-expansion-panel-header>
        <v-expansion-panel-content>
          <CategoryList/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import CategoryList from '@/components/settings/CategoryList'

export default {
  name: "Settings",
  components: {CategoryList},
}
</script>

<style>

</style>