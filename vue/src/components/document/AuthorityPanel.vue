<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="24" :push="0">
        <el-input type="text" v-model="searchForm.key" placeholder="输入 手机号/邮箱 添加协作权限">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
        </el-input>
      </el-col>
    </el-row>
    <br/>
    <!--展示搜索结果-->
    <el-row :gutter="0">
      <el-col :span="24" :push="0">
        <span class="title">协作者</span>
        <el-divider class="title-divider"></el-divider>
        <el-table :data="this.searchResults" stripe style="width: 100%" :show-header="false" size="mini">
          <el-table-column prop="name" label="昵称"  width="120"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="auto"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="auto"></el-table-column>
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <el-select v-model="scope.row.authority_type" placeholder="请选择" @change="handleEdit(scope.row,scope.$index)">
                <el-option  label="查看" :value='1'></el-option>
                <el-option  label="查看/评论" :value='2'></el-option>
                <el-option  label="查看/评论/编辑" :value='3'></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <br/>
    <!--展示个人信息-->
    <el-row :gutter="0">
      <el-col :span="24" :push="0">
        <span class="title">管理者</span>
        <el-divider class="title-divider"></el-divider>
        <el-table :data="selfData" stripe  style="width: 100%" :show-header="false" size="mini">
          <el-table-column prop="name" label="昵称" width="120"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="auto"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="auto"></el-table-column>
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <el-select v-model="scope.row.authority_type" placeholder="请选择" disabled>
                <el-option  label="查看" :value='1'></el-option>
                <el-option  label="查看/评论" :value='2'></el-option>
                <el-option  label="管理者" :value='3'></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AuthorityPanel",
  props: {
    doc_id: {
      type: Number,
      default:1
    }
  },
  data() {
    return {
      searchForm: {
        key: ''
      },
      searchResults: [
        {
          id: '',
          name: '',
          password: '',
          phone: '',
          email: '',
          wechat: '',
          qq: '',
          authority_type:''
        }
      ],
      selfData:[
        {
          id: '',
          name: ' ',
          password: '',
          phone: ' ',
          email: '',
          wechat: '',
          qq: '',
        }
      ],
      user_id: this.$store.state.user.username.id
    }
  },
  created() {
    this.selfData[0] = this.$store.state.user.username
    this.selfData[0]["authority_type"] = parseInt('3')
  },
  methods: {
    // 通过手机/邮箱搜索
    handleSearch() {
      var _this = this
      console.log('search click')
      // this.searchResults = [
      //   {
      //     id: 1,
      //     name: 'user_a',
      //     password: '',
      //     phone: '123',
      //     email: '',
      //     wechat: '',
      //     qq: '',
      //     // authority_type:''
      //   },
      //   {
      //     id: 2,
      //     name: 'user_b',
      //     password: '',
      //     phone: '',
      //     email: '123211@qq.com',
      //     wechat: '',
      //     qq: '',
      //     // authority_type:''
      //   }
      // ]
      this.$api.searchModule.searchTheUser({
        key: _this.searchForm.key
      }).then(res => {
        if (res.code === 200) {
          console.log('搜索成功')
          _this.searchResults = res.data
          _this.loadAuthority()
        } else if (res.code === 401) {
          console.log('没有结果')
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    //增加权限属性
    loadAuthority() {
      var _this = this
      console.log(_this.searchResults)
      for (var i=0;i<_this.searchResults.length;i++){
        _this.$api.authority.authority({
          user_id: _this.searchResults[i].id,
          doc_id: _this.doc_id
        }).then(res=>{
          if(res.code === 200) {
            if(res.data.can_edit){
              // _this.searchResults[i]["authority_type"] = parseInt('3')
              _this.searchResults[i].authority_type = parseInt('3')
            } else if (res.data.can_comment){
              _this.searchResults[i].authority_type = parseInt('2')
            } else if (res.data.can_read) {
              _this.searchResults[i].authority_type = parseInt('1')
            }
            console.log(_this.searchResults[i])
          } else {
            _this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch(failResponse => {})
      }
    },
    // 修改权限
    handleEdit(user,index) {
      var _this = this
      console.log('edit click')
      console.log(user.authority_type)
      console.log(typeof user.authority_type)
      console.log(user)
      // 刷新
      this.searchResults.splice(index,1,this.searchResults[index])
      let info = {
        document_id: _this.doc_id,
        user_id:user.id,
        can_read: true,
        can_comment: true,
        can_edit: true
      }
      if (user.authority_type === 1){
        info.can_comment = false
        info.can_edit = false
      } else if (user.authority_type === 2){
        info.can_edit = false
      }
      this.$api.authority.setUserAuthority(
        info
      ).then(res => {
        if (res.code === 200) {
          _this.$message({
            message: '权限设置成功！',
            type: 'success'
          })
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    }
  }
}
</script>

<style scoped>
.title{
  position: relative;
  left: 8px;
  /*bottom: 5px;*/
  font-weight: bold;
}
.title-divider{
  margin: 0;
}
</style>
