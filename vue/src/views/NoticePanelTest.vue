<template>
  <div>
    <el-popover ref="popover-notice" placement="bottom-end" trigger="click">
      <notice-panel></notice-panel>
      <el-button slot="reference">click 激活</el-button>
    </el-popover>
  </div>
</template>

<script>
import NoticePanel from "@/component/NoticePanel";
export default {
  name: "NoticePanelTest",
  components: { NoticePanel },
}
</script>

<style scoped>

</style>
