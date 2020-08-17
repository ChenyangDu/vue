<template>
  <div>
    <br>
    <el-row ><el-col :span="24" align="center">
      <div style="letter-spacing:8px;font-size:20px">
        <h1>{{ group_info.name }}</h1>
      </div>
      <hr style="height:1px;border:none;border-top:1px dashed #CCCCCC; width:80% " />
    </el-col></el-row>
    <el-row >
      <el-col :span="22" :offset="1">
        <el-row :gutter="20">
            <el-col :span="18"><div >
              <h1>团队文档</h1>
                <el-row :gutter="20">
                  <div v-for="(item) in groupdocuments" :key="item.id">
                    <el-col :span=4 :offset="1">
                      <div>
                        <br>
                        <el-card :body-style="{ padding: '0px' }" shadow="always">
                          <br>
                          <div align="center">
                            <el-avatar @click.native="detail(item.id)"
                                       shape="square" :size="100" fit="fill"
                                       :src="'http://39.101.200.9:8081/image/system?id='+(item.group_id?'document_group':'document')"
                                       style="cursor:pointer" ></el-avatar>
                          </div>
                          <div style="padding: 14px;">
                            <span>{{item.name}}</span><br>
                            <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                            <el-dropdown class="right" @command="handleCommand($event,item.id)">
                              <i class="el-icon-more"></i>
                              <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-view" command="view">查看</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-edit" command="edit">编辑</el-dropdown-item>
                                <el-dropdown-item
                                    icon="el-icon-share"
                                    command="share"
                                    v-if="isMyDoc(item.creator_id)"
                                >分享</el-dropdown-item>
                                <el-dropdown-item
                                    icon="el-icon-s-tools"
                                    command="authority"
                                    v-if="isMyDoc(item.creator_id)"
                                >权限</el-dropdown-item>
                                <el-dropdown-item
                                    icon="el-icon-delete-solid"
                                    command="del"
                                    v-if="isMyDoc(item.creator_id)"
                                >删除</el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                            <div class="bottom clearfix">
                              <i class="el-icon-view"></i> {{item.views}}
                              <i class="el-icon-chat-dot-square"></i> {{item.comments}}
                              <i :class="item.star?'el-icon-star-on':'el-icon-star-off'" @click="collect(item)"></i> {{item.stars}}
                            </div>
                          </div>
                        </el-card>
                      </div>
                    </el-col>
                  </div>
                  <el-col :span=4 :offset="1">
                    <br>
                    <el-card shadow="always" @click.native="handleNewDoc" style="cursor:pointer">
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


            </div></el-col>
            <el-col :span="6"><div >
              <h1>团队成员</h1>
              <br>

              <el-row>
                <el-col :span="24" align="center">
                  <div class="block"  @click="memberDetail(creator.id)">
                    <el-avatar :size="50" fit="fill" :src="avatarUrl+creator.id" style="cursor:pointer" ></el-avatar>
                    <p>{{creator.name}}</p>
                  </div>
                </el-col>

              </el-row>
              <br>
              <el-row>
                <div v-for="(item) in group_member" :key="item.id" @click="memberDetail(item.id)">
                  <el-col :span="8" align="center" v-if="item.id != group_info.creator_id">
                    <el-avatar :size="50" :src="avatarUrl+item.id" style="cursor:pointer"></el-avatar>
                    <p>{{item.name}}</p>
                  </el-col>
                </div>

                <el-col :span="8" align="center" v-if="id==creator.id">
                  <div align="center">
                    <i @click="memberCtrl" style="font-size: 55px;cursor:pointer" class="el-icon-setting"></i>
                  </div>
                  <p>管 理</p>
                </el-col>
                <el-col :span="8" align="center">
                  <div align="center">
                    <i style="font-size: 55px;" class="el-icon-circle-plus-outline" @click="invite"></i>
                  </div>
                  <p>添 加</p>
                </el-col>
                <el-col :span="8" align="center" v-if="!(isMyGroup)">
                  <div align="center">
                    <i style="font-size: 55px; color: 0xFF0000" class="el-icon-remove-outline" @click="drop"></i>
                  </div>
                  <p>退 出</p>
                </el-col>
                <el-col :span="8" align="center" v-if="isMyGroup">
                  <div align="center">
                    <i style="font-size: 55px; color: 0xFF0000" class="el-icon-circle-close" @click="dismiss"></i>
                  </div>
                  <p>解 散</p>
                </el-col>
              </el-row>
            </div></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog title='邀请新成员' :visible.sync="inviteDialogVisible">
      <invite-panel :group_id="group_id"></invite-panel>
    </el-dialog>
    <el-dialog title="分享" :visible.sync="shareDialogVisible">
      <share-panel :doc_id="this.doc_id" v-on:cancelShare="cancelShare"></share-panel>
    </el-dialog>
    <el-dialog title="权限管理" :visible.sync="authorityDialogVisible">
      <authority-panel :doc_id="this.doc_id" :group_id="this.group_id"></authority-panel>
    </el-dialog>
  </div>
