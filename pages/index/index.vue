<template>
	<view class="index">
		<view class="index-swiper">
			<u-swiper :list="list"
			keyName="img"
			indicator
			indicatorMode='dot'
			duration="1000"
			interval="3000"
			:radius='0'
			imgMode="aspectFill"
			height="200"
			circular></u-swiper>
		</view>
		
		<view class="test">
			<Card cardTitle="热销商品"></Card>
			<HscrollBar></HscrollBar>
		</view>
		
		<u-back-top 
		duration="200"
		bottom="50"
		icon="arrow-up" 
		:scroll-top="scrollTop"
		:customStyle="customStyle1"
		:iconStyle="iconStyle1"></u-back-top>
	</view>
	
	
</template>

<script>
	import Card from '@/components/common/Card.vue'
	import HscrollBar from '@/components/common/HscrollBar.vue'
	export default {
		data() {
			return {
				scrollTop: 0,
				customStyle1: {
					background: 'rgba(218, 218, 218, 0.8)',
					backdropFilter: 'blur(2rpx)'
				},
				iconStyle1:{
					color: '#000'
				},
				list: [
				{
					img:'https://cdn.uviewui.com/uview/swiper/1.jpg',
					type:'image'
				},
				{
					img:'https://cdn.uviewui.com/uview/swiper/2.jpg',
					type:'image'
				},
				{
					img:'https://cdn.uviewui.com/uview/swiper/3.jpg',
					type:'image'
				}
				],
			}
		},
		components:{
			Card,
			HscrollBar,
		},
		onLoad() {

		},
		methods: {
			
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		}
	}
</script>

<style scoped lang="scss">
.index {
	.test {
		
	}
}
</style>
