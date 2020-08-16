<template>
  <div>
    <br />
    <el-col :span="22" :offset="1">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我创建的团队" name="first">
          <br />
          <el-row :gutter="40">
            <div v-for="(item) in created_groups" :key="item.id">
              <el-col :span="8">
                <el-card
                  shadow="always"
                  @click.native="groupDetail(item.id)"
                  style="cursor:pointer"
                >
                  <i style="font-size: 15px;" class="el-icon-user-solid"></i>
                  {{item.name}}
                </el-card>
                <br />
                <br />
              </el-col>
            </div>

            <el-col :span="8">
              <el-card shadow="always" @click.native="createNewGroup" style="cursor:pointer">
                <i style="font-size: 15px;" class="el-icon-circle-plus"></i>
                新建团队
              </el-card>
              <br />
              <br />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="我加入的团队" name="second">
          <br />
          <el-row :gutter="40">
            <div v-for="(item) in joined_groups" :key="item.id">
              <el-col :span="8">
                <el-card
                  shadow="always"
                  @click.native="groupDetail(item.id)"
                  style="cursor:pointer"
                >
                  <i style="font-size: 15px;" class="el-icon-user-solid"></i>
                  {{item.name}}
                </el-card>
                <br />
                <br />
              </el-col>
            </div>

            <el-col :span="8">
              <el-card shadow="always" @click.native="test" style="cursor:pointer">
                <!--              <div align="center">-->
                <i style="font-size: 15px;" class="el-icon-circle-plus"></i>
                新建团队
                <!--              </div>-->
              </el-card>
              <br />
              <br />
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "GroupList",
  methods: {
    detail: function (id) {
      this.$router.push("/groupdocumentlist");
    },
    out: function (id) {
      console.log("退出");
    },
    groupDetail: function (group_id) {
      console.log("groupId", group_id);
      this.$router.push({
        name: "GroupDetail",
        params: {
          group_id: group_id,
        },
      });
    },
    createNewGroup: function () {
      console.log("新建团队");
      var _this = this;
      this.$prompt("请输入团队名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          _this.$api.group
            .create({
              creator_id: _this.$store.state.user.username.id,
              name: value
              // type: 1
            })
            .then((res) => {
              if (res.code === 200) {
                _this.$router.push({
                  path: "/groupdetail",
                  params: {
                    group_id: res.data.id,
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
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  data: function () {
    return {
      joined_groups: [],
      created_groups: [],
    };
  },
  created() {
    let _this = this;
    //参加的group
    this.$api.user
      .group({
        id: _this.$store.state.user.username.id,
      })
      .then((res) => {
        if (res.code == 200) {
          _this.joined_groups = res.data;
          _this.created_groups = res.data.filter(
            (g) => g.creator_id === _this.$store.state.user.username.id
          );
          console.log(_this.joined_groups);
        } else {
          _this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    // //创建的gruop
    // this.$api.user.groupCreated({
    //     id: _this.$store.state.user.username.id
    // }).then(res => {
    //     if(res.code == 200){
    //         _this.created_groups = res.data;
    //     } else {
    //         _this.$message({
    //             message: res.msg,
    //             type: 'error'
    //         })
    //     }
    // })
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
