<template>
  <div>
    <br>
    <el-row >
      <el-col :span="22" :offset="1">
        <el-row :gutter="20">
            <el-col :span="18"><div >
              <h1>团队文档</h1>
              <div v-for="i in Math.ceil(groupdocuments.length/4)">
                <el-row :gutter="20">
                  <div v-for="(item,j) in groupdocuments.slice((i-1)*4,Math.min(i*4,groupdocuments.length-1)  )">
                    <el-col :span=4 :offset="1">
                      <el-card shadow="always" @click.native="test" style="cursor:pointer">
                        <div class="block">
                          <div align="center">
                            <i style="font-size: 100px;" class="el-icon-tickets"></i>
                          </div>
                          <br>
                          {{item.name}}
                          {{item.last_edit_time}}

                        </div>
                      </el-card>
                    </el-col>
                  </div>
                  <el-col :span=4 :offset="1">
                    <el-card shadow="always" @click.native="test" style="cursor:pointer">
                      <div class="block">
                        <div align="center">
                          <i style="font-size: 100px;" class="el-icon-document-add"></i>
                        </div>
                        <br><br><br>

                      </div>
                    </el-card>
                  </el-col>
                </el-row>
                <br>
              </div>

            </div></el-col>
            <el-col :span="6"><div >
              <h1>团队成员</h1>
              <br>

              <el-row>
                <el-col :span="24" align="center">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </el-col>

              </el-row>
              <br>
              <el-row>
                <div v-for="(item,i) in list">
                  <el-col :span="8" align="center">
                    <el-avatar :size="50" :src="circleUrl"></el-avatar>
                    <p>人名字</p>
                  </el-col>
                </div>
                <el-col :span="8" align="center">
                  <div align="center">
                    <i style="font-size: 50px;" class="el-icon-circle-plus-outline"></i>
                  </div>
                  <p>添加人</p>
                </el-col>
              </el-row>


            </div></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "GroupDetail",
        data(){
            return{
                list:[1,2,3,4,5],
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                showdocuments:[],
                groupdocuments: [
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

                ],
                group_id:null,
            }
        },
        created() {
            this.group_id = this.$route.params.group_id
            console.log('receive ',this.group_id)
        }
    }
</script>

<style scoped>

</style>

<style>
  .el-row {
    margin-bottom: 20px;

  &:last-child {
     margin-bottom: 0;
   }
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
</style>