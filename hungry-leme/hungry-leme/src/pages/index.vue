<template>
	<section id="index" :class='{bgc:bgc,bgcs:!bgc}'>
		<phoneHeader :headerPhoneC='headerPhoneC'></phoneHeader>
		<router-view></router-view>
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
				showFooter:true
			}
		},
		components:{
			Footer,
			phoneHeader
		},
		created(){
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
	/*background:linear-gradient(to top left,#008aff,#03a9ff);*/
	@include flexLayout(column);

}
.footerAnimation{
	@include animation(footerAnimation,.2s,ease,forwards)
}
.bgc{
	background:linear-gradient(to top left,#008aff,#03a9ff);
}
.bgcs{
	background:#fff;
}

	
</style>