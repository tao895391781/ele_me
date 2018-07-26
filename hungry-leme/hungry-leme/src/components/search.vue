<!-- 首页搜索组件 -->
<template>
	<section id="searchpage">
		<div class="comment" v-show='noHistory'>
			<h5>历史搜索</h5>
			<ul>
				<li v-for='h in history1'>{{h}}</li>
			</ul>
			<p><i class="iconfont" @click='delStorages'>&#xe601;</i></p>
		</div>
		<div class="comment">
			<h5>热门搜索</h5>
			<ul>
				<li v-for='hot in hot'>{{hot}}</li>
			</ul>
		</div>
	</section>
</template>
<script>
import {setStorage,getStorage,delStorage} from '../configJs/fengzhuang.js'
	export default{
		data(){
			return {
				hot:['一点点','汉堡王','米线','炸鸡'],
				history1:[],
			}
		},
		props:['historyS'],
		methods:{
			delStorages(){
				this.$bus.$emit('tip1','确定删除全部历史记录？','删除','取消')
			},
		},
		computed:{
			noHistory(){
				return this.history1.length == 0 ? false : true;
			},
		},
		watch:{
			historyS(news){
				this.history1 =[ ...new Set(news)];
				setStorage('history1',this.history1);

			},
		},
		created(){

			getStorage('history1')?this.history1 = getStorage('history1'):this.history1 = [];
			this.$bus.$on('del',()=>{
				delStorage('history1');
				this.history1 = []
			})
		},
	}
</script>
<style lang="scss">
@import 'src/style/minin.scss';
	#searchpage{
		width:100%;
		height:100%;
		.comment{
			h5{
				text-align: left;
				line-height: 2.5rem;
				color:#000;
				font-size: 1rem;
				text-indent: 2em;
			}
			ul{
				height:auto;
				width:90%;
				margin:0 auto;
				overflow: hidden;
				li{
					padding: .3rem 1rem;
					margin:.5rem .5rem;
					background: #eee;
					color:#666;
					float: left;
					@include borderRadius(2px);
				}
			}
			&>p{
				text-align: right;
				padding-right: 1rem;
				i{
					font-size:1.4rem;
					color:#9e9e9e;
				}
			}		
		}
	}
</style>