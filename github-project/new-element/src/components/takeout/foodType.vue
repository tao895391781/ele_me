<template>
    <div class="foodtype">
        <div class="foodView">
			<div class="mainContainer" ref='mainContainer'>
				<ul class="foodTypeNav foodTypeBgc1" ref='foodType1'>
					<li v-for='f in foodType1' :key="f.id" >
						<span ref='food1'></span>
						<i>{{f.name}}</i>
					</li>
				</ul>
				<ul class="foodTypeNav1 foodTypeNav" ref='foodType2'>
					<li v-for='f in foodType2' :key="f.id">
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
    </div>
</template>
<script>
import {foodType1,foodType2} from '../../data.js'
export default {
    data(){
        return {
            foodType1:foodType1,
            foodType2:foodType2,
            ifLeft:true,
			ifRight:true,
        };
    },
    methods:{
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
    },
    created(){},
    mounted(){
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
    },
}
</script>
<style lang='scss'>
@import 'src/style/minin.scss';
.foodtype{
	.whichfoodType{
		height:3px;
		width:50px;
		margin:5px auto;
		display: -webkit-flex;
		display: flex;
		justify-content: space-around;
		p{
			width:40%;	
			background:rgba(158, 158, 158, 0.46);
			@include borderRadius(2px);
		}
		.ifLeft{
			background: rgba(81, 158, 254, 0.72);
		}
	}
            .foodView{
					height:10rem;
					width:100%;
					position: relative;
					overflow: hidden;
					// padding-bottom: 11rem;
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
}
</style>


