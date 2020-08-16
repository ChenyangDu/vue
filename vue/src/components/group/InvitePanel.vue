<template>
  <div>
    <el-row>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
    </el-row>
    <el-row>
      <el-table :data="users" stripe style="width: 100%">
        <el-table-column fixed prop="create_date" label="注册日期" width="150"></el-table-column>
        <el-table-column prop="name" label="昵称" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
        <!-- <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="wechat" label="微信" width="300"></el-table-column>
        <el-table-column prop="qq" label="qq" width="120"></el-table-column> -->
        <el-table-column >
          <template slot-scope="scope">
            <el-button @click="invite(scope.row.id)" type="text" size="small">邀请</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "InvitePanel",
  props:['group_id'],
  data: function () {
    return {
      keyword: "",
      users: [],
    };
  },
  methods: {
    search: function () {
      console.log("搜索关键字" + this.keyword);
      var that = this;
      this.$api.searchModule.searchTheUser({key:this.keyword}).then(response => {
          if(response.code === 200)
          {
              that.users = response.data;
              console.log('搜索用户成功');
          }
          else {
              console.log('返回了400');
          }
      }).catch(err => {
          console.log('搜索用户出现异常');
      });
    },
    invite: function (id) {
      console.log(id + "被邀请了");
      var that = this;
      this.$api.group.invite({user_id:id,group_id:this.group_id}).then(response => {
          if(response.code === 200)
            console.log('成功发送邀请');
          else console.log('发送邀请出错');
      }).catch(err => {
          console.log('邀请出现异常');
      })
    },
  },
};
</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>