import axios from'axios'
import apiList from '../api/apiList'
export default{
    aa(){

    },
    //获取首页商家列表
    getIndexBusinessData({commit},payload){
        // console.log(payload)
        axios.get(apiList.getBusinessInformation + payload.urlargs)
				.then(res=>{
                    // console.log(res.data)
                    payload.self.$bus.emit('showLoading','hidden'); 
                    if(payload.bsc){
                        if(!payload.ifupPullLoad){
                            this.state.indexBusinessData = [];
                            payload.self.$bus.emit('hiddenText',[payload.bsc]);
                        }else{
                            payload.self.$bus.emit('hiddenUpPullLoad');
                            payload.self.$bus.emit('showUploadBlank','hidden');
                        }       
                    }
                    if(payload.ifRedo){
                        this.state.indexBusinessData = []; 
                    }
                    let loadData = res.data.slice(0,payload.index);
                    if(this.state.indexBusinessData.length == res.data.length){
                        // console.log('已经到底了，不发请求');
                        payload.bsc.closePullUp()
                    }else{
                        commit('SAVE_INDEXBUSINESSDATA',{data:loadData}); 
                        if(!payload.bsc) return;
                        payload.bsc.openPullUp();
                    }    
                })
                .catch(err=>{
                    console.log(err)
                })
    },
    //首页推荐食品板块数据
    getIndexBlockIntroData({commit},payload){
        commit('SAVE_INDEXBLOCKINTRODATA',{data:payload.data})
    },
    //设置每次拉取的个数
    addpullLoadIndexs({commit},payload){
        if(payload.type == 'add'){
             let num =  payload.data + 8;
            commit('ADD_PULLLOADINDEXS',{data:num})
        }else{
            commit('ADD_PULLLOADINDEXS',{data:8})
        }
    },
    //根据不同参数获取全部的商家列表或者筛选后的商家列表
    setGetAllOrselectBusinessList({commit},payload){
        commit('SET_ALLORSELECTBUSINESSLIST',{data:payload.setUrl})
    },
    //获取筛选的选项列表
    getSieveServerListData({commit}){
        axios.get(apiList.getSieveItem).then(res=>{
            commit('SAVE_INDEXSIEVELISTDATA',{data:res.data})
        })
    },
    //保存首页滚动实例对象
    saveScrollIndexObj({commit},payload){
        commit('SAVE_SCROLLINDEXOBJ',{data:payload.data});
    },
    //保存筛选滚动实例对象
    saveScrollSieveObj({commit},payload){
        commit('SAVE_SCROLLSIEVEOBJ',{data:payload.data})
    },
    saveSelectListData({commit},payload){
        commit('SAVE_SELECTLISTDATA',{data:payload.data})

    },
    delSelectListData({commit},payload){
        payload.arr.splice(payload.index,1);
        commit('DEL_SELECTLISTDATA',{data:payload.arr})
    },
    //保存筛选的数据多组件数据共享
    saveSelectedData({commit},payload){
        commit('SAVE_SELECTEDDATA',{data:payload.data});
    },
    //改变排序和筛选的状态
    changeSortOrSieveStatus({commit},payload){
        commit('CHANGE_SORTORSIEVESTATUS',{data:payload.data})
    },
    //以下是关于商家店铺信息的
    saveShopsInfoBgc({commit},payload){
        commit('SAVE_SHOPSINFOBGC',{data:payload.data})
    },

}