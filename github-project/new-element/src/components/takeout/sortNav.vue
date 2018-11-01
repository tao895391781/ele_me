<template>
    <div class="sortNav" v-show= 'showSortNav'>
            <ul class="fixNavUl">
                    <li @click = 'scrollToNav("sort",nav)' :class="{selectColor:sortOrSieveFlag.sortFlagSign}">
                        <span>{{sortText}}</span>
                        <i class="iconfont" v-show='!sortOrSieveFlag.sortFlagSign'>&#xe650;</i>
                        <i class="iconfont" v-show='sortOrSieveFlag.sortFlagSign'>&#xec5f;</i>
                    </li>
                    <li>距离最近</li>
                    <li>品质联盟</li>
                    <li class="shaixuan" @click = 'scrollToNav("sieve","nav")' 
                    :class="{selectColor:sortOrSieveFlag.sieveFlagSign}">
                        筛选
                        <i class="iconfont">&#xe70b;</i>
                    </li>
                </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                showSortNav:true,
                
            }
        },
        props:['sortText','Bscrolls','nav'],
        methods:{
            scrollToNav(arg,nav){
            if(nav == 'nav'){
                let el = this.$parent.$refs.nav;
                let time  = 500;
                this.Bscrolls.scrollToElement(el,time);  
                this.Bscrolls.disable();      
            }
            if(arg == 'sort'){
               if(!this.sortOrSieveFlag.sortFlagSign){
					    this.$bus.emit('showmaks','show','sort');
				    }else{
					    this.$bus.emit('showmaks','hidden','sort');
				    }; 
            }else{
                if(!this.sortOrSieveFlag.sieveFlagSign){
                        this.$bus.emit('showmaks','show','sieve');
				    }else{
                        this.$bus.emit('clearSieve')  
					    this.$bus.emit('showmaks','hidden','sieve');
				    }
                }
            },
        },
        created(){
            this.$bus.$on('showSortNav',(show)=>{
                if(show == 'show'){
                  this.showSortNav  = true;  
                }else{
                    this.showSortNav  = false;
                }
            })
        },
        computed:{
            sortOrSieveFlag(){
				return this.$store.state.sortOrSieveFlag;
			},
        },
    }

</script>
<style lang="scss">
.sortNav{
    width:100%;
    &>.fixNavUl{
				width:100%;
				display:-webkit-flex;
				display:flex;
				justify-content: space-around;
					li{
						line-height: 2.5rem;
						height:2.5rem;
						width: 25%;
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
					.selectColor{
                        color: #53a3fd;
						span{
							color:#53a3fd;
						}
							
						i{
							color:#53a3fd
						}
					}
						}
}
</style>