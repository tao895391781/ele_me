<template>
	<section id="index" :class='{bgc:bgc,bgcs:!bgc}'>
		<phoneHeader :headerPhoneC='headerPhoneC'></phoneHeader>
		<div class="routerView" v-if='!showBlank'>
			<router-view></router-view>
		</div>
		<!-- 美观还没进到首页,flex布局 -->
		<div class='blank' v-if='showBlank'></div>
		<!-- 首页上拉加载显示加载的样式-->
		<div class="showUpLoad" v-show='showUpload'></div>
		<div is='Footer' v-show='showFooter' :class="{footerAnimation:showFooter}"></div>
	</section>
</template>
<script>
import Footer from '../components/index/footer.vue'
import phoneHeader from '../components/index/phoneHeader.vue'

	export default{
		data(){
			return {
				bgc:true,
				headerPhoneC:false,
				showFooter:true,
				showUpload:false,
			}
		},
		components:{
			Footer,
			phoneHeader
		},
		methods:{
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
			this.$bus.$on('showUploadBlank',(show)=>{
				if(show == 'show'){
					this.showUpload = true;
				}else if(show == 'hidden'){
					this.showUpload = false;
				}
				
			});
			
		},
		mounted(){
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
.showUpLoad{
	width:100%;
	background-color:transparent;
	height:40px;
}
.footerAnimation{
	@include animation(footerAnimation,.2s,ease,forwards)
}
.bgcs{
	background:#fff;
}

	
</style>