<template>
    <div class="businessInfo">
        <div class="commendBusiness" ref='business'>
			<h3>推荐商家</h3>
			<nav ref='nav'>
				<div is='SortNav' 
					:sortText = 'sortText'
					:nav = 'nav'
					:Bscrolls = 'Bscrolls'
				></div>
			</nav>
				<div is='SieveSelect' :sieveSelectedData = 'sieveSelectedData'></div>
			<ul class="busiInfo">
				<li v-for='(store,index) in businessInfos' :key="store.id">
						<lazy-component class='left'>
							<img :src="store.img" alt="loading" srcset="" class='mini-cover'  @click="goShopsInfo(store)">
						</lazy-component>
					<div class="left">
						<section class="contain"  @click="goShopsInfo(store)">
							<h3 class="ellipsis">{{store.name}}({{store.address}})</h3>
								<p>
									<span class="left"><i class="iconfont">&#xe60b;</i>&nbsp;{{store.star}}</span>
									<span class="left">月售{{store.mouthSale}}</span>
									<span class='right paddingO send'>{{store.whickSend}}</span>
									<span class='right paddingO'>{{store.ifonTime}}</span>
								</p>
								<p>
									<span class="left noColor">起送￥{{store.startSend}}</span>
									<span class="left">配送￥{{store.sendTip}}</span>
									<span class="right">{{store.distance}}km</span>
									<span class="right">{{store.arriveTime}}分钟</span>	
								</p>
							</section>
							<div 
								is='active-list' 
								class="active" 
								:activelistdata = 'store.activityConcessions'>
							</div>
					</div>
				</li>
                <li class="uppullLoad"></li>
			</ul>
		</div>       
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import SieveSelect   from '../../components/takeout/sieveSelect.vue'
import SortNav       from '../../components/takeout/sortNav.vue'
export default {
    data(){
        return {
			showup:false,
			showsieveSelects:true,
			nav:'nav',
			ifHidden:false,
		}
    },
    props:['businessInfos','Bscrolls','SieveBscrolls','sortText','isAmationScroll'],
    methods:{
		...mapActions({
			getSieveServerListData:'getSieveServerListData',
			delSelectListData:'delSelectListData'
		}),
		goShopsInfo(info){
			if(this.isAmationScroll){
				console.log(info);
				this.$router.push({name:'shopsInfo',params:{id:info.shopsId}})
			}
		},
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
				
			}
 		
            this.Bscrolls.scrollToElement(el,time);  
            this.Bscrolls.disable();      
        },
    },
    watch:{
		'businessInfos':{
			deep:true,
			handler:function(newValue){
				console.log(newValue)
			},
		}
	},
	computed:{
		sieveSelectlist(){
				return this.$store.state.sieveSelectList;
			},
		sieveSelectedData(){
           		return this.$store.state.sieveSelectedData;
			},
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
	components:{
		SieveSelect,
		SortNav,
		"active-list":{
			template:`
				<div :class="{hidden:ifHidden}">
					<p>
						<span v-for=" act in activelistdata" :key="act.id" :class="{main:act.main}">{{act.descript}}</span>
					</p>
				    <button @click='showActList()'>
						<i class="iconfont" v-show='!ifHidden'>&#xe60e;</i>
						<i class="iconfont" v-show='ifHidden'>&#xe60d;</i>
					</button>
				</div>
			`,
			data(){
				return {
					ifHidden:false,
				}
			},
			props:['activelistdata'],
			methods:{
				showActList(){
					if(!this.ifHidden){
						this.ifHidden = true;
					}else{
						this.ifHidden = false;
					}	
		},
			},
			created(){},
		},
	}
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
							border-bottom: 1px solid rgba(238, 238, 238, 0.54);
							border-top: 1px solid rgba(238, 238, 238, 0.54);
							&>.left{
								&:first-child{
									width:5.5rem;
									height:5.5rem;
									margin:.5rem .5rem;
									border-radius: 5px;
									overflow: hidden;
									img{
										width:100%;
										height:100%;
									}
								}
								&:last-child{
									flex: 1;
									padding:.5rem .5rem;
									.contain{
										h3{
											text-align: left;
											color:#000;
											font-size: 1.2rem;
										}
										&>p{
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
								.active{	
									width:100%;
									height:1.4rem;
									overflow: hidden;
									&>p{
										width:90%;
										overflow: hidden;
										float: left;
										span{
											display: block;
											margin: 0 .4rem .5rem 0;
											padding:0 .6rem;
											height:1.4rem;
											line-height: 1.4rem;
											border:1px solid #d4cbcb;
											color:#666;
											float: left;
											border-radius:2px;
											font-size: .1rem;
											}
										.main{
											border:1px solid rgba(255, 0, 0, 0.35);
											color:rgba(255, 0, 0, 0.60);
										}
										}
									button{
										width:10%;
										float: left;
										height:1.4rem;
										line-height: 1.4rem;
										background: transparent;
									}
									}
								.hidden{
									overflow: visible;
								}
								}
							}
						}
					}
				}
			}

</style>


