<template>
  <div>
    <el-form class="register-container" :model="registerForm" :rules="fieldRules" ref="registerForm">
      <h2 class="title">用户注册</h2>
      <el-form-item prop="name">
        <el-input type="text" v-model="registerForm.name" auto-complete="off" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input type="text" v-model="registerForm.phone"  auto-complete="off" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="registerForm.email"  auto-complete="off" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="wechat">
        <el-input type="text" v-model="registerForm.wechat"  auto-complete="off" placeholder="微信号"></el-input>
      </el-form-item>
      <el-form-item prop="qq">
        <el-input type="text" v-model="registerForm.qq"  auto-complete="off" placeholder="QQ号"></el-input>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button type="primary" style="width:36%;" @click="reset" round>重 置</el-button>
        <el-button type="primary" style="width:36%;" @click="register" round>注 册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        name: '',
        password: '',
        phone: '',
        email: '',
        wechat: '',
        qq: ''
      },
      fieldRules: {
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    register() {
      // let userInfo = {
      //
      // }
      //
    },
    reset() {
      this.$refs.registerForm.resetFields()
    }
  }
}
</script>

<style scoped>
.register-container {
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
</style>
