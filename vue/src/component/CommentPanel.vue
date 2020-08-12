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

  },
  data() {
    return {
      comments: [],//通过接口获得comments列表
      submitting: false,
      value: '',
      // moment,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.value) {
        return;
      }
      this.submitting = true;
      this.submitting = false;
      this.comments.unshift({ // 添加在数组头部
        author: 'Han Solo',
        content: this.value,
        datetime: this.getNowFormatDate()
      })
      this.value = '';
      // 发送数据到后端
    },
    handleChange(e) {
      this.value = e.target.value;
    },
  },
};
</script>

<style>
/*todo 文本会溢出*/
</style>
