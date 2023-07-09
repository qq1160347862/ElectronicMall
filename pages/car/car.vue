<template>
	<view class="car">
		<template v-if='carList.length > 0'>
			<!-- 购物车列表 -->
				<view class="car-list">
					<view class="car-index">
						<label class="radio" @tap="checkAll">
							<radio value="" :checked="checkedAll" 
							style="transform:scale(0.7)"
							color="#FF3333" /><text></text>
						</label>
						<view class="car-index-info">					
							<view class="car-index-left">
								<u-icon name="list-dot" size="20"></u-icon>
								<text>云Mall深圳旗舰店</text>						
							</view>
							<view class="car-index-right" @tap="switchEditedState" v-if="!isEdited">编辑</view>
							<view class="car-index-right" @tap="switchEditedState" v-else>完成</view>
						</view>
					</view>
					<view class="car-item" 
					v-for="(item,index) in carList"
					:key="index">
						<label class="radio" @tap="selectItem(index)">
							<radio value=""  :checked="item.checked"
							style="transform:scale(0.7)"
							color="#FF3333" /><text></text>
						</label>
						<u-image 
						class="car-item-img"
						:src="item.imgUrl"
						:showLoading="true"
						:showMenuByLongpress="false"
						width="180rpx"
						height="180rpx"
						radius="5"
						mode="aspectFill"></u-image>
						<view class="car-item-info">
							<view class="car-item-name">
								{{item.name}}																		
							</view>
							<view class="car-item-style">{{item.commodityStyle}}</view>
							<view class="car-item-price">￥{{item.price}}</view>
							<view class="car-item-num">
								<u-number-box v-model="item.num" 
								:step="1" :min="1" :max="10"
								integer :inputWidth="24"
								iconStyle="font-size:24rpx"
								:buttonSize="24"></u-number-box>
							</view>
						</view>
					</view>
				</view>
			
				<!-- 底部总结 -->
				<view class="car-foot">
					<label class="radio" @tap="checkAll">
						<radio value=""  :checked="checkedAll"
						color="#FF3333" 
						style="transform:scale(0.7)"/><text>全选</text>
					</label>
					<template v-if="!isEdited">
						<view class="car-foot-info">
							<view>
								<text style="font-weight: bold;">
									总计
								</text>
								<text style="color: red; font-weight: bold;">￥{{totalCount.price}}</text>
								<text style="color: #dddddd;">(不含运费)</text>
							</view>
							<view><text style="color: #dddddd;">已优惠￥1100</text></view>
						</view>
						<view class="car-foot-btn">
							<view class="btn">
								<u-button type="primary"
								color="red"
								size="mini"
								@click="goConfirmOrder"
								shape="circle"
								:text="'去结算('+totalCount.num+')' "></u-button>				
							</view>				
						</view>
					</template>
					<template v-else>
						<view class=".car-foot-btn">
							<view class="btn" @tap="switchIsDelState">
								<u-button type="primary"
								color="red"
								size="mini"
								shape="circle"
								text="删除"></u-button>				
							</view>		
							<view class="btn">
								<u-button type="primary"
								color="red"
								size="mini"
								shape="circle"
								text="收藏"></u-button>				
							</view>				
						</view>
					</template>
					
				</view>
		</template>
		<template v-else>
			<view class="car-list-none">
				<view class="car-icon-none">
					<u-image src="@/static/shopCarNone.png"
					:showLoading="true"
					width="200rpx"
					height="200rpx"
					mode="aspectFill"></u-image>
				</view>
				<view class="car-tip-none">
					<text>囧~购物车还是空的~</text>
				</view>				
			</view>
		</template>
	
		<!-- 弹窗 -->
		<u-modal :show="isDel" 
		:content="'确定将已选中的'+ checkedNum +'件商品删除吗？'"
		showCancelButton
		@confirm="del()"
		@cancel="switchIsDelState()"></u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState,mapActions,mapGetters,mapMutations} from "vuex"
	export default {
		data() {
			return {
				isEdited:false,
				isDel:false
			}
		},
		methods: {
			...mapActions(['checkAll','delItem']),
			...mapMutations(['selectItem']),
			switchEditedState(){
				this.isEdited = !this.isEdited
			},
			switchIsDelState(){
				//有选择的商品才能弹出删除框
				if(this.checkedNum > 0){
					this.isDel = !this.isDel
				}else{
					//没有选择商品的吐司提示
					this.$refs.uToast.show({
						type:'error',
						title:'删除',
						message:'请选择删除的商品',
						position:'bottom',
						duration:1000
					})
				}
				
			},
			del(){
				this.delItem()
				this.isDel = !this.isDel
			},
			goConfirmOrder(){
				//有选中的商品才能跳转确认
				if(this.checkedNum > 0){
					//将选中的商品信息传给确认订单
					let objListJson = JSON.stringify(this.checkedItem)
					uni.navigateTo({
						url:"../confirm-order/confirm-order?data="+objListJson+""
					})
				}else{
					this.$refs.uToast.show({
						type:'error',
						title:'错误',
						message:'请选择需要下单的商品',
						position:'bottom',
						duration:1000
					})
				}
				
			}
		},
		computed:{
			...mapState({
				carList:state=>state.car.list
			}),
			...mapGetters(['checkedAll','totalCount','checkedNum','checkedItem'])
		}
	}
</script>

<style scoped lang="scss">
.car-list {
	padding-bottom: 120rpx;
	.car-index {
		width: 100%;
		height: 50rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		.radio {
			margin: 0 20rpx;
		}
		.car-index-info {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			font-weight: bold;
			.car-index-left {
				display: flex;
				align-items: center;
				
				text {
					margin-left: 10rpx;
				}
			}
			.car-index-right {
				margin-right: 30rpx;
				color: red;
			}
		}
	}	
	.car-item {
		width: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		margin-bottom: 10rpx;
		.radio {
			margin: 0 20rpx;
		}
		.car-item-info {
			flex: 1;
			position: relative;
			height: 200rpx;
			padding: 0 20rpx;
			.car-item-name {
				position: absolute;
				top: 10%;
				padding-right: 20rpx;
				font-size: 28rpx;
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-break: break-all;
				
			}
			.car-item-style {
				position: absolute;
				top: 50%;
				font-size: 24rpx;
				color: #bebebe;
			}
			.car-item-price {
				top: 75%;
				position: absolute;
				font-size: 32rpx;
				font-weight: bold;
				color: red;
			}
			.car-item-num {
				top: 72%;
				right: 4%;
				position: absolute;
			}
		}
	}
}
.car-foot {
	position: fixed;
	bottom: 10rpx;
	left: 0;
	background-color: #fff;
	width: 100%;
	height: 100rpx;
	border-top: 2rpx solid #eeeeee;
	border-bottom: 2rpx solid #eeeeee;
	display: flex;
	align-items: center;
	.radio {
		margin: 0 20rpx;
		font-size: 28rpx;
	}
	.car-foot-info {
		margin-left: 10rpx;
		font-size: 24rpx;
	}
	.car-foot-btn {
		flex: 1;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		padding-right: 30rpx;
		height: 100rpx;
		.btn {
			// width: 60%;
			height: 90%;
			display: flex;
			align-items: center;
			margin-right: 10rpx;
		}
	}
}
.car-list-none {
	width: 100%;
	height: 500rpx;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.car-icon-none {
		// position: absolute;
		// top: 50%;
		// left: 50%;
		// transform: translate(-50%,-50%);
	}
	
	.car-tip-none {
		font-size: 32rpx;
	}
}
</style>
