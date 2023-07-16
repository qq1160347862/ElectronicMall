<script>
	import store from 'store/index.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.commit('init')
			//设置Token认证拦截器
			uniCloud.addInterceptor('callFunction',{
				invoke(param) {
					// param为拦截Api的参数 例 {name: 'functionName', data: {'functionParam1': 1, 'functionParam2': 2}}
					// 此处返回错误可终止api执行
					if(param.name !== 'login' && param.name !== 'tokenInfer'){
						console.log('云函数拦截器启动...');
						console.log('拦截的api',param);						
					}					
				},
				success(res) {
					// res为callFunction的返回值，此处可以对返回值进行修改					
					console.log('云函数返回成功',res);
				},
				fail(err) {
					// err为callFunction抛出的错误
					console.log('云函数返回错误',err);
				}
			})
			
			//设置上传文件拦截器
			uniCloud.addInterceptor('uploadFile',{
				async invoke(param) {
					// param为拦截Api的直接对象参数，即直接上传的内容
					// 此处返回错误可终止api执行
					console.log('云上传拦截器启动...');
					console.log('拦截的api',param);
					
					
					
					let res = await uniCloud.callFunction({
						name:"tokenInfer",
						data:{
							token:param.token,
							openid:param.openid
						}
					})
					
					if(res.result){
						console.log("token认证成功");
						return true
					}else{																							
						// return false
						//这里用return false依然会执行文件上传API，所以用抛出错误来跳转到fail()回调
						throw new Error('token认证失败')
					}
					
									
				},
				success(res) {
					// res为uploadFile的返回值，此处可以对返回值进行修改
					console.log('云上传返回成功',res);
				},
				fail(err) {
					// err为uploadFile抛出的错误
					console.log('云上传返回错误',err);
				}
				
			})
			// uni.hideTabBar()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";	
</style>
