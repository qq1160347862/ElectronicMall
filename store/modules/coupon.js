export default {
	state:{
		tabList:[
			{
				name:'可使用',
				list:[
					{
						type:'discount',
						name:'生鲜折扣券',
						num:0.55,
						status:'可使用',
						condition:'无门槛使用',
						conditionNum:0,
						validStart:'2019.11.18',
						validEnd:'2023.12.18'
					},
					{
						type:'rebate',
						name:'生鲜满减券',
						num:18,
						status:'可使用',
						condition:'满100元可用',
						conditionNum:100,
						validStart:'2019.11.18',
						validEnd:'2023.12.18'
					}
				]
			},
			{
				name:'已使用',
				list:[
					{
						type:'discount',
						name:'生鲜折扣券',
						num:0.55,
						status:'已使用',
						condition:'无门槛使用',
						conditionNum:0,
						validStart:'2019.11.18',
						validEnd:'2023.12.18'
					},
					{
						type:'rebate',
						name:'生鲜满减券',
						num:18,
						status:'已使用',
						condition:'满100元可用',
						conditionNum:100,
						validStart:'2019.11.18',
						validEnd:'2023.12.18'
					}
				]
			},
			{
				name:'已过期',
				list:[
					{
						type:'discount',
						name:'生鲜折扣券',
						num:0.55,
						status:'已过期',
						condition:'无门槛使用',
						conditionNum:0,
						validStart:'2019.11.18',
						validEnd:'2023.6.11'
					},
					{
						type:'rebate',
						name:'生鲜满减券',
						num:18,
						status:'已过期',
						condition:'满100元可用',
						conditionNum:100,
						validStart:'2019.11.18',
						validEnd:'2023.6.11'
					}
				]
			}
		],
		tabIndexNow:0,
	},
	getters:{
		
	},		
	mutations:{
		updateTabIndexNow(state, index){
			state.tabIndexNow = index
		}
	},
	actions:{
		updateTabIndexNow({commit}, index){
			commit('updateTabIndexNow', index)
		}
	}
}