<template>
  <div>
    <modal :show.sync='show' effect='zoom' :large='true' :callback='confirm'>
      <div class="modal-header" slot='modal-header'>
        <h4>九宫格面板 {{isAdd?'添加模式':'编辑模式'}} <i v-if='$loadingAsyncData' class="fa fa-spin fa-spinner"></i><jo-loading :loading='$loadingAsyncData'></jo-loading></h4>
      </div>
      <div class="modal-body row" slot="modal-body">
        <!-- square desc -->
        <!-- <p></p>{{serCateList|json}}
<p></p>{{serInfoList|json}}
 -->
        <p></p>{{sudokuData|json}}
        <p>{{singleSerInfo|json}}</p>
        <div class="col-sm-6">
          <jo-input label="服务" sm="12">
            <select v-model='sudokuData.serId' class="form-control">
              <option :value='ser.serId' v-for='ser in serInfoList'>{{ser.serName}}</option>
            </select>
          </jo-input>
          <jo-input label='分类' sm='8'>
            <input type="text" class="form-control" v-model='sudokuData.serCategory' disabled>
          </jo-input>
          <jo-input label='介绍' sm='12'>
            <textarea v-model='sudokuData.serDesc' rows="5" class="form-control"></textarea>
          </jo-input>
          <jo-input label='询问语' sm='12'>
            <input v-model='sudokuData.serAsk' type="text" class="form-control"></input>
          </jo-input>
          <jo-input label='标记' sm='12'>
            <div class="form-control">
              <label style='margin-right:12px'>
                <input type="radio" v-model='sudokuData.serMark' value='NEW'> NEW
              </label>
              <label>
                <input type="radio" v-model='sudokuData.serMark' value='HOT'> HOT
              </label>
            </div>
          </jo-input>
        </div>
        <div class="col-sm-6">
          <jo-single-img label='图标' :server='uploadServer' :img='sudokuData.serIcon'></jo-single-img>
          <jo-single-img label='图片' :server='uploadServer' :img='sudokuData.serImg'></jo-single-img>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import {
  joInput,
  joLoading,
  modal,
  joSingleImg,
} from 'jo'

import {
  vipService,
} from 'api'
export default {
  props: ['show', 'mode', 'refreshList', 'selectedId'],
  components: {
    modal,
    joInput,
    joLoading,
    joSingleImg,
  },
  data() {
    return {
      serInfoList: [],
      sudokuData: {
        serMark: 'NEW'
      },
      uploadServer: `${window.server}/qiniu/upload/0`
    }
  },
  computed: {
    isAdd() {
      return this.mode === 'add'
    },
    isEdit() {
      return this.mode === 'edit'
    },
  },
  methods: {
    updateList(msg) {
      this.refreshList += 1
      this.show = false
      this.$root.$emit('showAlert', msg)
    },
    confirm() {

    },
  },
  asyncData(resolve, reject) {
    vipService.getSerInfos()
      .then(serInfoList => {
        resolve({
          serInfoList
        })
      })
  },
  watch: {
    'sudokuData.serId' (newSerId) {
      vipService.getOneSerInfo(newSerId)
        .then(({
          serName,
          serCategory,
          serNo
        }) => {
          this.sudokuData = Object.assign({}, this.sudokuData, {
            serName,
            serCategory,
            serNo
          })
        })
    }
  }
}
</script>
<style scoped>
.input-radio {
  cursor: pointer;
  margin-right: 10px;
}
</style>
