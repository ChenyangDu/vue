<template>
  <div>
    <el-form :model="shareForm">
      <el-form-item label="权限给予：" :label-width="formLabelWidth">
        <el-select v-model="shareForm.type" placeholder="请选择分享的权限">
          <el-option label="可查看" value="1"></el-option>
          <el-option label="可查看与评论" value="2"></el-option>
          <el-option label="可查看与评论与编辑" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row :gutter="0">
      <el-col :span="24" :push="16">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="handleShare">确 定</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "SharePanel",
  props: {
    doc_id: {
      type: Number,
      default:1
    }
  },
  data() {
    return {
      // 用户选择的权限
      shareForm: {
        type: ''
      },
      // 接口提交的数据
      shareAuthorityForm: {
        document_id: 0,
        user_id: 0,
        can_read: true,
        can_comment: true,
        can_edit: true,
      },
      formLabelWidth:'100px',
    }
  },
  methods:{
    // 分享
    handleShare() {
      var _this = this
      console.log(this.shareForm.type)
      if (this.shareForm.type === '') {
        _this.$message({
          message: '分享失败！',
          type: 'error'
        })
      } else {
        // todo 提交权限
        if(this.shareForm.type === "1") {
          this.shareAuthorityForm.can_read = true
          this.shareAuthorityForm.can_comment = false
          this.shareAuthorityForm.can_edit = false
        } else if (this.shareForm.type === "2"){
          this.shareAuthorityForm.can_read = true
          this.shareAuthorityForm.can_comment = true
          this.shareAuthorityForm.can_edit = false
        } else {
          this.shareAuthorityForm.can_read = true
          this.shareAuthorityForm.can_comment = true
          this.shareAuthorityForm.can_edit = true
        }
        this.shareAuthorityForm.document_id = this.doc_id
        this.$api.authority.shareAuthority(
            _this.shareAuthorityForm
        ).then(res=> {
          if(res.code === 200 ){
            _this.$alert('http://192.168.0.106:8080/#/doceditor?doc_id=' + _this.doc_id,'分享链接',{
              confirmButtonText: '确定',
              callback: action => {
                _this.$message({
                  message: '文档分享成功',
                  type: 'success'
                })
              }
            })
          } else {
            _this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch(failResponse => {})

      }
      this.cancel()
    },
    cancel(){
      this.$emit('cancelShare')
    }
  }
}
</script>

<style scoped>
.dialog-footer{
/*position: center;*/
}
</style>
