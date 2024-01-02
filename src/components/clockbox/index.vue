<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import {getClickInfo} from '../../api/data.js'


let heatMap = ref(null)
let name = ref('打卡热力图')

const initClockData = async ()=>{
  const data = await getClickInfo();
  console.log(data)
  return data
}

const initRange = ()=>{
  const start = dayjs().subtract(1, 'year').format('YYYY-MM-DD')
  const end = dayjs().format('YYYY-MM-DD')
  return [start, end]
}

onMounted(() => {
  const myChart =  echarts.init(heatMap.value)
  myChart.setOption({
    tooltip: {
      formatter: function (params) {
        return params.value[0] + ' : ' + params.value[1]
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 5,
      inRange: {
        color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127', '#196127']
      }
    },
    calendar: {
      itemStyle: {
        color: '#ccc',
        borderWidth: 3,
        borderColor: '#fff'
      },
      cellSize: ['auto', 13],
      range: initRange(),
      splitLine: true,
      dayLabel: {
        firstDay: 7,
        nameMap: 'ZH'
      },
      monthLabel: {
        nameMap: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
        ]
      },
      yearLabel: {
        show: false
      },
      silent: {
        show: false
      }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: initClockData()
    }
  })
})
</script>

<template>
  <div class="box">
    <p>{{ name }}</p>
    <div ref="heatMap" class="about"></div>
  </div>
</template>


<style lang="less" scoped>
.box {
  width: 37.6875rem;
  height: 11.5625rem;
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
  width: 37.6875rem;
  height: 11.5625rem;
}
</style>
