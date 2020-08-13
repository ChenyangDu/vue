<template>
  <div>
    <el-button @click="handleNewDoc">个人-新建文档测试(user_id=1)</el-button>
    <el-button>个人-根据模板新建文档测试（未写）</el-button>
    <el-button @click="handleViewDoc">个人-编辑文档测试(user_id=1 doc_id=1)</el-button>
    <el-button @click="handleDelete">个人-文档删除测试(user_id=1 doc_id=2)</el-button>
    <el-button @click="handleRecover">个人-文档恢复测试(user_id=1 doc_id=2)</el-button>
  </div>
</template>

<script>
export default {
  name: "GetDocTest",
  methods: {
    handleNewDoc() {
      var _this = this
      this.$api.document.create({
        user_id: 1,
        group_id: -1,
        type:-1
        // type: 1
      }).then(res => {
        if (res.code === 200 ){
          _this.$router.push({
            name: 'DocEditor',
            params: {
              doc: res.data // 返回一个新的文档document
            }
          })
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    handleViewDoc() {
      var _this = this
      // 获取doc_id文章的信息（测试用 传递 doc_id=1）

      this.$api.document.info(
          {
            doc_id: 1 // todo 文章信息id应从列表 row 获得
          }
      ).then(res => {
        if(res.code === 200) {
          // 跳转编辑页
          _this.$router.push({
            name: 'DocEditor',
            params: {
              doc: res.data // 返回document信息
            }
          })
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    handleDelete() {
      var _this = this
      this.$api.document.deleteDoc({
        doc_id: 1,
        user_id: 2,
      }).then(res => {
        if (res.code === 200){
          _this.$message({
            message: '文章已被成功删除',
            type: 'success'
          })
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    handleRecover() {
      var _this = this
      this.$api.document.recover({
        doc_id: 2
      }).then(res => {
        if (res.code === 200) {
          _this.message({
            message: '该文档恢复成功',
            type: 'success'
          })
        } else {
          _this.message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {
      })
    }
  }
}
</script>

<style scoped>

</style>
