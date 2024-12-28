<template>
	<div id="login-and-register">
		<div class="conetent">
			<Register v-if="route.path === '/admin/register'" :class="animatloginRight"/>
			<div class="headline" :class="[animatLoginLeft]">
				<div class="left-title">
					<h3>{{ route.path === '/admin/login' ? 'Login' : 'Register' }}</h3>
					<i></i>
				</div>
				<img class="headline-img" src="../../assets/login_dn.png">
				<div
					@click="routePush"
					class="change-router">
					<i v-if="route.path === '/admin/login'">⇚</i>
					<span>to {{ route.path === '/admin/login' ? 'register' : 'login' }}</span>
					<i v-if="route.path === '/admin/register'">⇛</i>
				</div>
			</div>
			<Login v-if="route.path === '/admin/login'" :class="animatloginRight"/>
		</div>
		<div class="blue-background" :class="{ 'blue-background-left': route.path === '/admin/login','blue-background-right': route.path === '/admin/register' }"></div>
		<div class="ball color-ball-1" :class="[colorball1]"></div>
		<div class="ball color-ball-2" :class="[colorball2]"></div>
		<div class="ball color-ball-3" :class="[colorball3]"></div>	
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useSetAnimation } from './hooks/useSetAnimation'
import Register from './modular/Register.vue'
import Login from './modular/Login.vue'


const route = useRoute()
const router = useRouter()

// 动画效果
const { 
        animatLoginLeft,
        animatloginRight,
        colorball1,
        colorball2,
        colorball3,
        changeCss } = useSetAnimation()

const routePush = () => {
	const url = route.path === '/admin/login' ? '/admin/register' : '/admin/login'
	router.push(url)
	changeCss(url)
}

</script>

<style scoped>
@import './login.css';
</style>
