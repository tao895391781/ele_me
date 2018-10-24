const SAVE_INDEXBUSINESSDATA = 'SAVE_INDEXBUSINESSDATA';//保存首页获取的商家的信息
const SAVE_INDEXSIEVELISTDATA = 'SAVE_INDEXSIEVELISTDATA';//保存首页信息筛选的数据
const SAVE_SCROLLSIEVEOBJ  = 'SAVE_SCROLLSIEVEOBJ';//保存筛选滚动实例对象
const ADD_PULLLOADINDEXS  =  'ADD_PULLLOADINDEXS'//每次上拉加载的个数
const SET_ALLORSELECTBUSINESSLIST = 'SET_ALLORSELECTBUSINESSLIST';//保存筛选选择的参数
export default{
  [SAVE_INDEXBUSINESSDATA](state,payload){
    state.indexBusinessData = payload.data;
    console.log(state.indexBusinessData)
},  
[SAVE_INDEXSIEVELISTDATA](state,payload){
  state.indexSieveServerData = payload.data;
},
[SAVE_SCROLLSIEVEOBJ](state,payload){
  state.sieveScrollObj =  payload.data;
},
[ADD_PULLLOADINDEXS](state,payload){
     state.pullLoadIndex = payload.data;
},
[SET_ALLORSELECTBUSINESSLIST](state,payload){
  state.ifAllOrSieve = payload.data;
}
}
