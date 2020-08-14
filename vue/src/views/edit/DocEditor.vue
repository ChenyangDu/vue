<template>
  <div class="doc-editor-page">
    <!--todo 编辑页面关闭 保存 修改is_editing-->
    <el-page-header @back="goBack" content="编辑页面" class="header" ></el-page-header>

    <!-- 文章标题-->
    <el-row :gutter="0">
      <el-col :span="20" :push="2">
        <el-card  class="title-card" :body-style="{ margin: '0px'}" shadow="always">
          <el-input type="text" v-model="doc.name" :disabled="name_disabled" style="width: 400px"></el-input>
<!--          authority.can_delete-->
          <el-button v-bind:icon="delete_icon_data" class="icon-delete" circle @click="handleDelete" v-if="authority.can_delete"></el-button>
          <el-button v-bind:icon="submit_icon_data" class="icon-submit" circle @click="handleSubmit"></el-button>
          <el-button v-bind:icon="share_icon_data" class="icon-share" circle @click="handleShare"></el-button>
          <el-button v-bind:icon="favorite_icon_data" class="icon-favorite" circle @click="handleFavo"></el-button>
          <el-button v-bind:icon="rename_icon_data" class="icon-rename" circle @click="handleRename"></el-button>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑区 -->
    <el-row :gutter="0">
      <el-col :span="20" :push="2">
        <el-card class="content-card" :body-style="{ margin: '0px'}" shadow="always">
          <el-form class="edit-container" >
            <el-form-item>
              <tinymce-editor v-model="msg"
                              :disabled="disabled"
                              :doc_id="this.doc.id"
                              @onClick="onClick"
                              ref="editor">
              </tinymce-editor>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!-- 评论区   -->
    <el-row :gutter="0">
      <el-col :span="20" :push="2">
        <el-card class="comment-card">
          <comment-panel :doc_id="this.doc.id" :can_comment="this.authority.can_comment"></comment-panel>
        </el-card>
      </el-col>
    </el-row>
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
      },
      name_disabled: true,
      edit_status: false,
      rename_icon_data: 'el-icon-edit',
      favorite_icon_data: 'el-icon-star-off',
      share_icon_data: 'el-icon-s-promotion',
      delete_icon_data: 'el-icon-delete-solid',
      submit_icon_data: 'el-icon-upload'
    }
  },
  created() {
    console.log('编辑页')
    this.doc = this.$route.params.doc // info
    console.log(this.doc)
    var _this = this
    // 请求文档权限信息
    _this.getAuthority()
  },
  methods: {
    // 请求文章-用户权限信息
    getAuthority() {
      var _this = this
      this.$api.authority.authority({
        user_id: _this.$store.state.user.username.id,
        doc_id: _this.doc.id
      }).then(res => {
        if (res.code === 400 ){ // 非权限问题
          console.log('authority code = 400 请求错误')
          _this.$message({
            message: res.msg,
            type: 'error'
          })
          _this.$router.back()
        } else if (res.code === 200) {
          console.log('authority code = 200')
          _this.authority = res.data
          console.log('authority')
          console.log(_this.authority)
          if ( _this.authority.can_read === true) { //可查看
            if (_this.authority.can_edit === true && _this.doc.is_editing === false){ //有编辑权力 无人在编辑
              console.log('有编辑权力 无人在编辑')
              _this.editStart()
            }
            else if ( _this.authority.can_edit === true && _this.doc.is_editing === true ) { //有编辑权力 有人在编辑
              console.log('有编辑权力 有人在编辑')
              _this.$alert('此文档正在被编辑，将退出该页面。','提示',{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.back()
                }
              })
            }
            else if (_this.authority.can_edit === false && _this.doc.is_editing === false){ // 无编辑权力 无人在编辑
              console.log('无编辑权力 无人在编辑')
              _this.$router.push({ // 到单纯查看页面
                name: 'DocView',
                params: {
                  doc: _this.doc
                }
              })
            }
            else if (_this.authority.can_edit === false && _this.doc.is_editing === true) { //无编辑权力 有人在编辑
              console.log('无编辑权力 有人在编辑')
              _this.$alert('此文档正在被编辑，将退出该页面。','提示',{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.back()
                }
              })
            }
          } else { // 无权利查看
            _this.$router.push('/noauthority')
          }
        }
      }).catch(failResponse => {})
    },
    // 开始编辑（已经确定：有编辑权力 无人在编辑）
    editStart() {
      var _this = this
      this.$api.document.start({
        doc_id: _this.doc.id, //封锁文章
      }).then(res => {
        if (res.code === 200) { //无人在编辑
          _this.viewDoc()
          this.edit_status = true
        } else if (res.code === 401) {
          console.log('start code = 401')
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        } else {
          console.log('start code = others')
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    // 显示文章
    viewDoc() {
      console.log("获取文章内容")
      var _this = this
      this.$api.document.view({
        doc_id: _this.doc.id, // 通过doc的id请求文档内容
      }).then(res => {
        if (res.code === 200 ){
          _this.msg = res.data
          console.log('获取文章内容 code = 200')
          console.log('here' + _this.msg)
        } else {
          console.log('获取文章内容 code = 400')
          _this.$message({
            message: res.msg, // 文章不存在
            type: 'error'
          })
        }
      }).catch(failResponse => {})
      console.log("获取文章内容-完成")
    },
    //修改标题
    handleRename() {
      var _this = this
      if (this.name_disabled === true) { // 当前为禁止修改的状态，故点击允许修改标题
        console.log('修改前')
        console.log(this.doc.name)
        _this.rename_icon_data = 'el-icon-check'
        this.name_disabled = false
      } else { // 当前为正在修改的状态,故再次点击进行保存
        console.log('修改后')
        console.log(this.doc.name)
        _this.rename_icon_data = 'el-icon-edit'
        this.name_disabled = true
        // 发送name修改后的请求
        // _this.$api.document.rename({
        //  doc_id: this.doc.id,
        //  不确定user_id
        //  user_id: this.$store.state.user.username.id
        // })
        _this.$message({
          message: '标题修改成功！',
          type: 'success'
        })
      }
    },
    // 收藏
    handleFavo() {
      var _this = this
      if (this.favorite_icon_data === 'el-icon-star-off') {
        this.favorite_icon_data = 'el-icon-star-on'
        _this.$api.document.favorite({
          doc_id: _this.doc.id,
          user_id: _this.$store.state.user.username.id,
          favorite: true
        }).then(res => {
          if (res.code === 200) {
            _this.$message({
              message: '文档收藏成功',
              type: 'success'
            })
          } else {
            _this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch(failResponse => {})
      } else {
        this.favorite_icon_data = 'el-icon-star-off'
        _this.$api.document.favorite({
          doc_id: _this.doc.id,
          user_id: _this.$store.state.user.username.id,
          favorite: false
        }).then(res => {
          if (res.code === 200) {
            _this.$message({
              message: '文档已取消收藏',
              type: 'success'
            })
          } else {
            _this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch(failResponse => {})
      }
    },
    // 分享
    handleShare() {

    },
    // 提交
    handleSubmit() {
      var _this = this
      console.log(this.msg)
      this.$api.document.end({
        doc_id: this.doc.id
      }, this.msg).then(res => {
        if (res.code === 200 ){
          _this.$message({
            message: '文章上传成功！',
            type: 'success'
          })
          _this.edit_status = false
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
    },
    goBack() {
      if (this.edit_status === true) {
        this.handleSubmit()
      }
      this.$router.back()
    },
    //鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    }
  }
}
</script>

<style scoped>
.header{
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 5px;
  padding: 20px 20px 20px 20px;
}
.title-card{
  margin-top: 30px;
}
.content-card{
  margin-top: 30px;
}
.comment-card{
  margin-top: 30px;
}
.icon-delete{
  float: right;
  font-size: 24px;
  position: relative;
  margin-left: 100px;
}
.icon-submit{
  float: right;
  font-size: 24px;
  position: relative;
  margin-left: 10px;
}
.icon-favorite, .icon-rename, .icon-share{
  float: right;
  font-size: 24px;
  position: relative;
  border: white;
}
</style>
