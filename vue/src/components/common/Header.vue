<template>
  <!-- 公共头部组件 -->
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <!-- 通过v-if和v-else来判定侧边栏打开状态 -->
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>

    <!-- 系统logo -->
    <div class="logo">金刚石文档</div>

    <!-- 头部组件右边功能区 -->
    <div class="header-right">
      <div class="header-user-con">
        <!--从这里开始写右边功能区-->

        <div class="btn-fullscreen" @click="handleFullScreen">
          <!--tooltip提供了两个主题：dark和light，通过 effect 设置主题 -->
          <!-- 通过三元表达式来设置不同的文字提示，placement属性控制文字提示出现的位置 -->
          <el-tooltip effect="light" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-sort"></i>
          </el-tooltip>
        </div>
        <!--这里是未登录看到的登录/注册链接-->
        <div v-if="!isLogin">
          <el-link :underline="false" href="./#/login">登录</el-link>/
          <el-link :underline="false" href="./#/register">注册</el-link>
        </div>
        <!--登录注册链接到此结束-->

        <!--从这里开始是登录后才能看到的消息提示和用户头像-->
        <div v-if="isLogin">
          <!--这里是消息提示-->
          <div class="btn-bell">
            <el-tooltip
              effect="light"
              :content="message?`有${message}条未读消息`:`消息中心`"
              placement="bottom"
            >
              <router-link to="/tabs">
                <i class="el-icon-message-solid"></i>
              </router-link>
            </el-tooltip>
            <!-- 通过对message的判定，来决定是否显示小红点 -->
            <span class="btn-bell-badge" v-if="message"></span>
          </div>
          <!--消息提示到此结束-->

          <!--这里是用户头像-->
          <div class="avator">
            <el-dropdown class="user-name" trigger="hover" @command="handleCommand">
              <div class="block"><el-avatar :size="50" :src="userAvator"></el-avatar></div>
              <!-- slot设置下拉列表 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  command="myinfo">你好,{{username}}</el-dropdown-item>
                <el-dropdown-item  command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!--用户头像到此结束-->
        </div>
        <!--右边功能区到此结束-->
      </div>
    </div>
  </div>
</template>

<script>
// 加载bus实现组件通信
import bus from "../../utils/bus";

export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      userid: 0,
      username: "还没有用户登录",
      userAvator:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      message: 2,
      isLogin: false,
    };
  },

  // // 监控自定义属性
  // computed: {
  //   username() {
  //     // 从本地存储中获取值
  //     let username = localStorage.getItem("ms_username");
  //     // 对获取到的值进行判断，如果从本地存储能够获取到值，则使用该值，如果不能获取到，则使用 data 中设置的值
  //     console.log('fuck!!!!!'+this.username);
  //     return username ? username : this.name;
  //   },
  // },

  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      //退出登录事件
      if (command == "loginout") {
        // 从本地存储中删除用户名
        // localStorage.removeItem("username");
        this.$store.commit("logout");
        this.isLogin = false;
        this.userid = 0;
        this.username = "还没有用户登录";
        this.userAvator =
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        // 跳转到登录页面
        this.$router.push("/login");
      } else if (command == "myinfo") {
        this.$router.push("/personalinformation");
      }
    },

    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      // 通过bus发送信息
      bus.$emit("collapse", this.collapse);
    },

    // 全屏事件
    handleFullScreen() {
      // 获取文档对象的根元素
      let element = document.documentElement;
      if (this.fullscreen) {
        // 设置不同浏览器下的退出全屏模式
        // -webkit- 兼容chrome 和 safari
        // -moz- 兼容firefox
        // -ms- 兼容IE浏览器
        // -o- 兼容opera
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        // 设置不同浏览器下的进入全屏模式
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },

    checkLogin: function () {
      return localStorage.getItem("username") !== null;
    },
  },

  // 初始化页面完成后，对页面可见区域宽度进行判定，如果页面宽度小于1500，则触发 collapseChage 方法。
  mounted: function () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
    //通过 bus 通信获取 message 的值。
    bus.$on("msg", (e) => {
      this.message = e;
    });
  },
  created: function () {
    if (this.checkLogin()) {
      console.log("在构造函数中检测到用户已经登录");
      this.isLogin = true;
      this.username = this.$store.state.user.username.name;
      this.userid = this.$store.state.user.username.id;
      this.userAvator =
        this.global.baseUrl +
        "image/avator/show?user_id=" +
        this.$store.state.user.username.id;

      this.userAvator =
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
    }
    // bus.$on("login-event", () => {
    //   console.log("home接受到了消息");
    //   this.isLogin = true;
    //   this.username = this.$store.state.user.username.name;
    //   this.userid = this.$store.state.user.username.id;
    //   this.userAvator =
    //     this.global.baseUrl +
    //     "image/avator/show?user_id=" +
    //     this.$store.state.user.username.id;

    //   this.userAvator = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
    // });
  },
};
</script>

<!-- CSS样式 -->
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #000000;
  background-color: #ffffff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell {
  height: 30px;
  width: 20px;
  position: absolute;
  /* top: 50%;
  left: 90%;*/
  transform: translate(0, 50%); 
}
.btn-fullscreen {
  height: 30px;
  width: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  transform: rotate(45deg);
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
  color: #000000;
}
.avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #000000;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
