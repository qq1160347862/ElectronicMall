<template>
	<view class="color-bar">
		<view class="color-bar-item" v-for="(item,index) in 21" :key="index">
			
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style scoped lang="scss">
.color-bar {
	width: 100%;
	height: 10rpx;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	.color-bar-item {
		height: 8rpx;
		width: 5%;
		background-color: #7da9fa;
		&:nth-child(2n) {
			width: 5%;
			background-color: #fff;
		}
		&:nth-child(4n+1){
			width: 5%;
			background-color: #fa550f;
		}
	}
}
</style>