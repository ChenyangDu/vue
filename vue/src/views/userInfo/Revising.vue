<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="width:40%;text-align:center" >
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
      }).catch(res => {
        _this.$message({
          message: res.msg,
          type: 'error'
        })
      });
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
    )
  }
}
</script>
