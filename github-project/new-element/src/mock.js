const Mocks = require('mockjs');
import apilist  from './api/apiList'

// import {data} from './data.js'
const Mock = Mocks;
Mock.setup({
    timeout: 1000
})
const Random = Mocks.Random;
const imgs = [require('../static/img/6.jpg'),require('../static/img/6.jpg'),require('../static/img/6.jpg'),require('../static/img/8.jpg'),require('../static/img/9.jpg'),require('../static/img/10.jpg'),('../static/img/11.jpg'),('../static/img/12.jpg'),('../static/img/13.jpg'),('../static/img/14.jpg')]
const rushToPurchase =  {
	title:'找优惠',
	list:[
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
}
//获取首页限时抢购栏目数据
console.log(apilist)
Mock.mock(apilist.getRushToPurchase,'get',rushToPurchase);
const receiptOrRefuseOrder = ['开发票','拒单赔','食安保'];
const businessName = ['望京小腰','洗涮涮火锅','汉堡王','测试1号','测试2号','测试3号','测试4号','测试5号','测试6号','测试7号','测试8号','测试9号','测试10号','测试11号'];
const id = 0;
const dataNum =parseInt(Math.random()*10 + 30);
const dataNum1 = parseInt(Math.random()*10 + 20);
const data = function(dataNum){
	let ecommendBusiness = [];
	let loadData = [];
	let selectData = [];
	//随机生成首页商家列表数据
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
	//随机生成筛选选项数据
	let obj1 =  [{
		"title":"商家服务",
		"serverList":[
			{
				"type":"蜂鸟专送",
				"way":"whickSend",
				"icon":"&#xe60a;",
			},
			{
				"type":"准时达",
				"way":"ifonTime",
				"icon":"&#xe649;",
			},
			{
				"type":"会员领红包",
				"way":"VipGetRedpag",
				"icon":"&#xe709;",
			},
			{
				"type":"到店自取",
				"way":"shopSelfGet",
				"icon":"&#xe63c;",
			},
			{
				"type":"品牌商家",
				"way":"brand",
				"icon":"&#xe622;",
			},
			{
				"type":"食安保",
				"way":"foodSafe",
				"icon":"&#xe609;",
			},
			{
				"type":"新店",
				"way":"newStore",
				"icon":"&#xe645;",
			},
			{
				"type":"开发票",
				"way":"invioce",
				"icon":"&#xe9a5;",
			},
			{
				"type":"接受预定",
				"way":"schedule",
				"icon":"&#xe634;",
			}
		],
	},{
		"title":"优惠活动",
		"discountActive":[
			{
				"type":"新用户优惠",
				"way":"newUserDiscount",
			},{
				"type":"特价商品",
				"way":"specialGoods",
			},{
				"type":"下单立减",
				"way":"orderReduce",
			},{
				"type":"赠品优惠",
				"way":"giveawayDiscount",
			},{
				"type":"下单返红包",
				"way":"orderGiveRedPag",
			},{
				"type":"进店领红包",
				"way":"inStoreGetRedPag",
			}
		],
	},{
		"title":"人均价格带",
	}
];
 let obj2 = parseInt(Math.random()*1000 + 3456);

	for(let i=0;i<dataNum;i++){
		ecommendBusiness.push(obj)
	}
	for(let i = 0;i<5;i++){
		loadData.push(obj)
	}
	for(let i = 0;i<dataNum1;i++){
		selectData.push(obj)
	}
	return Mock.mock({
		ecommendBusiness,
		loadData,
		obj1,
		obj2,
		selectData,
		});
};
	//随机生成推荐商家信息
	Mock.mock(apilist.getBusinessInformation +'all','get',data(dataNum).ecommendBusiness);
	Mock.mock(apilist.getBusinessInformation +'load','get',data(dataNum).loadData);
	//选中选项筛选出的结果
	Mock.mock(apilist.getSelectData +'?name1=name1&name2=name2','get',data(dataNum1).selectData)
	//筛选选项
	Mock.mock(apilist.getSieveItem,'get',data().obj1);
	//根据选定的条件筛选出商家数
	Mock.mock(apilist.getSieveSelectData,'get',data().obj2);
	
	