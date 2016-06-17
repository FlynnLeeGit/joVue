<template>
  <div>
    <div class="col-sm-6">
      <h5 class="text-primary">{{label}}</h5>
      <img width='100%' :src="img">
      <a v-show='img' @click="img=''" href='javascript:;' class="text-danger">删除现有图片</a>
    </div>
    <div class="col-sm-6">
      <p>{{label}}预览 <span v-if='!isNullObj(file)' class='text-danger'>还未上传</span></p>
      <input @change='fileChange($event)' class="jofile" type="file" accept="image/*">
      <button @click='upload' class="btn btn-info">
        上传
        <i v-if='loading' class='fa fa-spinner fa-spin'></i>
      </button>
      <img width='100%' :src="file.imgBase64">
    </div>
  </div>
</template>
<script>
import joFetch from './utils/joFetch'

const {
  uploadServer
} = window.config

export default {
  props: {
    img: {
      twoWay: true,
      required: true
    },
    label: {
      type: String,
      default: '现有图片'
    }
  },
  data() {
    return {
      file: {},
      loading: false
    }
  },
  methods: {
    fileChange(e) {
      let file = e.target.files[0]
      let reader = new window.FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.file = {
          imgFile: file,
          imgBase64: reader.result,
          uploaded: false
        }
      }
    },
    upload() {
      this.loading = true
      joFetch.postFile(uploadServer, {
          uploadFile: this.file.imgFile
        })
        .then(res => {
          this.img = res.url
          this.loading = false
          this.file = {}
        })
    },
    isNullObj(obj) {
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          return false
        }
      }
      return true
    }
  }
}
</script>
<style lang='sass' scoped>
.jofile {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  &:after {
    content: '选择图片';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    background-color: #337ab7;
    border-radius: 5px;
    opacity: 1;
  }
}
</style>
