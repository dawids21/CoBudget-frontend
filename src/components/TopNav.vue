<template>
  <div>
    <v-navigation-drawer app v-model="drawer" absolute temporary left>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="{name: item.linkName}" link exact>
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon class="white--text hidden-sm-and-up" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <Logo/>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in items" :key="item.title" color="white" text :to="{name: item.linkName}">
          <v-icon left>mdi-{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  name: "TopNav",
  components: {Logo},
  data() {
    return {
      drawer: false,
      items: [
        {title: 'Calendar', linkName: 'calendar', icon: 'calendar'},
      ],
    }
  },
}
</script>

<style>

</style>