import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import OktaVue from '@okta/okta-vue'
import {oktaAuth} from '@/okta'

Vue.config.productionTip = false
Vue.use(OktaVue, {
    oktaAuth,
    onAuthRequired: () => router.push('/login'),
})

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')
