<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in carouselShow" :key="item">
            <img align="center" :src="srcUrl+item" fit="fill" height="100%" width="100%"></img>
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
    <el-row :gutter="20">
      <div v-for="(item) in 5" :key="item.id">
        <el-col :span=5 :offset="1">
          <el-card shadow="always" >
            <div class="block">
              <div align="center">
                <img @click="click(item)"
                          width="100%"
                           :src="srcUrl+item"
                           style="cursor:pointer" ></img>
              </div>
            </div>
          </el-card>
          <br><br>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Model",
        data(){
            return {
                // srcUrl:"http://39.101.200.9:8081/image/system?id=document"
                srcUrl:"http://39.101.200.9:8081/image/model?id=",
                carouselShow:[1,3,5]
            }
        },
        methods:{
            click:function (id) {
                console.log(id)
            }
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
</style>