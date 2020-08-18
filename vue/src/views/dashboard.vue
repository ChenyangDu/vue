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
                          <div class="grid-num">{{user.own_documents}}</div>
                          <div>TA的文档</div>
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
			              <div class="grid-num">{{user.stars}}</div>
			              <div>TA被收藏</div>
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
			              <div class="grid-num">{{user.groups}}</div>
			              <div>TA的团队</div>
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
			              <div class="grid-num">{{user.views}}</div>
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
                      <img src="../assets/img/img.jpg" class="user-avator" alt="" />
                      <div class="user-info-cont">
                        <!-- 用户名 -->
                        <div class="user-info-name">cwd</div>
                        <!-- 用户等级 -->
                        <div>LV:18</div>
                      </div>
                    </div>
                    <div class="user-info-text">个人签名</div>
					<div class="user-info-list">{{user.sign}}</div>
			    </el-card>
            </el-col>

            <!-- 第 2 部分 -->
            <el-col :span="16">
                <!-- 每日计划卡片 -->
                <el-card shadow="hover" style="height:450px;">
                  <div slot="header" class="clearfix" style="text-align: center;font-size: 20px;">
                    <p v-html="introduction"></p>
                  </div>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    name: "dashboard",
    data() {
      return {
        id: this.$store.state.user.username.id,
        introduction:"",
        user:{},
      };
    },
    created() {
      this.$api.introduction.view({
        user_id:this.id
      }).then(res =>{
        if(res.code == 200){
          this.introduction = res.data
        }
      })

      this.$api.user.info({
        id:this.id
      }).then(res=>{
        if(res.code == 200){
          this.user = res.data
        }
      })
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
    border-bottom: 2px solid #ccc;
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
    color: #000000;
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
