<template>
  <div>
    <modal :show.sync='show' effect='zoom' :large='true' :callback='confirm'>
      <div class="modal-header" slot='modal-header'>
        <h4>九宫格面板 {{isAdd?'添加模式':'编辑模式'}} <i v-if='$loadingAsyncData' class="fa fa-spin fa-spinner"></i><jo-loading :loading='$loadingAsyncData'></jo-loading></h4>
      </div>
      <div class="modal-body row" slot="modal-body">
        <!-- square desc -->
        <!-- <p></p>{{sudokuData|json}} -->
        <div class="col-sm-6">
          <jo-input label="服务" sm="12">
            <select @change='bindSer($event)' v-model='sudokuData.serName' class="form-control">
              <option v-for='ser in serInfoList'>{{ser.serName}}</option>
            </select>
          </jo-input>
          <jo-input label='分类' sm='8'>
            <input type="text" class="form-control" v-model='sudokuData.serCategory' placeholder="自动匹配" disabled>
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
          <div class="col-xs-12">
            <jo-single-img label='图标' :server='uploadServer' :img.sync='sudokuData.serIcon'></jo-single-img>
          </div>
          <div class="col-xs-12">
            <jo-single-img label='图片' :img.sync='sudokuData.serImg'></jo-single-img>
          </div>
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
  cardService,
  vipService,
  sudokuService
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
      if (this.isAdd) sudokuService.insertSudoku(this.sudokuData)
        .then(res => this.updateList('插入九宫格服务成功!'))
      if (this.isEdit) sudokuService.updateSudoku(this.sudokuData)
        .then(res => this.updateList('更新九宫格服务成功!'))
    },
    bindSer(e) {
      let newSerName = e.target.value
      this.serInfoList.forEach((ser) => {
        if (newSerName === ser.serName) this.$set('sudokuData.serId', ser.serId)
      })
      vipService.getOneSerInfo(this.sudokuData.serId)
        .then(({
          serCategory,
          serNo
        }) => {
          this.sudokuData = Object.assign({}, this.sudokuData, {
            serCategory,
            serNo
          })
        })

    }
  },
  asyncData(resolve, reject) {
    cardService.getSerInfos()
      .then(serInfoList => resolve({
        serInfoList
      }))
    if (this.isEdit) sudokuService.getOneSudoku(this.selectedId)
      .then(sudokuData => resolve({
        sudokuData
      }))
  },
}
</script>
<style scoped>
.input-radio {
  cursor: pointer;
  margin-right: 10px;
}
</style>
