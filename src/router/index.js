import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Calendar from '@/views/Calendar'

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
        meta: {title: 'Calendar - CoBudget'},
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
