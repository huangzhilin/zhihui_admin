<template>
	<div id='login'>
		<el-card class='login'>
			<div slot="header"><h4>欢迎登录</h4></div>
			<el-form :model="dataForm" :rules="rules" ref="dataForm">
				<el-form-item prop="username">
					<el-input v-model="dataForm.username" :clearable="true" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type='password' v-model="dataForm.password" :clearable="true" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style='width:100%' @click="submitForm('dataForm')">登 录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			dataForm:{
				user_name: '',
				password: ''
			},
			rules: {
				username: [{required:true,message:'请输入用户名',trigger: 'blur'}],
				password: [{required:true,message:'请输入密码',trigger: 'blur'}],
			}
		}
	},
	methods: {
		submitForm(formName) {
			let _this = this
			this.$refs[formName].validate((valid) => {
				if (!valid) return false;
				_this.$router.push('/');
			});
		}
	}
}
</script>

<style>
#login {
    width: 100%;
    height: 100%;
    background-image: url('../assets/login-bg.jpg');
    background-size: cover;
    background-position: 50%;
    position: relative;
}
.login {
	width: 300px;
    position: absolute;
    right: 160px;
    top: 50%;
    -webkit-transform: translateY(-60%);
    transform: translateY(-60%);
}
</style>
