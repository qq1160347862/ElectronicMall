<template>
	<view class="user-path">
		<view class="user-path-item"
		v-for="(item,index) in list"
		:key="index" @tap="chooseAddress(item)">
			<view class="user-path-one">
				<text>{{item.area}}</text>
			</view>
			<view class="user-path-two">
				<text>{{item.detailAddress}}</text>
				<view class="user-path-tag" v-if="item.isDefault">
					<u-tag text="默认" plain plainFill
					size="mini" bgColor="#ffd7d7"
					borderColor="#ffd7d7"
					color="red"></u-tag>
				</view>		
				<view class="user-path-tag" v-else-if="item.tagid.name !== null && item.tagid.name!== undefined && item.tagid.name!== ''">
					<u-tag :text="item.tagid.name" plain plainFill
					size="mini" bgColor="#ecf5ff"
					borderColor="#ecf5ff"
					color="blue"></u-tag>
				</view>
			</view>
			<view class="user-path-userInfo">
				<text>{{item.userName}} {{item.tel}}</text>
			</view>
			<view class="user-path-settings">
				<u-icon name="trash" color="#909090" size="18"
				@tap="delPath(index)"></u-icon>
				<u-icon name="edit-pen" color="#909090" size="18"
				@tap="goEditPath(index)"></u-icon>
			</view>
		</view>
		<view class="user-path-addPath">
			<u-button text="新增地址"
			color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
			type="primary" 
			size="normal"
			shape="circle"
			@click="goAddPath"
			></u-button>
		</view>
		
		<!-- 弹窗 -->
		<u-modal :show="isDel" 
		content="确认删除此地址吗？"
		showCancelButton
		@confirm="del()"
		@cancel="switchIsDelState()"></u-modal>
		<u-toast ref="uToast"></u-toast>		
	</view>
</template>

<script>
	import {mapState, mapActions, mapMutations} from 'vuex'
	const pathObj = uniCloud.importObject('path')
	export default {
		onLoad(e) {
			if(e.data){
				this.chooseToken = JSON.parse(e.data)				
			}	
			
			if(this.list.length > 0){
				console.log('地址存在vuex中，无需请求')
			}else{
				pathObj.get(this.openid,this.token).then(res=>{
					console.log(res)
					if(res.code === 200){
						this.getPath(res.list)
					}else{
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",								
							})
						},2500)	
						this.$refs.uToast.show({
							type:'error',
							title:'错误',
							message:'身份过期，请登陆后重试',
							position:'bottom',
							duration:2000
						})						
					}				
				}).catch(e=>{
					console.log(e.errCode)
					console.log(e.errMsg)
				})
			}
		},
		data() {
			return {
				isDel:false,
				delIndex:-1,
				chooseToken:false,	//地址选择凭证
			}
		},
		methods: {
			...mapActions(['deletePath']),
			...mapMutations(['getPath']),
			//跳转至编辑页面，并通过url带参数data
			goEditPath(index){
				
				let pathObj = JSON.stringify({
					index:index,
					item:this.list[index]
				})
				uni.navigateTo({
					url:'../user-add-path/user-add-path?data='+pathObj+''
				})
			},
			//跳转至新增页面
			goAddPath(){
				uni.navigateTo({
					url:'../user-add-path/user-add-path'
				})
			},
			delPath(index){
				this.delIndex = index
				this.isDel = true
			},
			async del(){
				//云端先删除，删除成功后再本地
				pathObj.delete(this.openid,this.token,this.list[this.delIndex]._id).then(res=>{
					console.log(res)
					if(res.code === 200){
						this.deletePath(this.delIndex)
						this.isDel = false
						//删除吐司提示
						this.$refs.uToast.show({
							type:'success',
							title:'成功',
							message:'删除成功',
							position:'bottom',
							duration:1000						
						})
					}else{
						this.isDel = false
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",								
							})
						},2500)	
						this.$refs.uToast.show({
							type:'error',
							title:'错误',
							message:'身份过期，请登陆后重试',
							position:'bottom',
							duration:2000
						})	
					}
				})
				
				
			},
			switchIsDelState(){
				this.isDel = false
			},
			chooseAddress(item){
				if(this.chooseToken){
					// 1. 获取当前页面栈实例（此时最后一个元素为当前页）
					let pages = getCurrentPages()
					// 2. 上一页面实例
					// 注意是length长度，所以要想得到上一页面的实例需要 -2
					// 若要返回上上页面的实例就 -3，以此类推
					let prePage = pages[pages.length - 2]
					// 3. 给上一页面实例绑定getValue()方法和参数（注意是$vm）
					prePage.$vm.getValue(item)
					// 4. 返回上一页面
					uni.navigateBack({
						delta:1
					})
				}
				
			}
		},
		computed:{
			...mapState({
				list:state=>state.path.list,
				openid:state=>state.openId,
				token:state=>state.token
			})
		}
	}
</script>

<style scoped lang="scss">
.user-path {
	padding-bottom: 150rpx;
}
.user-path-item {
	margin: 0 auto 30rpx;
	width: 88%;
	height: 220rpx;
	background-color: #f9f9f9;	
	border-radius: 20rpx;
	
	font-size: 28rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	
	position: relative;
	
	&:first-child {
		margin: 30rpx auto 30rpx;
	}
	
	.user-path-one,
	.user-path-userInfo{
		margin-left: 30rpx;
		color: #909090;
	}
	.user-path-two {
		margin-left: 30rpx;
		font-weight: bold;
		font-size: 28rpx;
		
		display: flex;
		align-items: center;		
		
		.user-path-tag {
			margin-left: 30rpx;
		}
	}
	
	.user-path-settings {
		position: absolute;
		right: -30rpx;
		bottom: -10rpx;
		transform: translate(-50%,-50%);
		
		width: 120rpx;
		height: 60rpx;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
}
.user-path-addPath {
	position: fixed;
	bottom: 30rpx;
	left: 50%;
	transform: translateX(-50%);
	
	width: 88%;
	height: 100rpx;
	
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
