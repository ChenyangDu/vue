<template>
  <el-card class="panel">
    <h1>热门素材</h1>
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in carouselShow" :key="item">
            <img @click="click(item)" align="center" :src="srcUrl+item" fit="fill" height="100%" width="100%" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <!--      <el-col :span="8" :offset="1">-->
      <!--        <div style="letter-spacing:8px;font-size:15px">-->
      <!--          <h1>精品模板，量大从优</h1><br>-->
      <!--          <h1>精品模板，量大从优</h1><br>-->
      <!--          <h1>精品模板，量大从优</h1><br>-->
      <!--        </div>-->
      <!--      </el-col>-->
    </el-row>
    <h1>推荐模板</h1>
    <el-row :gutter="10">
      <div v-for="(item) in 9" :key="item.id">
        <el-col :span=5 :push="1">
          <el-card shadow="always">
            <div class="block">
              <div align="center">
                <img @click="click(item)"
                     width="100%"
                     :src="srcUrl+item"
                     style="cursor:pointer" />
              </div>
            </div>
          </el-card>
          <br><br>
        </el-col>
      </div>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    name: "ModelPanel",
    data() {
      return {
        // srcUrl:"http://39.101.200.9:8081/image/system?id=document"
        srcUrl: "http://39.101.200.9:8081/image/model?id=",
        carouselShow: [1006, 1008, 1009],
        id: this.$store.state.user.username.id,
      }
    },
    methods: {
      click: function (id) {
        if (id > 1000) {
          id -= 1000
        }
        this.handleNewDoc(id)
      },
      handleNewDoc(typeNum) {
        var _this = this;
        this.$prompt('请输入标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          if (value === null) {
            _this.$message({
              type: 'error',
              message: '请输入标题'
            })
          } else {
            _this.$api.document
                .create({
                  user_id: this.id,
                  group_id: -1,
                  name: value,
                  type: typeNum,
                  // type: 1
                })
                .then((res) => {
                  if (res.code === 200) {
                    _this.$router.push({
                      path: "/doceditor",
                      query: {
                        doc_id: res.data.id,
                      },
                    });
                  } else {
                    _this.$message({
                      message: res.msg,
                      type: "error",
                    });
                  }
                })
                .catch((failResponse) => {
                });
          }
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
    }
  }
</script>

<style scoped>

</style>
<style>
  .el-carousel__item h3 {
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .panel{
      background-color:#e2e6eb;
  }
  .el-carousel-item{
      border-width: 5%;
  }
</style>