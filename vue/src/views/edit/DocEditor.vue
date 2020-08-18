<template>
  <div>
    <div class="wrapper">
      <div class="left"  id="fullscreen">
        <!-- 文章标题-->
        <el-card  class="doc-card" :body-style="{ margin: '0px'}" shadow="always" style="min-height: 660px">
          <el-row :gutter="50" class="title-row">
            <el-col :span="8" :push="0">
              <h1  class="doc-info" v-if="name_disabled">{{ doc.name }}</h1>
              <el-input type="text" v-model="doc.name" v-if="!(name_disabled)" :disabled="name_disabled" class="title-input"></el-input>
            </el-col>
            <div class="icon-group">
              <div class="edit-au" v-if="edit_au_show">
                <el-col :span="1" :push="0">
                  <el-tooltip effect="dark" :content="name_disabled?`修改标题`:`保存标题`" placement="top">
                    <el-button v-bind:icon="rename_icon_data" class="icon-rename" circle @click="handleRename"></el-button>
                  </el-tooltip>
                </el-col>
                <el-col :span="1" :push="0">
                  <el-tooltip effect="dark" content="开始编辑" placement="top">
                    <el-button v-bind:icon="edit_icon_data" class="icon-edit" circle @click="editStart" :disabled="edit_status"></el-button>
                  </el-tooltip>
                </el-col>
                <el-col :span="1" :push="0">
                  <el-tooltip effect="dark" content="提交文章" placement="top">
                    <el-button v-bind:icon="submit_icon_data" class="icon-submit" circle @click="handleSubmit" :disabled="!(edit_status)"></el-button>
                  </el-tooltip>
                </el-col>
              </div>

              <div class="favo-au" v-if="favo_au_show">
                <el-col :span="1" :push="0">
                  <el-tooltip effect="dark" content="收藏" placement="top">
                    <el-button v-bind:icon="favorite_icon_data" class="icon-favorite" circle @click="handleFavo"></el-button>
                  </el-tooltip>
                </el-col>
              </div>

              <div class="creator-au" v-if="create_au_show">
                <el-col :span="1" :push="0">
                  <el-tooltip effect="dark" content="去查看" placement="top">
                    <el-button icon="el-icon-view" class="icon-toView" circle @click="toDocView"></el-button>
                  </el-tooltip>
                </el-col>
                <el-col :span="1" :push="0">
                  <el-tooltip effect="dark" content="分享" placement="top">
                    <el-button v-bind:icon="share_icon_data" class="icon-share" circle @click="shareDialogVisible = true"></el-button>
                  </el-tooltip>
                </el-col>
                <el-col :span="1" :push="0">
                  <el-tooltip effect="dark" content="权限设置" placement="top">
                    <el-button v-bind:icon="authority_icon_data" class="icon_authority" circle @click="authorityDialogVisible = true"></el-button>
                  </el-tooltip>
                </el-col>
                <el-col :span="1" :push="0">
                  <el-tooltip effect="dark" content="删除文章" placement="top">
                    <el-button v-bind:icon="delete_icon_data" class="icon-delete" circle @click="handleDelete"></el-button>
                  </el-tooltip>
                </el-col>
              </div>

              <div class="btn-fullscreen" @click="handleFullScreen">
                <el-col :span="1" :push="0">
                  <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="top">
                    <el-button icon="el-icon-rank" class="icon-screen" circle></el-button>
                  </el-tooltip>
                </el-col>
              </div>
            </div>
          </el-row>
          <el-divider class="title-content-divider" v-if="!(edit_status)"></el-divider>
          <el-form class="edit-container" v-if="edit_status">
            <el-form-item>
              <tinymce-editor v-model="msg"
                              v-on:submitSuccess="submitSuccess"
                              :disabled="this.disabled"
                              :edit_bar_show="this.edit_bar_show"
                              :doc_id="this.doc_id"
                              @onClick="onClick"
                              ref="editor">
              </tinymce-editor>
            </el-form-item>
          </el-form>
          <div v-html="msg" v-if="!(edit_status)"></div>
        </el-card>
      </div>
      <div class="right">
        <el-row>
          <el-col :span="23" :push="1">
            <el-card class="info-card">
              <div align="center" @click="memberDetail">
                <el-avatar size="large" :src=this.doc_avatar></el-avatar><br/>
                <span class="doc-info">{{ this.doc.username}}</span><br/>
              </div>
              <span class="doc-info">创建时间：{{ this.doc.create_time.substring(0,10)+' '+this.doc.create_time.substring(11,19) }}</span><br/>
              <span class="doc-info">最近修改时间：{{ this.doc.last_edit_time.substring(0,10) + ' ' + this.doc.last_edit_time.substring(11,19) }}</span><br/>
              <span class="doc-info">修改次数：{{ this.doc.edit_times }}</span>
            </el-card>
          </el-col>
        </el-row>
        <!-- 评论区   -->
        <el-row :gutter="0">
          <el-col :span="23" :push="1">
            <el-card class="comment-card">
              <comment-panel :doc_id=this.doc_id :can_comment="this.authority.can_comment"></comment-panel>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!--分享弹窗-->
      <el-dialog title="分享" :visible.sync="shareDialogVisible">
        <share-panel :doc_id="this.doc_id" v-on:cancelShare="cancelShare"></share-panel>
      </el-dialog>

      <!--权限设置-->
      <el-dialog title="权限管理" :visible.sync="authorityDialogVisible">
        <authority-panel :doc_id="this.doc_id" :group_id="this.doc.group_id"></authority-panel>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TinymceEditor from "@/components/document/TinymceEditor";
