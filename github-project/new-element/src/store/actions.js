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
                            payload.self.$bus.emit('hiddenText',[payload.bsc]);
                        }else{
                            payload.self.$bus.emit('hiddenUpPullLoad');
               
                        }       
                    }
                    console.log(payload.index);
                    console.log(this.state.indexBusinessData)
                    let loadData = res.data.slice(0,payload.index);
                    if(this.state.indexBusinessData.length == res.data.length){
                        console.log('已经到底了，不发请求');
                        payload.bsc.closePullUp()
                    }else{
                       commit('SAVE_INDEXBUSINESSDATA',{data:loadData}); 
                    }
                    
				})
    },
}