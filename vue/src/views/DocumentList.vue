<template>

<div>

<el-card>
    <!-- <div>
        <el-row>
          <el-col :span="200">
          <el-button type="primary" round>新建</el-button>
          <el-button icon="el-icon-search" circle></el-button>
          <span></span>
          <el-select  v-model="value" placeholder="请选择" @change="selectChange">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
          </el-col>
        </el-row>
    </div> -->
<el-row :gutter="20">
  <el-col :span="6">
    <el-select  v-model="value" placeholder="请选择" @change="selectChange">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
  </el-col>
  <el-col :span="6">
    <el-input placeholder="请输入搜索内容" v-model="input3" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  </el-col>
  <el-col :span="6"><el-button type="primary" round>新建</el-button></el-col>
</el-row>

  <el-table
    :data="tableData"
    stripe
    style="width: 100%" >

    <el-table-column type="index" >
    </el-table-column>
    <el-table-column 
      prop="createdate"
      label="创建日期"
      width="150" >
    </el-table-column>
    <el-table-column
      prop="documentname"
      label="文档标题"
      width="300">
    </el-table-column>
    <el-table-column
      prop="authortname"
      label="作者"
      width="100">
    </el-table-column>
    <el-table-column
      prop="modifydate"
      label="修改日期"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="">
      <template slot-scope="scope">
        <el-button @click="detail(scope.row.id)" type="primary" round size="small">查看</el-button>
        <el-button @click="edit(scope.row.id)" type="primary" round size="small">编辑</el-button>
        <el-button @click="del(scope.row.id)" type="danger" round size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


    <el-pagination @current-change="currentChange" :page-size="10"
      layout="prev, pager, next"
      :total="60" >
    </el-pagination>

</el-card>

</div>
</template>


<script>
export default {
    name:"DocumentList",
    data:function() {
      return {
        count:10,
        value:"选项1",

        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '我收藏的'
        }, {
          value: '选项3',
          label: '我创建的'
        }, {
          value: '选项4',
          label: '最近浏览'
        }],
        tableData: [{
          id:0,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        }, 
        {
          id:1,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        },
        {
          id:2,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        },
        {
          id:3,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        },


        ],
        //用于测试的用户id
        userid:0
      }
    },
    created:function(){
        const {data:res} = this.$http.get('user/own',{params:this.userid});
        console.log(res);
        this.tableData = res;
    },
    methods: {
      detail:function(id) {
        console.log(id);
        console.log(typeof this.count);
      },
      edit:function(id){
          console.log(id);
      },
      del:function(id){
          console.log(id);
      },
      currentChange:function(newPage){
          console.log("change"+newPage);
      },
      selectChange:function(val){
          this.value = val;
          if(this.value == '选项1')
          {
              const {data:res} = this.$http.get('user/own',{params:this.userid});
              console.log(res);
              this.tableData = res;
          }
          else if(this.value == '选项2')
          {
              const {data:res} = this.$http.get('user/favorite',{params:this.userid});
              console.log(res);
              this.tableData = res;
          }
          else if(this.value == '选项3')
          {
              const {data:res} = this.$http.get('user/own',{params:this.userid});
              console.log(res);
              this.tableData = res;
          }
          else if(this.value == '选项4')
          {
              const {data:res} = this.$http.get('user/recent',{params:this.userid});
              console.log(res);
              this.tableData = res;
          }
      }
    },
}
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