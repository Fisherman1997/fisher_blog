<template>
    <div id="custom-dialog">
        <ElDialog
            class="custom-dialog-body"
            v-model="visible"
            :top="modalTop"
            :width="width"
            :draggable="draggable"
            :modal="modal"
            :fullscreen="fullscreen"
            :show-close="false"
            destroy-on-close
            @closed="close"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :align-center="alignCenter"
        >
            <slot></slot>
            <template #header="{}">
                <div class="my-header">
                    <div class="title">
                        {{ title }}
                    </div>
                    <div class="right">
                        <span v-if="fullscreen" @click="fullscreen = false"
                            ><ElIcon><Notification /></ElIcon
                        ></span>
                        <span v-else @click="fullscreen = true"
                            ><ElIcon><FullScreen /></ElIcon
                        ></span>
                        <span @click="visible = false"
                            ><ElIcon><Close /></ElIcon
                        ></span>
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

<script setup lang="ts">
import { ElDialog } from 'element-plus'
import { ref, onBeforeMount, computed } from 'vue'
import { FullScreen, Notification } from '@element-plus/icons-vue'

interface ICustomDialogVNodeProps {
    title?: string
    width?: string
    draggable?: boolean
    modal?: boolean
    top?: string
    alignCenter?: boolean
}
const visible = ref(true)
const fullscreen = ref(false)

const {
    title = '弹窗',
    width = '30%',
    draggable = true,
    modal = true,
    alignCenter = false,
    top = '8vh',
} = defineProps<ICustomDialogVNodeProps>()

const modalTop = computed(() => {
    return alignCenter ? undefined : top
})

// console.log(scopedSlots)
const emit = defineEmits<{
    (e: 'close'): void
}>()

const close = () => {
    visible.value = false
    emit('close')
}

onBeforeMount(() => {
    if (width === '100%' || width === '100vw') {
        fullscreen.value = true
    }
})
</script>

<style scoped>
.my-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
}
.my-header .right span {
    cursor: pointer;
    margin: 0 10px;
}
custom-dialog-body .el-dialog__header {
    margin: 0;
}
</style>
