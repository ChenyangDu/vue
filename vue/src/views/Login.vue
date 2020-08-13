<template>
  <div class="login-page">
    <el-form class="login-container" :model="loginForm" ref="loginForm" :rules="fieldRules" label-position="left" label-width="0px">
      <h2 class="title">系统登陆</h2>
      <el-form-item prop="phone">
        <el-input type="text" v-model="loginForm.phone" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="button-item" style="margin-bottom: 10px">
        <el-button type="primary" style="width:30%;background: #505458;border: none;margin-left: 47px;" @click.native.prevent="reset" round>重 置</el-button>
        <el-button type="primary" style="width:30%;background: #505458;border: none;margin-left: 47px;" @click.native.prevent="login('loginForm')" :loading="loading" round>登 录</el-button>
      </el-form-item>
      <el-form-item class="register-item" style="margin: 0 0 0 2px;">
        <el-checkbox class="login_remember" v-model="checked"
                     label-position="left"><span style="color: #505458">记住密码</span>
        </el-checkbox>
        <span style="color: #505458;margin-left: 130px">还没有账号?</span>
          <router-link to="/register">
            <el-button type="text">立即注册</el-button>
          </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        phone: '',
        password: '',
      },
      fieldRules: {
        phone: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: false
    }
  },
  methods: {
    login(formName) {
      var _this = this
      this.$refs[formName].validate(valid => {
        if (valid){
          let userInfo = {
            phone: this.loginForm.phone,
            password: this.loginForm.password
          }
          this.$api.login.login(userInfo).then(res => {
            if (res.code === 400) {
              _this.$message({
                message: res.msg,
                type: 'error'
              })
            } else {
              _this.$store.commit('login',res.data)
              _this.$router.push('/home')
            }
          }).catch(failResponse => {})
        } else {
          _this.$message({
            message: '请填写完整登录信息！',
            type: 'error'
          })
        }
      })
    },
    reset() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.login-page {
  background: url("../assets/img/bg/bg_1_underattack.png") no-repeat center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-size: cover;
  position: fixed;
}
.login-container {

  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0 0 35px 0;
}
.el-form-item {
  margin-bottom: 30px;
}
.login_remember {
  margin: 0 0 0 0;
  text-align: left;
}
/*.el-button{*/
/*  margin-left: 47px;*/
/*}*/
/*.el-button+.el-button{*/
/*  margin-left: 47px;*/
/*}*/
/*.button-item {*/
/*  margin-bottom: 10px;*/
/*}*/
/*.register-item {*/
/*  margin: 0;*/
/*}*/
</style>
