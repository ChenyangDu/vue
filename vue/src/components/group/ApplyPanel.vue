<template>
  <div>
    <el-row>
      <div style="margin-top: 15px;">
        <el-input placeholder="输入 团队名关键字 搜索团队" v-model="keyword" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
    </el-row>
    <el-row>
      <el-table :data="groups" stripe style="width: 100%">
        <el-table-column prop="name" label="团队名" width="150"></el-table-column>
        <el-table-column prop="creator_name" label="创建者" width="150"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.once="apply(scope.row.id)" type="text" size="small">申请加入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ApplyPanel",
  data() {
    return {
      keyword: '',
      groups: [],
      user_id: this.$store.state.user.username.id
    }
  },
  methods:{
    search(){
      var _this = this
      this.$api.searchModule.searchGroup({
        key: _this.keyword
      }).then(res => {
        if (res.code === 200){
          _this.groups = res.data
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log('搜索团队出现异常')
      })
    },
    apply(groupId) {
      var _this = this
      this.$api.group.applyGroup({
        user_id: _this.user_id,
        group_id: groupId
      }).then(res => {
        if (res.code === 200){
          _this.$message({
            message: '已成功发送申请',
            type: 'success'
          })
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log('发送申请出现错误')
      })
    }
  }
}
</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
