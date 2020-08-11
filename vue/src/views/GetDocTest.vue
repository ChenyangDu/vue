<template>
  <div>
    <el-button @click="handleGetDoc">获取文档测试(doc_id=1)</el-button>
    <el-button @click="handleNewDoc">个人-新建文档测试(user_id=1)</el-button>
  </div>
</template>

<script>
export default {
  name: "GetDocTest",
  methods: {
    handleGetDoc() {
      var _this = this
      this.$api.document.info(
          {
            doc_id: 1
          }
      ).then(res => {
        if(res.code === 200) {
          _this.$router.push({
            name: 'DocEditor',
            params: {
              doc_id: res.data.id
            }
          })
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    handleNewDoc() {
      var _this = this
      this.$api.document.create({
        user_id: 1,
        group_id: -1
      }).then(res => {
        if (res.code === 200 ){
          _this.$router.push({
            name: 'DocEditor',
            params: {
              doc_id: res.data.id // 返回一个新的文档
            }
          })
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
