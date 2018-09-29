import Vue from 'vue'
import Router from 'vue-router'
import Index  from '@/pages/index'
import takeout from '@/pages/takeOut/takeIndex.vue'
import Find from '@/pages/find/find.vue'
import Order from '@/pages/order/order.vue'
import Mys from '@/pages/mys/mys.vue'


Vue.use(Router)

export default new Router({
  routes: [
    { 
      name: 'index',
      path: '/',
      component: Index,
      children:[
      //外卖首页
      {
      	name:'takeout',
      	path:'takeout',
      	component:takeout
      },
      //发现
      {
      	name:'find',
      	path:'find',
      	component:Find
      },
      //订单
      {
      	name:'order',
      	path:'order',
      	component:Order
      },
      //我的
      {
      	name:'mys',
      	path:'mys',
      	component:Mys
      }
      ]
    },
    {
       path:'*', redirect: '/takeout'
    },
  ]
})
