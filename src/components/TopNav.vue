<template>
  <div>
    <v-navigation-drawer v-model="drawer" app fixed left temporary>
      <v-list>
        <v-list-item v-for="item in items" v-if="authState.isAuthenticated === item.requiresAuth" :key="item.title"
                     :to="{name: item.linkName}" exact link>
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="authState.isAuthenticated" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon class="white--text hidden-sm-and-up" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <Logo/>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in items" v-if="authState.isAuthenticated === item.requiresAuth" :key="item.title"
               :to="{name: item.linkName}" color="white"
               text>
          <v-icon left>mdi-{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="authState.isAuthenticated" color="white" text @click="logout">
          <v-icon left>mdi-logout</v-icon>
          Logout
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
        {title: 'Calendar', linkName: 'calendar', icon: 'calendar', requiresAuth: true},
        {title: 'Settings', linkName: 'settings', icon: 'cog-outline', requiresAuth: true},
        {title: 'Login', linkName: 'login', icon: 'login', requiresAuth: false},
      ],
    }
  },
  methods: {
    async logout() {
      await this.$auth.signOut()
    },
  },
}
</script>

<style>

</style>