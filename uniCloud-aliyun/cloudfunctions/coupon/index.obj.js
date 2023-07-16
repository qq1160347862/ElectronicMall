const db = uniCloud.database()
const dbCmd = db.command
const couponObj = uniCloud.importObject('coupon')
module.exports = {
	_before: function () { // 通用预处理器
				
	},
	
	
	add(){
		console.log("123");
	},
	async get(openid,token){
		let infer = await couponObj.tokenInfer(openid,token)
		let result = {
			tabList:[
				{
					name:'可使用',
					list:[]
				},
				{
					name:'已使用',
					list:[]
				},
				{
					name:'已过期',
					list:[]
				}
			],
			msg:'',
			code:-1
		}
		if(infer){
			let res = await db.collection('coupons').where({
				openid:openid
			}).get()
						
			//处理经数据库返回的信息，方便vuex存储和页面渲染
			res.data.map(item=>{
				if(item.status === '可使用'){
					result.tabList[0].list.push(item)
				}else if(item.status === '已使用'){
					result.tabList[1].list.push(item)
				}else{
					result.tabList[2].list.push(item)
				}
			})
			result.msg = '优惠券信息获取成功'
			result.code = 200
			return result
		}else{
			result.msg = '身份过期，请重新登陆'
			result.code = 201			
			return result
		}
		
	},
	update(){
		
	},
	delete(){
		
	},
	async tokenInfer(openid,token){
		//token身份判断
		let res = await uniCloud.callFunction({
			name:"tokenInfer",
			data:{
				token:token,
				openid:openid
			}
		})
		
		if(res.result){
			return true
		}else{				
			return false
		}
	},
	//公共的返回处理
	_after(error, result) {
		if(error) {
			throw error // 如果方法抛出错误，也直接抛出不处理
		}		
		return result
	}
	
}
