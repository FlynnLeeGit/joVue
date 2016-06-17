<template>
  <div>
    <!-- {{imgs|json}} -->
    <div v-if='imgs' class="col-xs-12">
      <h4 class="text-primary">现时图片</h4>
      <div class="img-wrap" v-for='i in imgArr' track-by='$index'>
        <a :href="i" target='_blank'>
          <img height="100px" :src="i" :alt='i' :title='i'>
        </a>
        <button @click='delImg($index)' class="del-btn btn btn-warning">&times;</button>
      </div>
    </div>
    <hr />
    <div class="col-xs-12">
      <!-- 预览区 -->
      <h5>预览区<input class="jofile" @change='fileChange($event)' type="file" multiple data-content="选择图片(可多选)" accept="image/*"><button @click='upload' class="btn btn-info"><span>上传图片</span><i v-if='loading' class='fa fa-spinner fa-spin'></i></button></h5>
      <h4 v-if='files.length' class="text-danger"> 此为预览区 您选择了图片 但还未上传 上传图片后图片才生效!</h4>
      <div class="img-wrap" v-for='i in files' track-by='$index' style='opacity:0.5'>
        <img height="100px" :src="i.base64">
        <button @click='files.splice($index,1)' class="del-btn btn btn-danger btn-xs">&times;</button>
      </div>
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
    imgs: {
      required: true,
      twoWay: true
    },
    splitKey: {
      type: String,
      default: ','
    }
  },
  data() {
    return {
      files: [], // 缓存filelist对象到此数组
      imgArr: [],
      loading: false
    }
  },
  computed: {
    isMultiple() {
      return this.multiple
    }
  },
  methods: {
    delImg(index) {
      this.imgArr.splice(index, 1)
      this.updateImgs()
    },
    updateImgs() {
      this.imgs = this.imgArr.join(this.splitKey)
    },
    fileChange(e) {

      let newFiles = [...e.target.files] // filelist转为真正数组

      newFiles.forEach((file) => {
        let reader = new window.FileReader()
        reader.readAsDataURL(file) // Array格式
        reader.onload = () => {
          this.files.push({
            imgFile: file,
            base64: reader.result
          })
        }
      })
    },
    upload() {
      this.loading = true
      let promiseArr = this.files.map((file) => { // 批量promise异步操作
        return joFetch.postFile(uploadServer, {
          uploadFile: file.imgFile
        })
      })
      Promise.all(promiseArr)
        .then((resultArr) => {
          resultArr.forEach((result) => {
            this.imgArr.push(result.url)
          })
          this.updateImgs() // 更新图片字符串
          this.files = [] // 预览区的files数据置空
          this.loading = false
        })
    }
  },
  watch: {
    'imgs': function(newImgs) {
      if (newImgs) {
        newImgs.indexOf(this.splitKey) > -1 ? this.imgArr = newImgs.split(this.splitKey) : this.imgArr.$set(0, newImgs)
      } else {
        this.files = []
        this.imgArr = []
      }
    }
  }
}
</script>
<style lang='sass' scoped>
.jofile {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 30px;
  line-height: 30px;
  &:after {
    content: attr(data-content);
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

.img-wrap {
  position: relative;
  display: inline-block;
  margin: 2px;
  box-shadow: 2px 2px 10px #666;
}

.del-btn {
  position: absolute;
  right: 5%;
  top: 5%;
}
</style>
