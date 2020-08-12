<template>
  <!-- 公共标签栏组件 -->
  <div class="tags" v-if="showTags">
    <!-- 标签列表 -->
    <ul>
      <!-- 遍历tagList中所有标签，并将其渲染到页面上 -->
      <!-- 通过对路由元信息的判定，决定是否给他‘active’这个属性 -->
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">
          {{item.title}}
        </router-link>

        <!-- 关闭标签图标 -->
        <span class="tags-li-icon" @click="closeTags(index)"
          ><i class="el-icon-close"></i
        ></span>
      </li>
    </ul>

    <!-- 标签选项 -->
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>

        <!-- 标签选项下拉列表 -->
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import bus from "../../utils/bus";
  export default {
    data() {
      return {
        tagsList: [],
      };
    },
    methods: {
      isActive(path) {
        // 将路由解析后的URL与匹配路径进行比较，并返回比较结果
        return path === this.$route.fullPath;
      },

      // 根据index关闭对应单个标签
      closeTags(index) {
        // 关闭对应标签
        const delItem = this.tagsList.splice(index, 1)[0];
        // 对标签列表进行重新渲染
        const item = this.tagsList[index]
          ? this.tagsList[index]
          : this.tagsList[index - 1];
        // 判断标签列表，进行相应跳转
        if (item) {
          delItem.path === this.$route.fullPath && this.$router.push(item.path);
        } else {
          this.$router.push("/");
        }
      },

      // 关闭全部标签，同时回到系统首页页面
      closeAll() {
        this.tagsList = [];
        this.$router.push("/");
      },

      // 关闭其他标签
      closeOther() {
        // 过滤掉其他元素，保留当前元素
        const curItem = this.tagsList.filter((item) => {
          return item.path === this.$route.fullPath;
        });
        // 将标签列表替换为当前标签
        this.tagsList = curItem;
      },

      // 设置标签
      setTags(route) {
        // 检测标签列表是否包含当前标签
        const isExist = this.tagsList.some((item) => {
          return item.path === route.fullPath;
        });
        // 对标签列表内标签个数进行判定，如果大于等于8个，则将第一个标签删除，将当前标签放置在末尾
        if (!isExist) {
          if (this.tagsList.length >= 8) {
            this.tagsList.shift();
          }
          this.tagsList.push({
            title: route.meta.title,
            path: route.fullPath,
            name: route.matched[1].components.default.name,
          });
        }
        // 通过bus将标签列表进行传递
        bus.$emit("tags", this.tagsList);
      },

      // 实现标签选项下拉列表
      handleTags(command) {
        command === "other" ? this.closeOther() : this.closeAll();
      },
    },

    // 监控自定义的showTags属性
    computed: {
      showTags() {
        return this.tagsList.length > 0;
      },
    },

    // 监测路由数据的变化
    watch: {
      $route(newValue, oldValue) {
        this.setTags(newValue);
      },
    },

    created() {
      this.setTags(this.$route);
      // 监听关闭当前页面的标签页
      bus.$on("close_current_tags", () => {
        for (let i = 0, len = this.tagsList.length; i < len; i++) {
          const item = this.tagsList[i];
          if (item.path === this.$route.fullPath) {
            if (i < len - 1) {
              this.$router.push(this.tagsList[i + 1].path);
            } else if (i > 0) {
              this.$router.push(this.tagsList[i - 1].path);
            } else {
              this.$router.push("/");
            }
            this.tagsList.splice(i, 1);
            break;
          }
        }
      });
    },
  };
</script>

<!-- CSS样式 -->
<style>
  .tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
  }

  .tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
  }

  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }

  .tags-li.active {
    color: #fff;
  }

  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }

  .tags-li.active .tags-li-title {
    color: #fff;
  }

  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
</style>