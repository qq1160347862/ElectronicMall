<template>
	<view class="user">
		<view class="user-bgImg">
			<u-image src="../../../static/banner/banner1.png"
			:showLoading="true"
			width="100%"
			mode="aspectFill"></u-image>
		</view>
		<view class="user-info" @click="goUserSetting" v-if="isLogin">
			<view class="user-avatar">
				<u-avatar shape="circle"
				:src="userInfo.avatar_url"
				size="50"></u-avatar>
			</view>
			<view class="user-name">
				<text>{{userInfo.nickname}}</text>
			</view>
		</view>
		<view class="user-info" @click="goLogin" v-else>
			<view class="user-avatar">
				<u-avatar shape="circle"
				:src="userInfo.avatar_url"
				size="50"></u-avatar>
			</view>
			<view class="user-name">
				<text>点击登录</text>
			</view>
		</view>
		<view class="user-order">
			<view class="user-order-top">
				<text>我的订单</text>
				<view class="user-order-top-btn" @tap="goUserOrder(0)">
					<text>全部订单</text>
					<u-icon name="arrow-right"
					size="12" color="#6c6c6c"></u-icon>
				</view>
			</view>
			<view class="user-order-content">
				<view class="user-order-content-btn" @tap="goUserOrder(1)">
					<u-badge v-if="isLogin"  bgColor="red" max="99" :value="tabList[1].list.length" 
					absolute :offset="[3,0]"></u-badge>
					<u-icon name="shopping-cart" size="32"
					color="#6c6c6c"></u-icon>
					待付款
				</view>
				<view class="user-order-content-btn"  @tap="goUserOrder(2)">
					<u-badge  v-if="isLogin" bgColor="red" max="99" :value="tabList[2].list.length"
					absolute :offset="[3,0]"></u-badge>
					<u-icon name="shopping-cart" size="32"
					color="#6c6c6c"></u-icon>
					待发货
				</view>
				<view class="user-order-content-btn"  @tap="goUserOrder(3)">
					<u-badge  v-if="isLogin" bgColor="red" max="99" :value="tabList[3].list.length"
					absolute :offset="[3,0]"></u-badge>
					<u-icon name="shopping-cart" size="32"
					color="#6c6c6c"></u-icon>
					待收获
				</view>
				<view class="user-order-content-btn"  @tap="goUserOrder(4)">
					<u-badge  v-if="isLogin" bgColor="red" max="99" :value="tabList[4].list.length"
					absolute :offset="[3,0]"></u-badge>
					<u-icon name="shopping-cart" size="32"
					color="#6c6c6c"></u-icon>
					待评价
				</view>
				<view class="user-order-content-btn">
					<u-icon name="shopping-cart" size="32"
					color="#6c6c6c"></u-icon>
					退款/售后
				</view>
			</view>
		</view>
		
		
		<view class="user-setting">
			<view class="user-setting-item" @tap="goCoupon">
				<text class="user-setting-item-name">我的优惠券</text>
				<view class="user-setting-item-icon">
					<u-icon name="arrow-right" size="12"
					color="#6c6c6c"></u-icon>
				</view>				
			</view>
			<view class="user-setting-item">
				<text  class="user-setting-item-name">我的收藏</text>
				<view class="user-setting-item-icon">
					<u-icon name="arrow-right" size="12"
					color="#6c6c6c"></u-icon>
				</view>	
			</view>
			<view class="user-setting-item" @tap="goUserPath">
				<text  class="user-setting-item-name">我的收货地址</text>
				<view class="user-setting-item-icon">
					<u-icon name="arrow-right" size="12"
					color="#6c6c6c"></u-icon>
				</view>	
			</view>
			<view class="user-setting-item">
				<text  class="user-setting-item-name">在线客服</text>
				<view class="user-setting-item-icon">
					<u-icon name="arrow-right" size="12"
					color="#6c6c6c"></u-icon>
				</view>	
			</view>
			<view class="user-setting-item">
				<text  class="user-setting-item-name">关于</text>
				<view class="user-setting-item-icon">
					<u-icon name="arrow-right" size="12"
					color="#6c6c6c"></u-icon>
				</view>	
			</view>
		</view>
		<!-- 吐司 -->
		<u-toast ref="uToast"></u-toast>	
	</view>
