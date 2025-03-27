<template>
    <div id="upload-img">
        <div class="img-list" v-if="imgList.list.length">
            <div
                class="img-list-item"
                v-for="(item, index) in imgList.list"
                :style="`width: ${size}`"
                :key="index"
            >
                <img :src="item" :style="`width: ${size}`" />
                <div class="img-list-control">
                    <span @click="lookOver(item)">
                        <el-icon><Search /></el-icon>
                    </span>
                    <span @click="deleteImg(item, index)">
                        <el-icon><Delete /></el-icon>
                    </span>
                </div>
            </div>
        </div>
        <input
            ref="file"
            id="fileStyle"
            type="file"
            accept="image/jpeg,image/png"
            @change="fileChange"
        />
        <el-button @click="selectFile" :style="`width: ${size}; height: ${size}`">
            <el-icon><Plus /></el-icon>
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import CustomImage from '@/components/customImage/CustomImage'

// 定义组件 props 的类型，注意 urlList 为图片链接数组
interface IUploadImgProps {
    size?: string
    amount?: number
    urlList: (string | File)[]
}

// 使用 withDefaults 配置 props 默认值
const props = withDefaults(defineProps<IUploadImgProps>(), {
    size: '100px',
    amount: 3,
})

export type ImgDeleteParam = {
    type: boolean
    result: (File | string)[]
    delImg: string | null
}

// 定义组件 emit 的类型，其中 changeFile 与 delete 事件的 payload 类型更为明确
const emit = defineEmits<{
    (e: 'changeFile', payload: (File | string)[]): void
    (e: 'delete', payload: ImgDeleteParam): void
    (e: 'error', error: Error): void
}>()

// 内部数据定义：dataList 用于存放原始数据（图片 url 或 File 对象），imgList 用于展示时统一为图片 url
const dataList = reactive({ state: [] as Array<string | File> })
const imgList = reactive({ list: [] as string[] })

const file = ref<HTMLInputElement | null>(null)
const { size, amount, urlList } = props

onBeforeMount(() => {
    // 初始化 dataList，注意这里解构 urlList 得到数组副本
    dataList.state = [...urlList]
    // formatSwitch()
})

// 查看大图
const lookOver = (url: string) => {
    CustomImage({ url })
}

// 删除图片，同时判断是否为 Base64 格式
const deleteImg = (item: string, index: number) => {
    const isBase = isBase64(item)
    if (isBase) {
        dataList.state = dataList.state.filter((_, cindex) => cindex !== index)
    } else {
        dataList.state = dataList.state.filter((element) => element !== item)
    }
    emit('delete', {
        type: isBase,
        result: [...dataList.state],
        delImg: isBase ? null : item,
    })
}

// 选择文件按钮点击时触发 input 的 click 事件
const selectFile = () => {
    if (amount === dataList.state.length) {
        return ElMessage.warning(`最多只可拥有${amount}张图片，要替换请先删除`)
    }
    file.value?.click()
}

// 判断是否为 Base64 字符串
const isBase64 = (str: string) => {
    return str.indexOf('data:image') > -1
}

// 将 File 对象转换成 Base64 并更新 imgList.list
const formatSwitch = () => {
    const list: Array<string> = []
    if (dataList.state.length === 0) {
        imgList.list = []
        return
    }
    dataList.state.forEach((item) => {
        if (typeof item === 'string') {
            // 已经是字符串（链接或者Base64）
            imgList.list.push(item)
        } else {
            new Promise((resolve) => {
                const reader = new FileReader() //创建文件读取流
                reader.readAsDataURL(item)
                reader.onload = () => {
                    resolve(reader.result)
                }
            }).then((data) => {
                list.push(data as string)
                if (list.length === dataList.state.length) imgList.list = [...list]
            })
        }
    })
}

// 文件变化处理函数，进行文件类型及大小校验
const fileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const selectedFile = target.files ? target.files[0] : null
    if (selectedFile) {
        const fileSize = selectedFile.size
        const isLt3G = fileSize / 1024 / 1024 / 1024 < 3
        if (!isLt3G) {
            ElMessage.error('上传文件大小不超过3G')
            return
        }
        const name = selectedFile.name
        const fileExtension = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
        if (!['jpg', 'png', 'jpeg'].includes(fileExtension)) {
            ElMessage.error('请选择格式文件(jpg、png、jpeg)上传！')
            return
        }
        dataList.state = [...dataList.state, selectedFile]
        emit('changeFile', [...dataList.state])
    }
}

// 监听 dataList.state 变化转换图片格式
watch(() => dataList.state, formatSwitch, { deep: true })
</script>

<style scoped>
#fileStyle {
    display: none;
}
#upload-img {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
}

.img-list {
    display: flex;
    align-items: stretch;
    position: relative;
    overflow: hidden;
}
.img-list .img-list-item {
    display: flex;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    margin: 0 5px;
    position: relative;
}
.img-list-control {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    transform: translateY(300px);
    transition: all 0.3s;
}
.img-list .img-list-item:hover .img-list-control {
    transform: translateY(0);
}
.img-list-control .el-icon {
    cursor: pointer;
    margin: 0 5px;
    font-weight: bold;
}
#upload-img .el-button {
    background-color: #dce7e9;
    color: #000;
}
</style>
