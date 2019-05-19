import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/HomePage'
import Face from '@/components/Face'
import Example from '@/components/Example'
import Compare from '@/components/face/Compare'
import Detail from '@/components/face/Detail'


Vue.use(Router);

export default new Router({
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
        }, {
            path: '/compare/',
            name: 'Compare',
            component: Compare
        }, {
            path: '/detail/',
            name: 'Detail',
            component: Detail
        }

    ]
})
