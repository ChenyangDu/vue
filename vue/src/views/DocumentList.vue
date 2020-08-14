<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我创建的文档" name="first">
        <el-row :gutter="40">
          <el-col :span="8">
            <h1>我创建的文档</h1>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" round @click="handleNewDoc">创建新文档</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in documents" :key="item.id">
            <div>
              <br />
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  class="image"
                  @click="detail(item.id)"
                />
                <div style="padding: 14px;">
                  <span>{{item.name}}</span>
                  <span class="right">{{item.username}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                    <el-dropdown class="right" @command="handleCommand($event,item.id)">
                      <i class="el-icon-more"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-view" command="view">查看</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-edit" command="edit">编辑</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete-solid" command="del">删除</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-share" command="share">分享</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-star-on" command="collect">收藏</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我最近浏览的文档" name="second">
        <h1>我最近浏览的文档</h1>
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in documents" :key="item.id">
            <div>
              <br />
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img
                  src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                  class="image"
                  @click="detail(item.id)"
                />
                <div style="padding: 14px;">
                  <span>{{item.name}}</span>
                  <span class="right">{{item.username}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                    <el-dropdown class="right" @command="handleCommand($event,item.id)">
                      <i class="el-icon-more"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-view" command="view">查看</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-edit" command="edit">编辑</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete-solid" command="del">删除</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-share" command="share">分享</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-star-on" command="collect">收藏</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我收藏的文档" name="third">
        <h1>我收藏的文档</h1>
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in documents" :key="item.id">
            <div>
              <br />
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img
                  src="https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
                  class="image"
                  @click="detail(item.id)"
                />
                <div style="padding: 14px;">
                  <span>{{item.name}}</span>
                  <span class="right">{{item.username}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                    <el-dropdown class="right" @command="handleCommand($event,item.id)">
                      <i class="el-icon-more"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-view" command="view">查看</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-edit" command="edit">编辑</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete-solid" command="del">删除</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-share" command="share">分享</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-star-on" command="collect">取消收藏</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </el-card>
            </div>
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
    handleCommand:function(command,id){
      //console.log(command,id);
      if(command === 'view')
        this.detail(id);
      else if(command === 'edit')
        this.edit(id);
      else if(command === 'del')
        this.del(id);
      else if(command === 'share')
        this.share(id);
      else if(command === 'collect')
        this.collect(id);
    },
    detail: function (id) {
      console.log("点击detail");
      console.log(id);
      console.log(typeof this.count);
      var _this = this;
      // 通过user_id直接跳转
      console.log('跳转编辑页')
      _this.$router.push({
        path: '/docediter',
        query: {
          doc_id: res.data.id
        }
      });
    },
    edit: function (id) {
      console.log(id);
      var _this = this
      // 通过user_id直接跳转
      _this.$router.push({
        path: '/docediter',
        query: {
          doc_id: res.data.id
        }
      })
    },
    del: function (id) {
      console.log(id);
      var _this = this;
      this.$api.document
        .deleteDoc({
          doc_id: id,
          user_id: _this.$store.state.user.username.id,
        })
        .then((res) => {
          if (res.code === 200) {
            _this.$message({
              message: "文章已被成功删除",
              type: "success",
            });
            //_this.selectChange(_this.value);
            _this.handleClick();
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
    },
    share:function(id){
      console.log('share');
    },
    collect:function(id){
      console.log('collect');
    },

    handleClick: function () {
      if (this.activeName === "first") this.getOwnList();
      else if (this.activeName === "second") this.getFavoriteList();
      else if (this.activeName === "third") this.getRecentList();
    },

    getOwnList: function () {
      let inf = { id: this.id }; // 用户id
      var that = this;
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.right {
  padding: 0;
  float: right;
}
</style>
