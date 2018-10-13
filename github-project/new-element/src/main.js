// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import './style/minin.scss'
import './style/reset.scss'
import bus from 'vue-bus'
import axios from'axios'
import store from './store'
import ElementUI from 'element-ui';
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import Bscroll from 'better-scroll'


require('./mock.js')
import apilist from './api/apiList'
Vue.config.productionTip = false
axios.defaults.withCredentials = true;

Vue.use(bus)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.axios = axios;
Vue.prototype.apilist = apilist;
Vue.prototype.Message = Message;
Vue.prototype.Bscroll = Bscroll;
//全局背景色控制
Vue.prototype.bgc = false;
Vue.prototype.bus = bus;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
