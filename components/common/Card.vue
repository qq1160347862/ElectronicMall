<template>
	<view class="card">
		<view>—</view>
		<view class="card-name">
			{{cardTitle}}
		</view>
		<view>—</view>
	</view>
</template>

<script>
export default {
	props:{
		cardTitle:String
	}
}
</script>

<style scoped lang="scss">
.card {
	padding: 20rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	.card-name {
		padding: 0 20rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
}

</style>