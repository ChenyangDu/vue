<template>

  <div >
    <center>
  <div style="margin: 50px;"></div>
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
      <el-button type="primary" style="width:36%;" @click="rep" round>保 存</el-button>
    </el-form-item >
  </el-form>
  </center>
  </div>

</template>



<script>

export default {

    name: "Revising",

    data() {
      
      return {
        labelPosition: 'right',
        
        formLabelAlign: {
          name: '',
          password: '',
          phone: '',
          email: '',
          wechat: '',
          qq: ''
        }
      };
    },

    methods : {
      per(formName){
        this.$api.user.info('id').then(res=>{
          this.formLabelAlign=res.data
        })
      },
      rep () {
        this.$api.user.save('userInfo').then(res=>{
          res.data=this.formLabelAlign
        }
        );
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success'
        });
        this.$router.push("/PersonalInformation");
      }
    }
  }
</script>
