<template>
  <div>
    <a-list
        v-if="comments.length>-1"
        :data-source="comments"
        :header="`共 ${comments.length} 条回复`"
        item-layout="horizontal">
<!--      ${comments.length > 1 ? 'replies' : 'reply'}-->
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :author="item.username"
          :content="item.content"
          :datetime="item.time.substring(0,10)+' '+item.time.substring(11,19)"
          :avatar="item.avatar" @click.native="memberDetail(item.user_id)"
        />

        <!--          :avatar='this.global.baseUrl + "/image/avatar/show?user_id="+item.user_id'-->
      </a-list-item>
    </a-list>
    <a-comment v-if="this.can_comment">
      <a-avatar
          slot="avatar"
          :src="myavatar"
          alt="theAvatar"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="value" @change="handleChange" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            添加评论
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>

<script>
// import moment from 'moment';
export default {
  name: 'CommentPanel',
  props: {
    doc_id: {
      type: Number,
      default: 1
    },
    can_comment: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      comments: [],//通过接口获得comments列表
      submitting: false,
      value: '',
      user_id: '',
      myavatar: this.global.baseUrl + "/image/avatar/show?user_id="+this.$store.state.user.username.id
    };
  },
  created() {
    this.user_id = this.$store.state.user.username.id
    this.loadComments()
  },
  methods: {
    // 请求评论列表
    loadComments() {
      console.log('评论加载')
      console.log(this.doc_id)
      var _this = this
      this.$api.comment.list({
        doc_id: this.doc_id
      }).then(res => {
        if(res.code === 200) {
          this.comments = res.data
          for(var comment of _this.comments){
            comment.avatar = this.global.baseUrl + "/image/avatar/show?user_id="+comment.user_id
          }
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    // 提交评论
    handleSubmit() {
      var _this = this
      if (!this.value) {
        return;
      }
      this.submitting = true;
      let newComment = {
        user_id: this.user_id,
        document_id: this.doc_id,
        content: this.value,
        time: ''
      }
      this.$api.comment.create(newComment).then(res => {
        if (res.code === 200 ){
          _this.loadComments()
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
      this.submitting = false;
      this.value = '';
    },
    handleChange(e) {
      this.value = e.target.value;
    },
    memberDetail(id){
      console.log('点击了用户详情'+id);
      this.$router.push({name:'DashBoard',params:{user_id:id}});
    }
  }
};
</script>

<style>
/*todo 文本会溢出*/
</style>
