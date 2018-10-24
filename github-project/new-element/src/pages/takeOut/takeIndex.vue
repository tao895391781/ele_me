<template>
	<div ref='wrappers' class="indexBox">
		<section class="takeIndex" ref="takeIndex">
			<header :class="{padidngBottom:!animation}">
				<p class="location">
					<i class="iconfont">&#xe60c;</i>
					<span>金兴路2号院</span>
					<i class="iconfont">&#xe606;</i>	
				</p>
				<p class="search " @click='search' ref='search'
					:class="{animation:animation,animation1:animation1,fixedSearch:fixedSearch}">
					<b @click='searchs' v-show='!showS1'>搜索</b>
					<i class="iconfont" v-show='!showS1'>&#xe632;</i>
					<input 	type="text" 
							ref="input"
							:class="{bgChange:!showS1}" 
							:placeholder='placeholder'
							v-model="inputText" 
						>
					<span ref='texts' 
							:class="{animationT:animationT,animationT1:animationT1}">
							<i class="iconfont">&#xe632;</i>&nbsp;
							输入商家、商品名称
					</span>	
				</p>
				<span @click='cancle' v-show='!showS1'>取消</span>
			</header> 
			<!-- 搜索组件 -->
			<div class="searchpage" v-show='!showS1' :class="{searchB:!showS1}">
				<Searchpage :historyS='historyS'></Searchpage>	
			</div>
			<div class="Indexmain" v-show='showS1'>
				<div class="searchNav bgc" >
					<span v-for='s in searchNav' :key='s.id'>{{s}}</span>
				</div>
				<!-- banner图组件 -->
				<div is='Banner' class="banner"></div>
				<div class="mainBlock">
					<!-- 食物类型组件 -->
					<div is='FoodType'></div>
					<h4>
						<span><i class="iconfont">&#xe607;</i></span>
						<span>加入超级会员</span>
						<span>&nbsp;·&nbsp;每月领20元红包</span>
						<span>立即开通<i class="iconfont">&#xe62a;</i></span>
					</h4>
					<!-- 板块1 -->
					<div is='Block_one' :fivetypeData = 'fivetypeData'></div>
					<h5>
						<span><i class="iconfont">&#xe625;</i></span>
						<span>饿了么向消费者郑重承诺</span>
						<span><i class="iconfont">&#xe62a;</i></span>
					</h5>
					<!-- 商家列表组件 -->
					<div is='BusinessInfos' 
						:businessInfos = 'businessInfos' 
						:Bscrolls = 'Bscrolls' 
						:sortText = 'sortText'
						:SieveBscrolls = 'SieveBscrolls'
						:sieveScrollObj = 'sieveScrollObj'
						ref="businessDom">
					</div>
				</div>	
			</div>
		</section>
		<!-- 固定搜索栏 -->
		<div v-if='ifOverscroll' 
			class='fixOverscroll'
		 	:class="{overScrollFixed:ifOverscroll}">
			<p @click='search'>
				<i class="iconfont">&#xe632;</i>&nbsp;
				输入商家、商品名称
			</p>				
		</div>
		<!-- 固定导航栏 -->
		<nav class="fixedNav" :class="{overScrollFixed:ifOverscrollNav}" 				v-show='beforeCreatedNav'>
			<ul class="fixNavUl">
				<li @click = 'scrollToNav' :class="{selectColor:showSorting}">
					<span>{{sortText}}</span>
                    <i class="iconfont" v-show='!sortFlag'>&#xe650;</i>
					<i class="iconfont" v-show='sortFlag'>&#xec5f;</i>
                </li>
				<li>距离最近</li>
				<li>品质联盟</li>
				<li class="shaixuan" @click = 'sieveToNav'>
					筛选1
					<i class="iconfont">&#xe70b;</i>
				</li>
			</ul>
		</nav>
		 <!-- 综合排序 -->
        <ul class="IntegratedSorting" v-show='showSorting'>
			<li v-for='(type,index) in typelistSort' 
			:class="{selectColor:index == indexs}" 
			@click='selectSortType(type,index)'
			:key='type.id'
			>{{type.type}}
			<i class="iconfont" v-show='index == indexs'>&#xe64e;</i>
			</li>
        </ul>
		<!-- 筛选下拉菜单 -->
		<div class="sieve" v-show='showSieve'>
			<div is='Sieves' :sieveListData = 'sieveListData' 
			:showSieve = 'showSieve'></div>
		</div>	
		<!-- 筛选选项 -->
		<div  class="sieveSelects" :class="{overScrollFixed:ifOverscrollSelect}" v-show= 'showsieveSelects'
		ref = 'sieveSelect'>
			<ul>
				<li>开发票1&nbsp;&nbsp;<i class="iconfont">&#xe617;</i></li>
				<li>品牌商家</li>
				<li>准时达</li>
				<li>在线领券</li>
				<li>在线立减</li>
			</ul>
			<p>
				<button>清空</button>
			</p>
		</div>
	</div>
