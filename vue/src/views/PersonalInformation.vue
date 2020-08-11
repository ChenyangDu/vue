<template>

  <div>

  <!--<el-radio-group v-model="labelPosition" size="small">
    <el-radio-button label="left">左对齐</el-radio-button>
    <el-radio-button label="right">右对齐</el-radio-button>
    <el-radio-button label="top">顶部对齐</el-radio-button>
  </el-radio-group>-->
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <h2 class="title">个人信息</h2>
  <el-form-item label="昵称">
    <el-input v-model="formLabelAlign.name" readonly="true"></el-input>
  </el-form-item>
  <el-form-item label="手机号">
    <el-input v-model="formLabelAlign.phone" readonly="true"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="formLabelAlign.email" readonly="true"></el-input>
  </el-form-item>
  <el-form-item label="微信号">
    <el-input v-model="formLabelAlign.wechat" readonly="true"></el-input>
  </el-form-item>
  <el-form-item label="QQ号">
    <el-input v-model="formLabelAlign.qq" readonly="true"></el-input>
  </el-form-item>

  <el-form-item class="button-item">
    <router-link to="/Revising">
      <el-button type="primary" style="width:36%;" round>修 改 个 人 信 息</el-button>
    </router-link>
    <router-link to="/">
      <el-button type="primary" style="width:36%;" round>返 回 主 页</el-button>
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
        labelPosition: 'top',
        
        formLabelAlign: {
          name: '',
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
        }
        )
      }
    }
      
  }
</script>



