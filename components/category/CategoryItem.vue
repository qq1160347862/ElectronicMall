<template>
	<view class="category-item">
		{{category.categoryId}}
		{{category.categoryName}}
	</view>
</template>

<script>
export default {
	props:{
		category:Object
	}
}
</script>

<style>
</style>