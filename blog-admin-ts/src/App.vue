<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
// import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user.store.ts'

// 全局样式
import 'element-plus/dist/index.css'
import '@/components/global.css'

// const route = useRoute()
const userInfo = useUserStore()

onBeforeMount(async () => {
    await userInfo.initState()
    // if (result && route.path === '/admin/login') location.replace('/admin/home')
})
</script>

<style>
/* @import './components/global.css'; */
</style>
