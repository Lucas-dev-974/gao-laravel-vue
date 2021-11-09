require('./bootstrap');
import Vue from 'vue'
import Vuetify from 'vuetify'

import Layout  from './components/Layout.vue'
import Router from './Router/router.js'
import Storage from './Store/storage'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)



const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    store: Storage,
    router: Router,
    components: { Layout },
})

export default new Vuetify(app);