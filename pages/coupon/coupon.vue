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
			{{tabIndex}}
			{{tabIndexNow}}
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:[
					{
						name:'可使用'
					},
					{
						name:'已使用'
					},
					{
						name:'已过期'
					},
				],
				tabIndexNow:0,
			}
		},
		methods: {
			switchTab(item){
				console.log(item);
				this.tabIndexNow = item.index
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
</style>
