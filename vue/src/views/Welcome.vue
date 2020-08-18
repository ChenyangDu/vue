<template>
  <div class="hello">
    <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" style="width: 200px; height: 200px" ></el-image>
    <h1>欢迎使用金刚石文档</h1>
    <p>
      如果您需要帮助，请点击右侧的帮助文档
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">帮助</a>.
    </p>

    <p>
      还没有账号？
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">立即注册</a>.
    </p>
    <p>
      已有账号？
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">立即登录</a>.
    </p>
    
    <h3>想了解更多？</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">核心文档</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">论坛</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">社区</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">微信公众号</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">微博</a></li>
    </ul>
    <h3>关于我们</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">公司</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">开发团队</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">成员信息</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">意见反馈</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">联系方式</a></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  text-align: center;
  color: #5d6975;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
