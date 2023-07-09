<template>
	<view class="category">
		<scroll-view scroll-y="true" 
		:style="'height:' + clientHeight + 'px'"
		 class="category-left">
			<view v-for="(item,index) in categoryList" 
			class="left-item"
			:key="index"
			@tap="changeItem(item,index)">
				<view :class='index === activeIndex?"active-rect":"rect"'></view>
				<view :class='index === activeIndex?"left-active-name":"left-name"'>
					{{item.categoryName}}
				</view>
			</view>
		</scroll-view>
		
		<scroll-view scroll-y="true" 
		:style="'height:' + clientHeight + 'px'"
		class="category-right">
			<CategoryItem :category='activeCategory'></CategoryItem>
		</scroll-view>
	</view>
</template>

<script>
	import CategoryItem from '@/components/category/CategoryItem.vue'
	export default {
		components:{
			CategoryItem
		},
		data() {
			return {
				activeIndex:0,
				//默认第一条数据
				activeCategory:{
						categoryId:0,
						categoryName:"推荐"
					},
				clientHeight:0,
				categoryList:[
					{
						categoryId:0,
						categoryName:"推荐"
					},
					{
						categoryId:1,
						categoryName:"X系列"
					},
					{
						categoryId:2,
						categoryName:"Y系列"
					},
					{
						categoryId:3,
						categoryName:"旗舰"
					},
					{
						categoryId:4,
						categoryName:"Z系列"
					},
					{
						categoryId:5,
						categoryName:"U系列"
					},
					{
						categoryId:6,
						categoryName:"平板手表"
					},
					{
						categoryId:7,
						categoryName:"手机充电"
					},
					{
						categoryId:8,
						categoryName:"推荐"
					},
					{
						categoryId:9,
						categoryName:"X系列"
					},
					{
						categoryId:10,
						categoryName:"Y系列"
					},
					{
						categoryId:11,
						categoryName:"旗舰"
					},
					{
						categoryId:12,
						categoryName:"Z系列"
					},
					{
						categoryId:13,
						categoryName:"U系列"
					},
					{
						categoryId:14,
						categoryName:"平板手表"
					},
					{
						categoryId:15,
						categoryName:"手机充电"
					}
				]
			}
		},
		onReady() {
			uni.getSystemInfo({
				success:(res) => {
					this.clientHeight = res.windowHeight - this.getClientHeight()
				
				}
			})
		},
		methods: {
			changeItem(item,index){
				this.activeCategory = item
				this.activeIndex = index
			},
			//获取可视高度
			getClientHeight(){
				const res = uni.getSystemInfoAsync()
				const system = res.platform
				if(system==='android'){
					return 48+res.statusBarHeight
				}else if(system==='ios'){
					return 44+res.statusBarHeight
				}else{
					return 0
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.category {
	@mixin centerLayout(){
		display: flex;
		align-items: center;
		justify-content: center;
	}
	display: flex;
	flex-direction: row;
	.category-left{
		width: 180rpx;
		font-size: 28rpx;
		.left-item {
			height: 120rpx;
			background-color: #f5f5f5;
			@include centerLayout()
			.rect {
				height: 0;
				width: 10rpx;
				background-color: #f5f5f5;
			}
			.left-name {
				height: 100%;
				width: 190rpx;
				@include centerLayout()
				background-color: #f5f5f5;
			}
			.active-rect {
				height: 100%;
				width: 10rpx;
				background-color: #ff557f;
				border-radius: 5rpx;
				transition-property: height;
				transition-duration: 0.3s;
			}
			.left-active-name {
				height: 100%;
				width: 190rpx;
				@include centerLayout()
				background-color: #ffffff;
			}
		}
	}
	.category-right{
		flex: 1;
		font-size: 28rpx;
	}
}
</style>
