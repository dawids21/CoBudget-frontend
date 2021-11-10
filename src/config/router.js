import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Calendar from '@/views/Calendar'
import Login from '@/views/Login'
import {LoginCallback} from '@okta/okta-vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {title: 'CoBudget'},
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: Calendar,
        meta: {
            requiresAuth: true,
            title: 'Calendar - CoBudget',
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {title: 'Login - CoBudget'},
    },
    {
        path: '/login/callback',
        name: 'loginCallback',
        component: LoginCallback,
        meta: {title: 'Login - CoBudget'},
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
