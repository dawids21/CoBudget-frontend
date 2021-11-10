// noinspection JSUnusedGlobalSymbols

import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import vuetify from './config/vuetify'
import OktaVue from '@okta/okta-vue'
import {oktaAuth} from '@/config/okta'

Vue.config.productionTip = false
Vue.use(OktaVue, {
    oktaAuth,
    onAuthRequired: () => router.push({name: 'login'}),
})

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')
