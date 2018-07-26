// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/minin.scss'
import './style/reset.scss'
import bus from 'vue-bus'

Vue.use(bus)


//全局背景色控制
Vue.prototype.bgc = false;
Vue.prototype.bus = bus;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
