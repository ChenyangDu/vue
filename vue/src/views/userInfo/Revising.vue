<template>
  <div style="margin: 0 0 35px 0;">
  <el-form class="revise" >
    <el-form-item label="头像">
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.password"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="formLabelAlign.phone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="formLabelAlign.email" ></el-input>
    </el-form-item>
    <el-form-item label="微信号">
      <el-input v-model="formLabelAlign.wechat"></el-input>
    </el-form-item>
    <el-form-item label="QQ号">
      <el-input v-model="formLabelAlign.qq" ></el-input>
    </el-form-item>

    <el-form-item class="button-item">
        <el-button type="primary" style="width:36%;" @click="handleSubmit" round>保 存</el-button>
      </el-form-item >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Revising",
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        id: 1,
        name: '',
        password: '',
        phone: '',
        wechat: '',
        qq: '',
        email: ''
      }
    };
  },
  methods : {
    handleSubmit () {
      var _this = this
      this.$api.user.save(this.formLabelAlign).then(res => {
        if (res.code === 200) {
          _this.$message({
            message: '修改成功',
            type: 'success'
          })
          _this.$router.push('/personalInformation')
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {});
    }
  },
  created() {
    var _this = this
    this.$api.user.info({
      id: 1
      // id: _this.$store.state.user.username.id
    }).then(res=>{
          if (res.code === 200) {
            this.formLabelAlign=res.data
          } else {
            _this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }
    ).catch(failResponse => {})
  }
}
</script>

<style scoped>

.el-form-item {

  margin-bottom: 30px;

}
  .revise {
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
