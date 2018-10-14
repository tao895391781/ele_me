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
			<div class="searchpage" v-show='!showS1' :class="{searchB:!showS1}">
				<Searchpage :historyS='historyS'></Searchpage>	
			</div>
			<div class="Indexmain" v-show='showS1'>
				<div class="searchNav bgc" >
					<span v-for='s in searchNav'>{{s}}</span>
				</div>
				<div is='Banner' class="banner"></div>
				<div class="mainBlock">
					<div class="foodView">
						<div class="mainContainer" ref='mainContainer'>
							<ul class="foodTypeNav foodTypeBgc1" ref='foodType1'>
								<li v-for='f in foodType1' >
									<span ref='food1'></span>
									<i>{{f.name}}</i>
								</li>
							</ul>
							<ul class="foodTypeNav1 foodTypeNav" ref='foodType2'>
								<li v-for='f in foodType2'>
									<span ref='food2'></span>
									<i>{{f.name}}</i>
								</li>
							</ul>	
						</div>
					</div>
					<div class="whichfoodType">
						<p :class="{ifLeft:!ifRight}"></p>
						<p :class="{ifLeft:ifRight}"></p>
					</div>
					<h4>
						<span><i class="iconfont">&#xe607;</i></span>
						<span>加入超级会员</span>
						<span>&nbsp;·&nbsp;每月领20元红包</span>
						<span>立即开通<i class="iconfont">&#xe62a;</i></span>
					</h4>
					<h5>
						<span><i class="iconfont">&#xe625;</i></span>
						<span>饿了么向消费者郑重承诺</span>
						<span><i class="iconfont">&#xe62a;</i></span>
					</h5>
					<div class="fivetype">
						<div v-for='f in fivetypeData' :class="{beforeTwo:false}" ref='fivetype'>
							<h5>{{f.descript}}</h5>
							<p>{{f.name}} ></p>
							<p>{{f.rush}}</p>
						</div>	
					</div>
					<div class="commendBusiness" ref='business'>
						<h3>推荐商家</h3>
						<nav>
							<ul>
								<li>综合排序</li>
								<li>距离最近</li>
								<li>品质联盟</li>
								<li>筛选</li>
							</ul>
						</nav>
						<ul class="busiInfo">
							<li v-for='store in businessInfos'>
								<div class="left">
									<img :src="store.img" alt="loading" srcset="">
								</div>
								<div class="left">
									<h3 class="ellipsis">{{store.name}}({{store.address}})</h3>
									<p>
										<span class="left"><i class="iconfont">&#xe60b;</i>&nbsp;{{store.start}}</span>
										<span class="left">月售{{store.mouthSale}}</span>
										<!-- <span class="left">人均{{store.averageUsed}}</span> -->
										<span class='right paddingO send'>{{store.whickSend}}</span>
										<span class='right paddingO'>{{store.ifonTime}}</span>
									</p>
									<p>
										<span class="left noColor">起送￥{{store.startSend}}</span>
										<span class="left">配送￥{{store.sendTip}}</span>
										<span class="right">{{store.distance}}km</span>
										<span class="right">{{store.arriveTime}}分钟</span>	
									</p>
									<p>
										<span></span>
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>	
			</div>
		</section>
		<div v-if='ifOverscroll' 
			class='fixOverscroll'
		 	:class="{overScrollFixed:ifOverscroll}">
			<p @click='search'>
				<i class="iconfont">&#xe632;</i>&nbsp;
				输入商家、商品名称
			</p>
						
		</div>
	</div>
</template>

