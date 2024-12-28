<template>
    <div class="global-layout">
        <el-container>
            <LeftNav :lefState="lefState" />
            <el-container>
                <el-header>
                    <Header :lefState="lefState" @changeLfState="changeLfState"></Header>
                </el-header>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <component class="el-main-animation" :is="Component" />
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import LeftNav from './modula/LeftNav.vue'
import Header from './modula/Header.vue'

const lefState = ref(true)

const changeLfState = (value) => {
    lefState.value = value
}

</script>

<style scoped>
.global-layout {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
	background-image: radial-gradient(ellipse 100% 100% at 50%  120%, #e4f0f7 10%, #eee6e6 40%, #bbd7eb 100%);
}

.global-layout > .el-container {
    height: 100vh;
}

.el-main{
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, .5);
    padding: 0px !important;
    margin: 20px;
    overflow-x: hidden;
}


.el-main-animation{
    animation-name: fade-out-main;
    animation-duration: .3s;
}

@keyframes fade-out-main {
    0%{
        transform: translateX(300px);
        opacity: 0;
    }
    80%{
        /* transform: translateX(200px); */
        opacity: .3;
    }
    100%{
        transform: translateX(0);
        opacity: 1;
    }
}


</style>
