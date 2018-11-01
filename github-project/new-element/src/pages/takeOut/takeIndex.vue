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
					<div is='Block_one' :IndexBlockIntroData = 'IndexBlockIntroData'></div>
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
						:isAmationScroll = 'isAmationScroll'
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
		<nav class="fixedNav" 
		:class="{overScrollFixed:ifOverscrollNav}" 
			v-show='beforeCreatedNav'>
			<div is='SortNav' 
				:sortText = 'sortText'
				:nav = 'nav'
				:Bscrolls = 'Bscrolls'
				></div>
		</nav>
		 <!-- 综合排序 -->
        <ul class="IntegratedSorting" v-show='sortFlagSign'>
			<li v-for='(type,index) in typelistSort' 
			:class="{selectColor:index == indexs}" 
			@click='selectSortType(type,index)'
			:key='type.id'
			>{{type.type}}
			<i class="iconfont" v-show='index == indexs'>&#xe64e;</i>
			</li>
        </ul>
		<!-- 筛选下拉菜单 -->
		<div class="sieve" v-show='sieveFlagSign' ref='wrappers1'>
			<div is='Sieves' :sieveListData = 'sieveListData' ></div>
		</div>	
		<!-- 筛选选项 -->
		<div  class="sieveSelects" :class="{overScrollFixed:ifOverscrollSelect}" v-show= 'showsieveSelects'
		ref = 'sieveSelect'>
		<div is='SieveSelect' :sieveSelectedData = 'sieveSelectedData'></div>
		</div>
	</div>
