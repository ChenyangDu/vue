<template>
  <div>
    <el-button @click="handleNewDoc">个人-新建文档测试(user_id=1)</el-button>
<!--    <el-button @click="handleType1Doc">个人-根据模板新建文档测试(暂无 type=1)</el-button>-->
    <el-button @click="handleOpenDoc">个人-编辑文档测试(user_id=1 doc_id=1)</el-button>
    <el-button @click="handleDelete">个人-文档删除测试(user_id=1 doc_id=2)</el-button>
    <el-button @click="handleRecover">个人-文档恢复测试(user_id=1 doc_id=2)</el-button>
  </div>
</template>

<script>
export default {
  name: "GetDocTest",
  methods: {
    // 点击创建新文档
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
    // 点击创建模板文档
    // handleType1Doc() {
    //   var _this = this
    //   this.$api.document.create({
    //     user_id: 1,
    //     group_id: -1,
    //     type: 1
    //   }).then(res => {
    //     if (res.code === 200 ){
    //       _this.$router.push({
    //         name: 'DocEditor',
    //         params: {
    //           doc: res.data // 返回一个新的文档document
    //         }
    //       })
    //     } else {
    //       _this.$message({
    //         message: res.msg,
    //         type: 'error'
    //       })
    //     }
    //   }).catch(failResponse => {})
    // },
    // 点击查看文档
    handleOpenDoc() {
      var _this = this
      // 获取doc_id文章的信息（测试用 传递 doc_id=1）
      this.$api.document.info(
          {
            doc_id: 1294250488 // todo 文章信息id应从列表 row 获得
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
    //点击删除文档
    handleDelete() {
      var _this = this
      this.$api.document.deleteDoc({
        doc_id: 1290398265,
        user_id: 1,
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
    // 点击恢复
    handleRecover() {
      var _this = this
      this.$api.document.recover({
        doc_id: 1294250488
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
      }).catch(failResponse => {})
    }
  }
}
</script>

<style scoped>

</style>
