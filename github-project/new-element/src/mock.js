const Mocks = require('mockjs');

// import {data} from './data.js'
const Mock = Mocks;
Mock.setup({
    timeout: '200-400'
})
const Random = Mocks.Random;
const imgs = [require('../static/img/6.jpg'),require('../static/img/6.jpg'),require('../static/img/6.jpg'),require('../static/img/8.jpg'),require('../static/img/9.jpg'),require('../static/img/10.jpg'),('../static/img/11.jpg'),('../static/img/12.jpg'),('../static/img/13.jpg'),('../static/img/14.jpg')]
const rushToPurchase =  [
			{
				"name":"限量抢购",
				"descript":"下午茶9.9元起",
				"rush":"1666人正在抢",
				"img|1":imgs,
				"id":0
			},
			{
				"name":"闪购",
				"descript":"鲜爽水果一元一斤",
				"rush":"限时疯抢 ",
				"img|1":imgs,
				"id":1
			},
			{
				"name":"吃货集结号",
				"descript":"不止5折",
				"img|1":imgs,
				"id":2
			},
			{
				"name":"品质联盟",
				"descript":"品质升级\s亲民",
				"img|1":imgs,
				"id":3	
			},
			{
				"name":"比萨汉堡日",
				"descript":"立减20",
				"img|1":imgs,
				"id":4
			}
			]
//获取首页限时抢购栏目数据
Mock.mock('takeout/getRushToPurchase','get',rushToPurchase);
const receiptOrRefuseOrder = ['开发票','拒单赔','食安保'];
const businessName = ['望京小腰','洗涮涮火锅','汉堡王','测试1号','测试2号','测试3号','测试4号','测试5号','测试6号','测试7号','测试8号','测试9号','测试10号','测试11号'];
const id = 0;
const dataNum =parseInt(Math.random()*10 + 20);
const data = function(dataNum){
	let ecommendBusiness = [];
	let loadData = [];
	let obj = {
		"img|1":imgs,
		"name|1":businessName,
		"address": '@CITY',
		"start|3-5":1,
		"mouthSale|500-20000":1,
		"averageUsed|20-100":1,
		"ifonTime":"准时达",
		"whickSend":"蜂鸟专送",	
		"startSend|20-40":1,
		"sendTip|5-30":1,
		"arriveTime|30-50":1,
		"distance|1-4":1,
		"activityConcessions":[
			{"fullReduce":{
				"full|20-50":1,
				"reduce|5-15":1,
			}
			},
			{"discoun |5.5-9.8":1},
			{"receiptOrRefuseOrder|1":receiptOrRefuseOrder},
			{"superVip|5.5-7.8":1},
			{"receiveVipRedBag|10-20":1},
			{"specilPrice|5-10":1},
			{"ifbackRedbag|1":[true,false]},
		],
	}
	for(let i=0;i<dataNum;i++){
		ecommendBusiness.push(obj)
	}
	for(let i = 0;i<5;i++){
		loadData.push(obj)
	}
	return Mock.mock({
		ecommendBusiness,
		loadData
		});
}
	//随机生成推荐商家信息
	Mock.mock('takeout/getBusinessInformation/all','get',data(dataNum).ecommendBusiness);
	Mock.mock('takeout/getBusinessInformation/load','get',data(dataNum).loadData);