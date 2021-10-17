<template>
  <h1 class="logo white--text" @click="$router.push({name: 'home'})">CoBudget</h1>
</template>

<script>
export default {
  name: "Logo",
}
</script>

<style>
.logo {
  font-family: 'Courgette', cursive;
  cursor: pointer;
  user-select: none;
}
</style>