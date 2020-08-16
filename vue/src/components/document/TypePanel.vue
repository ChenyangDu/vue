<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in typeLists" :key="item.typeNum">
        <br/>
        <el-card @click.native="choose(item.typeNum)">
          <div style="text-align: center">
            <img :src="item.src" alt="模板缩略图" width="100px" height="140px">
            <div>
              <span><b>{{ item.name }}</b></span>
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TypePanel",
  data() {
    return {
      typeLists: [
        {
          name: '模板1',
          src: require('../../assets/type/type0.png'),
          typeNum: 1
        },
        {
          name: '模板2',
          src: require('../../assets/type/type0.png'),
          typeNum: 2
        },
        {
          name: '模板3',
          src: require('../../assets/type/type0.png'),
          typeNum: 3
        },
        {
          name: '模板4',
          src: require('../../assets/type/type0.png'),
          typeNum: 4
        },
        {
          name: '模板5',
          src: require('../../assets/type/type0.png'),
          typeNum: 5
        },
        {
          name: '模板6',
          src: require('../../assets/type/type0.png'),
          typeNum: 6
        },
        {
          name: '模板7',
          src: require('../../assets/type/type0.png'),
          typeNum: 7
        }
      ]
    }
  },
  methods: {
    choose(typeNum) {
      this.$emit('confirmCreate',typeNum)
    }
  }
}
</script>

<style scoped>

</style>
