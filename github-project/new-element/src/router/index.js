import Vue              from 'vue'
import Router           from 'vue-router'


import Index            from '@/pages/index'
//首页
import Takeout          from '@/pages/takeOut/takeIndex.vue'
//商家信息视图
import ShopsInfoView    from '@/pages/takeOut/shopInfoView.vue'
//商家信息
import ShopsInfo        from '@/pages/takeOut/shopInfo.vue'

import Find             from '@/pages/find/find.vue'
import Order            from '@/pages/order/order.vue'
import Mys              from '@/pages/mys/mys.vue'


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
      	component:Takeout
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
      name:'shopsInfoView',
      path:'/',
      component:ShopsInfoView,
      children:[
        //商家信息
        {
          name:'shopsInfo',
          path:'shopsInfo/:id',
          component:ShopsInfo
        },
      ],
    },
    
    {
       path:'*', redirect: '/takeout'
    },
  ]

})
