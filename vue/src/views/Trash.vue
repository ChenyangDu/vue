<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button type="primary" round @click="handleNewDoc">清空回收站</el-button>
        </el-col>
      </el-row>
      <el-table :data="documents" stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="150"></el-table-column>
        <el-table-column prop="name" label="文档标题" width="300"></el-table-column>

        <el-table-column prop="last_edit_time" label="修改日期" width="150"></el-table-column>
        <el-table-column fixed="right" label>
          <template slot-scope="scope">
            <el-button @click="resave(scope.row.id)" type="primary" round size="small">还原</el-button>
            <el-button @click="del(scope.row.id)" type="danger" round size="small">彻底删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-pagination
      @current-change="currentChange"
      :page-size="10"
      layout="prev, pager, next"
      :total="60"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Trash",
  data: function () {
    return {
      documents: [],
      id: 1,
    };
  },
  methods: {
    resave: function (id) {
      console.log(id);
    },
    currentChange: function (newPage) {
      console.log(newPage);
    },
    del: function (id) {
      console.log(id);
    },
  },
  created: function () {
    let inf = { user_id: this.id }; // 用户id
    var that = this;
    console.log("created");
    console.log(this.id);
    console.log(inf);
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
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
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
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-select .el-input {
  width: 130px;
}
</style>
