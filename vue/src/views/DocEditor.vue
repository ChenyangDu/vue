<template>
  <div class="doc-editor-page">
    <el-page-header @back="goBack" content="编辑页面" class="header"></el-page-header>

    <el-form class="edit-container">
      <el-form-item>
        <tinymce-editor v-model="msg"
                        :disabled="disabled"
                        @onClick="onClick"
                        ref="editor">
        </tinymce-editor>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button type="primary" @click="handleSubmit" style="float: right">提交</el-button>
<!--        <el-button type="primary" @click="disabled = true">禁用</el-button>-->
      </el-form-item>
    </el-form>
    {{ msg }}
  </div>

</template>

<script>
import TinymceEditor from "@/component/TinymceEditor";
export default {
  name: 'Home',
  components: {
    TinymceEditor
  },
  data() {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false,
      doc_id: ''
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    //鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    //提交
    handleSubmit() {
      this.$refs.editor.handleSubmit()
    }
  },
  mounted() {
    // todo 权限请求判断
    this.doc_id = this.$route.params.doc_id
    console.log(this.doc_id)
    var _this = this
    this.$api.document.view({
      doc_id: _this.doc_id // 通过doc的id请求文档内容
    }).then(res => {
      if (res.code === 200 ){
        _this.msg = res.data
      } else {
        _this.$message({
          message: res.msg, // 文章不存在
          type: 'error'
        })
      }
    })
  }
}
</script>

<style scoped>
.header{
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
}
.edit-container{
  margin: 60px 80px 0 80px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  padding: 40px;
  border-radius: 15px;
}
</style>
