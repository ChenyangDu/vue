<template>
  <div>
    <br/>
    <el-col :span="22" offset="1">
      <el-tabs value="first">
        <el-tab-pane label="回收站" name="first">
          <el-button type="primary" round @click="clearTrash" class="clearButton">清空回收站</el-button>
          <el-row>
            <el-col :span="22" offset="1">
              <el-row :gutter="40">
                <el-col :span="4" v-for="item in documents" :key="item.id">
                  <div>
                    <br>
                    <el-card :body-style="{ padding: '0px' }" shadow="always">
                      <br>
                      <div align="center">
                        <el-avatar
                            shape="square" :size="100" fit="fill"
                            :src="'http://39.101.200.9:8081/image/system?id='+(item.group_id?'document_group':'document')"
                            style="cursor:pointer" ></el-avatar>
                      </div>
                      <div style="padding: 14px;">
                        <span>{{item.name}}</span><br/>
                        <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                        <el-dropdown class="right" @command="handleCommand($event,item.id)">
                          <i class="el-icon-more"></i>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-refresh" command="recover">还原</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-delete" command="del">彻底删除</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <div class="bottom clearfix">
                        </div>
                      </div>
                      <!-- <el-button type="primary" class="left" round @click="recover(item.id)">还原</el-button>
                      <el-button type="danger" class="right" round @click="del(item.id)">彻底删除</el-button> -->
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

    </el-col>
  </div>
</template>

<script>
export default {
  name: "Trash",
  data: function () {
    return {
      documents: [],
      id: this.$store.state.user.username.id,
    };
  },
  methods: {
    handleCommand(event,id){
      if(event === 'recover')
        this.recover(id);
      else if(event === 'del')
      this.del(id);
    },
    getTrashList: function () {
      let inf = { user_id: this.id }; // 用户id
      var that = this;
      //console.log(inf);
      this.$api.document
        .recycle(inf)
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
    recover: function (id) {
      console.log(id);
      let inf = { doc_id: id };
      var that = this;
      this.$api.document
        .recover(inf)
        .then((response) => {
          if (response.code === 400) {
            that.$message({
              // message: response.msg,
              message: "列表为空",
              type: "error",
            });
            console.log("返回了400");
          } else {
            //that.documents = response.data; // 文档列表
            that.$message({
              message: '文档还原成功',
              type: 'success'
            })
            this.getTrashList();
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
    clearTrash: function () {
      var that = this;
      console.log("清空回收站");
      this.$alert('确定要清空回收站吗？', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          that.documents.forEach(function (value, key, arr) {
            that.del(value.id);
          });
          that.documents = [];
          that.$message({
            message: '回收站已清空',
            type: 'success'
          })
        }
      });

    },
    del: function (id) {
      //console.log(id);
      let inf = { doc_id: id, user_id: this.id };
      var that = this;
      this.$api.document
        .remove(inf)
        .then((response) => {
          if (response.code === 400) {
            that.$message({
              // message: response.msg,
              message: "列表为空",
              type: "error",
            });
            console.log("返回了400");
          } else {
            that.$message({
              message: '彻底删除成功',
              type: 'success'
            })
            console.log("彻底删除成功");
            that.getTrashList();
          }
        })
        .catch((err) => {
          console.log("捕获到了异常");
          that.$message({
            message: err.msg,
            type: "error",
          });
        });
    },
  },
  created: function () {
    this.getTrashList();
  },
};
</script>

<style scoped>
.clearButton{
  /*position: relative;*/
  /*float: right;*/
  /*bottom: 40px;*/
}
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
  padding: 5%;
  float: right;
}
.left {
  padding: 5%;
  float: left;
}
</style>
