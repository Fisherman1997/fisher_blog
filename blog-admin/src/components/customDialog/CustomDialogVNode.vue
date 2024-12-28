<template>
	<div id="custom-dialog">
        <ElDialog
            custom-class="custom-dialog-body"
            v-model="visible"
            :top="top"
            :width="width"
            :draggable="draggable"
            :modal="modal"
            :fullscreen="fullscreen"
            :show-close="false"
            destroy-on-close
            :close-on-press-escape="false"
            :close-on-click-modal="false">
            <slot></slot>
            <template #header="{}">
                <div class="my-header">
                    <div class="title">
                        {{ title }}
                    </div>
                    <div class="right">
                        <span v-if="fullscreen" @click="fullscreen = false"><ElIcon><Notification /></ElIcon></span>
                        <span v-else @click="fullscreen = true"><ElIcon><FullScreen /></ElIcon></span>
                        <span @click="close"><ElIcon><Close /></ElIcon></span>
                    </div>
                </div>
            </template>
        </ElDialog>
	</div>
</template>

<!-- 
props {
    title：String, default: 'primary' 弹窗标题
    width：String, default: 'primary' 弹窗宽度
    draggable：Boolean, default: 'primary' 弹窗是否科拖拽
    modal：Boolean, default: 'primary' 弹窗是否遮罩
}

Emits[
    open   确认
    close  取消
]
 -->

<script setup>
import { ElDialog } from 'element-plus'
import { ref, onBeforeMount } from 'vue'


const fullscreen = ref(false)

const { title, width, draggable, modal, visible } = defineProps({
    title: { type: String, default: '弹窗' },
    width: { type: String, default: '30%' },
    draggable: { type: Boolean, default: true },
    modal: { type: Boolean, default: true },
    visible: { type: Boolean, default: true },
    top: { type: String, default: '8vh' }
})
// console.log(scopedSlots)
const emit = defineEmits(['close'])

const close = (value) => {
    emit('close')
}


onBeforeMount(() => {
    if (width === '100%' || width === '100vw') {
        fullscreen.value = true
    }
})


</script>

<style scoped>
.my-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
}
.my-header .right span{
    cursor: pointer;
    margin: 0 10px;
}
custom-dialog-body .el-dialog__header {
    margin: 0;
}
</style>
