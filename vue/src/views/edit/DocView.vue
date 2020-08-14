<!-- 仅查看文章内容 + 评论 -->
<template>
  <div>
    <!-- 文章标题-->
    <el-row :gutter="0">
      <el-col :span="20" :push="2">
        <el-card  class="title-card" :body-style="{ margin: '0px'}" shadow="always">
          <el-input class="title-input" type="text" v-model="doc.name" :disabled="name_disabled" style="width: 400px" ref="title_input"></el-input>
<!--          <el-button v-bind:icon="delete_icon_data" class="icon-delete" circle @click="handleDelete"></el-button>-->
<!--          <el-button v-bind:icon="submit_icon_data" class="icon-submit" circle @click="handleSubmit"></el-button>-->
<!--          <el-button v-bind:icon="favorite_icon_data" class="icon-favorite" circle @click="handleFavo"></el-button>-->
<!--          <el-button v-bind:icon="rename_icon_data" class="icon-rename" circle @click="handleRename"></el-button>-->
        </el-card>
      </el-col>
    </el-row>
    <!-- 文章内容-->
    <el-row :gutter="0">
      <el-col :span="20" :push="2">
        <el-card class="content-card" :body-style="{ margin: '0px'}" shadow="always">
          <el-form>
            <el-form-item>
<!--              不能编辑：禁用-->
              <tinymce-editor v-model="msg"
                              :disabled="true"
                              :doc_id="this.doc.id"
                              @onClick="onClick"
                              ref="editor">
              </tinymce-editor>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!-- 文章评论-->
    <el-row :gutter="0">
      <el-col :span="20" :push="2">
        <el-card class="comment-card">
          <div class="comment-container">
<!--            不能评论：禁用‘发表评论’-->
            <comment-panel :doc_id="this.doc.id" :can_comment="false"></comment-panel>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
      msg: '<p>dfkjskf<b>hdsfgkasdjfga</b></p>',
      doc: {
        id: 1,
        name: '我是标题我是标题',
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
      rename_icon_data: 'el-icon-edit',
      favorite_icon_data: 'el-icon-star-off',
      delete_icon_data: 'el-icon-delete-solid',
      submit_icon_data: 'el-icon-upload2'
    }

  },
  // created() {
    // <<<<<< 之间为注释的
    // console.log('查看文章页')
    // this.doc = this.$route.params.doc
    // console.log('以下为文章信息info')
    // console.log(this.doc)
    // >>>>>>
    // 调用viewDoc()方法
  // },
  methods: {
    viewDoc() {
      console.log("viewDoc-获取文章内容")
      var _this = this
      // 请求接口
      this.$api.document.view({
        doc_id: _this.doc.id
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
.title-card{
  margin-top: 30px;
}
.content-card{
  margin-top: 30px ;
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
}
.icon-favorite{
  float: right;
  font-size: 24px;
  position: relative;
}
.icon-rename{
  float: right;
  font-size: 24px;
  position: relative;
}
</style>
