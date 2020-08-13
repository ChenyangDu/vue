<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <h1>蔡徐坤粉丝一群</h1>
          <p>创建者:蔡徐坤  2020-8-13</p>
        </el-row>
        <el-row>
          <el-card>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="团队文档" name="first">
                <el-table :data="groupdocuments" stripe style="width: 100%">
                  <el-table-column type="index"></el-table-column>
                  <el-table-column prop="createtime" label="创建日期" width="150"></el-table-column>
                  <el-table-column prop="name" label="文档标题" width="300"></el-table-column>

                  <el-table-column prop="last_edit_time" label="修改日期" width="150"></el-table-column>
                  <el-table-column fixed="right" label>
                    <template slot-scope="scope">
                      <el-button @click="detail(scope.row.id)" type="primary" round size="small">查看</el-button>
                      <el-button @click="edit(scope.row.id)" type="primary" round size="small">编辑</el-button>
                      <el-button @click="del(scope.row.id)" type="danger" round size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="回收站" name="second">
                <el-table :data="groupdocuments" stripe style="width: 100%">
                  <el-table-column type="index"></el-table-column>
                  <el-table-column prop="createtime" label="创建日期" width="150"></el-table-column>
                  <el-table-column prop="name" label="文档标题" width="300"></el-table-column>

                  <el-table-column prop="last_edit_time" label="修改日期" width="150"></el-table-column>
                  <el-table-column fixed="right" label>
                    <template slot-scope="scope">
                      <el-button @click="detail(scope.row.id)" type="primary" round size="small">还原</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-row>
      </el-main>
      <el-footer>
        <el-pagination
          @current-change="currentChange"
          :page-size="10"
          layout="prev, pager, next"
          :total="60"
        ></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
export default {
  name: "GroupDocumentList",
  data: function () {
    return {
      activeName: "second",

      groupdocuments: [
        {
          id: 0,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 1,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 2,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 3,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 4,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 5,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 6,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 7,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 9,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 10,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 11,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 12,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 13,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 14,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          createtime: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
      ]
    };
  },

  created: function () {
    console.log("created!");
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
  },
};
</script>


<style scoped>
.el-header,
.el-footer {
  /* background-color: #b3c0d1;
  color: #333; */
  text-align: center;
  line-height: 20px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  line-height: 20px;
}

/* .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
} */

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

.time {
  font-size: 13px;
  color: #999;
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