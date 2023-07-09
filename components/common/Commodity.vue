<template>
	<!-- 单个商品组件 -->
	<view class="commodity">
		<view class="commodity-img">
			<u-image :src="data.thumb"
			:showLoading="true"
			width="300rpx"
			height="300rpx"
			mode="aspectFill"></u-image>
		</view>
		<view class="commodity-content">
			<text class="commodity-name">{{data.name}}</text>
			<view class="commodity-price" v-if="data.discount > 0">
				<text class="cur-price">${{calPrice(data.price, data.discount)}}</text>
				<text class="pre-price">${{data.price}}</text>
			</view>
			<view class="commodity-price" v-else>
				<text class="cur-price">${{data.price}}</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
export default {
	props:{
		data:Object
	},
	methods:{
		calPrice:function(price, discount){
			return Number((price*discount).toString().match(/^\d+(?:\.\d{0,1})?/))
		}
	}
}
</script>

<style scoped lang="scss">
.commodity {
	width: 320rpx;
	height: 480rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	.commodity-content {
		width: 100%;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		.commodity-name {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			font-size: 32rpx;
			color: #333333;
			word-break: break-all;
			padding: 0 20rpx;
			
		}
		.commodity-price {
			display: flex;
			justify-content: center;
			align-items: center;
			.cur-price {
				font-size: 32rpx;
				color: red;
				margin-right: 10rpx;
			}
			.pre-price {
				text-decoration: line-through;
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
	
}
</style>