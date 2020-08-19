<template>
  <!-- 首页组件 -->
  <div>
    <!-- 第一部分 -->
    <el-row :gutter="20" class="mgb20">
      <!-- 第 1 部分 -->
      <el-col :span="6">
        <!-- 第（1）部分 -->
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-1">
            <i class="el-icon-lx-people grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{userinfo.own_documents}}</div>
              <div v-if="isMe()">我的文档</div>
              <div v-if="!isMe()">TA的文档</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 第（2）部分 -->
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-2">
            <i class="el-icon-lx-notice grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{userinfo.stars}}</div>
              <div v-if="isMe()">我被收藏</div>
              <div v-if="!isMe()">TA被收藏</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 第（3）部分 -->
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-3">
            <i class="el-icon-lx-goods grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{userinfo.groups}}</div>
              <div v-if="isMe()">我的团队</div>
              <div v-if="!isMe()">TA的团队</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 第（4）部分 -->
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div class="grid-content grid-con-4">
            <i class="el-icon-lx-goods grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{userinfo.views}}</div>
              <div>访问次数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 第二部分 -->
    <el-row :gutter="20">
      <!-- 第 1 部分 -->
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:450px;">
          <div class="user-info">
            <!-- 用户头像 -->
            <!-- <img src="" class="user-avator" alt /> -->
            <el-avatar :size="150" :src="userAvator"></el-avatar>
            <div class="user-info-cont">
              <!-- 用户名 -->
              <div class="user-info-name">{{userinfo.name}}</div>
              <!-- 用户等级 -->
              <div>TEL:{{userinfo.phone}}</div>
            </div>
          </div>
          <el-divider content-position="center"><span style="font-weight: bold;font-size: medium">个性签名</span></el-divider>
<!--          <div class="user-info-text">个性签名</div>-->
          <div class="user-info-list">
            {{userinfo.sigature}}
          </div>
        </el-card>
      </el-col>

      <!-- 第 2 部分 -->
      <el-col :span="16">
        <!-- 每日计划卡片 -->
        <el-card shadow="hover" style="height:450px;">
<!--          <div slot="header" class="clearfix" style="text-align: center;font-size: 20px;">-->
<!--            <span style="position: relative; top: 0px"><h3><b>个人简介</b></h3></span>-->
            <div v-if="isMe()">
              <el-button style="float: right; padding: 3px 0;color:#5555ff;" type="text" @click="edit" v-if="!isEdit"><i class="el-icon-edit"></i></el-button>
              <el-button style="float: right; padding: 3px 0;color:#5555ff;" type="text" @click="save" v-if="isEdit"><i class="el-icon-upload2"></i></el-button>
            </div>
<!--          </div>-->
          <!-- 显示个人简介 -->
          <div v-html="introduce" v-if="!isEdit">
          </div>
          <!-- 修改个人简介 -->
          <tinymce-introduce v-if="isEdit" v-model="introduce"
          :edit_bar_show="true"  :disabled="false">
          </tinymce-introduce>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TinymceIntroduce from '../components/user/TinymceIntroduce.vue'
export default {
  name: "dashboard",
  data() {
    // console.log('登录用户id');
    // console.log(this.$store.state.user.username.id);
    // console.log('传入用户id');
    // console.log(this.$route.params.user_id);
    return {
      //已登录用户id
      login_id:this.$store.state.user.username.id,
      //将要访问的用户id
      user_id:this.$route.params.user_id,
      //已登录用户头像
      userAvator:this.global.baseUrl +
        "/image/avatar/show?user_id=" +
        this.$store.state.user.username.id,
      //已登录用户信息
      userinfo:{name:'蔡徐坤',sigature:'微管仲，吾其被发左衽矣',own_documents:0,
        groups:0,views:0,stars:0},
      introduce:'<p>此人很懒，什么也没有留下</p><br><p>此人很懒，什么也没有留下</p>',
      isEdit:false
    };
  },

  created:function(){
    if(this.$route.params.user_id === undefined){
      this.user_id = this.$store.state.user.username.id;
    }
    var _this = this;
    this.$api.user.info({id:this.user_id}).then(response => {
      if(response.code === 200){
        console.log('获取用户信息成功');
        console.log(response.data);
        this.userinfo.name = response.data.name;
        this.userinfo.sigature = response.data.sign;
        this.userinfo.own_documents = response.data.own_documents;
        this.userinfo.groups = response.data.groups;
        this.userinfo.views = response.data.views;
        this.userinfo.stars = response.data.stars;
        this.userAvator = this.global.baseUrl +
        "/image/avatar/show?user_id=" +
        this.user_id;
        this.userinfo.phone = response.data.phone;
      }
      else {
        console.log('获取用户信息出错');
      }
    }).catch(err => {
      console.log('获取用户信息捕获到了异常');
    })

    this.$api.introduction.view({user_id:this.user_id}).then(response => {
      if(response.code === 200){
        console.log('获取个人简介成功');
        _this.introduce = response.data;
      }
      else {
        console.log('获取个人简介失败');
      }
    }).catch(err => {
      console.log('获取个人简介异常');
    })
  },
  components:{
    TinymceIntroduce
  },
  methods:{
    isMe:function(){
      return this.login_id === this.user_id;
    },
    edit:function(){
      console.log(this.introduce);
      this.isEdit = true;
    },
    save:function(){
      console.log(this.introduce);
      this.isEdit = false;
      var _this = this;
      this.$api.introduction.save({user_id:_this.user_id},_this.introduce).then(response =>{
        if(response.code === 200)
          console.log('上传简介成功');
        else console.log('上传失败');
      }).catch(err => {
        console.log('上传简介出现异常');
      })
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 150px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 18px;
  color: #000000;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 150px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(255, 0, 0);
}

.grid-con-1 .grid-num {
  color: rgb(85, 170, 255);
}

.grid-con-2 .grid-con-icon {
  background: rgb(0, 0, 255);
}

.grid-con-2 .grid-num {
  color: rgb(85, 170, 255);
}

.grid-con-3 .grid-con-icon {
  background: rgb(255, 255, 0);
}

.grid-con-3 .grid-num {
  color: rgb(85, 170, 255);
}

.grid-con-4 .grid-con-icon {
  background: rgb(255, 0, 255);
}

.grid-con-4 .grid-num {
  color: rgb(85, 170, 255);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  /*border-bottom: 2px solid #ccc;*/
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 20px;
  color: #303133;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 18px;
  color: #000000;
  line-height: 40px;
}

.user-info-text {
  font-size: 25px;
  color: #000000;
  line-height: 40px;
  text-align: center;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
</style>
