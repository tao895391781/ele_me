<template>
    <div class='block_1'>
        <h4>{{IndexBlockIntroData.title}}</h4>
        <div class="fivetype">
		    <div v-for='f in IndexBlockIntroData.list' :class="{beforeTwo:false}" ref='fivetype'>
			    <h5>{{f.descript}}</h5>
			    <p>{{f.name}} ></p>
			    <p>{{f.rush}}</p>
		    </div>	
	    </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
        }
    },
    props:['IndexBlockIntroData'],
    methods:{
        gengxinDom(imgs){
				this.$nextTick(function () {
					let q = this.$refs.fivetype;
					for(let i = 0;i<q.length;i++){
						q[i].style.backgroundImage = `url(${imgs[i]})`;
					}
				})
			},
    },
    watch:{
      IndexBlockIntroData(newV){
          let imgs = [];
          newV.list.forEach((v)=>{
             imgs.push(v.img);
          });
          this.gengxinDom(imgs);
      },  
    },
    created(){

    },
}
</script>
<style lang='scss'>
.block_1{
    width:100%;
    h4{
        text-align: left;
        text-indent:.5em;
        font-size: 1.4rem;
        color: #0a0a0a;
        line-height: 3rem;
    }
	.fivetype{
			width:100%;
			display:-webkit-flex;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
				div{
				width:32%;
				margin-bottom: .2rem;
				position: relative;
				background: transparent;
				background: #eee;
			    background-size: 100% 100%;
					h5{
						padding:.2rem 0;
						color:#fff;
						font-size: 1.1rem;
				    }
					p{
						padding:.5rem 0;
						color:#fff;
						}
					&:first-child,&:nth-child(2){
					    width:48%;
					}
				}
			}
    }
</style>


