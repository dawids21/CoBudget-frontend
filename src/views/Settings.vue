<template>
  <v-container fluid>
    <v-expansion-panels class="hidden-md-and-up">
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6">Categories</v-expansion-panel-header>
        <v-expansion-panel-content>
          <CategoryList/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row class="hidden-sm-and-down" justify="center">
      <v-col lg="4">
        <v-card height="100%">
          <v-card-title>Categories</v-card-title>
          <v-card-text>
            <CategoryList/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4">
        <v-card height="100%">
          <v-card-title>Accounts</v-card-title>
          <v-card-text>Default</v-card-text>
        </v-card>
      </v-col>
    </v-row>
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