<template>
  <div>
    <modal :show.sync='show' effect='zoom' :large='true' :callback='confirm'>
      <div class="modal-header" slot='modal-header'>
        <h4>服务面板 {{isAdd?'添加模式':'编辑模式'}} <i v-if='$loadingAsyncData' class="fa fa-spin fa-spinner"></i><jo-loading :loading='$loadingAsyncData'></jo-loading></h4>
      </div>
      <div class="modal-body row" slot="modal-body">
        <!-- service desc -->
        <jo-input sm='4' label='服务名称'>
          <input v-model='editData.serName' type="text" class="form-control">
        </jo-input>
        <jo-input sm='4' label='分类'>
          <select v-model='editData.serCategory' class="form-control">
            <option v-for='cate in serviceCategoryList'>{{cate.valueContent}}</option>
          </select>
        </jo-input>
        <jo-input label='供应商' sm="4">
          <input v-model='editData.provider' type="text" class="form-control">
        </jo-input>
        <jo-input label="商品费(原价)" sm='4' after='元'>
          <input v-model='editData.serOriginal' type="number" class="form-control">
        </jo-input>
        <jo-input label="服务费(原价)" sm='4' after='元'>
          <input v-model='editData.chargeOriginal' type="number" class="form-control">
        </jo-input>
        <div class="row col-xs-12">
          <div class="col-sm-6">
            <jo-str :async='true' desc='子服务' split-key='@' :str.sync='editData.subSers'></jo-str>
          </div>
          <jo-input label="服务介绍" sm="6">
            <textarea v-model='editData.serDesc' rows="4" class="form-control"></textarea>
          </jo-input>
        </div>
        <div class="col-sm-6">
          <jo-single-img :img.sync='editData.serImg' label='特权图片'></jo-single-img>
        </div>
        <div class="col-sm-6">
          <jo-single-img :img.sync='editData.serIcon' label='服务图标'></jo-single-img>
        </div>
        <!-- service price list -->
        <h3 class="col-xs-12">
            特权列表 
            <label class="text-info can-hover"> 是否特权? 
              <input type="checkbox" v-model='editData.isSp' :true-value="'1'" :false-value="'0'">
            </label>
        </h3>
        <div class="col-xs-12" v-if="editData.isSp==='1'" v-for='service in servicePriceList'>
          <h5 :class="{'text-success':service.isShow==='1'}">
            ### 会员类型 {{service.memberLevel}} ### 
              <label class="can-hover"> 该会员是否享有此服务 
                <input type="checkbox"  v-model='service.isShow' :true-value="'1'" :false-value="'0'">
              </label>
          </h5>
          <div v-if="service.isShow==='1'">
            <jo-input md='4' label='商品费' after='元'>
              <input v-model='service.serPrice' type="number" class="form-control">
            </jo-input>
            <jo-input md='4' label='服务费' after='元'>
              <input v-model='service.serCharge' type="number" class="form-control">
            </jo-input>
            <jo-input md='4' label='免费次数' after='次'>
              <input v-model='service.spCount' type="text" class="form-control">
            </jo-input>
            <jo-input label='标签' md='3'>
              <input v-model='service.label' type="text" class="form-control">
            </jo-input>
            <jo-input md='9' label='特权介绍'>
              <input v-model='service.serSketch' class="form-control" type="text">
            </jo-input>
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
  joStr,
} from 'jo'

import {
  vipService
} from 'api'
export default {
  props: ['show', 'mode', 'refreshList', 'selectedId'],
  components: {
    modal,
    joInput,
    joLoading,
    joSingleImg,
    joStr,
  },
  data() {
    return {
      editData: {
        isSp: '1'
      },
      servicePriceList: [],
      serviceCategoryList: [],
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
      /**只有在拥有特权时 将会员特权服务挂到编辑数据上*/
      this.editData.spInfos = this.servicePriceList
        /** 克隆发送对象*/
      let tmpData = Object.assign({}, this.editData)

      if (tmpData.isSp === '0') vipService.getSimple()
        .then(spInfos => {
          tmpData.spInfos = spInfos
          this.handleConfirm(tmpData)
        })
      if (tmpData.isSp === '1') {
        this.handleConfirm(tmpData)
      }
    },
    handleConfirm(tmpData) {
      if (this.isAdd) vipService.insertSerInfo(tmpData)
        .then(res => this.updateList('添加服务成功!'))
      if (this.isEdit) vipService.updateSerInfo(this.selectedId, tmpData)
        .then(res => this.updateList('更新服务成功'))
    }
  },
  asyncData(resolve, reject) {
    /** 获取会员等级 获取服务分类 */
    if (this.isAdd) Promise.all([vipService.getSimple(), vipService.getSerCate()])
      .then(([servicePriceList, serviceCategoryList]) => resolve({
        servicePriceList,
        serviceCategoryList
      }))
      /** 获取服务数据(含会员等级) 获取服务分类 */
    if (this.isEdit) Promise.all([vipService.getOneSerInfo(this.selectedId), vipService.getSerCate()])
      .then(([editData, serviceCategoryList]) => resolve({
        editData,
        servicePriceList: editData.spInfos,
        serviceCategoryList
      }))
  }
}
</script>
<style>
.can-hover {
  cursor: pointer;
}
</style>
