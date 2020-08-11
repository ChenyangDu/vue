<template>
  <div class="doc-editor-page">
    <el-form class="edit-container">
      <el-form-item>
        <tinymce-editor v-model="msg"
                        :disabled="disabled"
                        @onClick="onClick"
                        ref="editor">
        </tinymce-editor>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="primary" @click="disabled = true">禁用</el-button>
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
    this.doc_id = this.$route.params.id
    alert(this.doc_id + 'jkadshlfajhse')
    var _this = this
    this.$api.document.view({
      id: _this.doc_id
    }).then(res => {
      if (res.code === 200 ){
        _this.msg = res.data
      } else {
        _this.$message({
          message: '错误',
          type: 'error'
        })
        _this.$router.push('/')
      }
    })
  }
}
</script>
<style>
.doc-editor-page{
  margin: 100px 150px 0 150px;
}
</style>
