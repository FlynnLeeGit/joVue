<template>
  <div>
    <h3 class="calendar-title">
    	<button @click='monthLeft' class="btn btn-default">
      		<i class="fa fa-arrow-left"></i>上一月
    	</button>
    	<span>{{searchMonth}}</span>
    	<button @click='monthRight' class="btn btn-default">
    		<i class="fa fa-arrow-right"></i>下一月
    	</button>
    </h3>
    <ul class="list-group">
      <!-- 星期几 -->
      <li class="list-group-item day text-center text-primary" v-for='dayName in dayArr'>{{dayName}}</li>
      <!-- 显示每一天 -->
      <li v-for='d in getMonthLen(nowYear,nowMonth-1)' :style="{marginLeft:getMarginLeft($index)}" class="list-group-item day">
        {{calc(d+1)}}日
        <div v-for='stock in getStockList(d+1)'>
          <span class="text-warning">{{stock.labelContent}}</span>
          <input type="text" class="form-control input-sm" v-model='stock.stockNum'>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import joInput from './joInput'
import joSplit from './utils/joSplit'
export default {
  props: {
    data: Object,
  },
  components: {
    joInput
  },
  data() {
    return {
      dayArr: ['日', '一', '二', '三', '四', '五', '六'],
      nowYear: new Date().getFullYear(),
      nowMonth: new Date().getMonth() + 1,
    }
  },
  methods: {
    calc(num) {
      return num < 10 ? '0' + num : num
    },
    monthLeft() {
      if (this.nowMonth > 1) {
        this.nowMonth -= 1
      } else {
        this.nowMonth = 12
        this.nowYear -= 1
      }
    },
    monthRight() {
      if (this.nowMonth < 12) {
        this.nowMonth += 1
      } else {
        this.nowMonth = 1
        this.nowYear += 1
      }
    },
    getMonthLen(year, month) {
      let monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
        monthArr[1] = 29
      }
      return monthArr[month]
    },
    getMarginLeft(index) {
      if (index === 0) {
        let tmpDate = new Date(this.nowYear, this.nowMonth - 1, 1)
        return `${14.285*new Date(tmpDate).getDay()}%`
      }
    },
    getStockObj(day) {
      return this.data[this.searchMonth + '-' + this.calc(day)]
    },
    getStockList(day) {
      let stockObj = this.getStockObj(day)
      return stockObj ? stockObj.stockList : {}
    },

  },
  computed: {
    searchMonth() {
      return this.nowYear + '-' + this.calc(this.nowMonth)
    }
  }
}
</script>
<style scoped>
.day {
  float: left;
  width: 14.285%;
}

.calendar-title {
  display: flex;
  justify-content: space-around;
}
</style>
