<template>
  <!-- 公共侧边栏组件 -->
  <div class="sidebar">
    <!-- default-active：当前激活菜单的 index；
         collapse：是否折叠收起菜单；
         unique-opened：是否只保持一个子菜单的展开，默认为false；
    router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转，默认值为false；-->
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#fffdfb"
      text-color="#000000"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <!-- 对items进行遍历 -->
      <template v-for="item in items">
       
        <!-- 如果不存在第二级菜单，渲染第一级菜单标题 -->
        <!-- <template v-else> -->
        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
        <!-- </template> -->
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../../utils/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        // 这些便是菜单的数据，目前并没有实现对应的功能，为了展示侧边栏的样式，提前模拟在这里。
        {
          icon: "el-icon-s-home",
          index: "dashboard",
          title: "首页",
        },
        {
          icon: "el-icon-s-cooperation",
          index: "documentlist",
          title: "工作台",
        },
        {
          icon: "el-icon-s-custom",
          index: "grouplist",
          title: "我的团队",
        },
        {
          icon: "el-icon-delete",
          index: "trash",
          title: "回收站",
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏，bus.$emit（）用于发送信息。
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  },
};
</script>

<!-- CSS样式 -->
<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  background-color: #000000;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 150px;
}
.sidebar > ul {
  height: 100%;
}
</style>