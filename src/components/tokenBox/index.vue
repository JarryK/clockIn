<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/com'


onMounted(async () => {
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

</style>