</template>
<script>
import Searchpage 	 from '../../components/takeout/search.vue'
import Banner     	 from '../../components/takeout/banner.vue'
import FoodType   	 from '../../components/takeout/foodType.vue'
import Block_one  	 from '../../components/takeout/block_one.vue'
import BusinessInfos from '../../components/takeout/businessInfo.vue'
import Sieves        from '../../components/takeout/sieve.vue'
import SieveSelect   from '../../components/takeout/sieveSelect.vue'
import SortNav       from '../../components/takeout/sortNav.vue'
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
				sortText:'综合排序',
				indexs:0,
				showsieveSelects:true,
				nav:'notNav',
				isAmationScroll:true,
			}
		},
		methods:{
			...mapActions({
				getIndexBusinessData:'getIndexBusinessData',
				getSieveServerListData:'getSieveServerListData',
				//保存每次上拉加载的个数的索引
				addpullLoadIndexs:'addpullLoadIndexs',
				delSelectListData:'delSelectListData',
				changeSortOrSieveStatus:'changeSortOrSieveStatus',
				saveScrollIndexObj:'saveScrollIndexObj',
				getIndexBlockIntroData:'getIndexBlockIntroData',
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
				this.$bus.emit('showSortNav','show');
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
				this.$bus.emit('showSortNav','hidden');
			},
			searchScroll(){
				//首页滚动固定搜索框
				let takeIndexTop = this.$refs.takeIndex.scrollTop;
				// console.log(takeIndexTop)
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
			//滚动或者滚动初始值控制导航栏的显示与隐藏
			scrollOrInitYClt(pos){
					let searchOffsetTop = this.$refs.search.offsetTop;
					let navTop = this.$refs.businessDom.$refs.nav.offsetTop;
					let searchH = this.$refs.search.clientHeight;
					let touchH = navTop - searchH;
					this.$bus.emit('downReFresh',pos.y);
					this.scrollL = -pos.y;
					// 搜索栏显示与隐藏
					if(-pos.y > searchOffsetTop){
						this.ifOverscroll = true;
						this.recordFlag = true;
					}else{
						this.ifOverscroll = false;
						this.recordFlag = false;
					};
					// 商家导航栏显示与隐藏
					if(-pos.y > touchH){
						this.ifOverscrollNav = true;
						this.ifOverscrollSelect = true;
					}else{
						this.ifOverscrollNav = false;	
						this.ifOverscrollSelect = false;	
					}
			},	
		},
		beforeRouteLeave (to, from, next) {
			sessionStorage.setItem('indexScroll',this.Bscrolls.y);
		next();
  		},
		watch:{
			'businessInfos':{
				deep:true,
				handler:function(newValue,oldValue){
					// console.log(newValue);
					this.$nextTick(()=>{
						this.Bscrolls.refresh(); 
						this.Bscrolls.openPullUp();
						if(Object.keys(this.$store.state.sieveScrollObj).length != 0){
                            this.$store.state.sieveScrollObj.refresh();   
                        }
					 })	
				}	
			},
			sieveFlagSign(newV){
				// console.log(newV);
				if(newV){
					this.$nextTick(()=>{
						console.log(this.sieveScrollObj);
						// this.sieveScrollObj.scrollBy(0,20,500)
						this.sieveScrollObj.refresh();	
					})
				}
				
			},
		},
		computed:{
			businessInfos(){
				return this.$store.state.indexBusinessData;
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
			sieveSelectlist(){
				return this.$store.state.sieveSelectList;
			},
			sieveSelectedData(){
           		return this.$store.state.sieveSelectedData;
			},
			//控制排序下拉框的显示隐藏
			sortFlagSign(){
				return this.$store.state.sortOrSieveFlag.sortFlagSign;
			},
			//控制筛选下拉框的显示隐藏
			sieveFlagSign(){
				return this.$store.state.sortOrSieveFlag.sieveFlagSign;
			},
			sieveScrollObj(){
					return this.$store.state.indexScrollObj;		
			},
			IndexBlockIntroData(){
				return this.$store.state.indexBlockIntroData;
			},
		},
		created(){
			getStorage('history1') ? this.historyS = getStorage('history1') : '';
			//获取首页店铺信息上面的推荐食品
			this.axios.get(this.apilist.getRushToPurchase)
			.then(res=>{
				console.log(res.data);
				this.fivetypeData = res.data;
				this.getIndexBlockIntroData({data:res.data})
			});
			this.$bus.$on('delHist',()=>{
				this.historyS = [];
				 this.Message.success({
         			message:'已清空',
					duration:1000
     			 })
			});
			//获取商家店铺信息
			if(this.$store.state.indexBusinessData.length == 0){
				this.getIndexBusinessData({urlargs:'all',index:this.index,firstLoad:true,self:this});
			}	
		},
		mounted(){
			 this.$nextTick(()=>{
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
			if(Object.keys(this.$store.state.indexScrollObj).length!=0){
				this.Bscrolls.refresh()
				this.Bscrolls.scrollTo(0,parseInt(sessionStorage.getItem('indexScroll')),0);
			}
		
			this.scrollOrInitYClt(this.Bscrolls);
			this.saveScrollIndexObj({data:this.Bscrolls})
			let that = this;
			this.$bus.$on('pullDown',()=>{
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
			})
			this.Bscrolls.on('pullingDown',function(){
					that.$bus.emit('pullDown')
				});
			this.Bscrolls.on('pullingUp',function(){
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
			this.Bscrolls.on('scroll',function(pos){
				// console.log(this.y)
				//判断是否处于滚动状态(解决滚动停止时，如果结束时点击了点击事件会触发点击事件)
				that.isAmationScroll = !this.isInTransition;
				if(that.$refs.businessDom){
					that.scrollOrInitYClt(pos)
				}
			});
			this.Bscrolls.on('scrollEnd',function(){
				setTimeout(function(){
					that.isAmationScroll = !this.isInTransition;
				}.bind(this),500)
				
			});
			this.$bus.$on('showmaks',(show,sort)=>{
				if(sort == 'sort'){
					if(show == 'show'){
						this.$bus.emit('showmask','show');  
						this.$bus.emit('showSelect','hidden');
						this.changeSortOrSieveStatus(
							{data:{sortFlagSign:true,sieveFlagSign:false}})
						this.Bscrolls.disable();
					}else{
						this.$bus.emit('showmask','hidden');  
						this.changeSortOrSieveStatus(
							{data:{sortFlagSign:false,sieveFlagSign:false}})
						this.$bus.emit('showSelect','show');
						this.Bscrolls.enable(); 
					}
				}else if(sort == 'sieve'){
					if(show == 'show'){
						this.$bus.emit('showmask','show');  
						this.changeSortOrSieveStatus(
							{data:{sortFlagSign:false,sieveFlagSign:true}})
						this.$bus.emit('showSelect','hidden');
						this.Bscrolls.disable();
						this.$store.state.sieveSelectedData.length == 0 ?this.getSieveServerListData():'';
					}else if(show== 'hidden'){
						this.$bus.emit('showmask','hidden');  
						this.changeSortOrSieveStatus(
							{data:{sortFlagSign:false,sieveFlagSign:false}})
						this.$bus.emit('showSelect','show');
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
			//筛选的选项
			SieveSelect,
			//排序导航栏
			SortNav,
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
		
		}
		.sieveSelects{
			top: 5rem;
		}
	.IntegratedSorting,.sieve{
		position: absolute;
		top:5rem;
		left:0;
		width:100%;
		z-index: 1022;
		background-color: #fff;
		overflow: hidden;
		height:0;
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