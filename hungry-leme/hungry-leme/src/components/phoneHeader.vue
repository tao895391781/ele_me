<template>
	<section id="phoneHeader">
		<div :class='{headerPhoneC:headerPhoneC}'>
			<p>
				<span><i class="iconfont">&#xe706;</i></span>
				<span>中国电信</span>
				<span><i class="iconfont">&#xe656;</i></span>
			</p>
			<p><span>{{getNowTime(time)}}</span></p>
			<p>
				<span><i class="iconfont">&#xe688;</i></span>
				<span><i class="iconfont">&#xe697;</i></span>
				<span>100%</span>
				<span><i class="iconfont">&#xe6d3;</i></span>
		</p>
		</div>
	</section>
</template>
<script>
	export default{
		data(){
			return {
				time:0,
				
		}
	},
	props:['headerPhoneC'],
	methods:{
		getNowTime(time){
			let d = new Date(time);
			let h = d.getHours();
			let m = d.getMinutes();
			return (h<10?'0'+h:h)+':'+(m<10?'0'+m:m)
		}

	},
	created(){
		this.time = Date.parse(new Date());


	},

	}
</script>
<style lang="scss">
	#phoneHeader{
		width:100%;
		height:1.3rem;
		div{
			height:100%;
			p{
				font-size: .5rem;
				float: left;
				width:40%;
				height:100%;
				line-height: 1.3rem;
				span{
					color:#fff;
					float: left;
					padding:0 .2rem;
					i{
						color:#fff;
					}
				}
				&:nth-child(2){
				width:20%;
				text-align:center;
				span{
					width:100%;
				}

				}
				&:nth-child(3){
					span{
						float: right;
					&:nth-child(2){
						i{
						color:#33f133;	
						}
						
					}
					}
				
				}
			}
		}
		.headerPhoneC{
			p{
				span{
					color:#666;
					i{
						color:#666;
					}
				}
			}
		}


	}
	
</style>