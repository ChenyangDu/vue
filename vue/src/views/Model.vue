<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10" :offset="1">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in 6" :key="item">
            <img align="center" :src="srcUrl" fit="fill" height="100%" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="10" :offset="1">
        <div style="letter-spacing:8px;font-size:15px">
          <h1>精品模板，量大从优</h1><br>
          <h1>精品模板，量大从优</h1><br>
          <h1>精品模板，量大从优</h1><br>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <div v-for="(item) in 12" :key="item.id">
        <el-col :span=3 :offset="1">
          <el-card shadow="always" @click.native="detail(item.id)" style="cursor:pointer">
            <div class="block">
              <div align="center">
                <i style="font-size: 100px;" class="el-icon-tickets"></i>
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
                srcUrl:"http://39.101.200.9:8081/image/system?id=document"
                // srcUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
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