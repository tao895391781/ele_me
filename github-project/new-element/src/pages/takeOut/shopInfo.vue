<template>
    <div class="shopsInfoContain" v-show='showShops'>
         <img :src="shopInfoData.img" alt="" class="logoIMgs">  
        <section class="mainContainer">
            <div class="shopIntro">
                <div class="header">
                    <h3><span>{{shopInfoData.name}}</span>({{shopInfoData.address}})</h3>
                    <p>评价{{shopInfoData.star}}&nbsp;&nbsp;
                       月售{{shopInfoData.mouthSale}} &nbsp;&nbsp;
                       蜂鸟专送约{{shopInfoData.arriveTime}}分钟
                    </p>
                </div>
                <div class="onSale common" ref='onSales'>
                    <h3>优惠</h3>
                    <p>
                        <span class="act">首单</span>
                        <b>新用户下单立减17元(不与其他活动同享)</b>        
                    </p>
                </div>
                <div class="server common">
                    <h3>服务</h3>
                    <p>
                        <span class="act">食安保</span>
                        <b>该商户食品安全已由国泰产险承担，食品安全有保障</b>    
                    </p>
                    <p> 
                        <span class="act">开发票</span>
                        <b>该商户支持开发票，开票订单金额20元起，请在下单时填写好发票抬头</b>   
                    </p>
                    <p> 
                        <span class="act">准时达</span>
                        <b>超过10分钟立享赔付</b> 
                    </p>
                </div>
                <div class="notice common">
                    <h3>公告</h3>
                    <p>
                        您好，欢迎光临，很高兴为您服务！本店订餐默认你不配送调料，如有需要请备注留言。给您带来的不便请谅解！为了您及时用餐，请在用餐高峰时段及恶劣天气时，提前下单。谢谢！用餐期间有任何意见或建议请及时联系我们，会竭诚为您服务！祝您用餐愉快！
                    </p>
                </div> 
            </div>
        </section>
        <section class="beginOrder" ref='beginOrders'>
           <ul class="nav">
               <li @click='clickNav(0)'><span :class="{spanBottom:selectNav == 0}">点餐</span></li>
               <li @click='clickNav(1)'><span :class="{spanBottom:selectNav == 1}">评价</span></li>
               <li @click='clickNav(2)'><span :class="{spanBottom:selectNav == 2}">商家</span></li>
           </ul>
           <section class="scrollOrder" ref='scrollOrder'>
               <section class="orderOrCommentOrShops">
                    <div class="orders"></div>
                    <div class="comments"></div>
                    <div class="shops"></div>
                </section> 
           </section>
          


        </section>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
    export default{
        data(){
            return {
                shopInfoData:{},
                showShops:false,
                selectNav:0,
            }
        },
        methods:{
            ...mapActions({
                saveShopsInfoBgc:'saveShopsInfoBgc',
            }),
            clickNav(index){
                this.selectNav = index;

            },
        },
        created(){
            this.axios.get(this.apilist.getShopsInfo + this.$route.params.id)
            .then(res=>{
                console.log(res.data);
                this.shopInfoData = res.data;
                this.showShops = true
                //保存主题颜色
                this.saveShopsInfoBgc({data:res.data.color});
                this.$nextTick(()=>{
                    let onsalesTop = this.$refs.onSales.offsetTop;
                    this.$refs.beginOrders.style.top = onsalesTop + 'px';
                })
            })
        },
        watch:{
        },
        beforeRouteLeave(to ,from ,next){
             this.saveShopsInfoBgc({data:"transparent"});
             next();
        },
        mounted(){
            
        },
    }
</script>
<style lang='scss'>
    .shopsInfoContain{
        width: 100%;
        flex: 1;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        position: relative;
        .logoIMgs{
            width: 4.5rem;
            height: 4.5rem;
            display: block;
            margin: 0 auto;
            position: relative;
            top:.7rem;
            border-radius:4px;
        }
        .mainContainer{
            flex:1;
            background: #fff;
            .shopIntro{
                .header{
                    margin-top: 1.5rem;
                    h3{     
                        color: #000;
                        font-size: 1.3rem;
                        span{
                            letter-spacing: 2px;
                        } 
                    }
                    p{
                        color:#9e9e9e;
                        margin-top: .7rem;
                        font-size: 1rem;
                        letter-spacing: 1px;
                    }
                }   
            .common{
                width: 95%;
                margin:0 auto;
                h3{
                    text-align: left;
                    line-height: 3rem;
                    color: #000;
                    }
                p{ 
                    color: #615e5e;
                    text-align: left;
                    margin:.5rem 0;
                    font-size: 1rem;
                    display: flex;
                    align-items: flex-start;
                    .act{
                        color:#8bc34a;
                        border:1px solid #eee;
                        margin-right: 1rem;
                        }
                    b{
                        color:#615e5e;
                        flex:1;
                        }    
                    }
                }
            }
        }
    .beginOrder{
        height: auto;
        width: 100%;
        background-color: #f2f2f2;
        position: absolute;
        top:0;
        left: 0;
        overflow: hidden;
        .nav{
            display:-webkit-flex;
            display: flex;
            justify-content: space-around;
            background: #fff;
            border-bottom:1px solid #f2f2f2;
            li{
                width:30%;
                line-height: 2.3rem;
                span{
                    line-height: 2.3rem;  
                    display: inline-block;
                    color:#615e5e;
                    letter-spacing: 1px;
                    padding: 0 .2rem;
                    }
                .spanBottom{
                    border-bottom:2px solid #2196f3;
                    color: #0a0a0a;
                    }
                }
            }
        .scrollOrder{
            width: 100%;
            overflow-x: scroll;
            .orderOrCommentOrShops{
                width:300%;
                overflow: hidden;
                div{
                    float: left;
                    width:33.3%;
                    height:300px;
                    }
                .orders{
                    background: red;
                    }
                .comments{
                    background: blue;
                    }
                .shops{
                    background: pink;
                    }
                }
            }
        }
    }

</style>
