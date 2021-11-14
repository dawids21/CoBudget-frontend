<template>
  <v-sheet color="white" class="entry my-2" elevation="6" rounded>
    <v-container class="d-flex justify-space-around align-center">
      <span class="text-h6 text-center"
            :class="{'primary--text': data.amount > 0, 'secondary--text': data.amount <= 0}">{{
          data.amount
        }}$</span>
      <span class="text-center">{{ data.category }}</span>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "Entry",
  props: {
    data: Object,
  },
}
</script>

<style>

.entry {
  width: 100%;
}

</style>