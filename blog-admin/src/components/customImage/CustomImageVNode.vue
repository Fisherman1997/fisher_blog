<template>
	<div id="custom-image" :class="{'sign-out-animation': !visible}">
        <span class="sign-out" @click="close">x</span>
        <img class="img"
            ref="image" 
            @mousewheel="zoom" 
            @mousedown="down"
            :src="url"
            @dblclick="close"
            :style="`transform: scale(${imgHeight.scale}) translateY(${imgHeight.Y}px) translateX(${imgHeight.X}px)`">
	</div>
</template>



<script setup>
import { ref, onMounted, unref, reactive } from 'vue'
const image = ref()
const imgHeight = reactive({
    scale: 1,
    X: 0,
    Y: 0
}) 
const { url, visible } = defineProps({
    url: { type: String, default: '' },
    visible: { type: Boolean, default: true }
})

// console.log(scopedSlots)
const emit = defineEmits(['close'])

const close = (value) => {
    emit('close')
}
// const keyup = () => {
//     console.log(12345)
// }
const zoom = (ev) => {
    if (ev.wheelDelta > 0) {
        imgHeight.scale += 0.05
        // console.log('+ ->>>',imgHeight.value)
    } else {
        imgHeight.scale -= 0.05
        // console.log('- ->>>',imgHeight.value)
    }
}

const down = (ev) => {
    ev.perventDefault ? ev.perventDefault() : ev.returnValue = false
    const dom = ev.target
    var strY = ev.clientY;
    var strX = ev.clientX;
    var nowX,nowY
    dom.onmousemove = (ev) => {
        nowX = ev.clientX;
        nowY = ev.clientY;
        imgHeight.X = nowX - strX
        imgHeight.Y = nowY - strY
    }
    dom.onmouseup = () => {
        dom.onmousemove = null
        dom.onmouseup = null
        let tiem = setInterval(() => {
            if (imgHeight.X === 0 && imgHeight.Y === 0) {
                clearInterval(tiem)
                // console.log('over')
                return
            }
            // console.log(Math.abs(imgHeight.X * 0.8))
            // console.log(Math.abs(imgHeight.Y * 0.8))
            imgHeight.X = Math.abs(imgHeight.X * 0.8) < 0.5 ? 0 : imgHeight.X * 0.8
            imgHeight.Y = Math.abs(imgHeight.Y * 0.8) < 0.5 ? 0 : imgHeight.Y * 0.8
            // Math.floor()
        }, 1000/60)
    }
}



onMounted(() => {
    unref(image).focus()
})

const keyClose = (ev) => {
    console.log(123456)
    if (ev.key === 'Escape' || ev.key === 'ESC' || ev.key === 'Esc' || ev.key === 'esc') emit('close')
}


</script>

<style scoped>
#custom-image{
    transform: scale(1);
    opacity: 1;
    position: fixed;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    left: 0;
    top: 0;
    z-index: 50000000000;
    background-color: rgba(0, 0, 0, .5);
    animation-name: eject;
    animation-duration: .3s;
    transition: all .3s;
}
.sign-out-animation{
    transform: scale(0) !important;
    opacity: 0 !important;
}

.sign-out{
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    font-size: 18px;
    padding: 15px;
}


#custom-image > img{
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
