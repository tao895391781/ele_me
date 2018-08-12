const Mocks = require('mockjs');

// import {data} from './data.js'
const Mock = Mocks.Mock;
const Random = Mock.Random;
const rushToPurchase =  [
			{
				"name":"限量抢购",
				"descript":"下午茶9.9元起",
				"rush":"1666人正在抢",
				"id":0
			},
			{
				"name":"闪购",
				"descript":"鲜爽水果一元一斤",
				"rush":"限时疯抢 ",
				"id":1
			}
			]

//获取首页限时抢购栏目数据
Mock.mock('takeout/getRushToPurchase','get',rushToPurchase);
