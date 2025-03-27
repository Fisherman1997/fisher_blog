<template>
    <div id="custom-image" :class="{ 'sign-out-animation': !visible }">
        <span class="sign-out" @click="close">x</span>
        <img
            class="img"
            ref="image"
            @mousewheel="zoom"
            @mousedown="down"
            :src="url"
            @dblclick="close"
            :style="`transform: scale(${imgHeight.scale}) translateY(${imgHeight.Y}px) translateX(${imgHeight.X}px)`"
            alt="图片"/>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, unref, reactive } from 'vue'

// 定义 imgHeight 对象的类型
interface IImgHeight {
    scale: number
    value?: number
    X: number
    Y: number
}

const image = ref()
const imgHeight = reactive<IImgHeight>({
    scale: 1,
    X: 0,
    Y: 0,
})
const { url, visible } = defineProps({
    url: { type: String, default: '' },
    visible: { type: Boolean, default: true },
})

// console.log(scopedSlots)
const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}
// const keyup = () => {
//     console.log(12345)
// }

// 扩展 MouseEvent，增加 wheelDelta 属性（注意该属性在部分浏览器中可能不存在）
interface CustomMouseEvent extends MouseEvent {
    wheelDelta?: number
}

// zoom 方法：根据滚轮方向改变 imgHeight.scale
const zoom = (ev: CustomMouseEvent): void => {
    if (ev.wheelDelta && ev.wheelDelta > 0) {
        imgHeight.scale += 0.05
        // console.log('+ ->>>', imgHeight.value);
    } else {
        imgHeight.scale -= 0.05
        // console.log('- ->>>', imgHeight.value);
    }
}

// down 方法：处理鼠标按下及拖动，完成拖动结束后的惯性效果
const down = (ev: MouseEvent): void => {
    // 调用 preventDefault() 方法阻止默认事件
    ev.preventDefault()

    // 将 ev.target 断言为 HTMLElement，以便使用 onmousemove 和 onmouseup 属性
    const dom = ev.target as HTMLElement

    const strX: number = ev.clientX
    const strY: number = ev.clientY
    let nowX: number, nowY: number

    // 注册鼠标移动事件，更新 imgHeight 的 X、Y 值
    dom.onmousemove = (ev: MouseEvent): void => {
        nowX = ev.clientX
        nowY = ev.clientY
        imgHeight.X = nowX - strX
        imgHeight.Y = nowY - strY
    }

    // 注册鼠标松开事件，清理事件并启动惯性效果
    dom.onmouseup = (): void => {
        dom.onmousemove = null
        dom.onmouseup = null
        const timer: number = window.setInterval((): void => {
            if (imgHeight.X === 0 && imgHeight.Y === 0) {
                clearInterval(timer)
                // console.log('over');
                return
            }
            // 计算惯性移动：当减少到小于 0.5 时设为 0，否则继续衰减
            imgHeight.X = Math.abs(imgHeight.X * 0.8) < 0.5 ? 0 : imgHeight.X * 0.8
            imgHeight.Y = Math.abs(imgHeight.Y * 0.8) < 0.5 ? 0 : imgHeight.Y * 0.8
        }, 1000 / 60)
    }
}

onMounted(() => {
    unref(image).focus()
})

// const keyClose = (ev) => {
//     console.log(123456)
//     if (ev.key === 'Escape' || ev.key === 'ESC' || ev.key === 'Esc' || ev.key === 'esc') emit('close')
// }
</script>

<style scoped>
#custom-image {
    transform: scale(1);
    opacity: 1;
    position: fixed;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    left: 0;
    top: 0;
    z-index: 50000000000;
    background-color: rgba(0, 0, 0, 0.5);
    animation-name: eject;
    animation-duration: 0.3s;
    transition: all 0.3s;
}
.sign-out-animation {
    transform: scale(0) !important;
    opacity: 0 !important;
}

.sign-out {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    font-size: 18px;
    padding: 15px;
}

#custom-image > img {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-height: 100vh;
    max-width: 100vw;
}
</style>
