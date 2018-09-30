<template>
	<section id="index" :class='{bgc:bgc,bgcs:!bgc}'>
		<phoneHeader :headerPhoneC='headerPhoneC'></phoneHeader>
		<div class="routerView" v-if='!showBlank' ref='wrapper'>
			<router-view></router-view>
		</div>
		<div class='blank' v-if='showBlank'></div>
		<div is='Footer' v-show='showFooter' :class="{footerAnimation:showFooter}"></div>
	</section>
</template>
<script>
import Footer from '../components/footer.vue'
import phoneHeader from '../components/phoneHeader.vue'
	export default{
		data(){
			return {
				bgc:true,
				headerPhoneC:false,
				showFooter:true,
			}
		},
		components:{
			Footer,
			phoneHeader
		},
		computed:{
			showBlank(){
				if(this.$route.name == 'index'){
					return true;
				}else{
					return false;
				}
			},
		},
		created(){
			console.log(this.$route.name);
			this.$bus.on('openBgc',(flag)=>{
				if(flag == 'show'){
					this.bgc = true;
					this.headerPhoneC = false;
					this.showFooter = true;
				}else{
					this.bgc = false;
					this.headerPhoneC = true;
					this.showFooter = false;
				}		
			});	
		},
		mounted(){
			let ele = this.$refs.wrapper;
			this.$bus.$on('bscroll',function(){
				let bscroll = this.initScroll(ele)
				console.log(bscroll)
			});
			
		},
	}
</script>

<style lang='scss'>
@import 'src/style/minin.scss';
@keyframes footerAnimation{
	from {
		transform: translateX(-40%);
	}
	to{
		transform: translateX(0);
	}
}
#index{
	width:100%;
	height:100%;
	@include flexLayout(column);

}
.routerView{
	flex:1;
	overflow: hidden;
}
.blank{
	flex:1;
}
.footerAnimation{
	@include animation(footerAnimation,.2s,ease,forwards)
}
.bgcs{
	background:#fff;
}

	
</style>