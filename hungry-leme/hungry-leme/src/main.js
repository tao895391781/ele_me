// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/minin.scss'
import './style/reset.scss'
import bus from 'vue-bus'
import axios from'axios'

require('./mock.js')
import Mock from 'mockjs'
Vue.config.productionTip = false
axios.defaults.withCredentials = true;

Vue.use(bus)
Vue.prototype.axios = axios;


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
