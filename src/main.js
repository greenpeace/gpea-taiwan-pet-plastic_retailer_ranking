import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './plugins/element.js'
import VTooltip from 'v-tooltip'

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

var VueScrollTo = require('vue-scrollto');
Vue.use(VueRouter)
Vue.use(VueScrollTo)
Vue.use(VTooltip, {popover: {
  defaultPlacement: "right",
}})

const router = new VueRouter({
  mode: 'hash',
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
