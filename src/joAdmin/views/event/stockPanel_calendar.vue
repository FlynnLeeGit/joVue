<template>
  <div>
    <!-- {{data|json}} -->
    <h3 class="calendar-title">
    	<button @click='monthLeft' class="btn btn-default">
      		<i class="fa fa-arrow-left"></i>上一月
    	</button>
    	<span>{{searchMonth}}</span>
    	<button @click='monthRight' class="btn btn-default">
    		<i class="fa fa-arrow-right"></i>下一月
    	</button>
    </h3> {{shouldUpdateStock|json}}
    <ul class="list-group">
      <!-- 星期几 -->
      <li class="list-group-item day text-center text-primary" v-for='dayName in dayArr'>{{dayName}}</li>
      <!-- 显示每一天 -->
      <li v-for='d in getMonthLen(nowYear,nowMonth-1)' :style="{marginLeft:getMarginLeft($index)}" :class="['list-group-item','day',getStockObj(d+1).stockList?'':'invalidCls']">
        <label>{{d+1}}</label>
        <!-- 切换当天是否有效 -->
        <button v-if='getStockObj(d+1).stockList' @click='changeStockStatus(getStockObj(d+1))' :class="['btn','btn-xs','pull-right', isValid(d+1)?'btn-info':'']">{{isValid(d+1)?'有效':'无效'}}</button>
        <div v-else>
          活动不支持此日期
        </div>
        <!-- 票务库存 -->
        <div v-for='ticket in getStockObj(d+1).stockList'>
          <calendar-ticket :ticket-data='ticket' :callback='updateTicket'></calendar-ticket>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {
  joInput,
  joSplit
} from 'jo'
import calendarTicket from './stockPanel_calendar_ticket'
export default {
  props: {
    data: Object,
    // 用来存储需要升级的stock对象
    updateArray: Array
  },
  components: {
    joInput,
    calendarTicket
  },
  data() {
    return {
      dayArr: ['日', '一', '二', '三', '四', '五', '六'],
      nowYear: new Date().getFullYear(),
      nowMonth: new Date().getMonth() + 1,
    }
  },
  methods: {
    changeStockStatus(stockObj) {
      // 更新所有ticket的状态
      stockObj.stockList.forEach(item => {
        item.stockStatus = item.stockStatus === '1' ? '0' : '1'
      })
    },
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
    updateTicket(newTicket) {
      // upsert 操作  普通的操作不用写因为对象对内存的引用关系
      if (this.updateArray.indexOf(newTicket) === -1) {
        this.updateArray.push(newTicket)
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
    getStockDay(day) {
      return this.searchMonth + '-' + this.calc(day)
    },
    getStockObj(day) {
      return this.data[this.getStockDay(day)] || {}
    },
    isValid(day) {
      let s = this.getStockObj(day).stockList
      if (s) {
        return s.every(item => item.stockStatus === '1')
      }
      return false
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

.invalidCls {
  background: #888;
  color: #fff;
  ;
}
</style>
