const SAVE_INDEXBUSINESSDATA = 'SAVE_INDEXBUSINESSDATA';//保存首页获取的商家的信息
export default{
  [SAVE_INDEXBUSINESSDATA](state,payload){
    state.indexBusinessData = payload.data;
},  
}
