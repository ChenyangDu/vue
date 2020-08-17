<template>
    <div>
        <el-table
                :data="groupmember"
                style="width: 100%">
            <el-table-column>
                <template slot-scope="scope">
                    <img :src="avatarPath +'?user_id='+scope.row.id" style="height: 50px"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="wechat"
                    label="微信">
            </el-table-column>
            <el-table-column
                    prop="qq"
                    label="QQ">
            </el-table-column>

            <el-table-column label="">
                <template slot-scope="scope" >
                    <el-button @click="remove(scope.row.id)" type="danger" round size="small" >移出</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "GroupMember",
        data() {
            return {
                group_id:this.$route.params.group_id,
                groupmember:[],
                avatarPath : this.global.baseUrl + '/image/avatar/show'
            }
        },
        methods:{
            remove:function (user_id) {
                console.log(user_id)
                this.$api.group.kick({user_id:user_id,group_id:this.group_id});
            }
        },
        created() {
          var _this = this
          if((Object.keys(this.$route.params).length === 0)){
            this.group_id = this.$store.state.groupNumber
          } else {
            _this.group_id = this.$route.params.group_id
            _this.$store.commit('toDetail',_this.group_id)
          }
            console.log("group_id member",this.group_id)
            this.$api.group.member({group_id:this.group_id}).then(response =>{
                if(response.code == 200){
                    this.groupmember = response.data
                    //     .filter(
                    //     (g) => g.id !== _this.$store.state.user.username.id
                    // );

                    console.log(this.groupmember)
                }
            })
        }
    }
</script>

<style scoped>

</style>
