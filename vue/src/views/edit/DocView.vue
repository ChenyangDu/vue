<!-- 仅查看文章内容 + 评论 -->
<template>
  <div class="view-page">

    <div class="wrapper">

      <div class="left" id="fullscreen" >

        <!-- 文章标题-->
        <el-row :gutter="0">
          <el-col :span="24" :push="0">
            <el-card  class="title-card" :body-style="{ margin: '0px'}" shadow="always">

              <el-row :gutter="1" class="title-row">
                <el-col :span="8" :push="0">
                  <h1 v-if="name_disabled">{{ doc.name }}</h1>
                  <el-input class="title-input" type="text"  v-if="!(name_disabled)" v-model="doc.name" :disabled="name_disabled" style="width: 400px" ref="title_input"></el-input>
                </el-col>

                <el-col :span="1" :push="8">
                  <div class="btn-fullscreen" @click="handleFullScreen">
                    <!--tooltip提供了两个主题：dark和light，通过 effect 设置主题 -->
                    <!-- 通过三元表达式来设置不同的文字提示，placement属性控制文字提示出现的位置 -->
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                      <el-button icon="el-icon-sort" class="icon-screen" circle></el-button>
                    </el-tooltip>
                  </div>

                </el-col>
              </el-row>
<!--            </el-card>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        &lt;!&ndash; 文章内容&ndash;&gt;-->
<!--        <el-row :gutter="0">-->
<!--          <el-col :span="20" :push="2">-->
<!--            <el-card class="content-card" :body-style="{ margin: '0px'}" shadow="always">-->
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
          </el-col>
        </el-row>

      </div>

      <div class="right">

        <!-- 文章评论-->
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
      name_disabled: true,
      rename_icon_data: 'el-icon-edit',
      favorite_icon_data: 'el-icon-star-off',
      delete_icon_data: 'el-icon-delete-solid',
      submit_icon_data: 'el-icon-upload2',
      share_icon_data: 'el-icon-s-promotion',
      dialogFormVisible: false,
      formLabelWidth:'100px',
      edit_bar_show: false,
      fullscreen:false,
      shareForm: {
        type: ''
      },
      shareAuthority: {
        document_id: '',
        user_id: '',
        can_read: false,
        can_comment: false,
        can_edit: false,
        can_delete: false
      }
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
    handleRename() {
      var _this = this
      if (this.name_disabled === true) { // 当前为禁止修改的状态，故点击允许修改标题
        console.log('修改前')
        console.log(this.doc.name)
        _this.rename_icon_data = 'el-icon-check'
        this.name_disabled = false
        // _this.$refs.title_input.focus()
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
        _this.$message({
          message: '分享成功！',
          type: 'success'
        })
      }

    },
    // 收藏
    handleFavo() {
      if (this.favorite_icon_data === 'el-icon-star-on') {
        this.favorite_icon_data = 'el-icon-star-off'
      } else {
        this.favorite_icon_data = 'el-icon-star-on'
      }
    },
    //鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
  }
}
</script>

<style scoped>

.wrapper{
  width: 100%;
  height: 100%;
  /*border: 1px solid;*/
  display: flex;
  /*background-color: blue;*/
}
.left{
  /*background-color: green;*/
  height: 100%;
  flex: 1;
}
.right{
  float: right;
  /*background-color: yellow;*/
  width: 350px;
  height: 100%;
}

.title-card{
  margin-top: 5px;
}
.content-card{
  margin-top: 30px ;
}
.comment-card{
  margin-top: 5px;
}
.icon-delete{
  float: right;
  font-size: 24px;
  position: relative;
  margin-left: 100px;
}
.icon-favorite, .icon-rename, .icon-share,.icon-submit, .icon-edit, .icon_authority, .icon-delete, .icon-screen{
  font-size: 24px;
  border: white;
}
.btn-fullscreen {
  /*height: 30px;*/
  /*width: 30px;*/
  /*text-align: center;*/
  /*border-radius: 15px;*/
  /*cursor: pointer;*/
  /*position: relative;*/
  transform: rotate(45deg);
}
</style>
