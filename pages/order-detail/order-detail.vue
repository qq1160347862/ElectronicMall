<template>
	<view class="order-detail">
		<view class="order-detail-top">
			<view class="order-detail-status">
				<text style="font-size: 44rpx;font-weight: bold;">{{orderItem.orderStatus}}</text>				
				<u-count-down 
				:time="24 * 60 * 60 *1000" 
				format="HH:mm:ss"
				autoStart
				millisecond
				@change="countdownChange">
					<text style="margin-top: 10rpx;font-size: 28rpx;">
						剩{{ orderItem.countdown.hours>10?orderItem.countdown.hours:'0'+orderItem.countdown.hours}}小时{{ orderItem.countdown.minutes }}分{{ orderItem.countdown.seconds }}秒支付，过时订单将会取消
					</text>
				</u-count-down>
			</view>
			<view class="order-detail-top-item">
				<view class="order-detail-top-item-icon">
					<u-icon name="map-fill" size="16"
					color="#6c6c6c"></u-icon>
				</view>
				<view class="order-detail-top-item-info">
					<text style="font-size: 28rpx;">{{orderItem.address.userName}} {{orderItem.address.tel}}</text>
					<text style="font-size: 24rpx;color: #aaaaaa;margin-top: 10rpx;">{{orderItem.address.detailAddress}}</text>
				</view>				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			let orderObj = JSON.parse(e.data)			
			this.orderItem = orderObj
			//获取确认订单中的订单id，然后getter查询返回order数据
		},
		data() {
			return {
				orderItem:{},
			}
		},
		methods: {
			countdownChange(e){
				this.orderItem.countdown = e
			}
		}
	}
</script>

<style lang="scss">
.order-detail {
	.order-detail-top {
		
		height: 350rpx;
		width: 100%;
		background-color: #fff;
		
		.order-detail-status {
			height: 200rpx;
			width: 92%;
			margin: 0 auto;
			
			background-color: #fb543c;
			
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #fff;
			border-radius: 10rpx;
		}
		.order-detail-top-item {
			height: 150rpx;
			width: 100%;
			display: flex;
			flex-direction: row;		
			align-items: center;
			
			.order-detail-top-item-icon {
				display: flex;
				flex-direction: row;		
				align-items: center;
				justify-content: center;
				width: 100rpx;
			}
			.order-detail-top-item-info {
				display: flex;
				flex-direction: column;		
				justify-content: center;
				flex: 1;
			}
		}
	}
	
}	
page {
	background-color: #f5f5f5;
}
</style>
