<template>
    <el-card class="home" body-style="height: calc(100% - 104px);">
        <template #header>
            <h2>数据粗略统计 <el-button @click="loadData">刷新</el-button></h2>
        </template>
        <div class="echartsDom" ref="chartDom"></div>
    </el-card>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useAxios } from "@/hooks/useAxios"
import * as echarts from 'echarts';


const { get } = useAxios()
var chartDom = ref(null)
var myChart = ref(null);
const initChart = () => {
    if (!chartDom.value) return;
    myChart.value = echarts.init(chartDom.value);
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    }
    myChart.value.setOption(option);
};


const loadData = async () => {
    const { statusCode ,result } = await get("/Visit/Get")
    if (statusCode == 200 && result && result.length) {
        const date = result.map(itme => itme.date)
        const count = result.map(itme => itme.count)
        myChart.value.setOption({
            xAxis: {
                // type: 'category',
                data: date,
                // axisTick: {
                //     alignWithLabel: true
                // }
            },
            series: {
                data: count
            }
        })
    }
}


onMounted(() => {
    initChart()
    nextTick(() => loadData())
})

</script>

<style scoped>
.home{
    min-width: 480px;
    height: calc(100% - 2px);
}

.echartsDom {
    width: 100%;
    height: 100%;
}
</style>