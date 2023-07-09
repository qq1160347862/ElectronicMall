import Vue from "vue"
import Vuex from "vuex"
import car from "@/store/modules/car.js"
import path from "@/store/modules/path.js"
import order from "@/store/modules/order.js"
Vue.use(Vuex)


const store = new Vuex.Store({
	//公共变量
	state:{
		
	},
	getters: {
		
	},
	mutations:{
		
	},
	actions:{
		
	},
	modules:{
		car,
		path,
		order,
	}
})
export default store