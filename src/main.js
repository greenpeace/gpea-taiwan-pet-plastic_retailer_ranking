import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
