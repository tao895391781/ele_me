<template>
    <div class="businessInfo">
        <div class="commendBusiness" ref='business'>
			<h3>推荐商家</h3>
			<nav ref='nav'>
				<ul>
				    <li @click='scrollToNav("sort")'>
						<span>{{sortText}}</span>
                        <i class="iconfont" v-show='!showup'>&#xe650;</i>
                        <i class="iconfont" v-show='showup'>&#xec5f;</i>
                    </li>
					<li>距离最近</li>
				    <li>品质联盟</li>
					<li class="shaixuan"  @click='scrollToNav("sieve")'>筛选
						<i class="iconfont">&#xe70b;</i>
					</li>
				</ul>
			</nav>
			<div  class="sieveSelects">
				<ul>
					<li>开发票&nbsp;&nbsp;<i class="iconfont">&#xe617;</i></li>
					<li>品牌商家</li>
					<li>准时达</li>
					<li>在线领券</li>
					<li>在线立减</li>
				</ul>
				<p>
					<button>清空</button>
				</p>
		</div>
			<ul class="busiInfo">
				<li v-for='store in businessInfos'>
					<div class="left">
						<img :src="store.img" alt="loading" srcset="">
					</div>
					<div class="left">
						<h3 class="ellipsis">{{store.name}}({{store.address}})</h3>
						    <p>
							    <span class="left"><i class="iconfont">&#xe60b;</i>&nbsp;{{store.start}}</span>
						        <span class="left">月售{{store.mouthSale}}</span>
							    <!-- <span class="left">人均{{store.averageUsed}}</span> -->
							    <span class='right paddingO send'>{{store.whickSend}}</span>
							    <span class='right paddingO'>{{store.ifonTime}}</span>
							</p>
							<p>
                                <span class="left noColor">起送￥{{store.startSend}}</span>
                                <span class="left">配送￥{{store.sendTip}}</span>
                                <span class="right">{{store.distance}}km</span>
                                <span class="right">{{store.arriveTime}}分钟</span>	
							</p>
							<p>
								<span></span>
							</p>
					</div>
				</li>
                <li class="uppullLoad"></li>
			</ul>
		</div>       
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
			showup:false,
			showsieveSelects:true,
		}
    },
    props:['businessInfos','Bscrolls','SieveBscrolls','sortText','sieveScrollObj'],
    methods:{
		...mapActions({
			getSieveServerListData:'getSieveServerListData'
		}),
        scrollToNav(arg){
			console.log(1)
            let el = this.$refs.nav;
			let time  = 500;
			if(arg == 'sort'){
				this.$bus.emit('showmask','show','sort');	
				this.$bus.emit('showNavSort','show','sort');
				this.$bus.emit('showSelect','hidden');
			}else if(arg == 'sieve'){
				console.log(this.$store.state.indexSieveServerData)
				if(this.$store.state.indexSieveServerData.length == 0){
					this.getSieveServerListData();
				 }
				this.$bus.emit('showmask','show','sieve');	
				this.$bus.emit('showNavSort','show','sieve');
				this.$bus.emit('showSelect','hidden');
				this.$nextTick(()=>{
					if(Object.keys(this.sieveScrollObj).length == 0){
						this.$bus.emit('sieveScroll');
					}	
				})
				
			}
 		
            this.Bscrolls.scrollToElement(el,time);  
            this.Bscrolls.disable();      
        },
    },
    watch:{
        Bscrolls(newV){
            console.log(newV);
		},
		'businessInfos':{
			deep:true,
			handler:function(newValue){
				console.log(newValue)
			},
		}
    },
    created(){
		this.$bus.$on('showSelect',(show)=>{
				if(show == 'show'){
					this.showsieveSelects = true;
				}else{
					this.showsieveSelects = false
				}
			})
	},
    mounted(){
    },
}
</script>
<style lang='scss'>
.businessInfo{
    width:100%;
    .commendBusiness{
					&>h3{
						text-align: left;
						padding:.5rem 1rem;
					}
					nav{
						width:100%;
						border-bottom: 1px solid #eee;
						ul{
							width:100%;
							display:-webkit-flex;
							display:flex;
							justify-content: space-around;
							li{
								line-height: 2.5rem;
								width:25%;
								text-align: center;
								position: relative;
								span{
									width: 4em;
									display: inline-block;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
								}
                                i{
									position: absolute;
									right:0;
									top:0;
                                    font-size: 1rem;
                                }
							}
							.shaixuan{
								i{
									right:1em;
								}
							}
						}
					}
					.busiInfo{
						li{
							display: -webkit-flex;
							display: flex;
							margin:.4rem 0;
							div{
								&:first-child{
									width:6rem;
									height:6rem;
									margin:.2rem .3rem;
									img{
										width:100%;
										height:100%;
									}
								}
								&:last-child{
									flex: 1;
									padding:.5rem .5rem;
									border-bottom: 1px solid rgba(238, 238, 238, 0.54);
									border-top: 1px solid rgba(238, 238, 238, 0.54);
									h3{
										text-align: left;
										color:#000;
										font-size: 1.2rem;
									}
									p{
										overflow: hidden;
										line-height: 2rem;
										span{
											padding-right:.6rem;
											font-size: 1rem;
											color: #9e9e9e;
											&:first-child{	
												color:#e04b3a;
												i{
													color:#e04b3a;	
												}
											}	
										}
										.noColor{
											color:#9e9e9e!important;
										}
										.paddingO{
											padding:0 .2rem;
											border: 1px solid rgba(3, 169, 244, 0.41);
											color:#03A9F4;
											font-size: .1rem;
											letter-spacing: 1px;
											line-height: 1.3rem;
											position: relative;
											top:.35rem;
										}
										.send{
											background:#2196f3;
											color:#fff;
											border-left:none;
										}
									}
								}
							}
						}
					}
				}
}

</style>


