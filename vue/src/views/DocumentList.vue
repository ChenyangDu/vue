<template>

<div>
  <!-- <el-row>
    <el-row :span="12">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="50" :src="circleUrl"></el-avatar></div>
      </div>
    </el-row>  
    <el-row>
      <h2>蔡徐坤</h2>
    </el-row>
  </el-row> -->
<el-card>
    <div>
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
    </div>
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
        value:"",
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        sizeList: ["large", "medium", "small"],
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
        {
          id:4,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        },
        {
          id:5,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        },
        {
          id:6,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        },
        {
          id:7,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        },
        {
          id:8,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        },
        {
          id:9,
          createdate: '2016-05-02',
          documentname: '鸡你太美',
          authortname:'蔡徐坤',
          modifydate: '2020-8-11'
        }

        ]
      }
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
          console.log(this.count);

      }
    },
}
</script>

<style scoped>

</style>