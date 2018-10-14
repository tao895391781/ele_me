<template>
  <div id="app">
    <!-- 下拉刷新tips -->
    <div class="downRefresh" ref='downRes' v-show='showRefresh'>
      <i class="iconfont" ref='iconH' v-show='!showRefreshText'>&#xe61f;</i>
      <span v-show='showRefreshText'>刷新成功</span>
    </div>
    <div class="bottomLoad" ref='upLoad' v-show='showBottomLoad'>
      <i class="iconfont">&#xe652;</i>
       <span v-show='showloadText'>{{loadText}}</span>
    </div>
    <!-- 中间提示语句 -->
    <div class="mainShadow" v-if='showmainShadow'>
        <div v-show='showText1' :class="{animationTips1:showTips1}">
          <p>{{text1}}</p>
          <button @click='del'>{{leftT}}</button>
          <button @click='cancleTip1'>{{rightT}}</button>
        </div>  
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      text:'',
      text1:'默认文字',
      showTips:false,
      showTips1:false,
      leftT:'取消',
      rightT:'确定',
      showmainShadow:false,
      showText1:false,
      showRefresh:false,
      showRefreshText:false,
      showloadText:false,
      showBottomLoad:false,
      loadText:'正在加载..',
    }
  },
  methods:{
    del(){
      this.showmainShadow = false;
      this.$bus.$emit('del');  
    },
    cancleTip1(){
      this.showmainShadow = false;
    },
  },
  created(){
    //中间提示
    this.$bus.$on('tip1',(text1,leftT,rightT)=>{
      this.showmainShadow = true;
      this.showText1 = true;
      this.showTips1 = true
      this.text1 = text1;
      this.leftT = leftT;
      this.rightT = rightT;
    })
  },
  mounted(){   
    let this_ = this;
    //关闭下拉刷新，并提示刷新成功
     this.$bus.$on('hiddenText',(bsc)=>{
      this.showRefreshText = true;
      bsc[0].finishPullDown();
      console.log(bsc)
      setTimeout(() => {
        // bs.finishPullDown();
        this_.showRefreshText = false;
      },20);
    });
    //开启上拉加载
     this.$bus.$on('upPullLoad',()=>{
      this_.showBottomLoad = true;  
    });
    //关闭上拉加载提示
     this.$bus.$on('hiddenUpPullLoad',()=>{
      this_.showBottomLoad = false;  
    });
  //监听下拉时刷新标识的显示与隐藏
    this.$bus.$on('downReFresh',(topV)=>{
      if(topV>30){
          this.showRefresh = true
          this.$refs.downRes.style.top = topV + 'px';
      }else{
         this_.$refs.downRes.style.top = 0;
        this_.showRefresh = false;
      }
    });
  },
}
</script>

<style lang='scss'>
@import 'src/style/minin.scss';
 @keyframes tips{
    from{
    -webkit-transform: rotate(0);
    transform: rotate(0);
    }
    to{
      -webkit-transform: rotate(36000deg);
      transform: rotate(36000deg);
    }
 }
 @keyframes tips1{
    from{
      transform: scale(.5);
      opacity: .7;
    }
    to{
      transform: scale(1);
      opacity: 1;
    }
 }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
  //下拉刷新
  .downRefresh{
    position: fixed;
    top:0rem;
    left:0;
    width:100%;
    height:1.5rem;
    text-align: center;
    color: #fff;
    span{
      color: #fff;
    }
    i{
      color:#FFF;
      font-size: 20px;
      display: block;
      @include animation(tips,100s,linear,infinite);
     
    } 
  } 
  .bottomLoad{
    width: 100%;
    position:fixed;
    bottom: 50px;
    left:0;
    text-align: center;
    i{
      color: #fff;
      font-size: 20px;
      display: block;
      @include animation(tips,200s,linear,infinite);
    }
  }
  /*全局提示*/
  .tips{
    padding: .2rem 2rem;
    @include position(fixed,null,null,0,50%,1010);
    transform:translateX(-50%);
    text-align: center;
    color:#fff;
    background: #e91e63;
    font-size:1.3rem;
    @include borderRadius(2px);
    i{
      font-size: 1.3rem;
      color: #fff;
      padding-right: .3em;
    }
  }
  .mainShadow{
   @include position(fixed,100%,100%,0,0,1009);
   background: rgba(0,0,0,.2);
   div{
      background: #fff;
      @include position(absolute,76%,7rem,40%,12%,1009);
      @include borderRadius(10px);
      overflow: hidden;
      p{
        height:4rem;
        line-height: 4rem;
        text-align: center;
        border-bottom: 1px solid rgba(158, 158, 158, 0.22);
        font-size:1.2rem;
        font-weight: 550;
        letter-spacing: 2px;
      }
      button{
        width:50%;
        float: left;
        height:3rem;
        border:none;
        background: #fff;
        color:#2196f3;
        font-size: 1.3rem;
        outline: none;
        border-right:1px solid rgba(158, 158, 158, 0.22);

      }
   }
  }
  .animationTips{
    @include animation(tips,1s,ease,forwards);

  }
  .animationTips1{
    @include animation(tips1,.5s,ease,forwards);

  }
}
</style>
