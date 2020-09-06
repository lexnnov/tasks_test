import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'
import Vuex from 'vuex'

import Home from '@/pages/Home';
import CreateNote from '@/pages/CreateNote';
import EditNote from '@/pages/EditNote';
import ViewNote from '@/pages/ViewNote';

Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/create', component: CreateNote },
  { name:"view", path: '/view/:id', component: ViewNote },
  { name:"edit", path: '/edit/:id', component: EditNote }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
