<template>
	<footer>
		<ul>
			<li @click='goView("takeout")' 	:class="{active:$route.name=='takeout'}"  ><i class="iconfont">&#xe625;</i><br>外卖</li>
			<li @click='goView("find")'     :class="{active:$route.name=='find'}"  ><i class="iconfont">&#xe75d;</i><br>发现</li>
			<li @click='goView("order")'    :class="{active:$route.name=='order'}"  ><i class="iconfont">&#xe600;</i><br>订单</li>
			<li @click='goView("mys")'      :class="{active:$route.name=='mys'}"  ><i class="iconfont">&#xe603;</i><br>我的</li>
		</ul>
	</footer>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			goView(path){
				this.$router.push({name:path})
			}

		}
	}
</script>
<style lang="scss">
@import 'src/style/minin.scss';
	footer{
		width:100%;
		height:43px;
		background: $bgc;
		box-shadow: 0 -1px 2px #eee;
		ul{
			width:100%;
			height:100%;
			@include flexLayout(row);
			li{
				color:$fc1;
				font-size: .5rem;
				line-height:20px;
				i{
					font-size: 1.4rem;
					color:#666;
					position:relative;
					bottom:-3px;
				}
			}
			.active{
				color:$blue;
				i{
					color:$blue;
				}
			}
		}

	}
</style>