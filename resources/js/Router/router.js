import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Auth/Login.vue';


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',  
        component: Home
    },{
        path: '/login',
        name: 'login',
        component: Login
    }

    ]
})

export default router;