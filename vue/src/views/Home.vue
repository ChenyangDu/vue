<template>
  <div>
    {{ msg }}
    <tinymce-editor v-model="msg"
                    :disabled="disabled"
                    @onClick="onClick"
                    ref="editor">
    </tinymce-editor>
    <button @click="clear">提交</button>
    <button @click="disabled = true">禁用</button>
  </div>

</template>

<script>
import TinymceEditor from "@/component/TinymceEditor";
export default {
  name: 'Home',
  components: {
    TinymceEditor
  },
  data() {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false
    }
  },
  methods: {
    //鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    //清空内容
    clear() {
      this.$refs.editor.clear()
    }
  }
}
</script>
