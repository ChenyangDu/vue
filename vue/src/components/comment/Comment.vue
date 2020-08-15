<template>
    <el-card shadow="hover">
        <!-- 这里一行是用户信息 -->
        <el-row align="middle" type="flex" class="authorInf" >
            <el-col :span="2" ><el-avatar :src="author_avator"></el-avatar></el-col>
            <el-col :span="2">
            <b class="text">{{author_name}}</b>
            </el-col>
            <el-col :span="2" class="time">{{create_time}}</el-col>
        </el-row>
        <!-- 这里是主要评论类容 -->
        <el-row>{{content}}</el-row>
    </el-card>
</template>

<script>
/*
 * comment_id
 * user_id
 * ducument_id
 * content
 * time
 */
export default {
    name:'comment',
    props:['author_avator','content','create_time','author_name'],
    // data:function(){
    //     return {

    //     }
    // },
}
</script>

<style scoped>
.el-card{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5%;
    background-color: #9a9aaf;
}
.authorInf {
    margin-bottom: 10px;
    height: 30px;
}

.time {
    position: absolute;
    right: -12px;
    width: 90px;
    padding: 0px;
}
</style>