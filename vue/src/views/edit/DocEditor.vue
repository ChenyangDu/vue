<template>
  <div class="doc-editor-page">
    <el-page-header @back="goBack" content="编辑页面" class="header" ></el-page-header>
    <div class="content-container">
      <!-- 编辑区 -->
      <el-form class="edit-container" >
        <el-form-item>
          <tinymce-editor v-model="msg"
                          :disabled="disabled"
                          :doc_id="this.doc.id"
                          @onClick="onClick"
                          ref="editor">
          </tinymce-editor>
        </el-form-item>
        <el-form-item class="button-item" v-if="this.authority.can_edit">
          <el-button type="primary" @click="handleSubmit" style="float: right" >提交</el-button>
          <el-button type="danger" @click="handleDelete" style="float: left">删除</el-button>
          <!--        <el-button type="primary" @click="disabled = true">禁用</el-button>-->
        </el-form-item>
      </el-form>
      <!-- 评论区   -->
      <div class="comment-container">
        <comment-panel v-bind:doc_id="this.doc.id" v-bind:can_comment="this.authority.can_comment"></comment-panel>
      </div>
    </div>

  </div>

</template>

<script>
import TinymceEditor from "@/components/document/TinymceEditor";
import CommentPanel from "@/components/document/CommentPanel";
export default {
  name: 'Home',
  components: {
    CommentPanel,
    TinymceEditor
  },
  data() {
    return {
      msg: '',
      disabled: false,
      authority: {
        authority_userKey: {
          document_id: '',
          user_id: ''
        },
        can_comment: '',
        can_delete: '',
        can_edit: '',
        can_read: ''
      },
      doc: {
        id: 1,
        name: '',
        creator_id: 1,
        group_id: -1,
        create_time: '',
        last_time: '',
        last_edit_time: '',
        is_deleted: false,
        is_editing: false,
        edit_times: -1
      }
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
    // 请求文章-用户权限信息
    getAuthority() {
      var _this = this
      this.$api.authority.authority({
        user_id: _this.$store.state.user.username.id,
        // user_id: 1,
        doc_id: _this.doc.id
      }).then(res => {
        if (res.code === 400 ){
          _this.$message({
            message: res.msg,
            type: 'error'
          })
          _this.$router.back()
        } else if (res.code === 200) {
          _this.authority = res.data
          console.log('authority')
          console.log(_this.authority)
          if ( _this.authority.can_read === true) {
            console.log(1.1)
            if ( _this.authority.can_edit === true){
              console.log(1.2)
              _this.editStart()
            } else {
              console.log(2.1)
              _this.disabled = true
            }
          } else {
            _this.$message({
              message: '您没有权限查看此文档',
              type: 'error'
            })
            this.$router.back()
          }
        }
      }).catch(failResponse => {})


    },
    // 显示文章
    viewDoc() {
      this.$api.document.view({
        doc_id: _this.doc.id // 通过doc的id请求文档内容
      }).then(res => {
        if (res.code === 200 ){
          _this.msg = res.data
          console.log('文章内容')
          console.log(_this.msg)
        } else {
          _this.$message({
            message: res.msg, // 文章不存在
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    // 开始编辑（需要权限）
    editStart() {
      var _this = this
      this.$api.document.start({
        doc_id: _this.doc.id,
      }).then(res => {
        if (res.code !== 200) {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
          this.viewDoc()
        }
      }).catch(failResponse => {})
    },
    // 提交
    handleSubmit() {
      // this.$refs.editor.handleSubmit()
      var _this = this
      console.log(this.msg)
      this.$api.document.end({
        doc_id: this.doc.id
      }, this.msg).then(res => {
        if (res.code === 200 ){
          _this.message({
            message: '文章上传成功！',
            type: 'success'
          })
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    //删除
    handleDelete() {
      var _this = this
      this.$api.document.deleteDoc({
        doc_id: _this.doc.id,
        user_id: _this.$store.state.user.username.id
        // user_id: 1
      }).then(res => {
        if (res.code === 200) {
          _this.message({
            message: '文章已被成功删除',
            type: 'success'
          })
          // 删除后返回列表页
          _this.$router.back()
        } else {
          _this.message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    }
  },
  created() {
    this.doc = this.$route.params.doc // info
    console.log(this.doc.id)
    var _this = this
    // 请求文档权限信息
    _this.getAuthority()
    // // this.editStart()
    // console.log('created')
    // console.log(_this.authority)
    // if ( this.authority.can_read === true) {
    //   if ( this.authority.can_edit === true){
    //     _this.editStart()
    //   } else {
    //     this.disabled = true
    //   }
    // } else {
    //   _this.$message({
    //     message: '您没有权限查看此文档',
    //     type: 'error'
    //   })
    //   this.$router.back()
    // }
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
  /*display: inline;*/
  /*float: left;*/
  /*width: 67%;*/
  margin: 60px 60px 30px 60px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  padding: 40px;
  border-radius: 15px;
}
.comment-container{
  /*display: inline;*/
  /*float: right;*/
  /*width: 25%;*/
  margin: 30px 60px 0 60px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  padding: 20px 20px 20px 20px;
  border-radius: 15px;
}
</style>
