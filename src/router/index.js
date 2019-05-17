import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/HomePage'
import Face from '@/components/Face'
import Example from '@/components/Example'


Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        }, {
            path: '/face/',
            name: 'Face',
            component: Face
        }, {
            path: '/example/',
            name: 'Example',
            component: Example
        }

    ]
})
