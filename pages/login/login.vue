<template>
	<view class="login">
		<view class="login-container">
			<view class="login-logo">
				<u-image
				class="login-logo-img"
				src="/static/wechat.png"
				:showLoading="true"
				:showMenuByLongpress="false"
				width="240rpx"
				height="240rpx"
				radius="5"
				mode="aspectFill"></u-image>
			</view>
			<text class="login-text">微信登陆</text>
			<view class="login-btn">
				<view class="left">
					<u-button text="返回"
						color="#aaa"
						type="primary" 
						size="normal"
						@click="goBack"></u-button>
				</view>
				<view class="right">					
					<u-button text="一键登录" 
						color="#21d86d"
						type="primary" 
						size="normal"
						@click="login_wexin"></u-button>		
				</view>						
			</view>
			<view class="login-loadingAnime">
				<!-- 动画 -->
				<u-loading-icon :show="loadingAnime" 
				text="登陆中" textSize="12"
				mode="circle" color="#21d86d" vertical></u-loading-icon>
			</view>			
		</view>		
		
		
		
		<!-- 吐司 -->
		<u-toast ref="uToast"></u-toast>	
	</view>
</template>

<script>
	import {mapActions} from "vuex"
	export default {	
		data() {
			return {
				loadingAnime:false
			}
		},
		methods: {
			...mapActions(['login']),
			async login_wexin(){
				this.loadingAnime = true
				let res = await this.login()
				this.loadingAnime = false
				if(res){					
					// 1. 获取当前页面栈实例（此时最后一个元素为当前页）
					let pages = getCurrentPages()
					// 2. 上一页面实例
					// 注意是length长度，所以要想得到上一页面的实例需要 -2
					// 若要返回上上页面的实例就 -3，以此类推
					let prePage = pages[pages.length - 2]
					// 3. 给上一页面实例绑定getValue()方法和参数（注意是$vm）
					prePage.$vm.showToast()
					// 4. 返回上一页面
					uni.navigateBack({
						delta:1
					})					
				}else{
					//成功吐司提示
					this.$refs.uToast.show({
						type:'error',
						title:'error',
						message:'登陆失败，请稍后重试',
						position:'bottom',
						duration:1000
					})
				}
				
				
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.login {
	
	.login-container {
		width: 100%;
		height: 100%;
		background-color: #fff;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		
		
		.login-logo {
			position: absolute;
			top: 25%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		
		.login-text {
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%,-50%);
			font-size: 48rpx;
			font-weight: bold;
		}
		
		.login-loadingAnime {
			position: absolute;
			top: 60%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		
		.login-btn {
			position: absolute;
			top: 75%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.left {
				width: 200rpx;
			}
			.right {
				width: 200rpx;
			}
		}
		
	}
}
</style>
