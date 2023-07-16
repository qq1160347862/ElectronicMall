const db = uniCloud.database()
const dbcmd = db.command
exports.main = async (event, context) => {
	
	//更新数据库
	let res = await db.collection('users').where({
		openid: dbcmd.eq(event.openid)
	}).update({
		avatar_url:event.avatar_url,
		nickname:event.nickname,
		gender:event.gender,
		tel:event.tel
	})	
	
	//返回JSON
	let msgObj = {
		code:-1,
		msg:"",
	}
	
	//即成功更新数据
	if(res.updated > 0){
		msgObj.code = 200
		msgObj.msg = "用户信息更新成功"
	}
	
	//返回数据给客户端
	return msgObj
};
