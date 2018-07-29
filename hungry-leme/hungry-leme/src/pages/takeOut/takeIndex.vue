<template>
	<section class="takeIndex">
		<header>
			<p class="location">
				<i class="iconfont">&#xe60c;</i>
				<span>金兴路2号院</span>
				<i class="iconfont">&#xe606;</i>	
			</p>
			<p 	class="search " @click='search' ref='search' 
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
			<div class="searchNav">
				<span v-for='s in searchNav'>{{s}}</span>
			</div>
			<div is='Banner' class="banner"></div>
			<div class="foodView">
				<div class="mainContainer" ref='mainContainer'>
					<ul class="foodTypeNav" ref='foodType1'>
						<li v-for='f in foodType'>{{f}}左边</li>
					</ul>
					<ul class="foodTypeNav1 foodTypeNav" ref='foodType2'>
						<li v-for='f in foodType'>{{f}}右边</li>
					</ul>	
				</div>
			</div>
			
		</div>
	</section>
</template>
<script>
import Searchpage from '../../components/search.vue'
import Banner     from '../../components/banner.vue'
import {setStorage,getStorage} from '../../configJs/fengzhuang.js'
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
				foodType:10,
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
				let pagex1 = 0
				let pagex2 = 0;
				let moveL = 0;
				let pol = 0;
				obj.addEventListener('touchstart',function(e){
					pagex1 = event.touches[0].pageX;
					obj.style.transition = '';

				});
				obj.addEventListener('touchmove',function(e){
					let touch = event.targetTouches[0];
		          	let width = document.body.clientWidth;
						moveL = (touch.pageX-pagex1);
						if(moveL>width/3){
							moveL = width/3;
						}
						obj.style.left = moveL + 'px';
						pol = obj.style.left;
						obj.style.transition = '';
						
				});
				obj.addEventListener('touchend',function(e){
					pagex2 = event.changedTouches[0].pageX;
					//左边没内容回到原点
					if(parseInt(pol)>0){
						console.log('左边没了')
						obj.style.left = 0;
						obj.style.transition = '.5s all ease';
					}
					//左滑
					
					
				});
			},
		},
		created(){
			getStorage('history1') ? this.historyS = getStorage('history1') : '';
		},
		mounted(){
			let this_ = this;
			let obj = this.$refs.mainContainer;
			
			this.touchShowFoodType(obj)
			
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
					position: absolute;
					display: inline-block;
					width:100%;
					left:0%;
					top:0;
					height:100%;
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
			padding-top: 2.7rem;
			flex:1;
			overflow-y: scroll;
			-webkit-overflow-scrolling:touch;
			.searchNav{
				overflow: hidden;
				width:90%;
				margin:0 auto;
				display: flex;
				justify-content:space-around;
				span{
					color:#fff;
				}
			}
			.foodView{
				height:12rem;
				width:100%;
				position: relative;
				overflow: hidden;
				.mainContainer{
					background: #fff;
					width:200%;
					height:100%;
					position: absolute;
					left:0;
					top:0;
					overflow: hidden;
				.foodTypeNav{
					height:100%;
					width:50%;
					display: flex;
					justify-content:space-around;
					flex-wrap:wrap;
					float: left;
					li{
						width:20%;
						height:6rem;
						line-height: 6em;
						text-align: center;
					}
				}
				.foodTypeNav1{	
					
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