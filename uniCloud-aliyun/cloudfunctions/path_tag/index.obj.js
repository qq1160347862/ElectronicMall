const db = uniCloud.database()
const dbCmd = db.command
const pathTagObj = uniCloud.importObject('path_tag')
module.exports = {
	_before: function () { // 通用预处理器

	},
	
	async add(openid,token,name){
		let infer = await pathTagObj.tokenInfer(openid,token)
		let result = {
			msg:'',
			code:-1,
			id:''
		}
		
		if(infer){
			//增加地址标签信息
			let res = await db.collection('path_tags').add({
				openid: openid,
				name: name,
			})
			//{"id":"64b5089f8b0da41af02e4be6"}
			result.id = res.id
			result.msg = '新增地址标签成功'
			result.code = 200
			return result
		}else{
			result.msg = '身份过期，请重新登陆'
			result.code = 201			
			return result
		}
	},
	async get(openid,token){
		let infer = await pathTagObj.tokenInfer(openid,token)
		let result = {
			tagList:[],
			msg:'',
			code:-1
		}
		
		if(infer){
			//获取地址标签信息
			let res = await db.collection('path_tags').where({
				openid:openid
			}).get()
			
			result.tagList = res.data
			
			result.msg = '地址标签获取成功'
			result.code = 200
			return result
		}else{
			result.msg = '身份过期，请重新登陆'
			result.code = 201			
			return result
		}
	},
	async delete(openid,token,id){
		let infer = await pathTagObj.tokenInfer(openid,token)
		let result = {
			msg:'',
			code:-1
		}
		
		if(infer){
			//删除地址标签信息
			let res = await db.collection('path_tags').doc(id).remove()
			//{"affectedDocs":1,"deleted":1}
			
			result.msg = '地址标签删除成功'
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
}
