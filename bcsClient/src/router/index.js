import Vue from 'vue'
import Router from 'vue-router'

import callCardDetail from '../pages/callingCardDetail.vue'
import callingIndex from '../pages/callingIndex.vue'
import test from '../pages/test'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'cardList',
            component: resolve => require(['../pages/callingCardList.vue'], resolve)
        },
        {
            path: '/cardList',
            name: 'cardList',
            component: resolve => require(['../pages/callingCardList.vue'], resolve)
        },
        {
            path: '/cardDetail',
            name: 'cardDetail',
            component: resolve => require(['../pages/callingCardDetail.vue'], resolve)
        },
        {
            path: '/cardIndex',
            name: 'cardIndex',
            component: resolve => require(['../pages/callingIndex.vue'], resolve)
        },
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['../pages/test'], resolve)
        }
    ]
})