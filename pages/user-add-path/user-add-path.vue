<template>
	<view class="user-add-path">
		
		<view class="user-add-path-item">
			<text class="user-add-path-item-name">收货人</text>
			<view class="user-add-path-item-input">
				<u-input v-model="pathObj.userName"
				  placeholder="请填写收货人姓名"
				  border="none"
				  type="text"
				  clearable
				  fontSize="28rpx"
				  placeholderStyle="font-size:28rpx"
				></u-input>
			</view>			  
		</view>
		<view class="user-add-path-item">
			<text class="user-add-path-item-name">手机号码</text>
			<view class="user-add-path-item-input">
				<u-input v-model="pathObj.tel"
				  placeholder="请填写收货人手机号码"
				  border="none"
				  type="number"
				  clearable
				  fontSize="28rpx"
				  placeholderStyle="font-size:28rpx"
				></u-input>
			</view>			
		</view>
		<CityPicker @cityPickerConfirm="getArea" :area="pathObj.area"></CityPicker>
		<view class="user-add-path-item">
			<text class="user-add-path-item-name">详细地址</text>
			<view class="user-add-path-item-input">
				<u-input v-model="pathObj.detailAddress"
				  placeholder="具体的街道或楼道号等"
				  border="none"
				  type="text"
				  clearable
				  fontSize="28rpx"
				  placeholderStyle="font-size:28rpx"
				></u-input>
			</view>			
		</view>
		<view class="user-add-path-item">
			<text class="user-add-path-item-name">标签</text>
			<view class="user-add-path-item-container">
				<view class="user-add-path-tags" @longpress="openDelTagsPopup(index)"
				v-for="(item, index) in tagList" :key="index">
					<u-tag :text="item.name"
					@click="setTag(item.name,item._id)"
					plain plainFill
					size="mini" bgColor="#ffd7d7"
					borderColor="#ffd7d7"
					color="red"></u-tag>
				</view>
				<view class="user-add-path-tags" @tap="openTagsPopup">
					<u-button  type="primary"
					size="mini" icon="plus"
					:hairline="false"
					iconColor="red"
					color="#ffd7d7"></u-button>
				</view>
			</view>			
		</view>
		<view class="user-add-path-item" style="flex-direction: row-reverse;
			margin: 0 auto;">
			<text style="font-size: 28rpx;color: #000000;">ps:长按删除标签</text>
		</view>
		<view class="user-add-path-item">
			<text class="user-add-path-tip1">设置为默认收获地址</text>
			<u-switch v-model="pathObj.isDefault" @change="switchDefaultAddress"
			size="18" activeColor="#ffd7d7"></u-switch>
		</view>
		
		<view class="user-add-path-btn">
			<u-button text="保存"
			color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
			type="primary" 
			size="normal"
			shape="circle"
			@click="save"
			></u-button>
		</view>
		
		
		<!-- 标签添加弹框 -->
		<view class="user-add-path-tagsPopup">
			<u-popup :show="isTagsPopup" mode="center" :round="10" :closeOnClickOverlay="false"
			overlayOpacity="0.3" @close="closeTagsPopup">
				<view class="user-add-path-tagsPopup-content">			
					<text class="user-add-path-tagsPopup-name">填写标签名称</text>
					<view class="user-add-path-tagsPopup-input">
						<u-input v-model="tagName"
						  placeholder="请输入标签名称"
						  border="none"
						  type="text"
						  fontSize="32rpx"
						  placeholderStyle="font-size:32rpx"
						></u-input>
					</view>	
					<view class="user-add-path-tagsPopup-btn">
						<view style="width: 120rpx;">
							<u-button text="取消"
							color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
							type="primary" 
							size="mini"
							shape="circle"
							@click="closeTagsPopup"
							></u-button>
						</view>
						<view style="width: 120rpx;">
							<u-button text="确定"
							color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
							type="primary" 
							size="mini"
							shape="circle"
							@click="addTag"
							></u-button>
						</view>						
					</view>
				</view>
			</u-popup>
		</view>
		
		<!-- 标签删除弹框 -->
		<u-modal :show="isDelTagsPopup" 
		content="确认删除此标签吗？"
		showCancelButton
		@confirm="delTag()"
		@cancel="closeDelTagsPopup()"></u-modal>
		<!-- 吐司 -->
		<u-toast ref="uToast"></u-toast>			
	</view>
</template>

