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