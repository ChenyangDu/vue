<template>
  <div class="doc-editor-page">
    <!--todo 编辑页面关闭 保存 修改is_editing-->
    <el-page-header @back="goBack" content="编辑页面" class="header" ></el-page-header>

    <!-- 文章标题-->
    <el-row :gutter="0">
      <el-col :span="20" :push="2">
        <el-card  class="title-card" :body-style="{ margin: '0px'}" shadow="always">
          <el-input type="text" v-model="this.doc.name" :disabled="this.name_disabled" style="width: 400px"></el-input>

          <div class="creator-au" v-if="create_au_show">
          <el-button v-bind:icon="delete_icon_data" class="icon-delete" circle @click="handleDelete"></el-button>
          <el-button v-bind:icon="share_icon_data" class="icon-share" circle @click="dialogFormVisible = true"></el-button>
          <el-button v-bind:icon="authority_icon_data" class="icon_authority" circle @click="authorityFormVisible = true"></el-button>
          <!--分享弹窗-->
          <el-dialog title="分享" :visible.sync="dialogFormVisible">
            <el-form :model="shareForm">
              <el-form-item label="权限给予：" :label-width="formLabelWidth">
                <el-select v-model="shareForm.type" placeholder="请选择分享的权限">
                  <el-option label="可查看" value="1"></el-option>
                  <el-option label="可查看与评论" value="2"></el-option>
                  <el-option label="可查看与评论与编辑" value="3"></el-option>
                  <!--                    <el-option label="可查看与评论与编辑与删除" value="4"></el-option>-->
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleShare">确 定</el-button>
            </div>
          </el-dialog>

          <!--权限设置-->
          <el-dialog title="权限管理" :visible.sync="authorityFormVisible">
            <authority-panel :doc_id="this.doc_id"></authority-panel>
          </el-dialog>
        </div>

          <div class="favo-au" v-if="favo_au_show">
            <el-button v-bind:icon="favorite_icon_data" class="icon-favorite" circle @click="handleFavo"></el-button>
          </div>

          <div class="edit-au" v-if="edit_au_show">
            <el-button v-bind:icon="submit_icon_data" class="icon-submit" circle @click="handleSubmit"></el-button>
            <el-button v-bind:icon="edit_icon_data" class="icon-edit" circle @click="editStart"></el-button>
            <el-button v-bind:icon="rename_icon_data" class="icon-rename" circle @click="handleRename"></el-button>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑区 -->
    <el-row :gutter="0">
      <el-col :span="20" :push="2">
        <el-card class="content-card" :body-style="{ margin: '0px'}" shadow="always">
          <el-form class="edit-container" >
            <el-form-item>
              <tinymce-editor v-model="this.msg"
                              :disabled="this.disabled"
                              :edit_bar_show="this.edit_bar_show"
                              :doc_id="this.doc_id"
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
          <comment-panel :doc_id=this.doc_id :can_comment="this.authority.can_comment"></comment-panel>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TinymceEditor from "@/components/document/TinymceEditor";
