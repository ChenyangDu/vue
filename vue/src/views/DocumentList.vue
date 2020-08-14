<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我创建的文档" name="first">
        <h1>我创建的文档</h1>
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in documents" :key="item.id">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                class="image"
                @click="detail(item.id)"
              />
              <div style="padding: 14px;">
                <div>{{item.name}}</div>
                <div>蔡徐坤</div>
                <div class="bottom clearfix">
                  <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                  <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我最近浏览的文档" name="second">
        <h1>我最近浏览的文档</h1>
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in documents" :key="item.id">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img
                src='https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                class="image"
                @click="detail(item.id)"
              />
              <div style="padding: 14px;">
                <div>{{item.name}}</div>
                <div>蔡徐坤</div>
                <div class="bottom clearfix">
                  <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                  <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我收藏的文档" name="third">
        <h1>我收藏的文档</h1>
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in documents" :key="item.id">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img
                src='https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
                class="image"
                @click="detail(item.id)"
              />
              <div style="padding: 14px;">
                <div>{{item.name}}</div>
                <div>蔡徐坤</div>
                <div class="bottom clearfix">
                  <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                  <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
export default {
  name: "DocumentList",
  data: function () {
    return {
      documents: [],
      id: this.$store.state.user.username.id,
      activeName: "first",
    };
  },
  created: function () {
    this.getOwnList();
    //this.activeName.substr()
  },
  methods: {
    handleNewDoc() {
      var _this = this;
      this.$api.document
        .create({
          user_id: this.id,
          group_id: -1,
          type: -1,
          // type: 1
        })
        .then((res) => {
          if (res.code === 200) {
            _this.$router.push({
              name: "DocEditor",
              params: {
                doc: res.data, // 返回一个新的文档信息document
              },
            });
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
    },
    detail: function (id) {
      console.log("点击detail");
      console.log(id);
      console.log(typeof this.count);
      var _this = this;
      // 获取doc_id文章的信息info
      this.$api.document
        .info({
          doc_id: id,
        })
        .then((res) => {
          if (res.code === 200) {
            // 跳转编辑页
            console.log("跳转编辑页");
            _this.$router.push({
              name: "DocEditor",
              params: {
                doc: res.data, // 返回document信息
              },
            });
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
    },
    // edit: function (id) {
    //   console.log(id);
    //   this.$api.document
    //     .info({
    //       doc_id: id,
    //     })
    //     .then((res) => {
    //       if (res.code === 200) {
    //         // 跳转编辑页
    //         _this.$router.push({
    //           name: "DocEditor",
    //           params: {
    //             doc: res.data, // 返回document信息
    //           },
    //         });
    //       } else {
    //         _this.$message({
    //           message: res.msg,
    //           type: "error",
    //         });
    //       }
    //     })
    //     .catch((failResponse) => {});
    // },
    // del: function (id) {
    //   console.log(id);
    //   var _this = this;
    //   this.$api.document
    //     .deleteDoc({
    //       doc_id: id,
    //       user_id: _this.$store.state.user.username.id,
    //     })
    //     .then((res) => {
    //       if (res.code === 200) {
    //         _this.$message({
    //           message: "文章已被成功删除",
    //           type: "success",
    //         });
    //         _this.selectChange(_this.value);
    //       } else {
    //         _this.$message({
    //           message: res.msg,
    //           type: "error",
    //         });
    //       }
    //     })
    //     .catch((failResponse) => {});
    // },

    handleClick: function (tab, event) {
      if (this.activeName === "first") this.getOwnList();
      else if (this.activeName === "second") this.getFavoriteList();
      else if (this.activeName === "third") this.getRecentList();
    },
    // handleCardClick:function(id){
    //   console.log('卡片被点击了'+id);
    // },
    getOwnList: function () {
      let inf = { id: this.id }; // 用户id
      var that = this;
      console.log("created");
      console.log(inf);
      this.$api.user
        .own(inf)
        .then((response) => {
          if (response.code === 400) {
            that.$message({
              // message: response.msg,
              message: "列表为空",
              type: "error",
            });
            console.log("返回了400");
          } else {
            that.documents = response.data; // 文档列表
            console.log("获取数据成功");
          }
        })
        .catch((err) => {
          console.log("捕获到了异常");
          that.$message({
            message: err.msg,
            type: "error",
          });
          //console.log("获取数据失败");
        });
    },
    getFavoriteList: function () {
      let inf = { id: this.id }; // 用户id
      var that = this;
      this.$api.user
        .favorite(inf)
        .then((response) => {
          if (response.code === 400) {
            that.$message({
              // message: response.msg,
              message: "列表为空",
              type: "error",
            });
            console.log("返回了400");
          } else {
            that.documents = response.data; // 文档列表
            console.log("获取数据成功");
          }
        })
        .catch((err) => {
          console.log("捕获到了异常");
          that.$message({
            message: err.msg,
            type: "error",
          });
          //console.log("获取数据失败");
        });
    },
    getRecentList: function () {
      let inf = { id: this.id }; // 用户id
      var that = this;
      console.log("created");
      console.log(inf);
      this.$api.user
        .recent(inf)
        .then((response) => {
          if (response.code === 400) {
            that.$message({
              // message: response.msg,
              message: "列表为空",
              type: "error",
            });
            console.log("返回了400");
          } else {
            that.documents = response.data; // 文档列表
            console.log("获取数据成功");
          }
        })
        .catch((err) => {
          console.log("捕获到了异常");
          that.$message({
            message: err.msg,
            type: "error",
          });
          //console.log("获取数据失败");
        });
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
