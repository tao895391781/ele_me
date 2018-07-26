<template>
	<section id="index" :class='{bgc:bgc,bgcs:!bgc}'>
		<phoneHeader :headerPhoneC='headerPhoneC'></phoneHeader>
		<router-view></router-view>
		<Footer></Footer>
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
			}
		},
		components:{
			Footer,
			phoneHeader
		},
		created(){
			this.$bus.on('closeBgc',()=>{
				this.bgc = false;
				this.headerPhoneC = true;
			});
			this.$bus.on('openBgc',()=>{
				this.bgc = true;
				this.headerPhoneC = false;
			})
			
		},
	}
</script>

<style lang='scss'>
@import 'src/style/minin.scss';
#index{
	width:100%;
	height:100%;
	/*background:linear-gradient(to top left,#008aff,#03a9ff);*/
	@include flexLayout(column);

}
.bgc{
	background:linear-gradient(to top left,#008aff,#03a9ff);
}
.bgcs{
	background:#fff;
}

	
</style>