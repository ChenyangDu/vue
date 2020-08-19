<template>
  <div class="hello">
    <el-image :src="imagepath" :lazy='true' style="width: 200px; height: 200px" ></el-image>
    <h1>欢迎使用库里南文档</h1>
    <p>
      库里南，面向未来的办公软件
      <!-- <a href="https://cli.vuejs.org" target="_blank" rel="noopener">帮助</a>. -->
    </p>
    <p>文档实时协同</p>
    <p>知识沉淀管理</p>
    <p>数据安全可控</p>

    <p>
      还没有账号？
      <a href="./#/register" target="_blank" rel="noopener">立即注册</a>.
    </p>
    <p>
      已有账号？
      <a href="./#/login" target="_blank" rel="noopener">立即登录</a>.
    </p>

    <!-- <h3>想了解更多？</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">核心文档</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">论坛</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">社区</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">微信公众号</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">微博</a></li>
    </ul> -->
    <h3>项目地址</h3>
    <ul>
      <li><a href="https://github.com/ChenyangDu/vue" target="_blank" rel="noopener">前端</a></li>
      <li><a href="https://github.com/ChenyangDu/springboot" target="_blank" rel="noopener">后端</a></li>
      <!-- <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">成员信息</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">意见反馈</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">联系方式</a></li> -->
    </ul>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data:function(){
    return {
      imagepath:'http://39.101.200.9:8081/image/system?id=diamond.png'
    }
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
