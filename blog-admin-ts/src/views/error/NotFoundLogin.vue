<template>
    <div class="loadingPage">
        <div class="loading">
            <h2>玩命加载中，请静静等待。。。</h2>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import { ElLoading } from "element-plus"
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

// const loding = ref(null)

// onBeforeMount(() => {
//     loding.value = ElLoading.service({
//         lock: true,
//         text: "玩命加载中",
//         background: 'rgba(0, 0, 0, 0.7)',
//     })
// })

onMounted(() => {
    const liet = router.getRoutes().map((item) => item.path)
    // console.log(liet)
    // console.log(route.fullPath, liet.includes(route.fullPath))
    if (liet.includes(route.fullPath)) router.replace(route.fullPath)
    else router.replace('/admin/404')
})

// onBeforeUnmount(() => {
//     loding.value.close()
// })
</script>

<style scoped>
.loadingPage {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-image: radial-gradient(
        ellipse 100% 100% at 300px 300px,
        #ffffff 10%,
        #ececec 40%,
        #95b3c7 100%
    );
}

.loadingPage h2 {
    color: #ccc;
    margin: 0;
    padding-top: 20%;
    font: 0.8em verdana;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.loading span {
    display: inline-block;
    vertical-align: middle;
    width: 0.6em;
    height: 0.6em;
    margin: 0.19em;
    background: #007db6;
    border-radius: 0.6em;
    animation: loading 1s infinite alternate;
}

.loading span:nth-of-type(2) {
    background: #008fb2;
    animation-delay: 0.2s;
}
.loading span:nth-of-type(3) {
    background: #009b9e;
    animation-delay: 0.4s;
}
.loading span:nth-of-type(4) {
    background: #00a77d;
    animation-delay: 0.6s;
}
.loading span:nth-of-type(5) {
    background: #00b247;
    animation-delay: 0.8s;
}
.loading span:nth-of-type(6) {
    background: #5ab027;
    animation-delay: 1s;
}
.loading span:nth-of-type(7) {
    background: #a0b61e;
    animation-delay: 1.2s;
}
.loading span:nth-of-type(8) {
    background: #a0b61e;
    animation-delay: 1.4s;
}
.loading span:nth-of-type(9) {
    background: #a0b61e;
    animation-delay: 1.6s;
}
.loading span:nth-of-type(10) {
    background: #a0b61e;
    animation-delay: 1.8s;
}

/*
    * Animation keyframes
    * Use transition opacity instead of keyframes?
    */
@keyframes loading {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
