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
    <div class='mask' v-show='showmask' ref='mask' @click='closeMask'>
    </div>
    <div class="loading" v-if='showLoadings'>
      <i class="iconfont">&#xe63e;</i>   
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
      showmask:false,
      showLoadings:false,

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
    // 隐藏首页排序下拉列表
    closeMask(){
      this.$bus.emit('showmaks','hidden','sort');
      this.$bus.emit('showmaks','hidden','sieve');
       this.$bus.emit('clearSieve')  
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
    });
    this.$bus.$on('showmask',(show)=>{
      if(show == 'show'){
        this.showmask = true;
      }else{
        this.showmask = false;
      }
    });
    this.$bus.$on('showLoading',(show)=>{
      if(show == 'show'){
        this.showLoadings = true;
      }else{
        this.showLoadings = false;
      }
    })
  },
  mounted(){   
    this.$refs.mask.style.height = document.body.clientHeight - 5 * 14 + 'px';
    this.$refs.mask.style.top = 5 * 14 +30+ 'px';
    let this_ = this;
    //关闭下拉刷新，并提示刷新成功
     this.$bus.$on('hiddenText',(bsc)=>{
      this.showRefreshText = true;
      bsc[0].finishPullDown();
      setTimeout(() => {
        this_.showRefreshText = false;
      },50);
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
    //监听上拉加载时标示饿显示与隐藏
    this.$bus.$on('upPullLoad',(topV)=>{

    })
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
 @keyframes load{
  0%{
     transform: scale(.7);
  }
  50%{
      transform: scale(1.2);
  }
  100%{
      transform: scale(.7);
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
    height:40px;
    line-height: 40px;
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
  .mask{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: auto;
    z-index: 1020;
    background: rgba(0,0,0,.8);
  }
  .loading{
    position: fixed;
    left: 0;
    top: 0;
    width:100%;
    height: 100%;
    z-index:1099;
    background: rgba(255,255,255,.1);
    color:#666;
    i{
      color: #2196f3;
      font-size: 3rem;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      display:inline-block;
      width:20px;
      height:20px;
      @include animation(load,1s,ease,infinite);
    }
    span{
      position: absolute;
      top:57%;
      left:50%;
      display: inline-block;
      width:100%;
      text-align: center;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
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
