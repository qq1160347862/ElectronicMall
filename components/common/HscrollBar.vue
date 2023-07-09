<template>
	<view class="hscrollBar">
		<u-scroll-list 
		indicatorStyle="bottom"
		indicatorWidth="320"
		indicatorBarWidth="100"
		indicatorColor="#fff"
		indicatorActiveColor="#dadada"
		indicator>
			<view class="hscrollBar-item" 
			v-for="(item,index) in list"
			:key="index">
				<Commodity :data="item"></Commodity>
			</view>
		</u-scroll-list>
	</view>
</template>

<script>
import Commodity from '@/components/common/Commodity.vue'
export default {
	data(){
		return {
			list: [{
				thumb: "https://cdn.uviewui.com/uview/goods/1.jpg",
				name: "vivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256G",
				discount: 0,
				price: 101
			},{
				thumb: "https://cdn.uviewui.com/uview/goods/2.jpg",
				name: "vivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256G",
				discount: 0.73,
				price: 56
			},{
				thumb: "https://cdn.uviewui.com/uview/goods/3.jpg",
				name: "vivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256G",
				discount: 0.5,
				price: 100
			},{
				thumb: "https://cdn.uviewui.com/uview/goods/4.jpg",
				name: "vivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256G",
				discount: 0.3,
				price: 100
			},{
				thumb: "https://cdn.uviewui.com/uview/goods/5.jpg",
				name: "vivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256Gvivo S17 8GB+ 256G",
				discount: 0.1,
				price: 100
			},]
		}
	},
	components:{
		Commodity
	}
}
</script>

<style scoped lang="scss">
.hscrollBar-item {
	$marginNum : 20rpx;
	padding-right: 10rpx;
	&:first-child {
		padding-left: $marginNum;
	}
	&:last-child {
		padding-right: $marginNum;
	}
}
</style>