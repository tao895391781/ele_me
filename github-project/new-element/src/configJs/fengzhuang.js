//本地存储sessionStorage、localStorage
export const setStorage = (name,content)=>{
	if(!name) return;
	if(typeof content !=='string'){
			content = JSON.stringify(content);
		}
		// console.log(type)
	window.localStorage.setItem(name,content);
}
//获取存储
export const getStorage = (name)=>{
	if(!name) return ;
	return JSON.parse(window.localStorage.getItem(name));

}
export const delStorage = (name)=>{
	if(!name) return
	window.localStorage.clear(name);
}
//图片出现在可视区域显示src---懒加载
export const scrollRequest = (element,ifhasBottomNav,callbacks)=>{
	let flag = true
	let docHeight = document.documentElement.clientHeight;
	let Eletop = element.getBoundingClientRect().top;
	//有底部导航
	if(flag){
		if(ifhasBottomNav == 'have'){
			if(docHeight>Eletop + 43){
				callbacks();
			}
		}else{
			if(docHeight>Eletop){
				callbacks();
			}	
		}		
	}
}
//下拉刷新
export const pullingDown = (bscroll,fn)=>{
	bscroll.on('pullingDown',function(){
		fn();
		bscroll.finishPullDown()
	});
};
//首页人均价格带，计算价格和商家对应的关系
export const countPriceWithStoreCount = function(minPrice,maxPrice,maxPrice1,countNum){
	let totalCount = 4399;
	if(minPrice == 0 && maxPrice == maxPrice1){
		return totalCount;
	}
};