</template>
s
<script>
import Searchpage 	 from '../../components/takeout/search.vue'
import Banner     	 from '../../components/takeout/banner.vue'
import FoodType   	 from '../../components/takeout/foodType.vue'
import Block_one  	 from '../../components/takeout/block_one.vue'
import BusinessInfos from '../../components/takeout/businessInfo.vue'
import Sieves        from '../../components/takeout/sieve.vue'
import {setStorage,getStorage,scrollRequest} from '../../configJs/fengzhuang.js'
import {foodType1,foodType2,typelistSort} from '../../data.js'
import {mapActions} from 'vuex'
	export default {
		data(){
			return {
				showS1:true,
				disabled:true,
				inputText:'',
				historyS:[],
				animation:false,
				animation1:false,
				animationT:false,
				animationT1:false,
				placeholder:'',
				searchNav:['炸鸡','披萨','面','满30减10起','烧烤','粥','一点点',],
				fivetypeData:[],
				fixedSearch:false,
				Bscrolls:{},
				SieveBscrolls:{},
				index:8,
				ifOverscroll:false,
				ifOverscrollSelect:false,
				scrollL:0,
				recordFlag:false,
				ifOverscrollNav:false,
				typelistSort:typelistSort,
				showSorting:false,
				showSieve:false,
				sortFlag: false,
				sieveFlag:false,
				sortText:'综合排序',
				indexs:0,
				showsieveSelects:true,
			}
		},
		methods:{
			...mapActions({
				getIndexBusinessData:'getIndexBusinessData',
				getSieveServerListData:'getSieveServerListData',
				//保存每次上拉加载的个数的索引
				addpullLoadIndexs:'addpullLoadIndexs',
			}),
			selectSortType(type,index){
				this.sortText = type.type;
				this.indexs = index;
				this.$bus.emit('showmaks','hidden','sort');
				this.$bus.emit('showLoading','show');
				let args = '?name1=name1&name2=name2';
				this.getIndexBusinessData({urlargs:args,index:8,ifRedo:true,self:this});
			},
			searchs(){
				let options = {
					message:'搜索内容不能为空',
					duration:1000
				}
			this.inputText == ''?this.Message.error(options):this.historyS.unshift(this.inputText);
			//解决点击弹出框不自动消失问题
			setTimeout(function(){
				this.Message.closeAll()
			}.bind(this),1000)
			if(this.historyS.length>8){
				this.historyS.splice(8,1);
				}	
			},
			cancle(){
				this.Bscrolls.enable();
				this.animation = false;
				this.animation1 = true;
				this.animationT = false;
				this.animationT1 = true;
				this.placeholder = '';
				this.showS1  = true;
				this.recordFlag?this.ifOverscroll = true:this.ifOverscroll = false;
				this.inputText = "";
				this.disabled = true;
				this.$refs.input.blur();
				this.$bus.emit('openBgc','show');	
				this.$nextTick(()=>{
					this.Bscrolls.refresh(); 
					this.Bscrolls.scrollTo(0,-this.scrollL);
					 });
				this.$bus.emit('showSelect','show');
			},
			search(){
				this.animation = true;
				this.animation1 = false;
				this.animationT = true;
				this.animationT1 = false;
				this.ifOverscroll = false;
				this.placeholder = '输入商家、商品名称';
				this.$refs.input.focus();
				this.showS1  = false;	
				this.Bscrolls.disable();
				this.$bus.emit('openBgc','hide');
				this.$bus.emit('showSelect','hidden');
			},
			searchScroll(){
				//首页滚动固定搜索框
				let takeIndexTop = this.$refs.takeIndex.scrollTop;
				console.log(takeIndexTop)
				if(takeIndexTop  >parseInt(2.6 * 14)){
					this.fixedSearch = true;
				}else{
					this.fixedSearch = false;
				}
			},
			getEle(){
				return this.$refs.wrappers;
			},
			sliceData(arr){
				if(arr.length == 0){
					return false;
				}
				return arr.slice(0,8);
			},
			 scrollToNav(){
				 console.log('点击了几次啊')
				 this.$bus.emit('showmaks','hidden','sieve');
				 console.log(this.sortFlag)
				 if(!this.sortFlag){
					 console.log(5)
					this.$bus.emit('showmaks','show','sort');
				 }else{
					this.$bus.emit('showmaks','hidden','sort');
				 };
			 },
			 sieveToNav(){
				if(this.$store.state.indexSieveServerData.length == 0){
					this.getSieveServerListData();
				 }
				this.$bus.emit('showmaks','hidden','sort');
				if(!this.sieveFlag){
					console.log(2)
					this.$bus.emit('showmaks','show','sieve');
					if(Object.keys(this.sieveScrollObj).length == 0){
						console.log('第一次')
						this.$nextTick(()=>{
							this.$bus.emit('sieveScroll');
						})	
					}
				}else{
					this.$bus.emit('showmaks','hidden','sieve');
				}
			 },	
		},
		watch:{
			'businessInfos':{
				deep:true,
				handler:function(newValue,oldValue){
					console.log(newValue);
					this.$nextTick(()=>{
						this.Bscrolls.refresh(); 
						this.Bscrolls.openPullUp();
					 })	
				}	
			},
		},
		computed:{
			businessInfos(){
				return this.$store.state.indexBusinessData;
			},
			sieveScrollObj(){
				return this.$store.state.sieveScrollObj;
			},
			beforeCreatedNav(){
				if(this.$store.state.indexBusinessData.length == 0){
					return false;
				}else{
					return true;
				}
			},
			sieveListData(){
				return this.$store.state.indexSieveServerData;
			},
			pullLoadIndex(){
				return this.$store.state.pullLoadIndex;
			},
			ifAllOrSieve(){
				return this.$store.state.ifAllOrSieve;
			},
		},
		created(){
			console.log(this.Message);
			console.log(this.$store.state);
			getStorage('history1') ? this.historyS = getStorage('history1') : '';
			//获取首页店铺信息上面的推荐食品
			this.axios.get(this.apilist.getRushToPurchase)
			.then(res=>{
				console.log(res.data);
				this.fivetypeData = res.data;
			});
			this.$bus.$on('delHist',()=>{
				this.historyS = [];
				 this.Message.success({
         			message:'已清空',
					duration:1000
     			 })
			});
			//获取商家店铺信息
			console.log(this.$store.state.indexBusinessData);
			if(this.$store.state.indexBusinessData.length == 0){
				this.getIndexBusinessData({urlargs:'all',index:this.index,firstLoad:true,self:this});
			}	
		},
		mounted(){
			 this.$nextTick(()=>{
				console.log('初始化scroll')
				let obj = {
					click:false,
					disableTouch:false,
					eventPassthrough:'horizontal',
					//下拉刷新
					pullDownRefresh: {
						threshold: 50,
						stop: 50
						},
					//上拉加载
					pullUpLoad: {
						threshold: 50
							}
						};
			this.Bscrolls =  new this.Bscroll(this.getEle(),obj);
			console.log(this.Bscrolls)
			let that = this;
			this.Bscrolls.on('pullingDown',function(){
					console.log('下拉刷新');	
					let index = 8;
					that.addpullLoadIndexs({data:that.pullLoadIndex,type:'reduce'});
					that.Bscrolls.openPullUp();
					that.$bus.emit('successRefrewsh');
					that.getIndexBusinessData({
						urlargs:that.ifAllOrSieve,
						index:that.pullLoadIndex,
						bsc: that.Bscrolls,
						ifupPullLoad:false,
						self:that,
						});
				});
			this.Bscrolls.on('pullingUp',function(){
					console.log(that.ifAllOrSieve)
					console.log('上拉加载');
					that.addpullLoadIndexs({data:that.pullLoadIndex,type:'add'});
					that.$bus.emit('upPullLoad');
					that.$bus.emit('showUploadBlank','show');
					that.getIndexBusinessData({
						urlargs:that.ifAllOrSieve,
						index:that.pullLoadIndex,
						bsc: that.Bscrolls,
						ifupPullLoad:true,
						self:that
						});
					});
			let searchOffsetTop = this.$refs.search.offsetTop;
			this.Bscrolls.on('scroll',function(pos){
				let navTop = that.$refs.businessDom.$refs.nav.offsetTop;
				let searchH = that.$refs.search.clientHeight;
				let touchH = navTop - searchH;
				that.$bus.emit('downReFresh',pos.y);
				that.scrollL = -pos.y;
				// 搜索栏显示与隐藏
				if(-pos.y > searchOffsetTop){
					that.ifOverscroll = true;
					that.recordFlag = true;
				}else{
					that.ifOverscroll = false;
					that.recordFlag = false;
				};
				// 商家导航栏显示与隐藏
				if(-pos.y > touchH){
					that.ifOverscrollNav = true;
					that.ifOverscrollSelect = true;
				}else{
					that.ifOverscrollNav = false;	
					that.ifOverscrollSelect = false;	
				}
			});
			// 点击商家导航排序/筛选
			this.$bus.$on('showNavSort',(show,sort)=>{
				if(sort == 'sort'){
					if(show == 'show'){
						this.showSorting = true;
						this.sortFlag = true;
					}else if(show == 'hidden'){
						this.showSorting = false;
						}
				}else if(sort== 'sieve'){
					if(show == 'show'){
						this.showSieve = true;
						this.sieveFlag = true;
					}else{
						this.showSieve = false;
					}
				}
			});
			this.$bus.$on('showmaks',(show,sort)=>{
				if(sort == 'sort'){
					if(show == 'show'){
						this.$bus.emit('showmask','show');  
						this.$bus.emit('showNavSort','show','sort');
						this.$bus.emit('showSelect','hidden');
						// this.sortFlag = true;
						this.Bscrolls.disable();
					}else{
						this.$bus.emit('showmask','hidden');  
						this.$bus.emit('showNavSort','hidden','sort');
							this.$bus.emit('showSelect','show');
						this.sortFlag = false;
						this.Bscrolls.enable(); 
					}
				}else if(sort == 'sieve'){
					if(show == 'show'){
						this.$bus.emit('showmask','show');  
						this.$bus.emit('showNavSort','show','sieve');
						this.$bus.emit('showSelect','hidden');
						console.log(3)
						this.sieveFlag = true;
						this.Bscrolls.disable();
					}else if(show== 'hidden'){
						console.log(4)
						this.$bus.emit('showmask','hidden');  
						this.$bus.emit('showNavSort','hidden','sieve');
						this.$bus.emit('showSelect','show');
						this.sieveFlag = false;
						this.Bscrolls.enable(); 
					}
				}	
			});
			// 结束
			this.$bus.$on('showSelect',(show)=>{
				if(show == 'show'){
					this.showsieveSelects = true;
				}else{
					this.showsieveSelects = false
				}
			})
			});
			
		},
		components:{
			//搜索页
			Searchpage,
			//banner
			Banner,
			//可滑动分类食品
			FoodType,
			//优惠活动区域
			Block_one,
			//餐馆列表
			BusinessInfos,
			//筛选列表
			Sieves,
		},
	}
