<template>
	<section id="banner">
		<ul ref='containerImg'>
			<li v-for='(m,index) in imgs' :indexs='index' ref='oli'><img :src="m" alt=""></li>
		</ul>
		<p class="whichI">
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
			downs(){
				this.m++
				let oli  = this.$refs.oli
				let w = document.body.clientWidth;
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
			ups(){
				this.m--
				let oli  = this.$refs.oli
				let w = document.body.clientWidth;
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
				//做定时器自动滑动
				setTimeouts(){
					this.timer = setTimeout(function(){
						this.downs();
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
			 		this_.X1 = event.touches[0].pageX;
			 });
			  this.$refs.containerImg.addEventListener('touchend',(e)=>{
			  		// clearTimeout(this_.timer)
			  		console.log(this_.m)
			 		this_.X2= event.changedTouches[0].pageX;
			 		if(this_.X1-this_.X2>3){
			 			//左滑
			 			this_.downs()
			 		}else if(this_.X2-this_.X1>3){
			 			//右滑
			 			this_.ups()
			 		}
			 })
		},
	}
</script>
<style lang='scss'>
@import 'src/style/minin.scss';

#banner{
	width:100%;
	height: 9rem;
	background: #fff;
	margin-top: .5rem;
	ul{	
		width:100%;
		height:7rem;
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