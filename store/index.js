import Vue from "vue"
import Vuex from "vuex"
import car from "@/store/modules/car.js"
import path from "@/store/modules/path.js"
import order from "@/store/modules/order.js"
import coupon from "@/store/modules/coupon.js"
Vue.use(Vuex)


const store = new Vuex.Store({
	//公共变量
	state:{
		token:null,
		openId:'',
		userInfo:{},
		
	},
	getters: {
		
	},
	mutations:{
		init(state){			
			state.userInfo = uni.getStorageSync('userInfo')
			state.token = uni.getStorageSync('token')
		},
		login(state,obj){
			//登陆初始化信息
			state.openId = obj.openid
			state.token = obj.token
			
			//持久化对象
			uni.setStorageSync('userInfo',state.userInfo)
			uni.setStorageSync('token',state.token)
		},
		updateUserInfo(state,obj){
			state.userInfo = obj
		}
	},
	actions:{
		async login({commit}){
			
			let userInfo = await uni.getUserProfile({
				provider:"weixin",
				desc:"获取你的昵称、头像、地区及性别",
				lang:"zh_CN",
			})
			
			console.log(userInfo)
			
			if(userInfo){
				let {code} = await uni.login({
					provider:"weixin",														
				})
				
				//vuex存储用户信息
				commit('updateUserInfo',userInfo.userInfo)
				
				//获取用户openId和session_key
				let res = await uniCloud.callFunction({
					name:"login",
					data:{
						code:code,
						userInfo:userInfo.userInfo
					}
				})
				//result:{
				// 	code:
				// 	msg:
				// 	token:
				// }
				//前端持久化信息
				commit('login',res.result)								
				return true
			}else {
				console.log("登陆太过频繁，请稍后再试");
				return false
			}									
		},
	},
	modules:{
		car,
		path,
		order,
		coupon,
	}
})
export default store