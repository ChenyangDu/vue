<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-button type="primary" round @click="clearTrash">清空回收站</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in documents" :key="item.id">
          <div>
            <br />
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                class="image"
              />
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <span class="right">蔡徐坤</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                </div>
              </div>
              <el-button type="primary" class="left" round @click="recover(item.id)">还原</el-button>
              <el-button type="danger" class="right" round @click="del(item.id)">彻底删除</el-button>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>
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
      console.log("清空回收站");
      var that = this;
      this.documents.forEach(function (value, key, arr) {
        that.del(value.id);
      });
      this.documents = [];
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
