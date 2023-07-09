<template>
	<view class="city-picker">
		<text class="city-picker-name">所在地区</text>
		<view class="city-picker-input">
			<u-input v-model="value"
			  placeholder="省份/地级市/地区"
			  border="none"
			  :readonly="true" 
			  fontSize="28rpx"
			  placeholderStyle="font-size:28rpx"
			  @click.native="show=true"
			></u-input>
		</view>		
		<view>
			<u-picker :show="show" ref="uPicker" :columns="columns" 
			itemHeight="30"
			visibleItemCount="7"
			@confirm="confirm" 
			@change="changeHandler"
			@cancel="closePicker"></u-picker>
		</view>		
	</view>
</template>
<script>
	import {county} from "@/components/city-picker/data.js"
	export default {
		props:{
			area:String
		},
		onReady() {
			this.value = this.area
		},
		data() {
			return {
				value:'',
				show: false,
				columns: [],//默认初始数据
				columnData: [],//第二列的数据
				columnData2:[],//第三列的数据
			}
		},
		created() {
			const arrOne = []//省(第一列数据)
			county.forEach(item=>{
				arrOne.push(item.name)
			})
			const arrTwo = []//市(第二列数据)
			county.forEach(item=>{
				const list = item.children.map(ite=>{
					return ite.name
				})
				arrTwo.push(list)
			})
			const arrThree = []//区(第三列数据)
			county.forEach(item=>{
				const listItem = item.children.map(ite=>{
					const listItem1 = ite.children.map(it=>{
						return it.name
					})
					return listItem1
				})
				arrThree.push(listItem)
			})
			this.columns[0] = arrOne
			this.columns[1] = arrTwo[0]
			this.columns[2] = arrThree[0][0]//赋值初始值
			this.columnData = arrTwo
			this.columnData2 = arrThree
		},
		methods: {
			changeHandler(e) {
				const {
					columnIndex,//当前滚动的列
					value,//当前选中值
					values, // values为当前变化列的数组内容
					index,//当前滚动列的数据索引
					indexs,//所有列的数据索引值
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])//设置第二列的数据
					picker.setColumnValues(2, this.columnData2[index][0])//设置第三列的数据
				}if (columnIndex === 1){
					picker.setColumnValues(2, this.columnData2[indexs[0]][index])//设置第三列的数据
				}
			},
			confirm(e) {
				const {value} = e//当前选中值
				this.show = false
				this.$emit('cityPickerConfirm',value.join(' '))
				this.value = value.join(' ')
			},
			closePicker(){
				this.show = false
			}
		}
	}
</script>

<style scoped lang="scss">
.city-picker {
	margin: 0 auto 30rpx;
	width: 88%;
	height: 100rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	.city-picker-name {
		font-weight: bold;
		font-size: 28rpx;
		width: 120rpx;
	}
	.city-picker-input {
		flex: 1;
		padding-left: 30rpx;
		border-radius: 20rpx;
	}
	
}	
</style>