<script>
import Searchpage from '../../components/search.vue'
import Banner     from '../../components/banner.vue'
import {setStorage,getStorage,scrollRequest} from '../../configJs/fengzhuang.js'
import {foodType1,foodType2} from '../../data.js'
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
				foodType1:foodType1,
				foodType2:foodType2,
				ifLeft:true,
				ifRight:true,
				fivetypeData:[],
				fixedSearch:false,
				Bscrolls:{},
				index:8,
				ifOverscroll:false,
				scrollL:0,
				recordFlag:false,
			}
		},
		methods:{
			gengxinDom(imgs){
				console.log(imgs)
				this.$nextTick(function () {
					console.log(this.$refs.fivetype);
					let q = this.$refs.fivetype;
					for(let i = 0;i<q.length;i++){
						q[i].style.backgroundImage = `url(${imgs[i]})`;
					}
				})
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
				console.log(this.scrollL)
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
					 })
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
				this.$bus.emit('openBgc','hide');
				// this.Bscrolls.scrollTo(0,1);
				 this.$nextTick(()=>{
						// this.Bscrolls.refresh(); 
					 })
			},
			touchShowFoodType(obj){
				let this_ = this;
				let pagex1 = 0
				let pagex2 = 0;
				let moveL = 0;
				let pol = 0;	
				let timer = 0;
				let timeN = 0;
				let moveTo = 0;
				let width = document.body.clientWidth;
				obj.addEventListener('touchstart',function(e){
					timeN = 0;
					pagex1 = event.touches[0].pageX;
					obj.style.transition = '';
					obj.style.left == 0+'px' ? this_.ifLeft = true: this_.ifLeft = false;
					obj.style.left == -width+'px' ? this_.ifRight = true: this_.ifRight = false;
					timer = setInterval(function(){
						timeN++;	
					},500)

				});
				obj.addEventListener('touchmove',function(e){
					let touch = event.targetTouches[0];
						//滑动实时距离
						moveL = (touch.pageX-pagex1);
						if(moveL>width){
							//滑动距离超过屏幕宽度滑动最大距离大约为宽度的一半
							moveL = width ;
								}
							moveTo = .001 * moveL * moveL;
						//滑动元素在左侧顶部并且向右滑动
						if(moveL>0 && this_.ifLeft){
							//在最左侧向右滑
							obj.style.left = parseInt(moveTo) + 'px';
						}else if(moveL>0 && !this_.ifLeft){
							//在最右侧向右滑
							obj.style.left = parseInt(moveL-width) + 'px';
						}else if(moveL<0 && !this_.ifRight){
							//在最右侧向左滑
							obj.style.left = parseInt(moveL) + 'px';
						}else if(moveL<0 && this_.ifRight){
							obj.style.left =  - parseInt(width+moveTo) + 'px';
						}
						
				});
				obj.addEventListener('touchend',function(e){
					pagex2 = event.changedTouches[0].pageX;
					//左边没内容回到原点
					clearInterval(timer)
					if(parseInt(moveL)>0){
						obj.style.left = 0;
						obj.style.transition = '.5s all ease';
					}else{
						obj.style.left = -width + 'px';
						obj.style.transition = '.5s all ease';
					}
					obj.style.left == -width+'px' ? this_.ifRight = true: this_.ifRight = false;
					//左滑	
				});
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
			getBusinessInfo(){
				this.axios.get('takeout/getBusinessInformation'+'/all')
				.then(res=>{
					console.log(res.data)
					this.businessInfos = res.data;	
				})
			},
			getLoadDataBusinessInfo(){
				this.axios.get('takeout/getBusinessInformation'+'/load')
				.then(res=>{
					this.businessInfos = [...this.businessInfos,...res.data];
					console.log(this.businessInfos)
				})
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
			...mapActions({
				getIndexBusinessData:'getIndexBusinessData',
			}),
		},
		watch:{
			'businessInfos':{
				deep:true,
				handler:function(newValue,oldValue){
					console.log(newValue);
					 this.$nextTick(()=>{
						this.Bscrolls.refresh(); 
					 })
					
				}	
			},
		},
		computed:{
			businessInfos(){
				return this.$store.state.indexBusinessData;
			},
			businessAllInfos(){
				return this.$store.state.indexBusinessData;
			},
		},
		created(){
			console.log(this.Message)
			getStorage('history1') ? this.historyS = getStorage('history1') : '';
			//获取首页店铺信息上面的推荐食品
			this.axios.get(this.apilist.getRushToPurchase)
			.then(res=>{
				console.log(res.data);
				this.fivetypeData = res.data;
				let imgs = [];
				res.data.forEach(v=>{
					imgs.push(v.img)
				})
				this.gengxinDom(imgs);
			});
			this.$bus.$on('delHist',()=>{
				this.historyS = [];
				 this.Message.success({
         			message:'已清空',
					duration:1000
      })
			})
			//获取商家店铺
			this.getIndexBusinessData({urlargs:'all',index:this.index,firstLoad:true});
		},
		mounted(){
			let this_ = this;
			let obj = this.$refs.mainContainer;
			obj.style.left = 0 +'px';
			this.touchShowFoodType(obj);
			let food1 = this.$refs.food1;
			let food2 = this.$refs.food2;
			food1.forEach((v,index)=>{
				if(index<5){
					v.style.backgroundPosition = -67 * index +'px' +' '+0+'px';
				}else{
					v.style.backgroundPosition = -67 * (index-5) +'px' +' '+ (-44+'px');
				}	
			})
			food2.forEach((v,index)=>{
				if(index<5){
					v.style.backgroundPosition = -66 * index +'px' +' '+(-88+'px');
				}else{
					v.style.backgroundPosition = -66 * (index-5) +'px' +' '+ (-137+'px');
				}
				
			});
			 this.$nextTick(()=>{
				console.log('初始化scroll')
				let obj = {
					click:true,
					disableTouch:false,
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
					that.index = 8;
					that.Bscrolls.openPullUp();
					that.$bus.emit('successRefrewsh');
					that.getIndexBusinessData({
						urlargs:'all',
						index:that.index,
						bsc: that.Bscrolls,
						ifupPullLoad:false,
						self:that,
						});
				});
			this.Bscrolls.on('pullingUp',function(){
					console.log('上拉加载');
					that.index += 8;
					that.$bus.emit('upPullLoad');
					that.getIndexBusinessData({
						urlargs:'all',
						index:that.index,
						bsc: that.Bscrolls,
						ifupPullLoad:true,
						self:that
						});
					});
			let searchOffsetTop = this.$refs.search.offsetTop;
			this.Bscrolls.on('scroll',function(pos){
				// console.log(pos.y)
				that.$bus.emit('downReFresh',pos.y);
				that.scrollL = -pos.y;
				if(-pos.y>searchOffsetTop){
					that.ifOverscroll = true;
					that.recordFlag = true;
				}else{
					that.ifOverscroll = false;
					that.recordFlag = false;
				}
			})
   		 });
			
		},
		components:{
			Searchpage,
			Banner
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
					float: left;
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
				.foodView{
					height:10rem;
					width:100%;
					position: relative;
					overflow: hidden;
					padding-bottom: 11rem;
					.mainContainer{
						background: #fff;
						@include position(absolute,200%,100%,0,0,1);
						overflow: hidden;
					.foodTypeNav{
						height:100%;
						width:50%;
						display: flex;
						justify-content:space-around;
						flex-wrap:wrap;
						float: left;
						margin:.2rem 0;
						li{
							width:20%;
							height:5rem;
							text-align: center;
							padding-top: .6rem;
							span{
								display: inline-block;
								height:2.3rem;
								width:2.3rem;
								background:#fff url('../../../static/img/foodType.png')  no-repeat;
							}
							i{
								display: inline-block;
								width:100%;
								font-size: 1rem;
								transform:scale(.9);
										}
									}
								}
							}
						}
						.whichfoodType{
								width:4rem;
								margin:.5rem auto;
								height:2px;
								// background: red;
								display: flex;
								justify-content:space-around;
								p{
									width:30%;
									height:2px;
									background: rgba(213, 213, 213, 0.57);
								}
							}	
							.ifLeft{
								background: #9e9e9e!important;
							}
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
					.fivetype{
						width:100%;
						display:-webkit-flex;
						display: flex;
						flex-wrap:wrap;
						justify-content: space-around;
						div{
							width:32%;
							margin-bottom: .2rem;
							position: relative;
							background: transparent;
							background: #eee;
							background-size: 100% 100%;
							h5{
								padding:.2rem 0;
								color:#fff;
								font-size: 1.1rem;
							}
							p{
								padding:.5rem 0;
								color:#fff;
							}
							&:first-child,&:nth-child(2){
								width:48%;
							}
						}

					}
				.commendBusiness{
					&>h3{
						text-align: left;
						padding:.5rem 1rem;
					}
					nav{
						width:100%;
						border-bottom: 1px solid #eee;
						ul{
							width:100%;
							display:-webkit-flex;
							display:flex;
							justify-content: space-around;
							li{
								line-height: 2.5rem;
								width: 25%;
								text-align: center;
							}
						}
					}
					.busiInfo{
						li{
							display: -webkit-flex;
							display: flex;
							margin:.4rem 0;
							div{
								&:first-child{
									width:6rem;
									height:6rem;
									margin:.2rem .3rem;
									img{
										width:100%;
										height:100%;
									}
								}
								&:last-child{
									flex: 1;
									padding:.5rem .5rem;
									border-bottom: 1px solid rgba(238, 238, 238, 0.54);
									border-top: 1px solid rgba(238, 238, 238, 0.54);
									h3{
										text-align: left;
										color:#000;
										font-size: 1.2rem;
									}
									p{
										overflow: hidden;
										line-height: 2rem;
										span{
											padding-right:.6rem;
											font-size: 1rem;
											color: #9e9e9e;
											&:first-child{	
												color:#e04b3a;
												i{
													color:#e04b3a;	
												}
											}	
										}
										.noColor{
											color:#9e9e9e!important;
										}
										.paddingO{
											padding:0 .2rem;
											border: 1px solid rgba(3, 169, 244, 0.41);
											color:#03A9F4;
											font-size: .1rem;
											letter-spacing: 1px;
											line-height: 1.3rem;
											position: relative;
											top:.35rem;
										}
										.send{
											background:#2196f3;
											color:#fff;
											border-left:none;
										}
									}
								}
							}
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
</style>