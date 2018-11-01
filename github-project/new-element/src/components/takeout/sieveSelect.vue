<template>
    <div class="sieveSelect">
            <ul v-show='ifNosieveSelectedData'>
                    <li v-for='(s,index) in sieveSelectedData' 
                        v-show='s.flag'
                        :key="s.id">{{s.value}}
                        <i class="iconfont" @click='delSelect(s)'>&#xe617;</i></li>
                </ul>
                <p v-show='ifNosieveSelectedData'>
                    <button @click='clearAll'>清空</button>
                </p>
    </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        props:['sieveSelectedData'],
        methods:{
            delSelect(s){
				s.flag = false;	
            },
            clearAll(){
                console.log('清除');
				this.$bus.emit('clearSieve');			
            },
        },
        computed:{
            ifNosieveSelectedData(){
				let flagArr = [];
				this.sieveSelectedData.forEach(v=>{
					if(v.flag){
						flagArr.push(v.flag);
					}
				});
				if(flagArr.length == 0){
					return false;
				}else{
					return true;
				}
			},
        },
		created(){},
		mounted(){
			this.$nextTick(()=>{
					this.$bus.emit('refreshScroll')	
				})
		},
    }
</script>
<style lang="scss">
.sieveSelect{
    width:100%;
    background:rgba(242, 242, 242, 0.95);
    display:-webkit-flex;
    display: flex;
    overflow: hidden;
        ul{	
				width: 80%;
				white-space:nowrap;
				-webkit-overflow-scrolling: touch;
				overflow-x:scroll;
           	 	overflow-y: hidden; 
				li{
					padding:.3rem .6rem;
					background: #fff;
					color: #666;
					margin:.5rem 0;
					margin-left:.5rem;
					letter-spacing: 1px;
					display: inline-block;
					font-size: 1rem;
					border-radius: 2px;
					i{
						font-size: 1rem;
						display: inline-block;
						width:2em;
					}
					&:last-child{
						margin-right:.5rem;
					}
				}
			}
			p{	
				flex:1;
				background: #f2f2f2;
				box-shadow: 0 -2px 2px 2px #eee;
				button{
					padding: .3rem 1rem;
					margin: .5rem 0;
					border: 1px solid rgba(153, 153, 153, 0.49);
					background: #f2f2f2;
					color: rgba(142, 142, 142,1);
					border-radius: 3px;
				}	
			}
    
}
</style>