import CommentPanel from "@/components/document/CommentPanel";
import AuthorityPanel from "@/components/document/AuthorityPanel";
export default {
  name: 'Home',
  components: {
    AuthorityPanel,
    CommentPanel,
    TinymceEditor
  },
  data() {
    return {
      msg: '',
      doc_id: '',
      user_id:this.$store.state.user.username.id,
      doc: {
        id: '',
        name: '',
        creator_id: '',
        group_id: '',
        create_time: '',
        last_edit_time: '',
        is_deleted: '',
        is_editing: '',
        edit_times: '',
        username: ''
      },
      disabled: true, // tinymce输入
      name_disabled: true, // 标题修改
      edit_status: false,
      favo_au_show: true, // 不会隐藏
      create_au_show: true, // 专属创建者
      edit_au_show: true, // 编辑者
      edit_bar_show: true, // 编辑者
      rename_icon_data: 'el-icon-edit',
      favorite_icon_data: 'el-icon-star-off',
      share_icon_data: 'el-icon-share',
      delete_icon_data: 'el-icon-delete-solid',
      submit_icon_data: 'el-icon-upload',
      edit_icon_data: 'el-icon-edit-outline',
      authority_icon_data: 'el-icon-s-tools',
      dialogFormVisible: false,
      authorityFormVisible: false,
      formLabelWidth:'100px',
      //存获取的信息
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
    }
  },
  created() {
    // 通过 doc_id 跳转的
    console.log('编辑页')
    this.doc_id = parseInt(this.$route.query.doc_id)
    this.user_id = this.$store.state.user.username.id
    console.log('文章id如下：')
    console.log(typeof this.doc_id)
    console.log(this.doc_id)
    // 请求文档权限信息
    this.getAuthority()
  },
  methods: {
    // 请求文章-用户权限信息
    getAuthority() {
      var _this = this
      this.$api.authority.authority({
        user_id: _this.user_id,
        doc_id: _this.doc_id
      }).then(res => {
        if (res.code === 200 ){
          console.log('authority code = 200')
          _this.authority = res.data
          console.log('authority如下：')
          console.log(_this.authority)
          if ( _this.authority.can_read === true) { //可查看
            _this.getInfo()
          } else { // 无权利查看
            _this.$router.replace('/noauthority')
          }
        } else if (res.code === 400) {// 非权限问题
          console.log('authority code = 400 请求错误')
          _this.$message({
            message: res.msg,
            type: 'error'
          })
          _this.$router.back()
        }
      }).catch(failResponse => {})
    },
    // 获取doc info
    getInfo() {
      var _this = this
      console.log('获取doc info')
      console.log(this.doc_id)
      this.$api.document.info({
        doc_id: _this.doc_id
      }).then(res => {
        if (res.code === 200) {
          _this.doc = res.data
          if (_this.doc.is_deleted){
            _this.$message({
              message: '该文档已删除',
              type: 'error'
            })
            _this.goBack()
          } else {
            if (_this.doc.is_editing === true){ //文档正在被编辑
              _this.$alert('此文档正在被编辑，即将返回','提示',{
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.back()
                }
              })
            } else {
              _this.viewDoc()
              _this.favoInfo()
            }
          }
        } else {
          _this.$alert(res.msg,'提示',{
            confirmButtonText: '确定',
            callback: action => {
              _this.$router.back()
            }
          })
        }
      }).catch(failResponse => {})
    },
    // 显示文章
    viewDoc() {
      var _this = this
      console.log("获取文章内容")
      console.log('doc_id + user_id')
      console.log(this.doc_id)
      console.log(this.user_id)
      this.$api.document.view({
        doc_id: _this.doc_id, // 通过doc的id请求文档内容
        user_id: _this.user_id // 用作浏览记录
      }).then(res => {
        if (res.code === 200 ){
          _this.msg = res.data
          console.log('获取文章内容 code = 200')
          console.log('here are msg =>' + _this.msg)
          _this.loadButton()
        } else {
          console.log('获取文章内容 code = 400')
          _this.$alert(res.msg,'提示',{
            confirmButtonText: '确定',
            callback: action => {
              _this.$router.back()
            }
          })
        }
      }).catch(failResponse => {})
      console.log("获取文章内容-完成")
    },
    // 根据权限加载按钮
    loadButton() {
      var _this = this
      if (this.user_id === this.doc.creator_id) { // 对应情况8
        console.log('是创建者')
        _this.create_au_show = true
        _this.edit_au_show = true
        _this.edit_bar_show = true
      } else if (this.authority.can_edit) {
        console.log('可编辑')
        _this.create_au_show = false
        _this.edit_au_show = true
        _this.edit_bar_show = true
      } else if (this.authority.can_comment) {
        console.log('可评论')
        _this.create_au_show = false
        _this.edit_au_show = false
        _this.edit_bar_show = false
        // 评论模块由can_comment绑定 为true
      } else if (this.authority.can_read) {
        console.log('仅可查看')
        _this.create_au_show = false
        _this.edit_au_show = false
        _this.edit_bar_show = false
        // 评论模块由can_comment绑定 为false
      }
    },
    // 获取收藏信息
    favoInfo() {
      var _this = this
      this.$api.document.favoriteinfo({
        doc_id: _this.doc_id,
        user_id: _this.user_id
      }).then(res => {
        if (res.code === 200) {
          if (res.data === true) {
            _this.favorite_icon_data = 'el-icon-star-on'
          } else {
            _this.favorite_icon_data = 'el-icon-star-off'
          }
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    // 点击开始编辑（已经确定：有编辑权力 无人在编辑）
    editStart() {
      var _this = this
      this.$api.document.start({
        doc_id: _this.doc_id, //封锁文章
      }).then(res => {
        if (res.code === 200) { //无人在编辑
          console.log('editStart code = 200')
          this.edit_status = true
          this.disabled=false
        } else if (res.code === 401) { // 文章正在被编辑
          console.log('editStart code = 401')
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        } else {
          console.log('editStart code = others')
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    // 修改标题
    handleRename() {
      var _this = this
      if (_this.name_disabled === true) { // 当前为禁止修改的状态，故点击允许修改标题
        console.log('修改前')
        console.log(this.doc.name)
        _this.rename_icon_data = 'el-icon-check'
        _this.name_disabled = false
      } else { // 当前为正在修改的状态,故再次点击进行保存
        // 发送name修改后的请求
        _this.$api.document.rename({
         doc_id: this.doc_id,
         name: _this.doc.name
        }).then(res => {
          if (res.code === 200){
            console.log('修改后')
            console.log(this.doc.name)
            _this.rename_icon_data = 'el-icon-edit'
            _this.name_disabled = true
            _this.$message({
              message: '标题修改成功！',
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
    // 收藏
    handleFavo() {
      var _this = this
      if (this.favorite_icon_data === 'el-icon-star-off') {
        _this.$api.document.favorite({
          doc_id: _this.doc_id,
          user_id: _this.user_id,
          favorite: true
        }).then(res => {
          if (res.code === 200) {
            this.favorite_icon_data = 'el-icon-star-on'
            _this.$message({
              message: '文档收藏成功',
              type: 'success'
            })
          } else {
            _this.$message({
              message: '收藏失败',
              type: 'error'
            })
            _this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch(failResponse => {})
      } else {
        _this.$api.document.favorite({
          doc_id: _this.doc.id,
          user_id: _this.user_id,
          favorite: false
        }).then(res => {
          if (res.code === 200) {
            _this.$message({
              message: '文档已取消收藏',
              type: 'success'
            })
            this.favorite_icon_data = 'el-icon-star-off'
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
      var _this = this
      this.dialogFormVisible = false
      console.log(this.shareForm.type)
      if (this.shareForm.type === '') {
        _this.$message({
          message: '分享失败！',
          type: 'error'
        })
      } else {
        // todo 提交权限
        if(this.shareForm.type === "1") {
          this.shareAuthorityForm.can_comment = false
          this.shareAuthorityForm.can_edit = false
        } else if (this.shareForm.type === "2"){
          this.shareAuthorityForm.can_edit = false
        }
        this.shareAuthorityForm.document_id = this.doc_id
        this.$api.authority.shareAuthority(
          _this.shareAuthorityForm
        ).then(res=> {
          if(res.code === 200 ){
            _this.$alert('http://39.101.200.9:8080/#/doceditor?doc_id=' + _this.doc_id,'分享链接',{
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
    },
    // 提交
    handleSubmit() {
      var _this = this
      console.log(this.msg)
      this.$api.document.end({
        doc_id: _this.doc_id
      }, _this.msg).then(res => {
        if (res.code === 200 ){
          _this.$message({
            message: '文章上传成功！',
            type: 'success'
          })
          _this.disabled=true
          _this.edit_status = false
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 删除
    handleDelete() {
      var _this = this
      this.$api.document.deleteDoc({
        doc_id: _this.doc_id,
        user_id: _this.user_id
      }).then(res => {
        if (res.code === 200) {
          _this.$message({
            message: '文章已被成功删除',
            type: 'success'
          })
          // 删除后返回列表页
          _this.$router.back()
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    // 返回 检测是否提交
    goBack() {
      if (this.edit_status === true) {
        this.$message({
          message: '文章仍未保存上传',
          type: 'error'
        })
      } else {
        this.$router.back()
      }
    },
    // 鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    }
  },
  beforeDestroy() {
    this.handleSubmit()
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
  border: white;
}
.icon-favorite, .icon-rename, .icon-share,.icon-submit, .icon-edit, .icon_authority{
  float: right;
  font-size: 24px;
  position: relative;
  border: white;
  margin-left: 10px;
}
</style>
