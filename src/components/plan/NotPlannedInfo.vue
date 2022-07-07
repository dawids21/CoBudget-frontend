<template>
  <div class="d-flex flex-column justify-center align-center flex-grow-1">
    <h2 class="primary--text text--darken-2">
      {{ month }} is not planned <span class="secondary--text">yet</span>
    </h2>
    <v-btn class="mt-3" color="primary" x-large>Plan</v-btn>
  </div>
</template>
<script>
export default {
  name: 'NotPlannedInfo',
  props: {
    month: String,
  },
}
</script>
