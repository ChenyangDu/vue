<template>
  <div>
    <br>
    <el-row >
      <el-col :span="22" :offset="1">
        <el-row :gutter="20">
            <el-col :span="18"><div >
              <h1>团队文档</h1>
                <el-row :gutter="20">
                  <div v-for="(item,i) in groupdocuments">
                    <el-col :span=4 :offset="1">
                      <el-card shadow="always" @click.native="detail(item.id)" style="cursor:pointer">
                        <div class="block">
                          <div align="center">
                            <i style="font-size: 100px;" class="el-icon-tickets"></i>
                          </div>
                          <br>
                          {{item.name}}
                          {{item.last_edit_time.substring(0,10)}}
                          {{item.last_edit_time.substring(11,19)}}

                          <div align="right" >
                            <el-dropdown class="right" @command="handleCommand($event,item.id)">
                              <i class="el-icon-more"></i>
                              <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-view" command="view">查看</el-dropdown-item>
                                <el-dropdown-item
                                        icon="el-icon-edit"
                                        command="edit"
                                        v-if="item.creator_id == id"
                                >编辑</el-dropdown-item>
                                <el-dropdown-item
                                        icon="el-icon-delete-solid"
                                        command="del"
                                        v-if="item.creator_id == id"
                                >删除</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-share" command="share">分享</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-star-on" command="collect">取消收藏</el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </div>
                  <el-col :span=4 :offset="1">
                    <el-card shadow="always" @click.native="handleNewDoc" style="cursor:pointer">
                      <div class="block">
                        <div align="center">
                          <i style="font-size: 100px;" class="el-icon-document-add"></i>
                        </div>
                        <br><br><br><br>

                      </div>
                    </el-card>
                  </el-col>
                </el-row>
                <br>


            </div></el-col>
            <el-col :span="6"><div >
              <h1>团队成员</h1>
              <br>

              <el-row>
                <el-col :span="24" align="center">
                  <div class="block">
                    <el-avatar :size="50" fit="fill" :src="avatarUrl+creator.id" style="cursor:pointer"></el-avatar>
                    <p>{{creator.name}}</p>
                  </div>
                </el-col>

              </el-row>
              <br>
              <el-row>
                <div v-for="(item,i) in group_member" >
                  <el-col :span="8" align="center" v-if="item.id != group_info.creator_id">
                    <el-avatar :size="50" :src="avatarUrl+item.id" style="cursor:pointer"></el-avatar>
                    <p>{{item.name}}</p>
                  </el-col>
                </div>

                <el-col :span="8" align="center">
                  <div align="center">
                    <i style="font-size: 50px;" class="el-icon-setting"></i>
                  </div>
                  <p>管 理</p>
                </el-col>
                <el-col :span="8" align="center">
                  <div align="center">
                    <i style="font-size: 50px;" class="el-icon-circle-plus-outline"></i>
                  </div>
                  <p>添 加</p>
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
                fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                id: this.$store.state.user.username.id,
                list:[1,2,3,4,5],
                avatarUrl:null,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                showdocuments:[],
                groupdocuments: null,
                group_id:null,
                group_info:null,
                group_member:[],
                creator:null,

            }
        },
        created() {
            let _this = this;
            this.group_id = this.$route.params.group_id

            //团队基本信息
            this.$api.group.info({
                group_id:_this.group_id
            }).then(res=>{
                _this.group_info = res.data;
                _this.avatarUrl = this.global.baseUrl + "/image/avatar/show?user_id=";
                //团队成员
                _this.$api.group.member({
                    group_id:_this.group_id
                }).then(res=>{
                    _this.group_member = res.data
                    _this.getCreator();
                })
            })
            //团队文档
            this.$api.group.document({
                "group_id":_this.group_id
            }).then(res=>{
                if(res.code == 200){
                    _this.groupdocuments = res.data;
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        methods:{
            handleCommand: function (command, id) {
                //console.log(command,id);
                if (command === "view") this.detail(id);
                else if (command === "edit") this.edit(id);
                else if (command === "del") this.del(id);
                else if (command === "share") this.share(id);
                else if (command === "collect") this.collect(id);
            },
            getCreator:function(){
                console.log("getCreator",this.group_member,this.group_info.creator_id)
                for(let member of this.group_member){
                    if(member.id == this.group_info.creator_id){
                        this.creator = member
                        console.log("creator!!!",this.creator.id)
                    }
                }
            },
            detail: function (id) {
                console.log("点击detail");
                console.log(id);
                var _this = this;
                // 通过user_id直接跳转
                console.log("跳转编辑页");
                _this.$router.push({
                    path: "/docview",
                    query: {
                        doc_id: id,
                    },
                });
            },
            handleNewDoc() {
                let _this = this;
                this.$prompt('请输入标题','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    _this.$api.document
                        .create({
                            user_id: _this.id,
                            group_id: _this.group_id,
                            name: value,
                            type: -1,
                            // type: 1
                        })
                        .then((res) => {
                            if (res.code === 200) {
                                _this.$router.push({
                                    name: "DocEditor",
                                    params: {
                                        doc: res.data, // 返回一个新的文档信息document
                                    },
                                });
                            } else {
                                _this.$message({
                                    message: res.msg,
                                    type: "error",
                                });
                            }
                        })
                        .catch((failResponse) => {});
                }).catch(()=>{
                    _this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                })


            },
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