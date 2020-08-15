<template>
  <div class='user_info_page'>
    <el-form class="person">
      <h2 class="title">个人信息</h2>

      <div style="width:100%;text-align:center">
        <el-form-item>
          <div class="block" align="center"><el-avatar shape="square" :size="100" :src="src"></el-avatar></div>
        </el-form-item>
      </div>

      
      <el-form-item label="昵称" prop="name" class="descClass">
        <el-input type="text" v-model="formLabelAlign.name" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" v-model="formLabelAlign.phone" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="formLabelAlign.email" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="wechat">
        <el-input type="text" v-model="formLabelAlign.wechat" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="QQ号" prop="qq">
        <el-input type="text" v-model="formLabelAlign.qq" readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item class="button-item">
        <router-link to="/Revising">
          <el-button type="primary" style="width:50%;" round>修 改 个 人 信 息</el-button>
        </router-link>
        <router-link to="/">
          <el-button type="primary" style="width:50%;" round>返 回 主 页</el-button>
        </router-link>
      </el-form-item>
     </el-form>
  </div>
</template>

<script>
export default {
  name: "PersonalInformation",
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        id: '',
        name: '',
        password: '',
        phone: '',
        wechat: '',
        qq: '',
        email: '',
      },
      src:this.global.baseUrl + "/image/avatar/show?user_id="+this.$store.state.user.username.id
    };
  },
  methods : {},
  created() {
    var _this = this
    this.$api.user.info({
      //id: 1
      id: _this.$store.state.user.username.id
    }).then(res=>{
      if (res.code === 200) {
        this.formLabelAlign=res.data
      } else {
        _this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }).catch(failResponse => {})
    console.log(this.src)

  }
}
</script>

<style scoped>
  .title {

  margin: 0 auto 30px auto;

  text-align: center;

  color: #505458;

}
.el-form-item {

  margin-bottom: 30px;

}
.person {
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
.button-item {
    margin: 0 auto 30px auto;

    text-align: center;
  }

</style>

