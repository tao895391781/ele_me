// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/minin.scss'
import './style/reset.scss'
import bus from 'vue-bus'
import axios from'axios'
//全局引入better-scroll
import Bscroll from 'better-scroll'

require('./mock.js')
import apilist from './api/apiList'
Vue.config.productionTip = false
axios.defaults.withCredentials = true;

Vue.use(bus)
Vue.prototype.axios = axios;
Vue.prototype.apilist = apilist;
Vue.prototype.Bscroll = Bscroll;

function initScroll(ele){
  console.log(this.Bscroll)
  return new this.Bscroll(ele,{click:true,disableTouch:false})
};
Vue.prototype.initScroll = initScroll;



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
