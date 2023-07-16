<template>
	<view class="user-setting">
		<view class="user-setting-avatar">
			<u-upload
				name="avatarPic"
				:maxCount="1"
				width="250"
				@beforeRead="checkPic"
				@afterRead="uploadPic"
				@oversize="oversizePic"
				height="150"
			>
				<view class="avatar-pic">
					<u-avatar shape="circle"
					:src="avatar_url"
					size="84"></u-avatar>
				</view>				
			</u-upload>			
		</view>
		<view class="user-setting-infoItem">
			<text class="user-setting-infoItem-text">昵称</text>
			<view class="user-setting-infoItem-input">
				<u-input v-model="nickname"
				  placeholder="请输入昵称"
				  border="none"
				  type="text"
				  fontSize="32rpx"
				  placeholderStyle="font-size:32rpx"
				></u-input>
			</view>			
		</view>
		<view class="user-setting-infoItem">
			<text class="user-setting-infoItem-text">性别</text>
			<view class="user-setting-infoItem-input">
				<u-radio-group 
					@change="radioOnchange"
					size="12"
					placement="row"
					iconPlacement="left"
				    v-model="gender">
					<u-radio activeColor="red" labelSize="12" iconSize="12" label="男" :name="1"></u-radio>
					<u-radio activeColor="red" labelSize="12" iconSize="12" label="女" :name="2"></u-radio>
					<u-radio activeColor="red" labelSize="12" iconSize="12" label="未知" :name="0"></u-radio>
				</u-radio-group>
			</view>			
		</view>
		<view class="user-setting-infoItem">
			<text class="user-setting-infoItem-text">手机</text>
			<view class="user-setting-infoItem-input">
				<u-input v-model="tel"
				  placeholder="请输入手机号"
				  border="none"
				  type="text"
				  fontSize="32rpx"
				  placeholderStyle="font-size:32rpx"
				></u-input>
			</view>			
		</view>		
		<view class="user-setting-loadingAnime">
			<!-- 动画 -->
			<u-loading-icon :show="loadingAnime" 
			text="修改中" textSize="12"
			mode="circle" color="#21d86d" vertical></u-loading-icon>
		</view>		
		<view class="user-setting-btn">
			<view class="left">
				<u-button text="确认修改"
					color="#3c9cff"
					type="primary" 
					size="normal"
					@click="confirmUpload"></u-button>	
			</view>
			<view class="right">				
				<u-button text="退出登陆"
					color="#ff0000"
					type="primary" 
					size="normal"
					@click="logout_wexin"></u-button>	
			</view>			
		</view>
		
		<!-- 吐司 -->
		<u-toast ref="uToast"></u-toast>	
	</view>
</template>

<script>
	import {mapState,mapActions,mapMutations} from 'vuex'
	export default {
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				openId:state=>state.openId,
				token:state=>state.token
			}),						
		},
		onLoad() {
			this.avatar_url = this.userInfo.avatar_url
			this.nickname = this.userInfo.nickname
			this.gender = this.userInfo.gender
			this.tel = this.userInfo.tel
		},
		data() {
			return {				
				avatar_url:'',
				avatar_format:'',
				nickname:'',
				gender:-1,
				tel:'',
				loadingAnime:false
			}
		},
		methods: {
			...mapActions(['logout']),
			...mapMutations(['updateUserInfo']),
			checkPic(file,lists,name){
				console.log("读取图片前的函数",file,lists,name);
			},
			uploadPic(file,lists,name){
				console.log("读取图片后的函数",file,lists,name);
				this.avatar_format = file.file.url.substring(file.file.url.lastIndexOf(".") + 1)				
				this.avatar_url = file.file.url
			},
			oversizePic(){
				console.log("图片大小超出最大允许大小",file,lists,name);
			},
			radioOnchange(){
				console.log(this.gender);
			},
			async confirmUpload(){
				this.loadingAnime = true
				//上传用户头像至云存储空间
				//得到头像的云地址，传入云函数中以更新用户头像地址
				let that = this
				uniCloud.uploadFile({
					filePath:this.avatar_url,
					cloudPath:'/userAvatar/' + this.nickname + 'AvatarPic' +Date.now() + '.' + this.avatar_format,
					cloudPathAsRealPath:true,
					token:this.token,
					openid:this.openId,
					success(res) {
						if(res.success){
							that.avatar_url = res.fileID
							
							//调用云函数更新数据库
							uniCloud.callFunction({
								name:"updateUserInfo",
								data:{
									avatar_url:that.avatar_url,
									nickname:that.nickname,
									gender:that.gender,
									tel:that.tel,
									openid:that.openId
								}
							}).then(res=>{
								if(res.result.code === 200){
									//更新本地vuex用户信息
									that.updateUserInfo({
										avatar_url:that.avatar_url,
										nickname:that.nickname,
										gender:that.gender,
										tel:that.tel,
									})
									
									that.loadingAnime = false
									
									//成功吐司提示
									that.$refs.uToast.show({
										type:'success',
										title:'成功',
										message:'修改成功',
										position:'bottom',
										duration:2000
									})
								}else{
									that.loadingAnime = false
									
									//成功吐司提示
									that.$refs.uToast.show({
										type:'error',
										title:'错误',
										message:'用户信息同步错误，请重试',
										position:'bottom',
										duration:2000
									})
								}
								
							})	
						}
					},
					fail(err) {
						//清除当前过期的登陆信息
						that.logout()
						that.loadingAnime = false
						//失败后跳转至登陆页面重新登陆
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/login/login?data="+JSON.stringify({isLogin:false})+"",
								
							})
						},2500)						
						//成功吐司提示
						that.$refs.uToast.show({
							type:'error',
							title:'错误',
							message:'身份过期，请登陆后重试',
							position:'bottom',
							duration:2000
						})
					}
				})
										
				
							
			},
			logout_wexin(){
				this.logout()
				// 1. 获取当前页面栈实例（此时最后一个元素为当前页）
				let pages = getCurrentPages()
				// 2. 上一页面实例
				// 注意是length长度，所以要想得到上一页面的实例需要 -2
				// 若要返回上上页面的实例就 -3，以此类推
				let prePage = pages[pages.length - 2]
				// 3. 给上一页面实例绑定getValue()方法和参数（注意是$vm）
				prePage.$vm.showToast_logout()
				// 4. 返回上一页面
				uni.navigateBack({
					delta:1
				})		
			},
		}
	}
</script>

<style scoped lang="scss">
.user-setting-avatar {
	width: 100%;
	height: 300rpx;
	
	position: relative;
	
	.avatar-pic {
		position: absolute;
		top: 50%;
		left: 50%;
		transform:translate(-50%,-50%);
	}
	
}
.user-setting-infoItem {
	width: 100%;
	height: 100rpx;
	
	padding: 0 30rpx;
	margin-bottom: 30rpx;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	
	border-top: 1rpx solid #cccccc;
	border-bottom: 1rpx solid #cccccc;
	
	.user-setting-infoItem-text {
		margin-right: 120rpx;
		width: 64rpx;
		font-size: 32rpx;
	}
	
	
	.user-setting-infoItem-input {
		
		// display: flex;
		// justify-content: center;
		// align-items: center;
			
	}
}
.user-setting-btn {
	position: fixed;
	bottom: 10%;
	left: 0;
	width: 100%;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.left {
		width: 160rpx;
	}
	.right {
		width: 160rpx;
	}
}
.user-setting-loadingAnime {
	position: absolute;
	top: 75%;
	left: 50%;
	transform: translate(-50%,-50%);
}
</style>
