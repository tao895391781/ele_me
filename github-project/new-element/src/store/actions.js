import axios from'axios'
import apiList from '../api/apiList'
export default{
    aa(){

    },
    getIndexBusinessData({commit},payload){
        axios.get(apiList.getBusinessInformation + payload.urlargs)
				.then(res=>{
                    if(payload.bsc){
                        if(!payload.ifupPullLoad){
                            payload.self.$bus.emit('successRefrewsh');
                            payload.bsc.finishPullDown(); 
                        }else{
                            payload.self.$bus.emit('upPullLoad');
                            payload.bsc.finishPullUp();
                        }
                          
                    }
                    let loadData = res.data.slice(0,payload.index);
                    commit('SAVE_INDEXBUSINESSDATA',{data:loadData});
				})
    },
   


}