<template>
    <div class="sieves" ref='SieveWrapper'>
        <div class='sieveContainer'>
					<div>
						<h4>商家服务&nbsp;(可多选)</h4>
						<ul>
							<li v-for='(text,index) in sieveSelectedData'  
                             @click=' CheckWheel(index,"first")'
                             v-show='index<9'
                             :class="{
                                 changeColor:sieveSelectedData[index].flag
                             }" 
                             :key="text.id" 
                             >
								<i class="iconfont"
								v-html='text.icon' 
								:class="{
                                    blue:index==0,
									blue1:index==1,
									yellow:index==2,
									red:index==3,
									red1:index==4,
									red2:index==5,
									yellow1:index==6,
									green:index==7,
									purple:index==8}"
								></i>
								<span class="ellipsis">{{text.value}}</span>
							</li>
						</ul>
					</div>
					<div>
						<h4>优惠活动&nbsp;(单选)</h4>
						<ul>
							<li v-for='(text,index) in sieveSelectedData' 
                            @click=' CheckWheel(index,"second")'
                            v-show='index>8'
                            :index = 'index'
                            class="textCenter"
                             :class="{
                                 changeColor:index == item_1Index && sieveSelectedData[index].flag
                             }" 
                             :key="text.id"
                             >
								{{text.value}}
							</li>
						</ul>
					</div>
					<div>
						<h4>人均价格带</h4>
                        <div ref='mainEcharts' class="personPriceArea">
                        </div>
					</div>	
				</div>
		<p class="clearBtn">
			<button :disabled = 'ifSelectIsNull' @click= 'clearToNull' :class="{disClick:ifSelectIsNull}">清空</button>
			<button class="watch" v-show='haveHowstore' @click='seeSelectStore'>查看{{howStore}}个商家</button>
            <button class="watch point" v-show='!haveHowstore'>
                <i class="iconfont">&#xe676;</i>
            </button>
		</p>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            item:[],
            item_1:[],
            item_1Index:100,
            howStore:4399,
            selectServerValue:[],
            selectdiscountActive:'',
            haveHowstore:true,
            myChart:{},
            serverList:[],
            discountActive:[],
            maxPrice:120,
            showSieve:false,
            setOption:{
                    title: {
                    text: ''
                    },
                    tooltip: {},
                    legend:{
                        bottom:0,
                        height:80,
                    },
                    xAxis: {
                        data: [],
                        axisLine:{
                            lineStyle:{
                              color:'#187dfb',  
                            },
                        },
                        axisLabel:{
                            show:false,
                            
                        },
                        axisTick:{
                            show:false,
                        },    
                     },
                    grid:{
                        show:false,
                    },
                    yAxis: {
                        axisLabel:{
                            show:false,
                        },
                        axisLine:{
                            show:false,
                        },
                        axisTick:{
                            show:false,
                        },
                        splitLine:{
                            show:false,
                            },
                        max:550,
                    },
                    series: [{          
                        id: 'a',
                        smooth: true,
                        name: '销量',
                        type: 'line',
                        data: [],
                        areaStyle:{
                            color: 'rgba(24, 125, 251, 0.44)'
                        },
                        itemStyle:{
                                opacity:0,      
                        },
                        lineStyle:{
                            width:0,
                        },
                        symbolSize: 20,
                 }]
             },
             SieveBscrolls:{},
        }
    },
    props:['sieveListData'],
    methods:{
        ...mapActions({
            //保存筛选滚动组件实例对象
            saveScrollSieveObj:'saveScrollSieveObj',
            getIndexBusinessData:'getIndexBusinessData',
            //改变每次获取的拉取的个数
            addpullLoadIndexs:'addpullLoadIndexs',
            //根据参数不同获取不同的首页商家列表
            setGetAllOrselectBusinessList:'setGetAllOrselectBusinessList',
            //保存筛选的选项
            saveSelectListData:'saveSelectListData',
            //保存筛选的数据多组件数据共享
            saveSelectedData:'saveSelectedData',
        }),
        //查看筛选之后的商家列表
        seeSelectStore(){
            //筛选的参数
            this.$bus.emit('showLoading','show');
            let args = '?name1=name1&name2=name2';
            this.$bus.emit('showmaks','hidden','sieve');
            this.addpullLoadIndexs({data:8,type:'reduce'});
            this.setGetAllOrselectBusinessList({setUrl:args});
            this.getIndexBusinessData({urlargs:args,index:8,ifRedo:true,self:this});
             //保存组件共享的筛选数据
             console.log(this.sieveSelectedData)
             this.saveSelectedData({data:this.sieveSelectedData,self:this})
        },
        //封装多选状态函数
        //(index:传入itemArr的索引、itemArr:选项数组、valueArr:选定的单个选项的集合)
        CheckWheel(index,type){
            console.log(this.sieveSelectedData)
            if(type == 'second'){
               this.item_1Index = index; 
            }
          for(let i = 0;i<this.sieveSelectedData.length;i++){
                switch(index){
                case i:
               if(!this.sieveSelectedData[i].flag){
                    this.sieveSelectedData[i].flag= true; 
               }else{
                    this.sieveSelectedData[i].flag = false;
                    };
                break;
                };
            };  
            console.log(this.sieveSelectedData);
            //筛选后的商家列表
            this.getSieveSelectData();
        },
        //清除所选项
        clearToNull(){
            console.log('清除');
            this.$bus.emit('clearSieve')   
        },
        getSieveSelectData(){
            // this.axios.get(this.apilist.getSieveSelectData)
            // .then(res=>{
            //     console.log(res.data);
            //     this.howStore = res.data;
            // })
             setTimeout(function(){
                this.haveHowstore = true;
                }.bind(this),500)
            this.haveHowstore = false;
            this.howStore = parseInt(Math.random()*1000 + 3451)
        },
        randomCount(n){
            switch(n){
                case 0:
                    return 0;
                break;
                case 5:
                case 45:
                    return parseInt(Math.random() * 50 + 200);
                break;
                case 10:
                case 40:
                    return parseInt(Math.random() * 50 + 300);
                break;
                case 15:
                case 35:
                    return parseInt(Math.random() * 50 + 400);
                break;
                case 20:
                case 30:
                    return parseInt(Math.random() * 50 + 500);
                break;
                case 25:
                    return 550;
                break;
                case 50:
                case 55:
                case 60:
                case 65:
                case 70:
                return parseInt(Math.random() * 10 + 180);
                break;
                case 75:
                case 80:
                case 85:
                case 90:
                    return parseInt(Math.random() * 10 + 140);
                break;
                case 95:
                case 100:
                case 105:
                case 110:
                case 115:
                case 120:
                    return parseInt(Math.random() * 10 + 100);
                break;
            }
        },
    },
    computed:{
        ifSelectIsNull(){
            let flagArr = [];
            this.sieveSelectedData.forEach(v=>{
                if(v.flag){
                    flagArr.push(v.flag)
                }
            });
           return flagArr.length == 0 ? true:false;
        },
       
        sieveSelectedData(){
            return this.$store.state.sieveSelectedData;
        },
        sieveFlagSign(){
				return this.$store.state.sortOrSieveFlag.sieveFlagSign;
            },

    },
    created(){
        for(let i = 0;i<this.maxPrice+1;i+=5){
             this.setOption.xAxis.data.push(i);
             this.setOption.series[0].data.push(this.randomCount(i));
        };
        //清空筛选的选项
        this.$bus.$on('clearSieve',()=>{
            this.sieveSelectedData.forEach(v=>{
                v.flag = false;
            });
            this.howStore = 4399;

        })
    },
    watch:{
        wrapperHeight(newV,oldV){
            console.log(newV);
            console.log(oldV);
        },
        //优惠打折单选状态
        item_1Index(newValue,oldValue){
            if(oldValue < this.sieveSelectedData.length){
                this.sieveSelectedData[oldValue].flag = false;
            }    
        },
        // 动态创建数据实现自定义多选框功能
        'sieveListData':{
            deep:true,
            handler:function(newV){
                console.log(newV);
                this.serverList = newV[0].serverList;
                this.discountActive  =  newV[1].discountActive;
                newV[0].serverList.forEach((v,index)=>{
                    this.item.push({flag:false,value:v.type,index:index,icon:v.icon});
                });
                newV[1].discountActive.forEach((v,index)=>{
                    this.item_1.push({flag:false,value:v.type,index:index + 9});
                });
                this.saveSelectedData({data:[...this.item,...this.item_1],self:this});
            },
        },
    },
    mounted(){
        this.showSieve = true;
        this.$nextTick(()=>{
            this.$refs.mainEcharts.style.width = document.body.clientWidth * .9+ 'px';
            this.$refs.mainEcharts.style.height = 80 + 'px';
            this.myChart = this.echarts.init(this.$refs.mainEcharts);
            this.myChart.setOption(this.setOption);
        
        //  this.$bus.$on('sieveScroll',()=>{
				let obj = {
						click:true,
                        disableTouch:false,
					};
				console.log(this.$refs.SieveWrapper)
                this.SieveBscrolls = new this.Bscroll(this.$refs.SieveWrapper,obj);	
                if(Object.keys(this.$store.state.sieveScrollObj).length == 0){
                    this.saveScrollSieveObj({data:this.SieveBscrolls})
                };  
            // });
      });
      },
}
</script>
<style lang='scss'>
@import 'src/style/minin.scss';
.sieves{
    height:100%;
    position: relative;
    .sieveContainer{ 
        padding-bottom: 6rem;
				&>div{
                    width:90%;
				    margin: 0 auto;
					h4{
						text-align: left;
						text-indent: 2em;
						line-height: 3rem;
						letter-spacing: 1px;
						color: #555;
                    }
					ul{
						@include flexLayout(row);
						 flex-wrap: wrap;
						li{
							width: 32%;
							line-height: 3rem;
							height:3rem;
							text-align: left;
							background-color: rgba(238, 238, 238, 0.59);
							color: #000;
							margin-bottom:.2rem;
							letter-spacing: 2px;
							position: relative;
							font-size: 1rem;
							text-indent:1.3em;
							span{
								display: inline-block;
								width: 6em;
							}
							i{
								position: absolute;
								left:1em;
								top:0;
								text-indent:0em;
							}
                        }
                    .changeColor{
                        background-color: #e9f4ff;
                        color:#2a98ff;
                       span{
                            color:#2a98ff;
                            }
                        }
					}
				}
			.textCenter{
				text-align: center;
				color:#333;
            }
            .personPriceArea{
                width:0;
                height:0;   
            }
        }
    	.clearBtn{
			position: absolute;
			bottom: 0;
			left: 0;
            width:100%;
            height: 3rem;
			button{
                height:3rem;
				width:50%;
				float: left;
				background: #fff;
				border-top: 1px solid #ddd;
				font-size: 1.1rem;
				letter-spacing: 1px;
			}
			.watch{
				background:#187dfb;
				color: #fff;
            }
            .point{
                i{
                   color:#fff;  
                }  
            }
            .disClick{
                background: #ddd;
                color:#fff;
            }
		}
    }
</style>


