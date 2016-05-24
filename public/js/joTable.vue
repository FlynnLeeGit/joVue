<template>
  <div>
    <!-- {{option|json}} -->
    <!-- {{data|json}} -->
    {{callback}}
    <div :class="{'table-responsive':true,'nowrap':option.nowrap}">
      <table class="table table-hover table-bordered table-condensed">
        <tr>
          <th v-for='col in option.columns' class="text-center text-info">
            {{col.th}}
          </th>
        </tr>
        <tbody>
          <tr @click='trclick($event,row)' :class="{'success':isActive(row)}" v-for="row in data |orderByChs option.orderBy option.asc |filterBy searchValue in searchField | limitPage pageCount startPage">
            <td v-for='col in option.columns'>
              <div v-if='col.convert' class="text-center">
                {{{col.convert(row[col.field])}}}
              </div>
              <div v-if='col.merge'>
                {{multiFields(row,col)}}
              </div>
              <div v-if='!col.convert && !col.merge'>
                {{row[col.field]}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页开始 -->
    <div class="pagination-wrap text-center">
      <ul class="pagination">
        <li @click='startPage-=1' :class="{disabled:startPage<=0}">
          <a href="javascript:;">
            <span>&laquo;Pres</span>
          </a>
        </li>
        <li @click='startPage=$index' v-for='num in totalPage' :class="{active:startPage===$index}">
          <a href="javascript:;">{{num+1}}</a>
        </li>
        <li @click='startPage+=1' :class="{disabled:startPage>=totalPage-1}">
          <a href="javascript:;">
            <span>Next&raquo;</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <select @change='startPage=0' v-model='pageCount'>
              <option value="5">5条/页</option>
              <option value="10">10条/页</option>
              <option value="15">15条/页</option>
              <option value="20">20条/页</option>
              <option value="25">25条/页</option>
            </select>
            <!-- 共{{data?data.length || 0}}条 -->
          </a>
        </li>
      </ul>
    </div>
    <!-- 分页区结束 -->
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
      coerce(val) {
        return val ? val : []
      }
    },
    option: {
      type: Object,
      required: true
    },
    searchField: String,
    searchValue: String,
  },
  data() {
    return {
      startPage: 0,
      pageCount: 10
    }
  },
  methods: {
    trclick($event, row) {
      this.$dispatch('trclick', $event, row, $event.target.dataset.type)
    },
    multiFields(row, col) {
      if (col.field.indexOf('@') !== -1) { // 多字段拼接方法
        let fieldArr = col.field.split('@') // 字段分割
        let colArr = fieldArr.map((v) => row[v]) // 获取字段值
        return col.merge(...colArr) // 执行拼接回调
      } else {
        return row[col.field]
      }
    },
    isActive(row) {
      if (this.option.activeField) {
        return row[this.option.activeField] === this.option.activeValue
      }
    }
  },
  computed: {
    totalPage() { // 总页数计算
      return Math.ceil(this.data.length / this.pageCount)
    }
  },
  watch: {
    startPage(nowPage) { // 不能超限选取页码
      if (nowPage >= this.totalPage) this.startPage = this.totalPage - 1
      if (nowPage <= 0) this.startPage = 0
    },
    data(newData, oldData) {
      if (newData.length !== oldData.length) this.startPage = 0
    }
  }
}
</script>
<style lang="sass">
.nowrap>.table>tbody>tr>td,
.nowrap>.table>tbody>tr>th,
.nowrap>.table>tfoot>tr>td,
.nowrap>.table>tfoot>tr>th,
.nowrap>.table>thead>tr>td,
.nowrap>.table>thead>tr>th {
  white-space: nowrap;
}
</style>
