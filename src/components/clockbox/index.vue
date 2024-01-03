<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { getClickInfo, appendClickInfo } from '../../api/data.js'

let heatMap = ref(null)

let totalTime = ref(0)
let clockInfo = ref([])
let name = ref('打卡热力图')
let time = ref(0)
let submitFlag = ref(false)


const last10DayClockTime = () => {
  let arry = clockInfo.value
  let total = 0
  const today = dayjs().subtract(10, 'day')
  for (const item of arry) {
    if (dayjs(item[0]).isAfter(today)){
      total += item[1]
    }
  }
  return total/10
}
const initClockData = async () => {
  const data = await getClickInfo()
  let setMap = {}
  let list = []
  for (const item of data) {
    totalTime.value = totalTime.value + item.num
    if (setMap[item.clockInDate]) {
      let sm = setMap[item.clockInDate]
      sm.num += item.num
      list[sm.index] = [sm.clockInDate, sm.num]
    } else {
      list.push([item.clockInDate, item.num])
      setMap[item.clockInDate] = Object.assign({}, item, {index: list.length - 1})
    }
  }
  clockInfo.value = list
  return list
}
const todayClock = () => {
  const today = dayjs().format('YYYY-MM-DD')
  let arry = clockInfo.value
  let total = 0
  for (const item of arry) {
    if (dayjs(item[0]).format('YYYY-MM-DD') === today){
      total += item[1]
    }
  }
  return total
}
const initRange = () => {
  const start = dayjs().subtract(1, 'year').format('YYYY-MM-DD')
  const end = dayjs().format('YYYY-MM-DD')
  return [start, end]
}
const appendInfo = async () => {
  if (!time.value || submitFlag.value) {
    return
  }
  submitFlag.value = true
  await appendClickInfo(time.value)
  alert('提交成功')
  submitFlag.value = false
}

onMounted(async () => {
  const myChart = echarts.init(heatMap.value)
  myChart.setOption({
    tooltip: {
      formatter: function (params) {
        return `${params.value[0]}学习了${params.value[1]}h`
      }
    },
    title: {
      left: 'center',
      text: '打卡记录'
    },
    visualMap: {
      min: 0,
      max: 5,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      inRange: {
        color: ['#B4CE72','#85BA92', '#8FB802', '#217633', '#627F66'],
      }
    },
    monthLabel: {
      nameMap: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
      ]
    },
    dayLabel: {
      firstDay: 7,
      nameMap: 'ZH'
    },
    calendar: {
      itemStyle: {
        color: '#f3f4f7',
        borderWidth: 1,
        borderColor: '#fff'
      },
      splitLine: true,
      cellSize: [15, 15],
      range: initRange(),
      yearLabel: { show: false }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: await initClockData()
    }
  })
})
</script>

<template>
  <div class="box">
    <p>{{ name }}</p>
    <div ref="heatMap" class="about"></div>
    <div class="infoBox">
      <div>
        <p>今日打卡时长：{{todayClock()}}小时</p>
        <p>最近10天打卡时间平均数(小时): {{last10DayClockTime()}}</p>
        <p>打卡总时间(小时): {{totalTime}}</p>
        <p>打卡总天数: {{clockInfo.length}}</p>
      </div>
      <div class="inputbox">
        <button @click="appendInfo"><input type="number" v-model="time"> 新增打卡记录</button>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.infoBox{
  display: flex;
  justify-content: space-between;
  padding: 0 1.3rem;
}
.inputbox {
  margin-right: 4.5rem;
  input {
    margin-right: 12px;
    width: 60px;
    height: 35px;
    border: none;
  }

  button {
    background-color: #74d2e7;
    height: 50px;
    border-radius: .3rem;
    border: none;
    padding: 0 0.8rem;
  }
}

.box {
  width: 100%;

  p {
    width: 281px;
    height: 19px;
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    color: #777777;
    margin: 5px 0 10px 21px;
  }
}

.about {
  width: 1000px;
  height: 230px;
}
</style>
