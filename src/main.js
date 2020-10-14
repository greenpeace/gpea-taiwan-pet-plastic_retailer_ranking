import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './plugins/element.js'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
var VueScrollTo = require('vue-scrollto');
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueScrollTo)

const router = new VueRouter({
  mode: 'hash',
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
