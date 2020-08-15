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
<!--          <el-button v-bind:icon="share_icon_data" class="icon-share" circle @click="dialogFormVisible = true"></el-button>-->
<!--          &lt;!&ndash;分享弹窗&ndash;&gt;-->
<!--          <el-dialog title="分享" :visible.sync="dialogFormVisible">-->
<!--            <el-form :model="shareForm">-->
<!--              <el-form-item label="权限给予：" :label-width="formLabelWidth">-->
<!--                <el-select v-model="shareForm.type" placeholder="请选择分享的权限">-->
<!--                  <el-option label="可查看" value="1"></el-option>-->
<!--                  <el-option label="可查看与评论" value="2"></el-option>-->
<!--                  <el-option label="可查看与评论与编辑" value="3"></el-option>-->
<!--                  <el-option label="可查看与评论与编辑与删除" value="4"></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--              <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--              <el-button type="primary" @click="handleShare">确 定</el-button>-->
<!--            </div>-->
<!--          </el-dialog>-->

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
                              :disabled="false"
                              :edit_bar_show="false"
                              :doc_id="this.doc_id"
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
            <comment-panel :doc_id="this.doc_id" :can_comment="false"></comment-panel>
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
      name_disabled: true,
      rename_icon_data: 'el-icon-edit',
      favorite_icon_data: 'el-icon-star-off',
      delete_icon_data: 'el-icon-delete-solid',
      submit_icon_data: 'el-icon-upload2',
      share_icon_data: 'el-icon-s-promotion',
      dialogFormVisible: false,
      formLabelWidth:'100px',
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
    this.doc_id = this.$route.params.doc_id
    console.log('以下为文章信息info')
    console.log(this.doc_id)
    this.getInfo()
  },
  methods: {
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
        doc_id: _this.doc_id
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
.icon-submit,.icon-favorite, .icon-share, .icon-rename{
  float: right;
  font-size: 24px;
  position: relative;
  margin-left: 10px;
  border: white;
}

</style>
