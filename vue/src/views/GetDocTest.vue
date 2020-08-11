<template>
  <div>
    <el-button @click="handleGetDoc">获取文档</el-button>
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
            name: '/doceditor',
            params: {
              doc_id: res.data.id
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
