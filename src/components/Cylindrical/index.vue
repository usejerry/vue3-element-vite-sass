<template>
    <div id="cylindrical">
        
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted} from 'vue'
function getEcharts3DBar (xAxisData, data, colorType) {
    var colorArr = [];
    if (colorType == '01') {
        colorArr = ["#2886c6", "#50bfda", "#89e3ec"];
    } else {
        colorArr = ["#28c1c6", "#50dac0", "#87e8c7"];
    }
    var color = {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
            {
            offset: 0,
            color: colorArr[0],
            },
            {
            offset: 0.5,
            color: colorArr[0],
            },
            {
            offset: 0.5,
            color: colorArr[1],
            },
            {
            offset: 1,
            color: colorArr[1],
            },
        ],
    };
    var barWidth = 30;
    var constData = [];
    var showData = [];
    data.filter(function (item) {
    if (item) {
        constData.push(1);
        showData.push(item);
    } else {
        constData.push(0);
        showData.push(
         {
            value: 1,
            itemStyle: {
              normal: {
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 2,
                color: "rgba(0,0,0,0)",
              },
            },
         }
        );
    }
    });
    return {
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
            var str = params[0].axisValue + "：";
            params.filter(function (item) {
                if (item.componentSubType == "bar") {
                str += "<br/>" + item.seriesName + "：" + item.value;
                }
            });
            return str;
            },
        },
        grid: {
            left: "3%", //图表距边框的距离
            right: "3%",
            top: "15%",
            bottom: "5%",
            containLabel: true,
        },
        xAxis: {
            data: xAxisData,
            axisTick: {
            show: false,
            },
        },
        yAxis: {
            axisTick: {
            show: true,
            },
            axisLine: {
            show: true,
            },
            axisLabel: {
            show: true,
            },
        },
        series: [
            {
	            z: 1,
	            name: '数据',
	            type: "bar",
	            barWidth: barWidth,
	            barGap: "0%",
	            data: data,
	            itemStyle: {
	                normal: {
	                color: color,
	                },
	            },
            },
            {
	            z: 2,
	            name: '数据',
	            type: "pictorialBar",
	            data: constData,
	            symbol: "diamond",
	            symbolOffset: ["0%", "50%"],
	            symbolSize: [barWidth, 10],
	            itemStyle: {
	                normal: {
	                color: color,
	                },
	            },
	            tooltip: {
	                show: false,
	            },
            },
            {
	            z: 3,
	            name: '数据',
	            type: "pictorialBar",
	            symbolPosition: "end",
	            data: showData,
	            symbol: "diamond",
	            symbolOffset: ["0%", "-50%"],
	            symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
	            itemStyle: {
	                normal: {
	                borderColor: colorArr[2],
	                borderWidth: 2,
	                color: colorArr[2],
	                },
	            },
	            tooltip: {
	                show: false,
	            },
            },
        ],
    };
}

onMounted(() => {
    let cylindrical = echarts.init(document.getElementById('cylindrical'))
    console.log(cylindrical)
    cylindrical.setOption(getEcharts3DBar(['服务1', '服务2', '服务3', '服务4', '服务5'], [5, 36, 10, 20, 15], '01'))
})
</script>

<style lang="scss" scoped>
#cylindrical{
    width: 100%;
    height: 100%;
}
</style>