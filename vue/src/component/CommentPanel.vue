<template>
  <div>
    <a-list
        v-if="comments.length"
        :data-source="comments"
        :header="`共 ${comments.length} 条回复`"
        item-layout="horizontal">
<!--      ${comments.length > 1 ? 'replies' : 'reply'}-->
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :author="item.author"
          :content="item.content"
          :datetime="item.datetime"/>
<!--        :avatar="item.avatar"-->
      </a-list-item>
    </a-list>
    <a-comment>
<!--      <a-avatar-->
<!--          slot="avatar"-->
<!--          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"-->
<!--          alt="Han Solo"-->
<!--      />-->
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="value" @change="handleChange" />
        </a-form-item>
        <a-form-item v-if="this.can_comment">
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
      default: false
    }
  },
  data() {
    return {
      comments: [],//通过接口获得comments列表
      submitting: false,
      value: '',
      // can_comment: -1
    };
  },
  methods: {
    // 请求评论列表
    loadComments() {
      alert(this.doc_id)
      var _this = this
      this.$api.comment.list({
        doc_id: this.doc_id
      }).then(res => {
        if(res.code === 200) {
          this.comments = res.data
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(failResponse => {})
    },
    // 提交
    handleSubmit() {
      if (!this.value) {
        return;
      }
      this.submitting = true;
      var _this = this
      let newComment = {
        // user_id: this.$store.state.user.username.id
        user_id: 1,
        doc_id: this.doc_id,
        content: this.value,
        datetime: this.getNowFormatDate()
      }
      this.$api.comment.create(newComment).then(res => {
        if (res.code === 200 ){
          _this.comments.unshift(res.data)
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
  },
  created() {
    this.loadComments()
  }
};
</script>

<style>
/*todo 文本会溢出*/
</style>