</script>
<style lang="scss">
@import 'src/style/minin.scss';
.indexBox{
	width:100%;
	height:100%;
	overflow: hidden;
	position: relative;
}
	.fixOverscroll{
		position: static;
		top:0;
		left:0;
		width:100%;
		height:2.5rem;
		background:#fff;
		text-align: center;
		line-height: 2.1rem;
		z-index: 1023;
		@include borderRadius(2px);
		p{
			width:90%;
			text-align: center;
			margin: .2rem auto .2rem;
			background: #f1f1f1;
			color:#6e6e6e;
			@include borderRadius(20px);
		}
	}
	.fixedNav,.sieveSelects{
		position: static;
		top:2.5rem;
		left:0;
		width:100%;
		z-index: 1021;
		background-color:#fff;
		border-bottom: 1px solid #eee;
		// @include animation(navScroll ,0.5s, ease ,forwards);
			&>.fixNavUl{
				width:100%;
				display:-webkit-flex;
				display:flex;
				justify-content: space-around;
					li{
						line-height: 2.5rem;
						height:2.5rem;
						width: 25%;
						text-align: center;
						position: relative;
						span{
							width: 4em;
							display: inline-block;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
                            i{
								position: absolute;
								right:0;
								top:0;
                                font-size: 1rem;
                                }
							}
					.shaixuan{
								i{
									right:1em;
								}
							}
					.selectColor{
						span{
							color:#53a3fd;
						}
							
						i{
							color:#53a3fd
						}
					}
						}
		}
		.sieveSelects{
			top: 5rem;
			width: 100%;
			background:rgba(242, 242, 242, 0.95);
			overflow: hidden;
			display:-webkit-flex;
			display: flex;
			ul{	
				width:80%;
				white-space:nowrap;
				float: left;
				-webkit-overflow-scrolling: touch;
				overflow-x:scroll;
				li{
					padding:.3rem .6rem;
					background: #fff;
					color: #666;
					margin:.5rem 0;
					margin-left:.5rem;
					letter-spacing: 1px;
					display: inline-block;	
					font-size: 1rem;
					border-radius: 2px;
					i{
						font-size: 1rem;
						display: inline-block;
						width:2em;
					}
					&:last-child{
						margin-right:.5rem;
					}
				}
			}
			p{	
				flex:1;
				background: #f2f2f2;
				float: left;
				box-shadow: 0 -2px 2px 2px #eee;
				button{
					padding: .3rem 1rem;
					margin: .5rem 0;
					border: 1px solid rgba(153, 153, 153, 0.49);
					background: #f2f2f2;
					color: rgba(142, 142, 142,1);
					border-radius: 3px;
				}	
			}
		}
	.IntegratedSorting,.sieve{
		position: absolute;
		top:5rem;
		left:0;
		width:100%;
		z-index: 1022;
		background-color: #fff;
		overflow: hidden;
		@include animation(sortAmimation ,.5s, ease ,forwards);
		&>li{
			line-height: 2.7rem;
			text-align: left;
			text-indent: 1em;
			font-size: 1rem;
			color: #0a0a0a;
			i{
				float: right;
				padding-right: 1rem;
			}
		}
		.selectColor{
			color: #53a3fd;
			i{
			color: #53a3fd;
			}
		}
	}
	.sieve{
		@include animation(sieveAmimation ,.5s, ease ,forwards);
		}
	.overScrollFixed{
		position: absolute;
	}
	.takeIndex{
		width:100%;
		display: flex;
		display:-webkit-flex;
		flex-direction:column;
		// @include scroll();
		header{
			position: relative;
			&>:last-child{
				position: absolute;
				display: inline-block;
				height:2.1rem;
				line-height: 2.1rem;
				top:.5rem;
				right:5%;
			}
		.location{	
				color:#fff;
				text-align: left;
				height:2.1rem;
				line-height: 2.1rem;
				margin-left: 5%;
				margin-top: .5rem;
				span{
					width: 6em;
					height:100%;
					display: inline-block;
					@include textEllip();
					color:#fff;
					// float: left;
				}
				i{
					float: left;
					color:#fff;
				}		
			}		
			.search{
				width:100%;
				height:2.1rem;
				position: absolute;
				top: 2.6rem;
				left: 0;
				&>b{
					position: absolute;
					display: inline-block;
					height:100%;
					line-height: 2.1rem;
					left: -1rem;
					top:0;
					z-index: 999;
				}
				&>i{
					position: absolute;
					left:7%;
					top:0;
					display: inline-block;
					height:100%;
					line-height:2.1*.9rem; 
					color:#999;
					z-index: 999;
				}
				input{
					background: #fff;
					width:90%;
					height:100%;
					position: absolute;
					left:5%;
					top:0;
					text-indent: 7%;
					@include borderRadius(2px);
				}	
				input[type="text"]:focus{ 
					outline: none;
				} 
				.bgChange{
					background: rgba(238, 238, 238, 0.55);
				}
				span{
					@include position(absolute,100%,100%,0,0,1);
					display: inline-block;
					line-height: 2.1rem;
					color:#999;
					i{
						color:#999;
					}
				}
				.animationT{
					@include animation(texts, 0.5s, ease, forwards);
			}
				.animationT1{
					@include animation(textsReserve ,0.5s, ease, forwards);
				}
			}
			.fixedSearch{
					@include position(fixed,null,null,1.3rem,0,1010);
			}
			.animation{
				@include animation(search ,0.5s, ease ,forwards);
			}
			.animation1{
				@include animation(searchReserve, 0.5s ,ease ,forwards);
			}
			::-webkit-input-placeholder { color:#999;text-indent:7%; }
			::-moz-placeholder { color:#999;text-indent:7%; } /* firefox 19+ */
			:-ms-input-placeholder { color:#999;text-indent:7%; } /* Internet Explorer 10+ */
			:-moz-placeholder { color:#999;text-indent:7%; } /* firefox 14-18 */	
		}
		.padidngBottom{
			padding-bottom: 2.7rem;
		}
		.animationHeader{
			@include animation(Headers ,0.5s, ease ,forwards);
		}
		.searchpage{
			flex:1;

		}
		.searchB{
			@include animation(searchB,.5s,ease,forwards)
		}
		.Indexmain{
			flex:1;
			background: #fff;
			.searchNav{
				overflow: hidden;
				width:100%;
				margin:0 auto;
				display: flex;
				justify-content:space-around;
				padding:0 5% .5rem;
				span{
					color:#fff;
				}
			}
			.mainBlock{
				background: #fff;
						&>h4{
							background: #f0dba2;
							height: 2.6rem;
							line-height: 2.6rem;
							overflow: hidden;
							span{
								float: left;
								padding:0 .5rem;
								color: #644f1b;
								&:first-child{

									i{
										color: #d6b364;
										font-size: 1.8rem;
									}
								}
								&:nth-child(2){
									font-size: 1.1rem;
								}
								&:last-child{
									float: right;
									font-size: 1rem;
								}
							}
						}
						&>h5{
							background: #fafafa;
							line-height: 2.6rem;
							height: 2.6rem;
							margin:.5rem 0;
							span{
								float: left;
								padding:0 .5rem;
								font-size: 1.07rem;
								color: #0a0a0a;
								&:first-child{
									i{
										color: #008aff;
									}	
								}
								&:last-child{
									float: right;
								}
							}
						}
					}
				}
			}
	@keyframes searchB {
		from{
			margin-top: 2rem;
		}
		to{
			margin-top: 0;
		}
	}
	@keyframes search {
		0%{
			transform: scale(1);
			width:100;
			top:2.6rem;
		}
		100%{
			transform: scale(.9);
			width:90%;
			top:.5rem;
		}
	}
	@keyframes texts{
		0%{
			transform:translateX(0);
			opacity:1;
		}
		100%{
			transform:translateX(-23%);
			opacity:0;
		}
	}
	@keyframes searchReserve {
		0%{
			transform:translateY(-2.6rem) scale(.9);
			width:90%;
		}
		100%{
			transform:translateY(0) scale(1);
			width:100;		
		}
	}
	@keyframes textsReserve{
		0%{
			transform:translateX(0);
			opacity:1;
		}
		100%{
			transform:translateX(0);
			opacity:1;	
		}
	}
	@keyframes sortAmimation{
		from{
			height:0;
		}
		to{
			height:22rem;
		}
	}
	@keyframes sieveAmimation{
		from{
			height:0;
		}
		to{
			height:32rem;
		}
	}
</style>