<script>
	import CityPicker from "@/components/city-picker/CityPicker.vue"
	import {mapState, mapActions, mapMutations} from 'vuex'
	const pathTagObj = uniCloud.importObject('path_tag')
	const pathObj = uniCloud.importObject('path')
	export default {
		//如果是编辑页面，则会接收到url中的data数据
		onLoad(e) {
			//如果data有数据，则是修改页面
			if(e.data){
				uni.setNavigationBarTitle({
					title:"修改地址"
				})
				//填充表格数据
				let res = JSON.parse(e.data)
				this.pathObj = res.item
				this.index = res.index
				this.isEditStatus = true
			}
			//标签列表大于0，无需再次请求数据
			if(this.tagList.length > 0){
				console.log('标签列表大于0，无需再次请求数据');
			}else{
				pathTagObj.get(this.openid,this.token).then(res=>{
					console.log(res)
					if(res.code === 200){
						this.getTag(res.tagList)
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
		computed:{
			...mapState({
				tagList:state=>state.path.tagList,
				openid:state=>state.openId,
				token:state=>state.token,
				list:state=>state.path.list
			})
		},
		data() {
			return {
				pathObj:{
					userName:'',
					tel:'',
					area:'',
					detailAddress:'',
					tagid:{
						_id:'',
						name:''
					},				
					isDefault:false,
				},
				tagName:'',	
				tagIndex:-1,
				index:-1,
			
				isTagsPopup:false,
				isDelTagsPopup:false,
				
				//当前是否是修改页
				isEditStatus:false,
				
			}
		},
		components:{
			CityPicker
		},
		methods: {
			...mapActions(['createPath','updatePath','createTag','deleteTag']),
			...mapMutations(['getTag']),
			switchDefaultAddress(e){
				console.log(e);
				this.pathObj.isDefault = e
			},
			openTagsPopup(){
				this.isTagsPopup = true
			},
			closeTagsPopup(){
				this.isTagsPopup = false
			},
			openDelTagsPopup(index){
				this.tagIndex = index
				this.isDelTagsPopup = true
			},
			closeDelTagsPopup(){
				this.isDelTagsPopup = false
			},
			async addTag(){
				if(this.tagName !== '' && this.tagName !== undefined){
					
					let infer = await this.createTag({name:this.tagName,openid:this.openid,token:this.token})
					if(infer){
						this.tagName = ''
						this.closeTagsPopup()
						//成功吐司提示
						this.$refs.uToast.show({
							type:'success',
							title:'成功',
							message:'添加成功',
							position:'bottom',
							duration:1000
						})
					}else{
						//标签重复的吐司提示
						this.$refs.uToast.show({
							type:'error',
							title:'错误',
							message:'标签重复',
							position:'bottom',	
							duration:1000
						})
					}					
				}else {
					//标签输入框为空的吐司提示
					this.$refs.uToast.show({
						type:'error',
						title:'错误',
						message:'标签名称为空',
						position:'bottom',
						duration:1000
					})
				}				
			},
			setTag(tagName,tagid){
				this.pathObj.tagid._id = tagid
				this.pathObj.tagid.name = tagName
				//成功吐司提示
				this.$refs.uToast.show({
					type:'success',
					title:'成功',
					message:'选择标签:'+tagName,
					position:'bottom',
					duration:500
				})
			},
			async delTag(){				
				//云端先删除，删除成功后再本地
				pathTagObj.delete(this.openid,this.token,this.tagList[this.tagIndex]._id).then(res=>{
					console.log(res);
					if(res.code === 200){
						this.deleteTag(this.tagIndex)
						this.closeDelTagsPopup()
						//成功吐司提示
						this.$refs.uToast.show({
							type:'success',
							title:'成功',
							message:'删除成功',
							position:'bottom',
							duration:1000
						})
					}else{
						this.closeDelTagsPopup()
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
			async save(){
				let that = this
				//修改状态
				if(this.isEditStatus){
					pathObj.update(this.openid,this.token,this.pathObj).then(res=>{
						if(res.code === 200){
							this.updatePath({
								index:this.index,
								item:this.pathObj,
								openid:res.openid,
								token:res.token
							})
							//返回上一页
							uni.navigateBack({
								delta:1
							})
						}else{							
							setTimeout(()=>{
								uni.navigateTo({
									url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",								
								})
							},2500)							
							that.$refs.uToast.show({
								type:'error',
								title:'错误',
								message:'身份过期，请登陆后重试',
								position:'bottom',
								duration:2000
							})	
						}
					})					
				}else{
					pathObj.add(this.openid,this.token,this.pathObj).then(res=>{						
						if(res.code === 200){	
							this.createPath(res)
							//返回上一页
							uni.navigateBack({
								delta:1
							})
						}else{							
							setTimeout(()=>{
								uni.navigateTo({
									url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",								
								})
							},2500)							
							that.$refs.uToast.show({
								type:'error',
								title:'错误',
								message:'身份过期，请登陆后重试',
								position:'bottom',
								duration:2000
							})	
						}
					})					
				}
				
			},
			getArea(e){
				this.pathObj.area = e
			}
		}
	}
</script>

<style scoped lang="scss">
.user-add-path-item {
	margin: 0 auto 30rpx;
	width: 88%;
	height: 100rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	
	&:first-child {
		margin: 30rpx auto 30rpx;
	}
	&:nth-child(5) {
		height: auto;
	}
	.user-add-path-item-name {
		font-weight: bold;
		font-size: 28rpx;
		width: 120rpx;
	}
	.user-add-path-item-input {
		flex: 1;
		padding-left: 30rpx;
		background-color: #f9f9f9;
		border-radius: 20rpx;
	}
	
	.user-add-path-tip1 {
		font-weight: bold;
		font-size: 28rpx;
		width: 300rpx;
	}
	.user-add-path-item-container {
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		.user-add-path-tags {
			margin:20rpx;
		}
	}
	
}
.user-add-path-btn {
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
.user-add-path-tagsPopup {
	.user-add-path-tagsPopup-content{
		width: 600rpx;
		height: 450rpx;
		padding: 30rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		.user-add-path-tagsPopup-name {
			font-size: 42rpx;
			font-weight: bold;
		}
		.user-add-path-tagsPopup-input {
			width: 80%;
			height: 120rpx;
			background-color: #f3f3f3;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 16rpx;
			padding: 0 20rpx;
		}
		.user-add-path-tagsPopup-btn {
			width: 80%;
			height: 120rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
		}
	}
}
</style>