import CommentPanel from "@/components/document/CommentPanel";
import AuthorityPanel from "@/components/document/AuthorityPanel";
import SharePanel from "@/components/document/SharePanel";
export default {
  name: 'Home',
  components: {
    SharePanel,
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
        is_editting: '',
        edit_times: '',
        username: ''
      },
      doc_acatar: '',
      disabled: true, // tinymce输入
      name_disabled: true, // 标题修改
      edit_status: false,
      favo_au_show: false, // 不会隐藏
      create_au_show: false, // 专属创建者
      edit_au_show: false, // 编辑者
      edit_bar_show: true, // 编辑者
      rename_icon_data: 'el-icon-edit',
      favorite_icon_data: 'el-icon-star-off',
      share_icon_data: 'el-icon-share',
      delete_icon_data: 'el-icon-delete-solid',
      submit_icon_data: 'el-icon-upload',
      edit_icon_data: 'el-icon-edit-outline',
      authority_icon_data: 'el-icon-s-tools',
      shareDialogVisible: false,
      authorityDialogVisible: false,
      formLabelWidth:'100px',
      fullscreen:false,
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
      }
    }
  },
  created() {
    // 通过 doc_id 跳转的
    console.log('编辑页')
    window.addEventListener('beforeunload', this.handleSubmitCheck)
    this.doc_id = parseInt(this.$route.query.doc_id)
    this.user_id = this.$store.state.user.username.id
    console.log('文章id如下：')
    console.log(typeof this.doc_id)
    console.log(this.doc_id)
    // 请求文档权限信息
    this.getAuthority()
  },
  methods: {
    // 全屏事件
    handleFullScreen(){
      let element = document.getElementById("fullscreen");
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
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
          _this.doc_avatar = _this.global.baseUrl + "/image/avatar/show?user_id="+ _this.doc.creator_id
          _this.doc.creator_id = _this.doc.creator_id
          if (_this.doc.is_deleted){
            _this.$message({
              message: '该文档已删除',
              type: 'error'
            })
            _this.goBack()
          } else {
            if (_this.doc.is_editting === true){ //文档正在被编辑
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
        _this.favo_au_show = true
      } else if (this.authority.can_edit) {
        console.log('可编辑')
        _this.create_au_show = false
        _this.edit_au_show = true
        _this.edit_bar_show = true
        _this.favo_au_show = true
      } else if (this.authority.can_comment) {
        console.log('可评论')
        _this.create_au_show = false
        _this.edit_au_show = false
        _this.edit_bar_show = false
        _this.favo_au_show = true
        // 评论模块由can_comment绑定 为true
      } else if (this.authority.can_read) {
        console.log('仅可查看')
        _this.create_au_show = false
        _this.edit_au_show = false
        _this.edit_bar_show = false
        _this.favo_au_show = true
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
          _this.edit_status = true
          _this.disabled=false
          _this.$message({
            message: '开始编辑',
            type: 'success'
          })
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
    // handleShare() {
    //   var _this = this
    //   this.shareDialogVisible = false
    //   console.log(this.shareForm.type)
    //   if (this.shareForm.type === '') {
    //     _this.$message({
    //       message: '分享失败！',
    //       type: 'error'
    //     })
    //   } else {
    //     // todo 提交权限
    //     if(this.shareForm.type === "1") {
    //       this.shareAuthorityForm.can_comment = false
    //       this.shareAuthorityForm.can_edit = false
    //     } else if (this.shareForm.type === "2"){
    //       this.shareAuthorityForm.can_edit = false
    //     }
    //     this.shareAuthorityForm.document_id = this.doc_id
    //     this.$api.authority.shareAuthority(
    //       _this.shareAuthorityForm
    //     ).then(res=> {
    //       if(res.code === 200 ){
    //         _this.$alert('http://39.101.200.9:8080/#/doceditor?doc_id=' + _this.doc_id,'分享链接',{
    //           confirmButtonText: '确定',
    //           callback: action => {
    //             _this.$message({
    //               message: '文档分享成功',
    //               type: 'success'
    //             })
    //           }
    //         })
    //       } else {
    //         _this.$message({
    //           message: res.msg,
    //           type: 'error'
    //         })
    //       }
    //     }).catch(failResponse => {})
    //
    //   }
    // },
    // 提交
    handleSubmit() {
      this.$refs.editor.handleSubmit()
    },
    cancelShare() {
      this.shareDialogVisible = false
    },
    // 监听
    submitSuccess() {
      this.disabled = true
      this.edit_status = false
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
    },
    handleSubmitCheck() {
      if (this.edit_status) {
        this.handleSubmit()
      }
    },
    toDocView () {
      var _this = this
      this.$router.push({
        path: 'docview',
        query: {
          doc_id: _this.doc_id
        }
      })
    },
    memberDetail(){
      console.log('点击了用户详情');
      var _this = this
      this.$router.push({name:'DashBoard',params:{user_id: _this.doc.creator_id}});
    }
  },
  watch: {

  },
  beforeDestroy() {
    if (this.edit_status) {
      this.handleSubmit()
    }
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.handleSubmitCheck)
  }
}
</script>

<style scoped>

.el-row{
  margin-bottom: 0;
}
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
}
.left{
  height: 100%;
  flex: 1;
}
.right{
  float: right;
  width: 350px;
  height: 100%;
}
.icon-group{
  position: relative;
  left: 130px;
}
.title-row{
  margin-bottom: 0;
}
.doc-card{
  margin-top: 5px;
}
.info-card{
  margin-top: 5px;
  margin-bottom: 0;
}
.comment-card{
  margin-top: 15px;
}
.icon-favorite, .icon-rename, .icon-share,.icon-submit, .icon-edit, .icon_authority, .icon-delete, .icon-screen, .icon-toView{
  font-size: 24px;
  border: white;
}
.doc-info{
  color: #606266;
  font-weight: bold;
}
.title-content-divider{
  margin-top: 0;
}
</style>
