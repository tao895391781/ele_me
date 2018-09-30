<template>
	<section id="banner">
		<ul ref='containerImg'>
			<li v-for='(m,index) in imgs' :indexs='index' ref='oli'><img :src="m" alt=""></li>
		</ul>
		<p class="whichI" v-show='imgs.length!=1'>
			<span v-for='(i,index) in imgs' :class="{active:index==m}"></span>
		</p>
	</section>
</template>
<script>
	export default {
		data(){
			return {
				imgs:[require('../../static/img/6.jpg'),require('../../static/img/7.jpg'),require('../../static/img/8.jpg'),require('../../static/img/9.jpg'),require('../../static/img/10.jpg')],
				indexs:0,
				m:0,
				flag:false,
				X1:0,
				X2:0,
				timer:0
			}
		},
		methods:{
			downs(w){
				this.m++
				let oli  = this.$refs.oli
					for(let i = 0;i<oli.length;i++){
							oli[i].style.left = w * (i-this.m) + 'px';
							oli[i].style.transition = 'all .7s ease'
							if(parseInt(oli[oli.length-1].style.left) < 0){
							this.m = 0;
							for(let i = 0;i<oli.length;i++){
							oli[i].style.left = w * (i-this.m) + 'px';
							}
						}
					}
			},
			ups(w){
				this.m--
				let oli  = this.$refs.oli
					for(let i = 0;i<oli.length;i++){
						oli[i].style.left = w * (i-this.m) + 'px';
						oli[i].style.transition = 'all .7s ease';
						if(parseInt(oli[0].style.left) > 0){
							this.m = oli.length-1;
							for(let i = 0;i<oli.length;i++){
							oli[i].style.left = w * (i-this.m) + 'px';
							}
						}	
					}
				},
			moves(){

				//做定时器自动滑动
			},
			setTimeouts(){
				let width = document.body.clientWidth;
				this.timer = setTimeout(function(){
					this.downs(width);
					this.setTimeouts();
				}.bind(this),3000)
				},
			},
		created(){
			this.setTimeouts();
		},
		boforeRouteLeave(to,from,next){
			clearTimeout(this.timer)
			next();
		},
		mounted(){
			let this_ = this;
			 this.$nextTick(function () {
				let oli  = this.$refs.oli
				let w = document.body.clientWidth;
				for(let i = 0;i<oli.length;i++){
					oli[i].style.left = w * i + 'px';
					}
      			});
			 this.$refs.containerImg.addEventListener('touchstart',(e)=>{
			 		this.X1 = event.touches[0].pageX;
			 		console.log(this)
			 		clearTimeout(this.timer)

			 });
			 /* this.$refs.containerImg.addEventListener('touchmove',(e)=>{
			 		// clearTimeout(this.timer)
			 		let touch = event.targetTouches[0];
						//滑动实时距离
					let moveL = (touch.pageX-this.X1);
					console.log(moveL);
					if(moveL < 0){
						//左滑
						

					}


			 });*/
			  this.$refs.containerImg.addEventListener('touchend',(e)=>{
			  		// clearTimeout(this_.timer)
			  		this.setTimeouts();
			  		console.log(this.m)
			 		this.X2= event.changedTouches[0].pageX;
			 		let width = document.body.clientWidth;
			 		if(this.X1-this.X2>3){
			 			//左滑
			 			this.downs(width)
			 		}else if(this.X2-this.X1>3){
			 			//右滑
			 			this.ups(width)
			 		}
			 })
		},
	}
</script>
<style lang='scss'>
@import 'src/style/minin.scss';

#banner{
	width:100%;
	height: 13rem;
	background: #fff;
	ul{	
		width:100%;
		height:10rem;
		overflow: hidden;
		position: relative;
		z-index: 1000;
		li{
			height: 100%;
			width:100%;
			position: absolute;
			left:0;
			top:0;
		img{
			width:100%;
			height:100%;
				}
			}
		}
	.whichI{
		width:35%;
		height:2px;
		margin:1rem auto 0;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		span{
			display: inline-block;
			height:4px;
			width:15px;
			background: rgba(213, 213, 213, 0.57);
			border-right: 2px;
		}
		.active{
			background: #999;
		}
	}
}

	
</style>