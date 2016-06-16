<template>
  <div>
    <!-- {{priceData|json}} -->
    <div class="row">
      <div class="col-xs-2">
        <button @click='addCol' class="pull-right btn btn-success btn-sm" style='margin-top:30px' class="">添加一列</button>
        <button @click='delCol' class="pull-right btn btn-danger btn-sm" style='margin-top:30px' class="">删除最后一列</button>
      </div>
      <div class="col-xs-9">
        <button @click="addRow" class="btn btn-success btn-sm">添加一行</button>
        <table class="table table-bordered ">
          <tr v-for='row in priceData' track-by='$index'>
            <td v-for='item in row' track-by='$index'>
              <input class="form-control " type="text" placeholder="typeSomething" v-model='item'>
            </td>
          </tr>
        </table>
        <button class="btn btn-danger btn-sm" @click='priceData.pop()'>删除最后一行</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    priceData: {
      type: Array,
      required: true,
    }
  },
  methods: {
    addCol() {
      this.priceData.forEach(row => {
        row.push('')
      })
    },
    delCol() {
      this.priceData.forEach(row => {
        row.pop()
      })
    },
    addRow() {
      if (this.priceData[0]) {
        let len = this.priceData[0].length
        let tmpArr = []
        for (let i = 0; i < len; i++) {
          tmpArr.push('')
        }
        this.priceData.push(tmpArr)
      } else {
        this.priceData.push([''])
      }
    }
  }
}
</script>
<style scoped>
td {
  max-width: 50px;
}
</style>
