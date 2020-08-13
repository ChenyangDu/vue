<template>
  <div>
    <el-table :data="documents" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="150"></el-table-column>
      <el-table-column prop="name" label="文档标题" width="300"></el-table-column>

      <el-table-column prop="last_edit_time" label="修改日期" width="150"></el-table-column>
      <el-table-column fixed="right" label>
        <template slot-scope="scope">
          <el-button @click="resave(scope.row.id)" type="primary" round size="small">还原</el-button>
        </template>
      </el-table-column>
    </el-table>

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
  name: "trash",
  data: function () {
    return {
      documents: [
        {
          id: 0,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 1,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 2,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 3,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 4,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 5,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 6,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 7,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 9,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 10,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 11,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 12,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 13,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
        {
          id: 14,
          name: "鸡你太美",
          creator_id: 0,
          group_id: 0,
          create_time: "2016-05-02",
          last_edit_time: "20208-11",
          is_deleted: false,
          is_editing: false,
        },
      ],
    };
  },
  methods: {
    resave: function (id) {
      console.log(id);
    },
    currentChange: function (newPage) {
      console.log(newPage);
    },
  },
};
</script>

<style scoped>
</style>