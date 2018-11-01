const SAVE_INDEXBUSINESSDATA = 'SAVE_INDEXBUSINESSDATA';//保存首页获取的商家的信息
const SAVE_INDEXSIEVELISTDATA = 'SAVE_INDEXSIEVELISTDATA';//保存首页信息筛选的数据
const SAVE_SCROLLINDEXOBJ = 'SAVE_SCROLLINDEXOBJ'//保存首页滚动的实例对象
const SAVE_SCROLLSIEVEOBJ  = 'SAVE_SCROLLSIEVEOBJ';//保存筛选滚动实例对象
const ADD_PULLLOADINDEXS  =  'ADD_PULLLOADINDEXS'//每次上拉加载的个数
const SET_ALLORSELECTBUSINESSLIST = 'SET_ALLORSELECTBUSINESSLIST';//保存筛选选择的参数
const SAVE_SELECTLISTDATA = 'SAVE_SELECTLISTDATA';//保存筛选的选项
const DEL_SELECTLISTDATA = 'DEL_SELECTLISTDATA'//删除筛选的选项
const SAVE_SELECTEDDATA = 'SAVE_SELECTEDDATA';//组件之间共享的筛选饿数据结构
const CHANGE_SORTORSIEVESTATUS = 'CHANGE_SORTORSIEVESTATUS';//组件之间共享的排序和筛选的状态
const SAVE_INDEXBLOCKINTRODATA = 'SAVE_INDEXBLOCKINTRODATA'//
//以下是关于商家店铺信息的数据
const SAVE_SHOPSINFOBGC = 'SAVE_SHOPSINFOBGC'
export default{
  [SAVE_INDEXBUSINESSDATA](state,payload){
    state.indexBusinessData = payload.data;
  }, 
  [SAVE_INDEXBLOCKINTRODATA](state,payload){
    state.indexBlockIntroData = payload.data;
  }, 
  [SAVE_INDEXSIEVELISTDATA](state,payload){
    state.indexSieveServerData = payload.data;
  },
  [SAVE_SCROLLINDEXOBJ](state,payload){
    state.indexScrollObj = payload.data;
  },
  [SAVE_SCROLLSIEVEOBJ](state,payload){
    state.sieveScrollObj =  payload.data;
  },
  [ADD_PULLLOADINDEXS](state,payload){
      state.pullLoadIndex = payload.data;
  },
  [SET_ALLORSELECTBUSINESSLIST](state,payload){
    state.ifAllOrSieve = payload.data;
  },
  [SAVE_SELECTLISTDATA](state,payload){
    state.sieveSelectList = payload.data;
  },
  [DEL_SELECTLISTDATA](state,payload){
    state.sieveSelectList = payload.data;
  },
  [SAVE_SELECTEDDATA](state,payload){
    state.sieveSelectedData = payload.data;
  },
  [CHANGE_SORTORSIEVESTATUS](state,payload){
    state.sortOrSieveFlag = payload.data;
  },

  //以下是关于商家店铺信息的数据
  [SAVE_SHOPSINFOBGC](state,payload){
    state.bgColor = payload.data
  },
}
