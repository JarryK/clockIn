<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
onMounted(async () => {
  console.log(user)
  console.log(user.userName);
})
</script>

<template>
  <div class="box">
    <p>{{ name }}</p>
    <div ref="heatMap" class="about"></div>
    <div class="infoBox">
     
    </div>
  </div>
</template>


<style lang="less" scoped>

</style>
