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
		//获取当前用户状态
		isLogin(state){
			//如果当前处于登陆态返回true
			if(state.token !== null && state.token !== undefined && state.token !== ''){
				return true
			}else{
				return false
			}
		}
	},
	mutations:{
		init(state){			
			state.userInfo = uni.getStorageSync('userInfo')
			state.token = uni.getStorageSync('token')
			state.openId = uni.getStorageSync('openId')			
		},
		login(state,obj){
			//登陆初始化信息
			state.openId = obj.openid
			state.token = obj.token
			state.userInfo = obj.userInfo
			
			//持久化对象
			uni.setStorageSync('userInfo',obj.userInfo)
			uni.setStorageSync('token',obj.token)
			uni.setStorageSync('openId',obj.openid)
		},
		logout(state){
			//去除vuex数据
			state.openId = ''
			state.token = null
			state.userInfo = {}
			
			//删除持久化
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('token')
			uni.removeStorageSync('openId')
		},
		updateUserInfo(state,obj){
			state.userInfo = obj
			uni.setStorageSync('userInfo',obj)
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
				//  userInfo:
				// }
				//前端持久化信息
				commit('login',res.result)								
				return true
			}else {
				console.log("登陆太过频繁，请稍后再试");
				return false
			}									
		},
		async logout({commit}){
			commit('logout')
		}
	},
	modules:{
		car,
		path,
		order,
		coupon,
	}
})
export default store