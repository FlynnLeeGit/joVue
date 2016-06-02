<template>
  <input readonly @click.stop='openDatePanel' type="text" v-model='value' class="form-control date-input" :placeholder="ph">
  <span @click="resetDate" class="input-group-addon reset-time">&times;</span>
  <div @click.stop v-if='show' class="date" :style='dateStyle'>
    <div>
      <p class="text-center">
        <button @click='this.month-=1' class="btn btn-xs btn-default">
          <--</button>
            <strong>{{year}}-{{month}}-{{date}}</strong>
            <button @click='this.month+=1' class="btn btn-xs btn-default">--></button>
      </p>
      <span class="day-number" v-for='day in dayArr'>{{day}}</span>
      <button @click='date=$index+1' :style="{marginLeft:getMarginLeft($index)}" v-for='n in getMonthLen(year,month-1)' :class="{'date-number':true,'active':$index+1===date}">{{n+1}}</button>
      <p @click='setToday' class="text-center text-primary today">设定到现在</p>
    </div>
    <div v-show='!noTime'>
      <select v-model='hour' class="form-control select">
        <option :value='h' v-for='h in 24'>{{h}}点</option>
      </select>
      <select v-model='min' class="form-control select">
        <option :value='m*5' v-for='m in 12'>{{m*5}}分</option>
      </select>
    </div>
    <p class="text-center">
      <button @click='confirmValue' class="btn btn-block btn-sm btn-primary">确认时间</button>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      required: true
    },
    ph: {
      type: String,
      default: 'Pick Date'
    },
    noTime: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeValue: this.value || `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00`,
      show: false,
      dayArr: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  methods: {
    setToday() {
      let tmpDate = new Date()
      let year = tmpDate.getFullYear()
      let month = tmpDate.getMonth() + 1
      let date = tmpDate.getDate()
      let hour = tmpDate.getHours()
      let min = 0
      this.updateTimeValue(year, month, date, hour, min)
    },
    resetDate() {
      this.value = ''
      this.setToday()
    },
    confirmValue() {

      this.value = this.timeValue
      if (this.noTime) this.value = this.timeValue.split(' ')[0]
      this.show = false
    },
    format(num) {
      if (num < 10) return '0' + num
      return '' + num
    },
    updateTimeValue(year, month, date, hour, min) {
      this.timeValue = `${this.format(year)}-${this.format(month)}-${this.format(date)} ${this.format(hour)}:${this.format(min)}`
    },
    openDatePanel() {
      this.show = true
      const clickLayer = () => {
        this.show = false
      }
      document.addEventListener('click', clickLayer, false)
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
        let tmpDate = new Date(this.year, this.month - 1, 1)
        return 30 * tmpDate.getDay() + 'px'
      }
    }
  },
  computed: {
    year: {
      set: function(newYear) {
        this.updateTimeValue(newYear, this.month, this.date, this.hour, this.min)
      },
      get: function() {
        return +this.timeValue.split(' ')[0].split('-')[0]
      }
    },
    month: {
      set: function(newMonth) {
        if (newMonth > 12) {
          newMonth = 1
          this.year += 1
        }
        if (newMonth < 1) {
          newMonth = 12
          this.year -= 1
        }
        this.updateTimeValue(this.year, newMonth, this.date, this.hour, this.min)
      },
      get: function() {
        return +this.timeValue.split(' ')[0].split('-')[1]
      }
    },
    date: {
      set: function(newDate) {
        this.updateTimeValue(this.year, this.month, newDate, this.hour, this.min)
      },
      get: function() {
        return +this.timeValue.split(' ')[0].split('-')[2]
      }
    },
    hour: {
      set: function(newHour) {
        this.updateTimeValue(this.year, this.month, this.date, newHour, this.min)
      },
      get: function() {
        return +this.timeValue.split(' ')[1].split(':')[0]
      }
    },
    min: {
      set: function(newMinute) {
        this.updateTimeValue(this.year, this.month, this.date, this.hour, newMinute)
      },
      get: function() {
        return +this.timeValue.split(' ')[1].split(':')[1]
      }
    }
  }
}
</script>
<style lang='sass' scoped>
.reset-time {
  cursor: pointer;
}

.date {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  box-sizing: content-box;
  outline: 1px solid lightgrey;
  width: 210px;
  padding: 10px 20px;
  box-shadow: 2px 2px 10px #333;
  .day-number {
    width: 30px;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    height: 30px;
  }
  .date-number {
    text-align: center;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border: 0;
    outline: 0;
    &:hover {
      background-color: lightgrey;
      border-radius: 5px;
    }
    &.active {
      background-color: #337ab7;
      color: #fff;
      border-radius: 5px;
    }
  }
  .select {
    width: 49%;
    display: inline;
  }
  .today {
    cursor: pointer;
  }
  .btn-area>.btn {
    margin: 5px 10px -10px 10px;
  }
}
</style>
