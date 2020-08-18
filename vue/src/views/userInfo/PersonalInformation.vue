<template>
  <div class="userinfo-page">
    <el-tabs tab-position="left" class='user_info_page'>
      <el-tab-pane label="用户信息">
        <h2 class="title">个人信息</h2>
        <el-row :gutter="20">
          <!--头像-->
          <el-col :span="8" :offset="0">
            <div class="block" align="center">
              <el-avatar shape="square" :size="100" :src="src"></el-avatar>
            </div>
          </el-col>
          <!--信息-->
          <el-col :span="14" :offset="0">
            <el-form class="person" label-position="right" label-width="60px">
              <el-form-item label="昵称" prop="name" class="descClass">
                <el-input type="text" v-model="userinfoForm.name" readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input type="text" v-model="userinfoForm.phone" readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="userinfoForm.email" readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="微信号" prop="wechat">
                <el-input type="text" v-model="userinfoForm.wechat" readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="QQ号" prop="qq">
                <el-input type="text" v-model="userinfoForm.qq" readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="个性签名" prop="sign">
                <el-input type="text" v-model="userinfoForm.sign" readonly="readonly"></el-input>
              </el-form-item>
<!--              <el-form-item class="button-item">-->
<!--                <router-link to="/Revising">-->
<!--                  <el-button type="primary" style="width:50%;" round>修 改 个 人 信 息</el-button>-->
<!--                </router-link>-->
<!--                <router-link to="/">-->
<!--                  <el-button type="primary" style="width:50%;" round>返 回 主 页</el-button>-->
<!--                </router-link>-->
<!--              </el-form-item>-->
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="修改信息">
        <h2 class="title">修改信息</h2>
        <el-row :gutter="20">
          <!--头像-->
          <el-col :span="8" :offset="0">
            <div class="block" align="center">
              <el-upload
                      class="avatar-uploader"
                      :action="'http://39.101.200.9:8081//image/avatar/upload?user_id='+this.$store.state.user.username.id"
                      :show-file-list="false"
                      :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div>修改个人头像</div>
              <div >将文件拖到上面，或<strong>点击上传</strong></div>
            </div>
          </el-col>
          <!--信息-->
          <el-col :span="14" :offset="0">
            <el-form class="revise" label-position="right" label-width="60px">
              <el-form-item label="昵称">
                <el-input type="text" v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="formLabelAlign.password"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input type="text" v-model="formLabelAlign.phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input type="email" v-model="formLabelAlign.email" ></el-input>
              </el-form-item>
              <el-form-item label="微信号">
                <el-input type="text" v-model="formLabelAlign.wechat"></el-input>
              </el-form-item>
              <el-form-item label="QQ号">
                <el-input type="text" v-model="formLabelAlign.qq" ></el-input>
              </el-form-item>
              <el-form-item label="个性签名">
                <el-input type="text" v-model="formLabelAlign.sign" ></el-input>
              </el-form-item>

              <el-form-item class="button-item">
                <el-button type="primary" style="width:36%;" @click="handleSubmit" round>保 存</el-button>
              </el-form-item >
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: "PersonalInformation",
  data() {
    return {
      labelPosition: 'right',
      userinfoForm: {
        id: '',
        name: '',
        password: '',
        phone: '',
        wechat: '',
        qq: '',
        email: '',
        sign:''
      },
      formLabelAlign: {
        id: 1,
        name: '',
        password: '',
        phone: '',
        wechat: '',
        qq: '',
        email: '',
        sign:''
      },
      src:this.global.baseUrl + "/image/avatar/show?user_id="+this.$store.state.user.username.id
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
          _this.$store.commit('login',_this.formLabelAlign)
          // _this.$router.push('/personalInformation')
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {});
    },
      beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
      }
  },
  created() {
    var _this = this
    this.$api.user.info({
      //id: 1
      id: _this.$store.state.user.username.id
    }).then(res=>{
      if (res.code === 200) {
        this.userinfoForm=res.data
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
.el-tabs /deep/ .el-tabs_header{
  position: relative;
  top: 100px;
}
.userinfo-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 60px auto;
  width: 800px;
  padding: 35px 50px 15px 50px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.block{
  position: relative;
  top: 80px;
}
.button-item {
    margin: 0 auto 30px auto;
    text-align: center;
  }
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
