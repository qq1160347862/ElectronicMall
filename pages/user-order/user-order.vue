<template>
	<view class="user-order">
		<!-- 标签导航 -->
		<view class="user-order-tabs">
			<u-tabs :list="tabList" :scrollable="true" lineColor="#4a4a4a"
			:current="tabIndexNow"
			:activeStyle="{
			fontWeight: 'bold',}"
			@click="switchTab">
			</u-tabs>
		</view>
		
		
		<view class="user-order-container" v-show="tabIndex === tabIndexNow"
		v-for="(tabItem,tabIndex) in tabList" :key="tabIndex">
				
			<!-- 订单数据 -->
			<view class="user-order-item" 
			v-for="(orderItem,orderIndex) in tabItem.list" :key="orderIndex"
			v-if="tabItem.list.length > 0">
				<view class="user-order-item-top">
					<text class="order-id">订单号 {{orderItem.orderId}}</text>
					<text class="order-status">{{orderItem.orderStatus}}</text>
				</view>
				<view class="order-img-name-style-price-count" 
				v-for="(commodityItem,commodityIndex) in orderItem.commodityList" :key="commodityIndex">
					<view class="order-img">
						<u-image :src="commodityItem.imgUrl"
						:showLoading="true"
						width="160rpx"
						height="160rpx"
						radius="4"
						mode="aspectFill"></u-image>
					</view>
					<view class="order-name-style">
						<test class="order-name">{{commodityItem.name}}</test>
						<text class="order-style">{{commodityItem.commodityStyle}}</text>
					</view>
					<view class="order-price-count">
						<text class="order-price">￥{{commodityItem.price}}</text>
						<text class="order-count">× {{commodityItem.num}}</text>
					</view>					
				</view>
				<view class="user-order-item-bottom">
					<view class="order-total">
						<text class="order-total-text">总价￥{{orderItem.totalPrice}},运费￥{{orderItem.freight}},实付</text>
						<text class="order-total-price">￥{{orderItem.totalPrice + orderItem.freight}}</text>
					</view>
					
					<!-- 待付款 -->
					<view class="order-btn" 
					v-if="orderItem.orderStatus === '待付款'">
						<view style="width: 150rpx;margin-left:30rpx">
							<u-button text="取消订单"
							color="#a5a5a5"
							type="primary" 
							plain
							size="mini"
							shape="circle"
							></u-button>
						</view>
						<view style="width: 150rpx;margin-left:30rpx">
							<u-button text="付款"
							color="#fa4126"
							type="primary" 
							size="mini"
							shape="circle"
							></u-button>
						</view>						
					</view>
					<!-- 待发货 -->
					<view class="order-btn"
					v-if="orderItem.orderStatus === '待发货'">
						<view style="width: 150rpx;margin-left:30rpx">
							<u-button text="取消订单"
							color="#a5a5a5"
							type="primary" 
							plain
							size="mini"
							shape="circle"
							></u-button>
						</view>
						<view style="width: 150rpx;margin-left:30rpx">
							<u-button text="再次购买"
							color="#fa4126"
							type="primary" 
							size="mini"
							shape="circle"
							></u-button>
						</view>						
					</view>
					<!-- 待收货 -->
					<view class="order-btn"
					v-if="orderItem.orderStatus === '待收货'">
						<view style="width: 150rpx;margin-left:30rpx">
							<u-button text="确认收货"
							color="#fa4126"
							type="primary" 
							size="mini"
							shape="circle"
							></u-button>
						</view>						
					</view>
					<!-- 待评价 -->
					<view class="order-btn"
					v-if="orderItem.orderStatus === '待评论'">
						<view style="width: 150rpx;margin-left:30rpx">
							<u-button text="评价"
							color="#fa4126"
							type="primary" 
							size="mini"
							shape="circle"
							></u-button>
						</view>						
					</view>
				</view>
				
			</view>
			
			<!-- 没有订单 -->
			<view class="user-order-no-item" v-if="tabItem.list.length === 0">				
				<view class="user-order-no-item-icon">
					<u-image src="@/static/EmptyBox.png"
					:showLoading="true"
					width="200rpx"
					height="200rpx"
					mode="aspectFill"></u-image>
				</view>
				<view class="user-order-no-item-tip">
					<text>订单空空如也~~</text>
				</view>						
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	import {mapState, mapActions} from "vuex"
	export default {
		computed:{
			...mapState({
				tabList:state=>state.order.tabList,
				tabIndexNow:state=>state.order.tabIndexNow,
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

<style lang="scss">
.user-order-tabs {
	width: 100%;
	height: 100rpx;
	background-color: #fff;
}	
.user-order-container {
	.user-order-item {
		background-color: #fff;
		margin: 0 auto 30rpx;
		width: 100%;
		height: auto;
		
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 5rpx;
		border-top: #f5f5f5 solid 1rpx;
		border-bottom: #f5f5f5 solid 1rpx;
		&:first-child {
			margin: 20rpx auto 30rpx;
		}
		
		.user-order-item-top {
			width: 92%;
			height: 76rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.order-id {
				font-size: 24rpx;
				color: #333333;
			}
			.order-status {
				font-size: 24rpx;
				color: red;
			}
		}
		
		.order-img-name-style-price-count {
			width: 92%;
			height: 230rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 20rpx;
			&:last-child {
				margin-bottom: 0;
			}
			.order-img {
				width: 160rpx;
				height: 160rpx;
			}
			.order-name-style {
				padding: 0 20rpx;
				width: 400rpx;
				height: 160rpx;
				.order-name {					
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 28rpx;
					color: #333333;
					word-break: break-all;
					
				}
				.order-style {
					font-size: 24rpx;
					color: #333333;
				}
			}
			.order-price-count {
				height: 160rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				.order-price {
					font-size: 36rpx;
					color: red;
				}
				.order-count {
					margin-top: 30rpx;
					font-size: 24rpx;
					color: #333333;
				}
			}
		}
		
		.user-order-item-bottom {
			width: 92%;
			flex: 1;
			
			display: flex;
			flex-direction: column;
			// align-items: center;
			align-items: flex-end;
			justify-content: center;
			
			.order-total {
				.order-total-text {
					font-size: 24rpx;
					color: #333333;
				}
				.order-total-price {
					font-size: 36rpx;
					color: red;
				}
			}
			.order-btn {
				height: 80rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
			}
		}
		
	}
	.user-order-no-item {
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
		.user-order-no-item-tip {
			margin-top: 30rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #2c2c2c;
		}
	}
}
page {
	background-color: #f5f5f5;
}
</style>
