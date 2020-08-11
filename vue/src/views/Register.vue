<template>
  <div class="register-page">
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
      <el-form-item class="button-item" style="margin-bottom: 10px">
        <el-button type="primary" style="width:30%;background: #505458;border: none;margin-left: 47px;" @click="reset" round>重 置</el-button>
        <el-button type="primary" style="width:30%;background: #505458;border: none;margin-left: 47px;" @click="register('registerForm')" round>注 册</el-button>
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
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
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
    register(formName) {
      var _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userInfo = this.registerForm
          this.$api.login.register(userInfo).then(res => {
            if (res.code !== 200) {
              _this.$message({
                message: res.msg,
                type: 'error'
              })
            } else {
              _this.$router.push('/login')
            }
          }).catch(res => {
            _this.$message({
              message: res.msg,
              type: 'error'
            })
          })
        } else {
          _this.$message({
            message: '请正确填写注册信息！',
            type: 'error'
          })
        }
      })

    },
    reset() {
      this.$refs.registerForm.resetFields()
    }
  }
}
</script>

<style scoped>
.register-page {
  background: url("../assets/img/bg/bg_1_underattack.png") no-repeat center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-size: cover;
  position: fixed;
}
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
/*.el-button{*/
/*  margin-left: 47px;*/
/*}*/
/*.el-button+.el-button{*/
/*  margin-left: 47px;*/
/*}*/
/*.button-item {*/
/*  margin-bottom: 10px;*/
/*}*/
</style>
