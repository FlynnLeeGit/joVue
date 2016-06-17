<template>
  <div>
    <!-- {{typeData|json}} -->
    <!-- 删除{{deletedTypeData|json}} -->
    <div class="row" v-for='t in typeData'>
      <div class="col-xs-12">
        <div>
          <label>-----场次{{sessionIndex+1}}票型{{$index+1}}-----</label>
          <button @click='delType($index)' class="btn btn-danger btn-sm">删除场次{{sessionIndex+1}}票型{{$index+1}}</button>
        </div>
        <jo-input label='标签内容' sm='5'>
          <input v-model='t.labelContent' type="text" class="form-control" placeholder="例(内场票)">
        </jo-input>
        <jo-input label='库存数量' sm='4'>
          <input v-model='t.stockNum' type="number" class="form-control">
        </jo-input>
        <event-session-member-price :member-price-data='t.eventPrice'></event-session-member-price>
      </div>
      <p></p>
    </div>
    <button @click='addType' class="btn btn-sm btn-success">添加场次{{sessionIndex+1}}票型</button>
  </div>
</template>
<script>
import {
  joInput
} from 'jo'
import eventSessionMemberPrice from './_eventSessionMemberPrice'

export default {
  props: {
    typeData: {
      type: Array,
      required: true
    },
    sessionIndex: {
      type: Number,
    },
    deleteType: {
      type: Array,
    }
  },
  components: {
    joInput,
    eventSessionMemberPrice
  },
  methods: {
    // 增加票型 写入eventPrice数组 使用深拷贝
    addType() {
      let cloneEventPriceList = this.$parent.eventPriceList.map(priceObj => Object.assign({}, priceObj))
      this.typeData.push({
        eventPrice: cloneEventPriceList
      })
    },
    delType($index) {
      let deletedItem = this.typeData.splice($index, 1)[0]
      if (deletedItem.typeLabelId) this.deleteType.push(deletedItem.typeLabelId)
    }
  },

}
</script>
