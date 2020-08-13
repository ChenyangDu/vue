<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择" @change="selectChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <!-- <el-col :span="6">
          <el-input placeholder="请输入搜索内容" v-model="keyword" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>-->
        <el-col :span="6">
          <el-button type="primary" round @click="handleNewDoc">创建新团队</el-button>
        </el-col>
      </el-row>

      <el-table :data="groups" stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="150"></el-table-column>
        <el-table-column prop="name" label="团队名称" width="300"></el-table-column>

        <el-table-column prop="last_edit_time" label="修改日期" width="150"></el-table-column>
        <el-table-column fixed="right" label>
          <template slot-scope="scope">
            <el-button @click="detail(scope.row.id)" type="primary" round size="small">详情</el-button>

            <el-button @click="out(scope.row.id)" type="danger" round size="small">退出</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="currentChange"
        :page-size="10"
        layout="prev, pager, next"
        :total="60"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "GroupList",
  methods:{
      detail:function(id){
          this.$router.push('/groupdocumentlist');
      },
      out:function(id){
          console.log('退出');
      }
  },
  data: function () {
    return {
      value: "选项1",
      options: [
        {
          value: "选项1",
          label: "我加入的团队",
        },
        {
          value: "选项2",
          label: "我创建的团队",
        },
      ],
      groups:[{
          id:0,
          name:'团队1',
          last_edit_time:'2020-8-13',
          create_time:'2020-8-10'
      },{
          id:1,
          name:'团队2',
          last_edit_time:'2020-8-13',
          create_time:'2020-8-10'
      },{
          id:2,
          name:'团队3',
          last_edit_time:'2020-8-13',
          create_time:'2020-8-10'
      },{
          id:3,
          name:'团队4',
          last_edit_time:'2020-8-13',
          create_time:'2020-8-10'
      },{
          id:4,
          name:'团队5',
          last_edit_time:'2020-8-13',
          create_time:'2020-8-10'
      },{
          id:4,
          name:'团队5',
          last_edit_time:'2020-8-13',
          create_time:'2020-8-10'
      }]
    };
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
