export default{
	state:{
		list:[
			{
				userName:'俞用湘',
				tel:'15523990656',
				area:'贵州省 黔南布衣族苗族自治州 都匀市',
				detailAddress:'城东烟酒店2楼',
				tagName:'学校',
				isDefault:false,
			},
			{
				userName:'俞用湘',
				tel:'15523990656',
				area:'贵州省 黔南布衣族苗族自治州 都匀市',
				detailAddress:'城东烟酒店2楼',
				tagName:'公司',
				isDefault:true,
			},
			{
				userName:'俞用湘',
				tel:'15523990657',
				area:'贵州省 黔南布衣族苗族自治州 都匀市',
				detailAddress:'城东烟酒店2楼',
				tagName:'家庭',
				isDefault:false,
			},
			{
				userName:'俞用湘',
				tel:'15523990656',
				area:'贵州省 黔南布衣族苗族自治州 都匀市',
				detailAddress:'城东烟酒店2楼',
				tagName:'朋友',
				isDefault:false,
			},
			{
				userName:'俞用湘',
				tel:'15523990656',
				area:'贵州省 黔南布衣族苗族自治州 都匀市',
				detailAddress:'城东烟酒店2楼',
				tagName:'亲人',
				isDefault:false,
			},
		],
		tagList:[
			{
				name:"家庭"
			},
			{
				name:"学校"
			},
			{
				name:"公司"
			},
			{
				name:"朋友"
			}
		]
	},
	getters:{
		
	},
	mutations:{
		createPath(state, obj){
			state.list.unshift(obj)
		},
		updatePath(state, {index, item}){
			for(let e in item){
				state.list[index][e] = item[e]
			}
		},
		deletePath(state, index){
			state.list.splice(index,1)
		},
		//将之前的默认地址状态关闭
		updateDefaultPath(state){
			state.list.forEach(item=>{
				if(item.isDefault){
					item.isDefault = false
				}
			})
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
			if(obj.isDefault){
				commit('updateDefaultPath')
			}
			commit('createPath',obj)
		},
		updatePath({commit}, obj){
			//如果当前的地址是默认的话，需要更新其他地址的默认状态
			if(obj.item.isDefault){
				commit('updateDefaultPath')
			}
			commit('updatePath',obj)
		},
		deletePath({commit}, index){
			commit('deletePath',index)
		},
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
				commit('createTag',obj)
				return true
			}
			
		},
		deleteTag({commit}, index){
			commit('deleteTag',index)
		}
	}
}