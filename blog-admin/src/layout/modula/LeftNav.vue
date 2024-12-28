<template>
    <el-aside class="left-nav-aside" :class="{ win250: lefState, win80: !lefState }">
        <div class="left-nav">
            <div class="left-nav-header">
                <span v-show="lefState">YFAdmin</span>
            </div>
            <div class="left-content">
                <el-scrollbar>
                    <el-menu
                        :default-active="menuActive"
                        :collapse="!lefState"
                        :router="true"
                        class="el-menu-vertical-demo">
                        <template v-for="item in listData">
                            <el-sub-menu v-if="item.children && item.children.length" :index="('/admin' + item.path)" :key="item.path">
                                <template #title>
                                    <el-icon v-if="item.iconType">
                                        <component :is="item.iconType" />
                                    </el-icon>
                                    <span>{{ item.title }}</span>
                                </template>
                                <el-menu-item v-for="cItem in item.children" :index="('/admin' + citem.path)" :key="cItem.path">{{ cItem.title }}</el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="('/admin' + item.path)" :key="(item.path + 1)">
                                <el-icon v-if="item.iconType">
                                    <component :is="item.iconType" />
                                </el-icon>
                                <template #title>{{ item.title }}</template>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </el-scrollbar>
            </div>
        </div>
    </el-aside>
</template>

<script setup>
import { reactive, onMounted, computed, defineProps, watchEffect, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user.store'
import { getRouterList } from '@/api/login'

const route = useRoute()
const userInfo = useUserStore()
const { lefState } = defineProps({
    lefState: Boolean
})

const loadData = reactive({
    route: []
})

const menuActive = computed(() => {
    return route.path
})

const listData = computed(() => loadData.route)

// watch(() => userInfo.info.id, (value) => {
//     console.log(userInfo.info.id)
//     if (!value) return
//     getRouterList(userInfo.info.id)
//     .then(data => {
//         if (!data) return 
//         const list = data.result.filter(item => {
//             // console.log(`${item.title}---> range:${item.range},menu:${item.menu},${item.range === 0 && item.menu === 1}`)
//             return item.range === 0 && item.menu === 1
//         })
//         loadData.route = [ ...list ]
//     })
// })

onMounted(() => {
    getRouterList(userInfo.info.id)
    .then(data => {
        if (!data) return 
        const list = data.result.filter(item => {
            // console.log(`${item.title}---> range:${item.range},menu:${item.menu},${item.range === 0 && item.menu === 1}`)
            return item.range === 0 && item.menu === 1
        })
        loadData.route = [ ...list ]
    })
})
</script>

<style scoped>
.left-nav{
    /* display: flex; */
    width: calc(100% - 40px) !important;
    height: calc(100% - 40px) !important;
    background-color: #fff;
    border-radius: 15px;
    margin: 10px;
    padding: 10px;
    box-shadow: 2px 2px 10px rgba(0,0,0,.25);
}
.left-nav-header {
    height: 40px;
}
.left-content {
    height: calc(100% - 40px);
    border-top: 1px solid rgb(205, 230, 238);
}
.left-content .el-menu{
    border-right: none;
}
.left-nav-header{
    padding-left: 40px;
    margin-bottom: 15px;
    line-height: 40px;
    font-size: 30px;
    font-weight: bold;
    font-style: italic;
    color: #13a3ed;
    background-image: url('/src/assets/logo.png') ;
    background-size: contain ;
    background-repeat: no-repeat;
    /* border-bottom: 1px solid #333; */
}
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */
.left-nav-aside{
    transition: all .3s;
}
.win250{
    width: 250px !important;
}
.win80{
    width: 100px !important;
}
</style>
