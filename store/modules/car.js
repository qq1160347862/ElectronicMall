export default{
	state:{
		list:[
			{
				id:1,
				name:"腾讯极光盒子5智能网络电视机顶盒6K千兆网络机顶盒4K高分辨率",
				commodityStyle:"经典白,经典套装",
				imgUrl:"../../../static/banner/banner1.png",
				price:99.00,
				num:1,
				checked:false,
			},
			{
				id:2,
				name:"腾讯极光盒子5智能网络电视机顶盒6K千兆网络机顶盒4K高分辨率",
				commodityStyle:"经典白,经典套装",
				imgUrl:"../../../static/banner/banner1.png",
				price:99.00,
				num:1,
				checked:false,
			},
			{
				id:3,
				name:"腾讯极光盒子5智能网络电视机顶盒6K千兆网络机顶盒4K高分辨率",
				commodityStyle:"经典白,经典套装",
				imgUrl:"../../../static/banner/banner1.png",
				price:99.00,
				num:1,
				checked:false,
			},
			{
				id:4,
				name:"腾讯极光盒子5智能网络电视机顶盒6K千兆网络机顶盒4K高分辨率",
				commodityStyle:"经典白,经典套装",
				imgUrl:"../../../static/banner/banner1.png",
				price:99.00,
				num:1,
				checked:false,
			},
		],
		selectedList:[],
	},
	//计算,执行判断动作
	getters:{
		//判断是否全选
		checkedAll(state){
			return state.list.length === state.selectedList.length
		},
		//合计+结算数量
		totalCount(state){
			let total = {
				num:0,
				price:0,
			}
			state.list.forEach(item=>{
				if(item.checked === true){
					//结算商品项数
					total.num = state.selectedList.length
					//合计
					total.price+=(item.num * item.price)
				}
			})
			return total
		},
		//返回选择商品的数量
		checkedNum(state){			
			return state.selectedList.length
		},
		//选中的商品信息
		checkedItem(state){
			let res = []
			state.list.forEach(item=>{
				if(item.checked === true){				
					res.push(item)
				}
			})
			return res
		}
	},
	mutations:{
		//全选
		selectAll(state){
			state.selectedList = state.list.map(item=>{
				item.checked = true
				return item.id
			})
		},
		//不选
		unSelectAll(state){
			state.list.forEach(item=>{
				item.checked = false
			})
			state.selectedList = []
		},
		//单选
		selectItem(state,index){
			let id = state.list[index].id
			let i = state.selectedList.indexOf(id)
			
			if( i > -1 ){
				//i > -1 表示找到该元素，即目前是被选择的，需要取消
				state.list[index].checked = false
				state.selectedList.splice(i,1)
			}else{
				//i = -1 表示找不到该元素，即目前是不被选择的，需要选择
				state.list[index].checked = true
				state.selectedList.push(id)
			}
			
			console.log(i);
		},
		//删除
		delItem(state){
			//查找list和selectedList中相交的商品，有的话就删除
			//即把选择的商品删除掉
			state.list = state.list.filter(item=>{
				return state.selectedList.indexOf(item.id) === -1
			})
		}
	},
	actions:{
		checkAll({commit, getters}){
			//逻辑：如果选择列表已经满了，那么下一个动作就是取消全选
			//否则就是应用全选
			getters.checkedAll ? commit("unSelectAll") : commit("selectAll")
		},
		delItem({commit}){
			//删除完毕时取消全选状态
			commit('delItem')
			commit('unSelectAll')
			uni.showToast({
				title:'删除成功',
				icon:"none"
			})
		}
	}
}