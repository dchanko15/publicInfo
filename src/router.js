import Vue from 'vue';
import Router from 'vue-router';


import vIndex from './views/v-index';
import vHome from './views/v-home.vue';
import vRestricted from './views/v-restricted.vue';
import vCategoryItems from './views/v-categoryItems.vue';
import vRequestInfo from './views/v-requestInfo.vue';
import v404 from './views/v-404'

import {Roles} from "./components/globalstate";





Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/', name: 'index', component: vIndex},
        {path: '/home', name: 'home', component: vHome},
        {path: '/item/:id', name: 'items', component: vCategoryItems},
        {path: '/request-info', name: 'request', component: vRequestInfo},
        {path: '/restricted', name: 'restricted', component: vRestricted},

        /*  {
              path: '/about',
              name: 'about',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
          }*/
        {path: '*', name: 'p404', component: v404}
    ]
})
