const db = uniCloud.databaseForJQL()
const dbCmd = db.command
const pathObj = uniCloud.importObject('path')
module.exports = {
	_before: function () { // 通用预处理器

	},
	
	async add(openid,token,obj){
		let infer = await pathObj.tokenInfer(openid,token)
		let result = {
			msg:'',
			code:-1,
			data:{},
			openid:openid,
			token:token
		}
		
		if(infer){
			//增加地址信息
			let res = await db.collection('paths').add({
				openid: openid,
				defaulted: obj.isDefault,
				area: obj.area,
				detail_address: obj.detailAddress,
				tagid: obj.tagid._id,
				realname: obj.userName,
				tel: obj.tel
			})
			//{"id":"64b5089f8b0da41af02e4be6"}
			result.data = obj
			result.data._id = res.id
			result.msg = '新增地址成功'
			result.code = 200
			return result
		}else{
			result.msg = '身份过期，请重新登陆'
			result.code = 201			
			return result
		}
	},
	async get(openid,token){
		let infer = await pathObj.tokenInfer(openid,token)
		let result = {
			list:[],
			msg:'',
			code:-1
		}
		
		if(infer){
			//获取地址信息,需要联表查询
			let paths = db.collection('paths').getTemp()
			let path_tags = db.collection('path_tags').field('_id,name').getTemp()
			
			let res = await db.collection(paths,path_tags)
			.where(`paths.openid == ${openid} && path_tags._id == paths.tagid`).get()
			res.data.map(item=>{
				result.list.push({
					_id:item._id,
					userName:item.realname,
					tel:item.tel,
					area:item.area,
					detailAddress:item.detail_address,
					tagid:item.tagid[0],
					isDefault:item.defaulted
				})
			})
			
			
			result.msg = '地址获取成功'
			result.code = 200
			return result
		}else{
			result.msg = '身份过期，请重新登陆'
			result.code = 201			
			return result
		}
	},
	async delete(openid,token,id){
		let infer = await pathObj.tokenInfer(openid,token)
		let result = {
			msg:'',
			code:-1
		}
		
		if(infer){
			//删除地址标签信息
			let res = await db.collection('paths').doc(id).remove()
			//{"affectedDocs":1,"deleted":1}
			
			result.msg = '地址删除成功'
			result.code = 200
			return result
		}else{
			result.msg = '身份过期，请重新登陆'
			result.code = 201			
			return result
		}
	},
	async update(openid,token,obj){
		let infer = await pathObj.tokenInfer(openid,token)
		let result = {
			msg:'',
			code:-1,
			openid:openid,
			token:token
		}
		
		if(infer){
			//修改地址信息
			console.log(obj.tagid)
			let res = await db.collection('paths').doc(obj._id).update({
				defaulted: obj.isDefault,
				area: obj.area,
				detail_address: obj.detailAddress,
				tagid: obj.tagid_id,
				realname: obj.userName,
				tel: obj.tel
			})
			
			result.msg = '地址修改成功'
			result.code = 200
			return result
		}else{
			result.msg = '身份过期，请重新登陆'
			result.code = 201			
			return result
		}
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
	
	async setDefaultFalse(openid,token,id){
		let infer = await pathObj.tokenInfer(openid,token)
		let result = {
			msg:'',
			code:-1
		}
		
		if(infer){
			//获取用户所有的所有地址
			let res = await db.collection('paths').where({
				openid:openid,
				_id:dbCmd.neq(id)
			}).update({
				defaulted:false
			})
			//{"affectedDocs":1,"deleted":1}
			
			result.msg = '地址状态更改成功'
			result.code = 200
			return result
		}else{
			result.msg = '身份过期，请重新登陆'
			result.code = 201			
			return result
		}
	}
	
}
