<template>
	<router-view v-slot="{ Component }">
		<transition name="fade">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script setup>
import { onBeforeMount } from 'vue'
// import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user.store'

// 全局样式
import '@/components/global.css'
import 'element-plus/dist/index.css'

// const route = useRoute()
const userInfo = useUserStore()


onBeforeMount(async () => {
	await userInfo.initState()
	// if (result && route.path === '/admin/login') location.replace('/admin/home')
})
</script>

<style scoped>
</style>
