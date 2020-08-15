<!-- 仅查看文章内容 + 评论 -->
<template>
  <div>
    <el-container>
      <el-container>
        <!-- 作者信息  -->
        <el-aside width="200px">
          <el-card class="aside" shadow="always">
            <div class="author-avator">
              <el-avatar :size="150" :src="author_img"></el-avatar>
              <h2><b>蔡徐坤</b></h2>
              <h1>2020-8-15</h1>
            </div>

          </el-card>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 文章标题行 -->
            <el-row :gutter="0" >
              <el-col :span="24" >
                <el-card class="title-card" :body-style="{ margin: '0px'}" shadow="always">
                  <el-input
                    class="title-input"
                    type="text"
                    v-model="doc.name"
                    :disabled="name_disabled"
                    style="width: 400px"
                    ref="title_input"
                  ></el-input>
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
              <el-col :span="24" >
                <el-card class="content-card" :body-style="{ margin: '0px'}" shadow="always">
                  <el-form>
                    <el-form-item>
                      <!--              不能编辑：禁用-->
                      <tinymce-editor
                        v-model="msg"
                        :disabled="true"
                        :edit_bar_show="false"
                        :doc_id="this.doc_id"
                        @onClick="onClick"
                        ref="editor"
                      ></tinymce-editor>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
            </el-row>

            <el-card class="commentlist">
              <el-row>
                <h1>评论列表</h1>
              </el-row>
              <el-row v-for="item in comments" :key="item.id">
                <comment
                  :author_avator="img"
                  :author_name="item.author_name"
                  :content="item.content"
                  :create_time="item.create_time"
                ></comment>
              </el-row>
            </el-card>

            <el-row :gutter="0">
              <el-col :span="24" >
                <el-card class="comment-card">
                  <div class="comment-container">
                    <!--            不能评论：禁用‘发表评论’-->
                    <comment-panel :doc_id="this.doc_id" :can_comment="false"></comment-panel>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>

          <el-footer>
            footer
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <!-- 文章标题-->

    <!-- 文章评论-->

    <!-- 评论列表 -->
  </div>
</template>

<script>
import TinymceEditor from "@/components/document/TinymceEditor";
import CommentPanel from "@/components/document/CommentPanel";
import { favorite } from "@/http/modules/user";
import comment from "../../components/comment/Comment.vue";

export default {
  name: "DocView",
  components: {
    CommentPanel,
    TinymceEditor,
    comment,
  },
  data() {
    return {
      msg: "",
      doc: {
        id: 1,
        name: "",
        creator_id: 1,
        group_id: -1,
        create_time: "",
        last_time: "",
        last_edit_time: "",
        is_deleted: false,
        is_editing: false,
        edit_times: -1,
      },
      doc_id: "",
      user_id: this.$store.state.user.username.id,
      name_disabled: true,
      rename_icon_data: "el-icon-edit",
      favorite_icon_data: "el-icon-star-off",
      delete_icon_data: "el-icon-delete-solid",
      submit_icon_data: "el-icon-upload2",
      share_icon_data: "el-icon-s-promotion",
      dialogFormVisible: false,
      formLabelWidth: "100px",
      shareForm: {
        type: "",
      },
      shareAuthority: {
        document_id: "",
        user_id: "",
        can_read: false,
        can_comment: false,
        can_edit: false,
        can_delete: false,
      },
      //一个测试用的头像图片
      img:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      comments: [
        {
          id: 0,
          author_name: "蔡徐坤",
          create_time: "2020-8-15",
          content:
            "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座",
        },
        {
          id: 1,
          author_name: "蔡徐坤",
          create_time: "2020-8-15",
          content:
            "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座",
        },
        {
          id: 2,
          author_name: "蔡徐坤",
          create_time: "2020-8-15",
          content:
            "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座",
        },
        {
          id: 3,
          author_name: "蔡徐坤",
          create_time: "2020-8-15",
          content:
            "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座",
        },
        {
          id: 4,
          author_name: "蔡徐坤",
          create_time: "2020-8-15",
          content:
            "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座",
        },
        {
          id: 5,
          author_name: "蔡徐坤",
          create_time: "2020-8-15",
          content:
            "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座",
        },
      ],
      //一个用于测试的作者的头像
      author_img:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
  created() {
    console.log("查看文章页");
    this.doc_id = parseInt(this.$route.query.doc_id);
    console.log("以下为文章id");
    console.log(this.doc_id);
    this.getInfo();
  },
  methods: {
    getInfo() {
      var _this = this;
      this.$api.document
        .info({
          doc_id: _this.doc_id,
        })
        .then((res) => {
          if (res.code === 200) {
            _this.doc = res.data;
            _this.viewDoc();
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
    },
    viewDoc() {
      console.log("viewDoc-获取文章内容");
      var _this = this;
      // 请求接口
      this.$api.document
        .view({
          doc_id: _this.doc_id,
          user_id: _this.user_id,
        })
        .then((res) => {
          if (res.code === 200) {
            console.log("view 200");
            _this.msg = res.data;
            console.log(_this.msg);
          } else {
            console.log("view 400");
            _this.$message({
              message: res.msg, // 文章不存在
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
      console.log("viewDoc-获取文章内容完成");
    },
    handleRename() {
      var _this = this;
      if (this.name_disabled === true) {
        // 当前为禁止修改的状态，故点击允许修改标题
        console.log("修改前");
        console.log(this.doc.name);
        _this.rename_icon_data = "el-icon-check";
        this.name_disabled = false;
        // _this.$refs.title_input.focus()
      } else {
        // 当前为正在修改的状态,故再次点击进行保存
        console.log("修改后");
        console.log(this.doc.name);
        _this.rename_icon_data = "el-icon-edit";
        this.name_disabled = true;
        // 发送name修改后的请求
        // _this.$api.document.rename({
        //  doc_id: this.doc.id,
        //  不确定user_id
        //  user_id: this.$store.state.user.username.id
        // })
        _this.$message({
          message: "标题修改成功！",
          type: "success",
        });
      }
    },
    // 分享
    handleShare() {
      var _this = this;
      this.dialogFormVisible = false;
      console.log(this.shareForm.type);
      if (this.shareForm.type === "") {
        _this.$message({
          message: "分享失败！",
          type: "error",
        });
      } else {
        _this.$message({
          message: "分享成功！",
          type: "success",
        });
      }
    },
    // 收藏
    handleFavo() {
      if (this.favorite_icon_data === "el-icon-star-on") {
        this.favorite_icon_data = "el-icon-star-off";
      } else {
        this.favorite_icon_data = "el-icon-star-on";
      }
    },
    //鼠标单击的事件
    onClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    },
  },
};
</script>

<style scoped>
.title-card {
  margin-top: 10px;
}

.content-card {
  margin-top: 30px;
}
.comment-card {
  margin-top: 30px;
}
.icon-delete {
  float: right;
  font-size: 24px;
  position: relative;
  margin-left: 100px;
}
.icon-submit,
.icon-favorite,
.icon-share,
.icon-rename {
  float: right;
  font-size: 24px;
  position: relative;
  margin-left: 10px;
  border: white;
}
.commentlist {
  width: 100%;
  /* transform: translate(20%, 0); */
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center;
  line-height: 60px; */
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.aside {
  width: 100%;
  height: 100%;
  background-color: #7f8892;
}

.author-avator{
  width:100%;
  margin-top: 10%;
}
.author-name{
  width: 100%;
  /* margin-top: 10%; */
  top:0px;
}
</style>
