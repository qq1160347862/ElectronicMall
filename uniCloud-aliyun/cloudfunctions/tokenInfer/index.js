const jwt = require('jsonwebtoken')
const db = uniCloud.database()
const dbcmd = db.command
exports.main = async (event, context) => {
	
	const token_secret = 'xiaopengElectronicMall'
	const time = new Date().getTime()
	let token = ""
	
		
	let jwtJson = {}
	if(event.token===null){
		jwtJson = jwt.verify(token,token_secret)
	}else{
		jwtJson = jwt.verify(event.token,token_secret)
	}
	console.log(time,jwtJson.limitTime);
	//时间超过限定时间及身份过期
	if( (event.openid === jwtJson.openid) && (time < jwtJson.limitTime) ){
		
		return true
	}else{
		return false
	}
	
};