</template>

<script>
import InvitePanel from '../components/group/InvitePanel.vue';
import SharePanel from "@/components/document/SharePanel";
import AuthorityPanel from "@/components/document/AuthorityPanel";
    export default {
        name: "GroupDetail",
        data(){
            console.log('data函数执行');
            return{
                fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                //用户id
                id: this.$store.state.user.username.id,
                doc_id:'',
                //用于传递当前点击的文档的id
                inviteDialogVisible: false,
                shareDialogVisible: false,
                authorityDialogVisible: false,
                list:[1,2,3,4,5],
                avatarUrl:null,
                showdocuments:[],
                //团队文档
                groupdocuments: [],
                //团队id
                group_id:this.$route.params.group_id,
                //团队信息id、name、creator_id
                group_info:{},
                //团队成员
                group_member:[],
                //团队创建者
                creator:null,

            }
        },
        created() {
            let _this = this;
            //将团队的id设置为传入的值
            console.log(Object.keys(this.$route.params).length===0)

            if((Object.keys(this.$route.params).length === 0)){
              this.group_id = this.$store.state.groupNumber
            } else {
              _this.group_id = this.$route.params.group_id
              _this.$store.commit('toDetail',_this.group_id)
            }
            console.log('group id:',this.group_id)
          
            //团队基本信息
            this.$api.group.info({
                group_id:_this.group_id
            }).then(res=>{
                console.log("group_info获取到了");
                console.log(res.data);
                _this.group_info = res.data;
                _this.avatarUrl = this.global.baseUrl + "/image/avatar/show?user_id=";
                //团队成员
                _this.$api.group.member({
                    group_id:_this.group_id
                }).then(res=>{
                    _this.group_member = res.data
                    console.log('group_member获取到了');
                    console.log(_this.group_member);
                    _this.getCreator();
                })
            })
            //团队文档
            this.$api.group.document({
                "group_id":_this.group_id,
                user_id:_this.id
            }).then(res=>{
                if(res.code == 200){
                    _this.groupdocuments = res.data;
                    console.log('groupdocument');
                    console.log(_this.groupdocuments);
                } else {
                    _this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        components:{
          InvitePanel,
          SharePanel,
          AuthorityPanel
        },
        methods:{
            isMyDoc: function (id) {
                return id === this.id;
            },
            isMyGroup() {
              return this.id === this.group_info.creator_id
            },
            memberCtrl:function(){
                this.$router.push({
                    name: "GroupMember",
                    params: {
                        group_id:this.group_id
                    },
                });
            },
            handleCommand: function (command, id) {
                //console.log(command,id);
                if (command === "view") this.detail(id);
                else if (command === "edit") this.edit(id);
                else if (command === "del") this.del(id);
                else if (command === "share") this.share(id);
                else if (command === "collect") this.collect(id);
                else if (command === "authority") this.authority(id);
            },
            getCreator:function(){
                console.log("getCreator",this.group_member,this.group_info.creator_id)
                for(let member of this.group_member){
                    if(member.id == this.group_info.creator_id){
                        this.creator = member
                        // console.log("creator!!!",this.creator.id)
                        console.log('creator获取到了');
                        console.log(this.creator);
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
            edit: function (id) {
                console.log(id);
                var _this = this;
                // 通过user_id直接跳转
                _this.$router.push({
                    path: "/doceditor",
                    query: {
                        doc_id: id,
                    },
                });
            },
            del: function (id) {
            console.log(id);
            var _this = this;
            this.$api.document
                .deleteDoc({
                  doc_id: id,
                  user_id: _this.id,
                })
                .then((res) => {
                  if (res.code === 200) {
                    _this.$message({
                      message: "文章已被成功删除",
                      type: "success",
                    });
                    _this.handleClick();
                  } else {
                    _this.$message({
                      message: res.msg,
                      type: "error",
                    });
                  }
                })
                .catch((failResponse) => {});
          },
            share: function (id) {
              console.log("share");
              this.doc_id = id
              this.shareDialogVisible = true
            },
            cancelShare() {
              this.shareDialogVisible = false
            },
            collect: function (doc) {
            console.log("collect");
            var _this = this
            this.doc_id = doc.id
            // todo 需要在加载列表时获取收藏信息
            if(doc.star) {
              _this.$api.document.favorite({
                doc_id: doc.id,
                user_id: _this.id,
                favorite: false
              }).then(res => {
                if (res.code === 200) {
                  _this.$message({
                    message: '文档已取消收藏',
                    type: 'success'
                  })
                  //重新加载团队文档
                  _this.$api.group.document({
                    "group_id":_this.group_id,
                    user_id:_this.id
                  }).then(res=>{
                    if(res.code == 200){
                      _this.groupdocuments = res.data;
                      console.log('groupdocument');
                      console.log(_this.groupdocuments);
                    } else {
                      _this.$message({
                        message: res.msg,
                        type: 'error'
                      })
                    }
                  })
                } else {
                  _this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                }
              }).catch(failResponse => {})
            } else {
              _this.$api.document.favorite({
                doc_id: doc.id,
                user_id: _this.id,
                favorite: true
              }).then(res => {
                if (res.code === 200) {
                  _this.$message({
                    message: '文档收藏成功',
                    type: 'success'
                  })
                  //重新加载团队文档
                  _this.$api.group.document({
                    "group_id":_this.group_id,
                    user_id:_this.id
                  }).then(res=>{
                    if(res.code == 200){
                      _this.groupdocuments = res.data;
                      console.log('groupdocument');
                      console.log(_this.groupdocuments);
                    } else {
                      _this.$message({
                        message: res.msg,
                        type: 'error'
                      })
                    }
                  })
                } else {
                  _this.$message({
                    message: '收藏失败',
                    type: 'error'
                  })
                  _this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                }
              }).catch(failResponse => {})

            }
          },
            memberDetail:function(id){
              console.log('点击了用户详情'+id);
            },
            authority(id) {
              this.doc_id = id
              this.authorityDialogVisible = true
            },
            invite:function(){
              console.log('邀请别人');
              this.inviteDialogVisible = true;
            },
            drop() {
              var _this = this

              this.$confirm('此操作将退出团队，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$api.group.drop({
                  user_id : _this.id,
                  group_id: _this.group_id
                }).then(res=>{
                  if( res.code === 200) {
                    _this.$message({
                      message: '已成功退出团队',
                      type: 'success'
                    })
                    _this.$router.replace('/grouplist')
                  } else {
                    _this.$message({
                      message: res.msg,
                      type: 'error'
                    })
                  }
                })
              }).catch(() => {
                _this.$message({
                  type: 'info',
                  message: '已取消退出团队'
                });
              });
            },
            dismiss() {
              var _this = this
              this.$confirm('此操作将解散团队，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                _this.$api.group.dismiss({
                  user_id : _this.id,
                  group_id: _this.group_id
                }).then(res=>{
                  if( res.code === 200) {
                    _this.$message({
                      message: '已成功解散团队',
                      type: 'success'
                    })
                    _this.$router.replace('/grouplist')
                  } else {
                    _this.$message({
                      message: res.msg,
                      type: 'error'
                    })
                  }
                })
              }).catch(() => {
                _this.$message({
                  type: 'info',
                  message: '已取消解散团队'
                });
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
                                    path: "/doceditor",
                                    query: {
                                      doc_id: res.data.id,
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
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
.title {
  align-content: center;
}
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
  .right {
    padding: 0;
    float: right;
  }
</style>
