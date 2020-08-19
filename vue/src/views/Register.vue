<template>
  <div class="register-page">
    <el-form class="register-container" :model="registerForm" :rules="fieldRules" ref="registerForm">
      <h2 class="title"><b>用户注册</b></h2>
      <el-form-item prop="name">
        <el-input type="text" v-model="registerForm.name" auto-complete="off" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input type="password" v-model="registerForm.password2"  auto-complete="off" placeholder="请再次输入密码"></el-input>
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
        <el-button type="primary" style="width:30%;background: #505458;border: none;margin-left: 47px;" @click="reset" round><span style="font-size: 110%">重 置</span></el-button>
        <el-button type="primary" style="width:30%;background: #505458;border: none;margin-left: 47px;" @click="register('registerForm')" round><span style="font-size: 110%">注 册</span></el-button>
      </el-form-item>
      <span style="color: #505458;margin-left: 235px">已有账号?</span>
      <router-link to="/login">
        <el-button type="text">去登录</el-button>
      </router-link>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        if (value !== '') {
          var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(value)){
            callback(new Error('邮箱不合法'));
          }
        }
        callback();
      }
    };
    var validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (value !== '') {
          var reg=/^1[3456789]\d{9}$/;
          if(!reg.test(value)){
            callback(new Error('手机号不合法'));
          }
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.password2 !== '') {
          this.$refs.registerForm.validateField('password2');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        console.log(value)
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password){
        console.log(value)
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      registerForm: {
        name: '',
        password: '',
        password2:'',
        phone: '',
        email: '',
        wechat: '',
        qq: ''
      },
      password2: '',
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
            validator: validatePass,
            // message: '请输入密码',
            trigger: 'blur'
          }
        ],
        password2: [
          {
            required: true,
            validator: validatePass2,
            // message: '请再次填写密码',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            validator: validateMobilePhone,
            // message: '请输入正确完整的手机号',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            validator: validateEmail,
            // message: '请输入正确完整的邮箱号',
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
          delete this.registerForm.password2
          let userInfo = this.registerForm
          console.log(this.registerForm)
          this.$api.login.register(userInfo).then(res => {
            if (res.code !== 200) {
              _this.$message({
                message: res.msg,
                type: 'error'
              })
            } else {
              _this.$router.push('/login')
            }
          }).catch(failResponse => {})
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
  margin: 70px auto;
  width: 420px;
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
