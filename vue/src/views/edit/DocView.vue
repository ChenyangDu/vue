<!-- 仅查看文章内容 + 查看评论 + 收藏文章 + 前往编辑页 -->
<template>
  <div class="view-page">
    <div class="wrapper">
      <!-- 文章标题 + 文章内容-->
      <div class="left" id="fullscreen" >
            <el-card  class="doc-card" :body-style="{ margin: '0px'}" shadow="always">
              <el-row :gutter="50" class="title-row">
                <el-col :span="8" :push="0">
                  <h1 class="doc-info">{{ doc.name }}</h1>
                </el-col>
                <div class="icon-group">
                  <el-col :span="1" :push="0">
                    <el-tooltip effect="dark" content="收藏" placement="top">
                      <el-button v-bind:icon="favorite_icon_data" class="icon-favorite" circle @click="handleFavo"></el-button>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="1" :push="0">
                    <el-tooltip effect="dark" content="去编辑" placement="top">
                      <el-button icon="el-icon-edit-outline" class="icon-toEdit" circle @click="toDocEditor"></el-button>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="1" :push="0">
                    <div class="btn-fullscreen" @click="handleFullScreen">
                      <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="top">
                        <el-button icon="el-icon-rank" class="icon-screen" circle></el-button>
                      </el-tooltip>
                    </div>
                  </el-col>
                </div>
              </el-row>
              <el-form>
                <el-form-item>
                  <!--              不能编辑：禁用-->
                  <tinymce-editor v-model="msg"
                                  :disabled=true
                                  :edit_bar_show="this.edit_bar_show"
                                  :doc_id="this.doc_id"
                                  @onClick="onClick"
                                  ref="editor">
                  </tinymce-editor>
                </el-form-item>
              </el-form>
            </el-card>
      </div>
      <!-- 文章评论-->
      <div class="right">
        <el-row>
          <el-col :span="23" :push="1">
            <el-card class="info-card">
              <div align="center">
                <el-avatar size="large" :src=this.doc_avatar></el-avatar><br/>
                <span class="doc-info">{{ this.doc.username}}</span><br/>
              </div>
              <span class="doc-info">创建时间：{{ this.doc.create_time.substring(0,10)+' '+this.doc.create_time.substring(11,19) }}</span><br/>
              <span class="doc-info">最近修改时间：{{ this.doc.last_edit_time.substring(0,10) + ' ' + this.doc.last_edit_time.substring(11,19) }}</span><br/>
              <span class="doc-info">修改次数：{{ this.doc.edit_times }}</span>

            </el-card>

          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="23" :push="1">
            <el-card class="comment-card">
              <div class="comment-container">
                <!--            不能评论：禁用‘发表评论’-->
                <comment-panel :doc_id="this.doc_id" :can_comment="false"></comment-panel>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import TinymceEditor from "@/components/document/TinymceEditor";
import CommentPanel from "@/components/document/CommentPanel";
import {favorite} from "@/http/modules/user";

export default {
  name: "DocView",
  components: {
    CommentPanel,
    TinymceEditor
  },
  data() {
    return {
      msg: '',
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
      doc_id: '',
      user_id: this.$store.state.user.username.id,
      favorite_icon_data: 'el-icon-star-off',
      edit_bar_show: false,
      fullscreen:false,
      doc_avatar:''
    }

  },
  created() {
    console.log('查看文章页')
    this.doc_id = parseInt(this.$route.query.doc_id)
    console.log('以下为文章id')
    console.log(this.doc_id)
    this.getInfo()
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
    getInfo() {
      var _this = this
      this.$api.document.info({
        doc_id: _this.doc_id
      }).then(res =>{
        if(res.code === 200){
          _this.doc = res.data
          _this.doc_avatar = _this.global.baseUrl + "/image/avatar/show?user_id="+ _this.doc.creator_id
          _this.viewDoc()
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    viewDoc() {
      console.log("viewDoc-获取文章内容")
      var _this = this
      // 请求接口
      this.$api.document.view({
        doc_id: _this.doc_id,
        user_id: _this.user_id
      }).then(res => {
        if (res.code === 200) {
          console.log('view 200')
          _this.msg = res.data
          console.log(_this.msg)
        } else {
          console.log('view 400')
          _this.$message({
            message: res.msg, // 文章不存在
            type: 'error'
          })
        }
      }).catch(failResponse => {})
      console.log('viewDoc-获取文章内容完成')
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
    //鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 前往编辑页
    toDocEditor() {
      var _this = this
      this.$router.push({
        path: '/doceditor',
        query: {
          doc_id: _this.doc_id
        }
      })
    }
  }
}
</script>

<style scoped>

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
.doc-card, .comment-card,.info-card{
  margin-top: 5px;
}
.icon-favorite, .icon-toEdit, .icon-screen{
  font-size: 24px;
  border: white;
}
.icon-group{
  float: right;
}
.doc-info{
  color: #606266;
  font-weight: bold;
}
</style>
