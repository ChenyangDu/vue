<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
            :init="init"
            :disabled="disabled"
            >
<!--      @onClick="onClick"-->
    </editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme.min'
import 'tinymce/skins/ui/oxide/skin.min.css'
import Editor from '@tinymce/tinymce-vue'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/icons/default'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/save'

import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/contextmenu'
import axios from "../../http/axios";
export default {
  name: 'TinymceEditor',
  components: {
    Editor
  },
  props: {
    edit_bar_show: {
      type: Boolean,
      default: false
    },
    doc_id: {
      type: Number,
      default: -1
    },
    //传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: true
    },
    plugins: {
      type: [String, Array],
      default: 'link lists image code colorpicker media table textcolor wordcount contextmenu save autosize'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo save |  formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote| lists unlink image media table link code | removeformat'
    }
  },
  data() {
    return {
      //初始化配置
      init: {
        language_url: '/tinymce/zh_CN.js',
        language: 'zh_CN',
        height: 600,
        skin_url: '/tinymce/skins/ui/oxide',
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: true,
        paste_word_valid_elements: '*[*]',        // word需要它
        paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
        // 配置图片上传的功能
        images_upload_handler:(blobInfo, success, failure) => {
          this.handleImgUpload(blobInfo, success, failure)
        },

        // //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        // images_upload_handler: (blobInfo, success, failure) => {
        //   const img = 'data:image/jpeg;base64,' + blobInfo.base64()
        //   success(img)
        // },
      },
      myValue: this.value
    }
  },
  created() {
    if (this.edit_bar_show === true) {
      this.init.toolbar = this.toolbar
      this.init.menubar = true
    } else {
      this.init.toolbar = ''
      this.init.menubar = ''
    }
    console.log('bar值')
    console.log(this.edit_bar_show)
    tinymce.init({})
  },
  methods: {

    //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    //需要什么事件可以自己增加
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    //可以添加一些自己的自定义事件
    handleSubmit() {
      var _this = this
      console.log('提交内容')
      console.log(this.myValue)
      console.log('提交内容-完毕')
      if (this.myValue === '') {
        this.myValue = ' '
      }
      this.$api.document.end({
        doc_id: _this.doc_id
      }, _this.myValue).then(res => {
        if (res.code === 200 ){
          _this.$message({
            message: '文章上传成功',
            type: 'success'
          })
          _this.$emit('submitSuccess')
        } else {
          _this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // to_data() {
    //   console.log(this.tinymceHtml)
    //   let Base64 = {
    //     encode(str) {
    //       return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    //           function toSolidBytes(match, p1) {
    //             return String.fromCharCode('0x' + p1)
    //           }))
    //     },
    //     decode(str) {
    //       return decodeURIComponent(atob(str).split('').map(function (c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    //       }).join(''))
    //     }
    //   };
    //   // 将富文本内容专程base64编码，这个用于上传到服务存储到数据库中
    //   let encoded = Base64.encode(this.tinymceHtml)
    //   // 将富文本的base64编码 转换成原来的格式，这个用于将数据库中的富文本展示在界面上
    //   let decoded = Base64.decode(encoded)
    //   console.log(encoded)
    //   console.log(decoded)
    // },
    // 用于上传图片的，后端需要提供好上传接口
    handleImgUpload (blobInfo, succFun, failFun) {
      // let formdata = new FormData()
      // formdata.set('upload_file', blobInfo.blob())
      // let new_headers = { headers: this.headers}
      // let upload_url = 'http://39.101.200.9:8081//image/avatar/upload?user_id=110'
      // axios.post(upload_url, formdata, new_headers).then(res => {
      //   // console.log(res.data.data)
      //   success(res.data.data[0])
      // }).catch(res => {
      //   failure('error')
      // })
        var xhr, formData;
        var file = blobInfo.blob();//转化为易于理解的file对象
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'http://39.101.200.9:8081/image/docimg/upload');
        xhr.onload = function() {
            var json;
            if (xhr.status != 200) {
                failFun('HTTP Error: ' + xhr.status);
                return;
            }
            console.log(xhr)
            json = JSON.parse(xhr.responseText);
            if (!json || typeof json.location != 'string') {
                failFun('Invalid JSON: ' + xhr.responseText);
                return;
            }
            succFun(json.location);
        };
        formData = new FormData();
        formData.append('file', file, file.name );//此处与源文档不一样
        xhr.send(formData);
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style scoped>
</style>