</template>

<script>
	import {mapState, mapActions,mapGetters} from 'vuex'
	export default {	
		computed:{
			...mapState({
				tabList:state=>state.order.tabList,
				userInfo:state=>state.userInfo,
				token:state=>state.token
			}),
			...mapGetters(['isLogin'])
		},
		data() {
			return {
				
			}
		},
		methods: {
			...mapActions(['updateTabIndexNow']),
			goUserSetting(){
				uni.navigateTo({
					url:'../user-setting/user-setting'
				})
			},
			goLogin(){
				uni.navigateTo({
					url:'../login/login'
				})	
			},
			goUserPath(){				
				if(this.isLogin){
					uni.navigateTo({
						url:'../user-path/user-path'
					})
				}else{
					//失败后跳转至登陆页面重新登陆
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",
							
						})
					},2500)	
					this.$refs.uToast.show({
						type:'error',
						title:'错误',
						message:'身份过期，请登陆后重试',
						position:'bottom',
						duration:2000
					})
				}	
			},
			goUserOrder(tabIndexNow){
				
				if(this.isLogin){
					this.updateTabIndexNow(tabIndexNow)
					uni.navigateTo({
						url:'../user-order/user-order'
					})	
				}else{
					//失败后跳转至登陆页面重新登陆
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",
							
						})
					},2500)	
					this.$refs.uToast.show({
						type:'error',
						title:'错误',
						message:'身份过期，请登陆后重试',
						position:'bottom',
						duration:2000
					})
				}				
				
			},
			goCoupon(){
				if(this.isLogin){
					uni.navigateTo({
						url:'../coupon/coupon'
					})	
				}else{
					//失败后跳转至登陆页面重新登陆
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",
							
						})
					},2500)	
					this.$refs.uToast.show({
						type:'error',
						title:'错误',
						message:'身份过期，请登陆后重试',
						position:'bottom',
						duration:2000
					})
				}
				
			},
			showToast_login(){
				//成功吐司提示
				this.$refs.uToast.show({
					type:'success',
					title:'成功',
					message:'登陆成功',
					position:'bottom',
					duration:2000
				})
			},
			showToast_logout(){
				//成功吐司提示
				this.$refs.uToast.show({
					type:'success',
					title:'成功',
					message:'登出成功',
					position:'bottom',
					duration:2000
				})
			}
		}
	}
</script>

<style lang="scss">
.user-bgImg {
	position: fixed;
	top: -10%;
	left: 0;
	z-index: -10;
	width: 100%;
}
.user-info {
	width: 100%;
	height: 350rpx;
	display: flex;
	align-items: center;
	backdrop-filter: blur(10rpx);
	.user-avatar {
		margin-left: 30rpx;
	}
	.user-name {
		margin-left: 30rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
}
.user-order {
	margin: 0 auto;
	width: 92%;
	height: 260rpx;
	background-color: #fff;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.user-order-top {
		height: 100rpx;
		width: 100%;
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		
		font-size: 28rpx;
		text {
			margin-left: 30rpx;
		}
		.user-order-top-btn {
			margin-right: 30rpx;
			color: #6c6c6c;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	}
	.user-order-content {
		flex: 1;
		width: 100%;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		
		.user-order-content-btn {
			width: 120rpx;
			height: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			color: #6c6c6c;
			
			position: relative;
		}
	}
	
}
.user-setting {
	margin: 30rpx auto 0;
	width: 92%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.user-setting-item {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		font-size: 28rpx;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		&:first-child {
			border-top-left-radius: 10rpx;
			border-top-right-radius: 10rpx;
		}
		&:last-child {
			border-top-left-radius: 10rpx;
			border-top-right-radius: 10rpx;
		}
		.user-setting-item-name {
			margin-left: 30rpx;
		}
		.user-setting-item-icon {
			margin-right: 30rpx;
		}
	}
}
page {
	  background-color: rgb(245, 245, 245);
	}
</style>
