<template>
	<view class="coupon">
		<!-- 标签导航 -->
		<view class="coupon-tabs">
			<u-tabs :list="tabList" :scrollable="true" lineColor="#4a4a4a"
			:current="tabIndexNow"
			:activeStyle="{
			fontWeight: 'bold',}"
			
			@click="switchTab">
			</u-tabs>
		</view>
		
		<view class="coupon-container" v-show="tabIndex === tabIndexNow"
		v-for="(tabItem,tabIndex) in tabList" :key="tabIndex">			
			<!-- 订单数据 -->
			<view class="coupon-item" 
			v-for="(couponItem,couponIndex) in tabItem.list" :key="couponIndex"
			v-if="tabItem.list.length > 0">
				<view :class="[couponItem.status==='可使用' ? 'coupon-item-left' : 'coupon-item-left-none']">
					<view class="coupon-item-num">
						<text style="font-size: 52rpx;font-weight: bold;" v-show="couponItem.type==='discount'">{{couponItem.num * 10}}</text>
						<text style="font-size: 52rpx;font-weight: bold;" v-show="couponItem.type==='rebate'">{{couponItem.num}}</text>
						<text style="font-size: 28rpx;" v-show="couponItem.type==='discount'">折</text>
						<text style="font-size: 28rpx;" v-show="couponItem.type==='rebate'">元</text>
					</view>
					<view class="coupon-item-condition">
						{{couponItem.condition}}
					</view>
				</view>
				<view class="coupon-item-right">
					<view class="coupon-item-name-valid">
						<text class="coupon-item-name">{{couponItem.name}}</text>
						<text class="coupon-item-valid">{{couponItem.validStart}}-{{couponItem.validEnd}}</text>
					</view>
					<view class="coupon-item-btn">
						<view style="width: 100rpx;margin-right:30rpx" v-show="couponItem.status==='可使用'">
							<u-button :text="couponItem.status"
							color="#fa4126"
							plain
							type="primary" 
							size="mini"
							shape="circle"
							></u-button>
						</view>
						<view style="width: 100rpx;margin-right:30rpx" v-show="couponItem.status!=='可使用'">
							<u-button :text="couponItem.status"
							color="#fa4126"
							plain
							type="primary" 
							size="mini"
							shape="circle"
							disabled
							></u-button>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- 没有优惠券 -->
			<view class="coupon-no-item" v-if="tabItem.list.length === 0">				
				<view class="coupon-no-item-icon">
					<u-image src="@/static/EmptyBox.png"
					:showLoading="true"
					width="200rpx"
					height="200rpx"
					mode="aspectFill"></u-image>
				</view>
				<view class="coupon-no-item-tip">
					<text>优惠券空空如也~~</text>
				</view>						
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	export default {
		computed:{
			...mapState({
				tabList:state=>state.coupon.tabList,
				tabIndexNow:state=>state.coupon.tabIndexNow,
			})
		},
		data() {
			return {				
				
			}
		},
		methods: {
			...mapActions(['updateTabIndexNow']),
			switchTab(item){
				this.updateTabIndexNow(item.index)
				console.log(item);
			}
		}
	}
</script>

<style scoped lang="scss">
.coupon-tabs {
	width: 100%;
	height: 105rpx;
	background-color: #fff;
	
}	


.coupon-container {
	.coupon-no-item {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		
		width: 100%;
		height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.coupon-no-item-tip {
			margin-top: 30rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #2c2c2c;
		}
	}
	
	
	.coupon-item {
		background-color: #fff;
		margin: 0 auto 30rpx;
		width: 92%;
		height: 180rpx;
		
		border: #dedede solid 2rpx;
		border-radius: 10rpx;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		
		position: relative;
		
		&:first-child {
			margin: 20rpx auto 30rpx;
		}
		
		.coupon-item-left {
			height: 100%;
			flex: 1;
			background-color: #ffded9;
			
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
			
			.coupon-item-num {
				color: red;
			}
			.coupon-item-condition {
				font-size: 28rpx;
				color: red;
			}
		}
		.coupon-item-right {
			height: 100%;
			flex: 2;
			background-color: #fff;
			
			display: flex;
			align-items: center;
			
			.coupon-item-name-valid {
				height: 100%;
				flex: 2;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;				
				
				.coupon-item-name {
					margin-left: 30rpx;
					font-size: 28rpx;
					font-weight: bold;					
				}
				.coupon-item-valid {
					margin-left: 30rpx;
					font-size: 22rpx;
					color: #949494;
				}
			}
			.coupon-item-btn {
				height: 100%;
				flex: 1;
				display: flex;
				align-items: center;
			}
		}
		
		.coupon-item-left-none {
			height: 100%;
			flex: 1;
			background-color: #dedede;
			
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
			
			.coupon-item-num {
				color: #000;
			}
			.coupon-item-condition {
				font-size: 28rpx;
				color: #000;
			}
		}
		&::before {
			content: '';
			display: block;
			width: 30rpx;
			height: 30rpx;
			background-color: #fff;		
			border-radius: 50%;
				
			position: absolute;
			top: 0;
			left: 33.3%;
			transform: translate(-50%,-50%);
		}
		&::after {
			content: '';
			display: block;
			width: 30rpx;
			height: 30rpx;
			background-color: #fff;		
			border-radius: 50%;
				
			position: absolute;
			bottom: 0;
			left: 33.3%;
			transform: translate(-50%,50%);
		}
		
	}
}
</style>
