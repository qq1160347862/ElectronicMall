<template>
	<view class="confirm-order">
		
		<view class="confirm-order-address-container" @tap="goUserPath">
			<view class="confirm-order-address" v-if="!addressIsEmpty">
				<view class="confirm-order-address-left">
					<u-icon name="map" size="24"></u-icon>
				</view>
				<view class="confirm-order-address-right">
					<text>{{address.area}}</text>
					<view class="confirm-order-address-tag">
						<text style="margin-right: 20rpx;">{{address.detailAddress}}</text>
						<u-tag :text="address.tagName" plain plainFill
						size="mini" bgColor="#ecf5ff"
						borderColor="#ecf5ff"
						color="blue"></u-tag>
					</view>					
					<text>{{address.userName}} {{address.tel}}</text>
				</view>
				<view class="confirm-order-address-right-icon">
					<u-icon name="arrow-right" size="16" color="#afafaf"></u-icon>
				</view>
			</view>
			<view class="confirm-order-no-address" v-else>				
				<view class="confirm-order-no-address-top">
					<view class="confirm-order-no-address-icon">
						<u-icon name="plus" size="12" color="#000"></u-icon>
					</view>					
					<text class="confirm-order-no-address-text">添加收货地址</text>
				</view>				
				<colorBar></colorBar>				
			</view>
		</view>
		
		<view class="confirm-order-commodityContainer">
			<view class="confirm-order-commodity-top">
				<u-icon name="list-dot" size="20"></u-icon>
				<text>云Mall深圳旗舰店</text>
			</view>
			<view class="confirm-order-commodity-item" v-for="(item,index) in commodityList">
				<view class="confirm-order-commodity-item-img">
					<u-image :src="item.imgUrl"
					:showLoading="true"
					width="160rpx"
					height="160rpx"
					radius="4"
					mode="aspectFill"></u-image>
				</view>
				<view class="confirm-order-commodity-item-name-style">
					<text class="confirm-order-commodity-item-name">{{item.name}}</text>
					<text class="confirm-order-commodity-item-style">{{item.commodityStyle}}</text>
				</view>
				<view class="confirm-order-commodity-item-price-count">
					<text class="confirm-order-commodity-item-price">￥{{item.price}}</text>
					<text class="confirm-order-commodity-item-count">× {{item.num}}</text>
				</view>					
			</view>
			<view class="confirm-order-commodity-info">
				<text class="confirm-order-commodity-info-title">商品总额</text>
				<text class="confirm-order-commodity-info-content" style="font-weight: bold;">￥{{calPrice(totalPrice)}}</text>
			</view>
			<view class="confirm-order-commodity-info">
				<text class="confirm-order-commodity-info-title">优惠</text>
				<text class="confirm-order-commodity-info-content" style="font-weight: bold;color: red;">￥{{calPrice(discountPrice)}}</text>
			</view>
			<view class="confirm-order-commodity-info">
				<text class="confirm-order-commodity-info-title">运费</text>
				<text class="confirm-order-commodity-info-content" style="font-weight: bold;">￥{{freight}}</text>
			</view>
			<view class="confirm-order-commodity-info" @tap="openTagsPopup">
				<text class="confirm-order-commodity-info-title">订单备注</text>
				<view class="confirm-order-commodity-info-content">
					<text>
						选填,建议先和商家沟通确认						
					</text>
					<u-icon name="arrow-right" size="12" color="#afafaf"></u-icon>
				</view>
				
			</view>
			<view class="confirm-order-commodity-info">
				<text class="confirm-order-commodity-info-content">共{{commodityList.length}}件 小计￥{{calPrice(discountedPrice)}}</text>
			</view>
		</view>
		
		<view class="confirm-order-bottom">
			<view class="confirm-order-totalPrice">
				￥{{calPrice(discountedPrice)}}
			</view>
			<view class="confirm-order-btn" v-show="!addressIsEmpty">
				<u-button text="提交订单"
				color="#fa4126"
				type="primary" 
				size="mini"
				shape="circle"
				@click="test"
				></u-button>
			</view>
			<view class="confirm-order-btn" v-show="addressIsEmpty">
				<u-button text="提交订单"
				color="#9f9f9f"
				type="primary" 
				size="mini"
				shape="circle"
				@click="test"
				></u-button>
			</view>
		</view>
		
		
		
		
		<!-- 备注信息弹窗 -->
		<u-popup :show="isTagsPopup" mode="center" :round="10" :closeOnClickOverlay="false"
		overlayOpacity="0.3" @close="closeTagsPopup">
			<view class="confirm-order-tagsPopup-content">			
				<text class="confirm-order-tagsPopup-name">填写备注信息</text>
				<view class="confirm-order-tagsPopup-input">					
					<u-textarea v-model="notes" height="80" count border="bottom"
					placeholderStyle="font-size:28rpx"
					placeholder="选填,建议先和商家沟通确认" ></u-textarea>
				</view>	
				<view class="confirm-order-tagsPopup-btn">
					<view style="width: 120rpx;">
						<u-button text="取消"
						color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
						type="primary" 
						size="mini"
						shape="circle"
						@click="closeTagsPopup"
						></u-button>
					</view>
					<view style="width: 120rpx;">
						<u-button text="确定"
						color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
						type="primary" 
						size="mini"
						shape="circle"
						@click="setNotes"
						></u-button>
					</view>
				</view>
			</view>
		</u-popup>
		
		
		
		
	<!-- 吐司提示 -->
	<u-toast ref="uToast"></u-toast>	
	</view>
