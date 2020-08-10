<template>
  <div>
    <el-form class="login-container" :model="loginForm" ref="loginForm" :rules="fieldRules" label-position="left" label-width="0px">
      <h2 class="title">系统登陆</h2>
      <el-form-item prop="phone">
        <el-input type="text" v-model="loginForm.phone" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button type="primary" style="width:36%;" @click.native.prevent="reset" round>重 置</el-button>
        <el-button type="primary" style="width:36%;" @click.native.prevent="login" :loading="loading" round>登 录</el-button>
      </el-form-item>
      <el-form-item class="register-item">
          <router-link to="/register">
            <el-button type="text">去 注 册</el-button>
          </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from "@/store/modules/user";

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
      }
    }
  },
  methods: {
    login() {
      let userInfo = {
        phone: this.loginForm.phone,
        password: this.loginForm.password
      }
      var _this = this
      this.$api.login.login(userInfo).then(res => {
        if (res.msg != null) {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        } else {
          sessionStorage.setItem('user', userInfo.phone)
          _this.$store.commit('login',userInfo.phone)
          _this.$router.push('/')
        }
      }).catch(res => {
        _this.$message({
          message: res.message,
          type: 'error'
        })
      })
    },
    reset() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
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
.button-item {
  margin-bottom: 10px;
}
.register-item {
  margin: 0;
}
</style>
