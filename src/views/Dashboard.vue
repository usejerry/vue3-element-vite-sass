<template>
    <div class="dashboard_wrapper">
        <div id="Mychart" class="Mychart"></div>
        <div class="tianq">
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import {toRefs,reactive, onMounted} from 'vue'
import { useStore } from 'vuex'
onMounted(()=>{
    let mychart = echarts.init(document.getElementById('Mychart'))
    let data = {
          xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
    }
    // mychart.setOption(data)
})
</script>

<style lang="scss" scoped>
.dashboard_wrapper{
    width: 100%;
    height: 100%;
    .Mychart{
        width: 500px;
        height: 500px;
    }
}
</style>
