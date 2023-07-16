const db = uniCloud.database()
const dbcmd = db.command
const jwt = require('jsonwebtoken')
exports.main = async (event, context) => {
	
	const appid = "wx1d8656000ce2cecf"
	const secret = "383f8f65b7d006afc2fb8d54e8205e15"
	const grant_type = "authorization_code"	
	const token_secret = 'xiaopengElectronicMall'
	const time = new Date().getTime()
	const limit = 1000 * 60 * 10  //10分钟的token
	
	
	//获取用户openId和session_key
	let res = await uniCloud.httpclient.request(
		`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${event.code}&grant_type=${grant_type}`
	,{
		method:'GET',
		dataType:'json',
		headers:{'content-type':'application/json'}
	})	
	const payload = {
		openid:res.data.openid,
		limitTime:(time + limit)
	}
	
	
	//返回JSON
	let msgObj = {
		code:-1,
		msg:"",
		token:"",
		openid:res.data.openid,
		userInfo:{}
	}
	
	
	//查询用户
	let hasOpenId = await db.collection('users').where({
		openid: dbcmd.eq(res.data.openid)
	}).get()
	//查数据库，如果有当前用户则更新session_key
	if(hasOpenId.data.length > 0){
		db.collection('users').doc(hasOpenId.data[0]._id).update({
			session_key:res.data.session_key
		})		
		msgObj.code = 701
		msgObj.msg = `${hasOpenId.data[0].nickname}上线成功`		
	}else {
		//没有则添加用户
		db.collection('users').add({
			nickname:event.userInfo.nickName,			
			tel:'',
			avatar_url:event.userInfo.avatarUrl,
			gender:event.userInfo.gender,
			roles:'USER',
			session_key:res.data.session_key,
			openid:res.data.openid,
			register_date:time
		})
		msgObj.code = 702
		msgObj.msg = `${event.userInfo.nickName}上线成功`
	}
	
	//返回用户信息
	let userData = await db.collection('users').doc(hasOpenId.data[0]._id).get()
	msgObj.userInfo = userData.data[0]
	//生成token
	msgObj.token = jwt.sign(payload, token_secret)
	//返回数据给客户端
	return msgObj
};

			
			
			