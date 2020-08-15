<template>
  <div>

    <el-row></el-row>
    <el-row >
      <el-col :span="22" :offset="1">
        <el-row :gutter="20">
          <el-col :span="6" ><div ><h2>我创建的团队</h2></div></el-col>
          <el-col :span="18" :offset="0">
            <div  align="right">
              <el-button type="primary" plain>创建团队</el-button>
            </div>
          </el-col>
        </el-row>
        <!--    <el-card>-->
        <el-row :gutter="40">
          <div v-for="i in 5">
            <el-col :span="8">
              <el-card shadow="always" @click.native="test" style="cursor:pointer">
                <div onclick="console.log('hi')">
                  <i class="el-icon-user"></i>
                  团队名称
                </div>
              </el-card>
              <br>
            </el-col>
          </div>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6" ><div ><h2>我加入的团队</h2></div></el-col>
          <el-col :span="18" :offset="0">
            <div  align="right">
              <el-button type="primary" plain>加入团队</el-button>
            </div>
          </el-col>
        </el-row>
        <!--    <el-card>-->
        <el-row :gutter="40">
          <div v-for="i in 5">
            <el-col :span="8">
              <el-card shadow="always" @click.native="test" style="cursor:pointer">
                <div onclick="console.log('hi')">
                  <i class="el-icon-user"></i>
                  团队名称
                </div>
              </el-card>
              <br>
            </el-col>
          </div>
        </el-row>
      </el-col>
    </el-row>
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
      },
    test:function () {
        console.log("test")
        this.$router.push({
            path: '/groupdetail',
            params: {
                group_id: 'dd'
            }
        })
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
  created() {
  }
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