</template>

<script>
	import colorBar from "@/components/common/colorBar.vue"
	export default {
		onLoad(e) {
			let objList = JSON.parse(e.data)
			console.log(objList);
			this.commodityList = objList.list
			this.addressIsEmpty = uni.$u.test.isEmpty(this.address)
			this.commodityList.map(item=>{
				this.totalPrice += (item.price * item.num)
			})
			this.discountPrice = objList.discountPrice
			this.discountedPrice = this.totalPrice - this.freight - this.discountPrice
		},
		data() {
			return {
				commodityList:[],
				address:{},
				addressIsEmpty:false,
				
				totalPrice:0,
				discountPrice:0,
				discountedPrice:0,
				freight:0.2,
				notes:'',
				
				isTagsPopup:false,
				
			}
		},
		methods: {
			calPrice(price){
				return Number(price.toString().match(/^\d+(?:\.\d{0,1})?/))
			},
			test(){
				if(!this.addressIsEmpty){
					console.log(this.addressIsEmpty);
					console.log(this.notes);
				}else{
					//吐司提示
					this.$refs.uToast.show({
						type:'error',
						title:'错误',
						message:'请选择送货地址',
						position:'bottom',
						duration:1000						
					})
				}
				
			},
			goUserPath(){
				//发送地址选择凭证
				let chooseToken = JSON.stringify(true)
				
				uni.navigateTo({
					url:"../user-path/user-path?data="+chooseToken+""
				})
			},
			setNotes(){
				console.log(this.notes)
				this.isTagsPopup = false
			},
			openTagsPopup(){
				this.isTagsPopup = true
			},
			closeTagsPopup(){
				this.isTagsPopup = false
			},
			//获取选择地址后的数据
			getValue(item){
				this.address = item
				this.addressIsEmpty = false				
			}
		},
		components:{
			colorBar,
		}
	}
</script>

<style lang="scss">
.confirm-order {
	padding-bottom: 180rpx;
}	
.confirm-order-address-container {
	margin-top: 24rpx;
	width: 100%;
	height: auto;
	background-color: #fff;
	
	.confirm-order-address {
		width: 100%;
		height: 220rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		.confirm-order-address-left {
			height: 100%;
			width: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.confirm-order-address-right {
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-size: 32rpx;
			color: #333333;
			
			.confirm-order-address-tag {
				display: flex;
				align-items: center;
				font-size: 42rpx;
				font-weight: bold;
			}
		}
		.confirm-order-address-right-icon {
			position: absolute;
			top: 50%;
			right: 48rpx;
			
		}
	}
	
	
	
	.confirm-order-no-address {
		width: 100%;
		height: 120rpx;
		.confirm-order-no-address-top {
			margin: 0 auto;
			width: 92%;
			height: 110rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			.confirm-order-no-address-icon {
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
				border: 1rpx solid #000;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.confirm-order-no-address-text {
				margin-left: 20rpx;
				font-size: 32rpx;
			}
			
		}		
	}
	
}	
.confirm-order-commodityContainer {
	margin-top: 20rpx;
	width: 100%;
	height: auto;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	
	.confirm-order-commodity-top {
		width: 92%;
		height: 100rpx;
		
		display: flex;
		align-items: center;
		
		text {			
			font-size: 28rpx;
			font-weight: bold;
		}
	}
	
	.confirm-order-commodity-item {
		width: 92%;
		height: 230rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20rpx;
		&:last-child {
			margin-bottom: 0;
		}
		
		.confirm-order-commodity-item-img {
			width: 160rpx;
			height: 160rpx;
		}
		.confirm-order-commodity-item-name-style {
			padding: 0 20rpx;
			width: 400rpx;
			height: 160rpx;
			.confirm-order-commodity-item-name {					
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 28rpx;
				color: #333333;
				word-break: break-all;
				
			}
			.confirm-order-commodity-item-style {
				font-size: 24rpx;
				color: #333333;
			}
		}
		.confirm-order-commodity-item-price-count {
			height: 160rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			.confirm-order-commodity-item-price {
				font-size: 36rpx;
				color: red;
				font-weight: bold;
			}
			.confirm-order-commodity-item-count {
				margin-top: 30rpx;
				font-size: 24rpx;
				color: #333333;
			}
		}
		
	}
	
	.confirm-order-commodity-info {
		width: 92%;
		height: 80rpx;
		padding: 0 20rpx;
		
		
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.confirm-order-commodity-info-title {
			font-size: 28rpx;
		}
		
		.confirm-order-commodity-info-content {
			font-size: 28rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		&:last-child {
			justify-content: flex-end;
		}
	}
}
.confirm-order-bottom {
	width: 100%;
	height: 120rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
	
	position: fixed;
	bottom: 0;
	left: 0;
	
	
	.confirm-order-totalPrice {
		margin-left: 30rpx;
		font-size: 48rpx;
		color: red;
		font-weight: bold;
	}
	
	.confirm-order-btn {
		margin-right: 30rpx;
		width: 150rpx;
	}
}

.confirm-order-tagsPopup-content{
		width: 600rpx;
		height: 600rpx;
		padding: 30rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		.confirm-order-tagsPopup-name {
			font-size: 42rpx;
			font-weight: bold;
		}
		.confirm-order-tagsPopup-input {
			width: 80%;
			height: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 16rpx;
			padding: 0 20rpx;
		}
		.confirm-order-tagsPopup-btn {
			width: 80%;
			height: 120rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
		}
	}

page {
	background-color: #f6f6f6;
}
</style>
