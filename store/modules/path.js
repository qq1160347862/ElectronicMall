const pathTagObj = uniCloud.importObject('path_tag')
const pathObj = uniCloud.importObject('path')
export default{
	state:{
		list:[
			// {
			// 	userName:'俞用湘',
			// 	tel:'15523990656',
			// 	area:'贵州省 黔南布衣族苗族自治州 都匀市',
			// 	detailAddress:'城东烟酒店2楼',
			// 	tagName:'学校',
			// 	isDefault:false,
			// },
			// {
			// 	userName:'俞用湘',
			// 	tel:'15523990656',
			// 	area:'贵州省 黔南布衣族苗族自治州 都匀市',
			// 	detailAddress:'城东烟酒店2楼',
			// 	tagName:'公司',
			// 	isDefault:true,
			// },
			// {
			// 	userName:'俞用湘',
			// 	tel:'15523990657',
			// 	area:'贵州省 黔南布衣族苗族自治州 都匀市',
			// 	detailAddress:'城东烟酒店2楼',
			// 	tagName:'家庭',
			// 	isDefault:false,
			// },
			// {
			// 	userName:'俞用湘',
			// 	tel:'15523990656',
			// 	area:'贵州省 黔南布衣族苗族自治州 都匀市',
			// 	detailAddress:'城东烟酒店2楼',
			// 	tagName:'朋友',
			// 	isDefault:false,
			// },
			// {
			// 	userName:'俞用湘',
			// 	tel:'15523990656',
			// 	area:'贵州省 黔南布衣族苗族自治州 都匀市',
			// 	detailAddress:'城东烟酒店2楼',
			// 	tagName:'亲人',
			// 	isDefault:false,
			// },
		],
		tagList:[
			// {
			// 	name:"家庭"
			// },
			// {
			// 	name:"学校"
			// },
			// {
			// 	name:"公司"
			// },
			// {
			// 	name:"朋友"
			// }
		]
	},
	getters:{
		
	},
	mutations:{
		createPath(state, obj){
			state.list.push(obj)
		},
		updatePath(state, {index, item}){
			for(let e in item){
				state.list[index][e] = item[e]
			}
		},
		deletePath(state, index){
			state.list.splice(index,1)
		},
		getPath(state, arr){
			state.list = arr
		},
		
		
		//将之前的默认地址状态关闭
		updateDefaultPath(state){			
			state.list.forEach(item=>{
				if(item.isDefault){
					item.isDefault = false
				}
			})
		},
		
		
		//标签方法如下
		getTag(state, arr){
			state.tagList = arr
		},
		createTag(state, obj){
			state.tagList.unshift(obj)
		},
		deleteTag(state, index){			
			state.tagList.splice(index, 1)
		}
	},
	actions:{
		createPath({commit}, obj){
			//如果当前的地址是默认的话，需要更新其他地址的默认状态
			if(obj.data.isDefault){				
				//更新数据库中所有该用户地址的默认状态
				pathObj.setDefaultFalse(obj.openid,obj.token,obj.data._id).then(res=>{
					if(res.code === 200){
						commit('updateDefaultPath')
						commit('createPath',obj.data)
					}else{
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",								
							})
						},2500)	
						uni.showToast({
							icon:"none",
							duration:2000,
							title:"身份过期，请登陆后重试",							
						})
					}
				})				
			}			
		},
		updatePath({commit}, obj){
			//如果当前的地址是默认的话，需要更新其他地址的默认状态
			if(obj.item.isDefault){
				//更新数据库中所有该用户地址的默认状态
				pathObj.setDefaultFalse(obj.openid,obj.token,obj._id).then(res=>{
					if(res.code === 200){
						commit('updateDefaultPath')
						commit('updatePath',{index:obj.index,item:obj.item})
					}else{
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",								
							})
						},2500)	
						uni.showToast({
							icon:"none",
							duration:2000,
							title:"身份过期，请登陆后重试",							
						})
					}
				})
				
			}			
		},
		async deletePath({commit}, index){
			await commit('deletePath',index)
		},
		
		//标签
		createTag({state,commit}, obj){
			let infer = false
			state.tagList.map(item=>{
				//重复标签，添加失败
				if(obj.name === item.name){
					infer =  true
				}
			})
			if(infer){				
				return false
			}else{
				pathTagObj.add(obj.openid,obj.token,obj.name).then(res=>{
					if(res.code === 200){
						commit('createTag',{
							_id:res.id,
							openid:obj.openid,
							name:obj.name
						})
					}else{
						throw new Error(res.msg)
					}
				})
				
				return true
			}
			
		},
		async deleteTag({commit}, index){
			await commit('deleteTag',index)
		}
	}
}