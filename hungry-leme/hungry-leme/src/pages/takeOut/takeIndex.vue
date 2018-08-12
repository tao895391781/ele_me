<template>
	<section class="takeIndex">
		<header :class="{padidngBottom:!animation}">
			<p class="location">
				<i class="iconfont">&#xe60c;</i>
				<span>金兴路2号院</span>
				<i class="iconfont">&#xe606;</i>	
			</p>
			<p class="search " @click='search' ref='search' 
				:class="{animation:animation,animation1:animation1}">
				<b @click='searchs' v-show='!showS1'>搜索</b>
				<i class="iconfont" v-show='!showS1'>&#xe632;</i>
				<input 	type="text" 
						ref='input' 
						:class="{bgChange:!showS1}" 
						:placeholder='placeholder'
						v-model='inputText' >
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
			</div>
			
			
		</div>
	</section>
</template>
<script>
import Searchpage from '../../components/search.vue'
import Banner     from '../../components/banner.vue'
import {setStorage,getStorage} from '../../configJs/fengzhuang.js'
import {foodType1,foodType2} from '../../data.js'
	export default {
		data(){
			return {
				showS1:true,
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
			}
		},
		methods:{
			searchs(){	
			this.inputText == ''?this.$bus.$emit('tip','为空'):this.historyS.unshift(this.inputText);
			if(this.historyS.length>8){
				this.historyS.splice(8,1);
			}
				
			},
			cancle(){
				this.animation = false;
				this.animation1 = true;
				this.animationT = false;
				this.animationT1 = true;
				this.placeholder = '';
				this.showS1  = true;
				this.inputText ="";
				this.$bus.emit('openBgc','show');	
			},
			search(){
				this.animation = true;
				this.animation1 = false;
				this.animationT = true;
				this.animationT1 = false;
				this.placeholder = '输入商家、商品名称';
				this.$refs.input.focus();
				this.showS1  = false;	
				this.$bus.emit('openBgc','hide');
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
					console.log(obj.style.left)
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
		},
		computed:{

		},
		created(){
			getStorage('history1') ? this.historyS = getStorage('history1') : '';
			this.axios.get('takeout/getRushToPurchase')
			.then(res=>{
				console.log(res);
			});
			this.$bus.$on('delHist',()=>{
				this.historyS = [];
			})
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
				
			})
			
			
		},
		components:{
			Searchpage,
			Banner
		},
	}
</script>
<style lang="scss">
@import 'src/style/minin.scss';
	.takeIndex{
		width:100%;
		flex:1;
		display: flex;
		flex-direction:column;
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
			overflow-y: scroll;
			background: #fff;
			-webkit-overflow-scrolling:touch;
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
						h4{
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
						h5{
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
	

</style>