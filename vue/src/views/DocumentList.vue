<template>
  <div>
    <br/>
    <el-col :span="22" offset="1">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我创建的文档" name="first">
          <el-row>
            <el-col :span="22" offset="1">
              <el-row :gutter="40">

                <el-col :span="4">
                  <div>
                    <br/>
                    <el-card :body-style="{ padding: '0px' }" shadow="always" @click.native="handleNewDoc(-1)" style="cursor:pointer">
                      <br/>
                      <br><br>
                      <div align="center">
                        <i @click.native="handleNewDoc(-1)" style="font-size: 100px;cursor:pointer" class="el-icon-plus"></i>
                      </div>
<!--                      <br>-->
                      <div style="padding: 14px;">
                        <div  class="bottom clearfix">
                          <br>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </el-col>

                <el-col :span="4" v-for="item in owndocuments" :key="item.id">
                  <div>
                    <br>
                    <el-card :body-style="{ padding: '0px' }" shadow="always" >
                      <br>
                      <div align="center">
                        <el-avatar @click.native="detail(item.id)"
                                   shape="square" :size="100" fit="fill"
                                   :src="'http://39.101.200.9:8081/image/system?id='+(item.group_id?'document_group':'document')"
                                   style="cursor:pointer" ></el-avatar>
                      </div>
                      <div style="padding: 14px;">
                        <div class="doc-title">
                          <span>{{item.name}}</span><br>
                        </div>

                        <time class="time">{{ item.last_edit_time.substr(0,10) }}</time>
                        <el-dropdown class="right" @command="handleCommand($event,item)">
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
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="我最近浏览的文档" name="second">
<!--          <h1>我最近浏览的文档</h1>-->
          <el-row>
            <el-col :span="22" offset="1">
              <el-row :gutter="40">
                <el-col :span="4" v-for="(item) in recentdocuments" :key="item.id">
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
                        <div class="doc-title">
                          <span>{{item.name}}</span><br>
                        </div>
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
                  <br>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="我收藏的文档" name="third">
<!--          <h1>我收藏的文档</h1>-->
          <el-row>
            <el-col :span="22" offset="1">
              <el-row :gutter="40">
                <el-col :span="4" v-for="item in favoritedocuments" :key="item.id">
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
                        <div class="doc-title">
                          <span>{{item.name}}</span><br>
                        </div>
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
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-dialog title="分享" :visible.sync="shareDialogVisible">
        <share-panel :doc_id="this.doc_id" v-on:cancelShare="cancelShare"></share-panel>
      </el-dialog>
      <el-dialog title="权限管理" :visible.sync="authorityDialogVisible">
        <authority-panel :doc_id="this.doc_id" :group_id="this.group_id"></authority-panel>
      </el-dialog>
      <!-- 模板弹窗-->
      <el-dialog title="使用模板" :visible.sync="typePanelVisible">
        <type-panel v-on:cancelCreate="cancelCreate" v-on:confirmCreate="confirmCreate"></type-panel>
      </el-dialog>

    </el-col>
  </div>
</template>


<script>
import SharePanel from "@/components/document/SharePanel";
import TypePanel from "@/components/document/TypePanel";
import AuthorityPanel from "@/components/document/AuthorityPanel";
export default {
  name: "DocumentList",
  components: {TypePanel, SharePanel, AuthorityPanel},
  data: function () {
    return {
      owndocuments: [],
      favoritedocuments:[],
      recentdocuments:[],
      id: this.$store.state.user.username.id,
      doc_id: '',
      group_id: '',
      activeName: "first",
      shareDialogVisible: false,
      authorityDialogVisible: false,
      iscollect:false,
      typePanelVisible: false
    };
  },
  created: function () {
    this.getOwnList();
  },
  methods: {
    isMyDoc: function (id) {
      return id === this.id;
    },
    cancelCreate(){
      this.typePanelVisible = false
      this.$message({
        type: 'info',
        message: '已取消创建'
      })
    },
    confirmCreate(typeNum) {
      console.log(typeNum)
      this.typePanelVisible = false
      this.handleNewDoc(typeNum)
    },
    handleNewDoc(typeNum) {
      var _this = this;
      this.$prompt('请输入标题','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        if (value === null) {
          _this.$message({
            type: 'error',
            message: '请输入标题'
          })
        } else {
          _this.$api.document
            .create({
              user_id: this.id,
              group_id: -1,
              name: value,
              type: typeNum,
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
        }
      }).catch(()=>{
        _this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleCommand: function (command, id) {
      //console.log(command,id);
      if (command === "view") this.detail(id.id);
      else if (command === "edit") this.edit(id.id);
      else if (command === "del") this.del(id.id);
      else if (command === "share") this.share(id.id);
      else if (command === "collect") this.collect(id.id);
      else if (command === "authority") this.authority(id);
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
    authority(id) {
      this.doc_id = id.id
      this.group_id = id.group_id
      this.authorityDialogVisible = true
    },
    collect: function (doc) {
      console.log("collect");
      var _this = this
      this.doc_id = doc.id
      if(doc.star) { // 已收藏
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
            _this.getOwnList()
            _this.getFavoriteList()
            _this.getRecentList()
          } else {
            _this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch(failResponse => {})
      } else { // 目前未收藏
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
            _this.getOwnList()
            _this.getFavoriteList()
            _this.getRecentList()
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

    handleClick: function () {
      if (this.activeName === "first") this.getOwnList();
      else if (this.activeName === "second") this.getRecentList();
      else if (this.activeName === "third") this.getFavoriteList();
    },

    getOwnList: function () {
      let inf = { id: this.id }; // 用户id
      var that = this;
      this.$api.user
        .own(inf)
        .then((response) => {
          if (response.code === 400) {
            that.$message({
              // message: response.msg,
              message: "列表为空",
              type: "error",
            });
            console.log("返回了400");
          } else {
            that.owndocuments = response.data; // 文档列表
            that.owndocuments.sort((a,b)=>(b.last_edit_time.localeCompare(a.last_edit_time)))
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
    getFavoriteList: function () {
      let inf = { id: this.id }; // 用户id
      var that = this;
      this.$api.user
        .favorite(inf)
        .then((response) => {
          if (response.code === 400) {
            that.$message({
              // message: response.msg,
              message: "列表为空",
              type: "error",
            });
            console.log("返回了400");
          } else {
            that.favoritedocuments = response.data; // 文档列表
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
    getRecentList: function () {
      let inf = { id: this.id }; // 用户id
      var that = this;
      console.log("created");
      console.log(inf);
      this.$api.user
        .recent(inf)
        .then((response) => {
          if (response.code === 400) {
            that.$message({
              // message: response.msg,
              message: "列表为空",
              type: "error",
            });
            console.log("返回了400");
          } else {
            that.recentdocuments = response.data; // 文档列表
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
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.right {
  padding: 0;
  float: right;
}
.el-col-5{

  width: 20%;

}
.doc-title{
  width:130px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
