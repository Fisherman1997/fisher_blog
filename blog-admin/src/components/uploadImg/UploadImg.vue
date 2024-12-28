<template>
	<div id="upload-img">
        <div class="img-list" v-if="imgList.list.length">
            <div class="img-list-item" v-for="(item,index) in imgList.list" :style="`width: ${size}`">
                <img :src="item" :style="`width: ${size}`" />
                <div class="img-list-control">
                    <span @click="lookOver(item)"><el-icon><Search /></el-icon></span>
                    <span @click="daleteImg(item,index)"><el-icon><Delete /></el-icon></span>
                </div>
            </div>
        </div>
        <input ref="file" id="fileStyle" type="file" accept="image/jpeg,image/png" @change="fileChange">
        <el-button @click="selectFile" :style="`width: ${size}; height: ${size}`">
            <el-icon><Plus /></el-icon>
        </el-button>
	</div>
</template>

<script setup>
/**
*   @Emits changeFile , delete
*   @Props size, amount, dataList
*/
import { ref, unref, reactive, watch, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import CustomImage from '@/components/customImage'


const dataList = reactive({state:[]})  // 存放图片的url 和 file 对象
const imgList = reactive({list:[]})  // 依赖dataList.state  url直接获得，file对象转换成Base64
const file = ref()
const { size, amount, urlList } = defineProps({
    size: { type: String, default: '100px' },
    amount: { type: Number, default: 3 },
    urlList: { type: Array }
})
// const props = defineProps()
const emit = defineEmits(['changeFile','delete'])


onBeforeMount(() => {
    // console.log(urlList)
    dataList.state = [ ...urlList ]
})

const lookOver = (url) => {
    CustomImage({url})
}

const daleteImg = (itme, index) => {
    // itme = itme.split(process.env.VUE_APP_BASE_URL).join('')
    // itme = itme.split(process.env.VUE_APP_BASE_URL).join('')
    const bol = isBase64(itme)
    if (bol) dataList.state = dataList.state.filter( (element,cindex) => cindex !== index)
    else dataList.state = dataList.state.filter( element => {
        return element !== itme
    })
    const element = {  
        type: bol, 
        result: [...dataList.state], 
        delImg: bol ? null : itme
    }
    emit('delete', element)
}

const selectFile = () => {
    if (amount === dataList.state.length) return ElMessage.warning(`最多只可拥有${amount}张图片，要替换请先删除`)
    unref(file).click()
}


const isBase64 = (str) => {
    if(str.indexOf('data:image')>-1){
        return true
    }else{
        return false
    }
}


// url直接获得，file对象转换成Base64
const formatSwitch =  () => {
    const list = []
    if (dataList.state.length === 0) return imgList.list = []
    dataList.state.forEach(item => {
        // if (typeof item === 'string') return imgList.list.push(process.env.VUE_APP_BASE_URL + item)
        if (typeof item === 'string') return imgList.list.push(item)
        new Promise((resolve,reject) => {
            let reader = new FileReader();//创建文件读取流
            reader.readAsDataURL(item)
            reader.onload = () => {
                resolve(reader.result)
            }
        }).then(data => {
            list.push(data)
            if (list.length === dataList.state.length) imgList.list = [ ...list ]
        })
    })
}
const fileChange = (e) => {
    let file = e.target.files[0]
    if (file) {
        const fileSize = file.size
        const isLt3G = fileSize / 1024 / 1024 / 1024 < 3
        if (!isLt3G) {
            ElMessage.error('上传文件大小不超过3G')
            file = ''
            return
        }
        const name = file.name
        const fileName = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
        if (
            fileName !== 'jpg' &&
            fileName !== 'png' &&
            fileName !== 'jpeg'
        ) {
            ElMessage.error('请选择格式文件(jpg、png、jpeg)上传！')
            file = ''
            return
        }
        dataList.state = [ ...dataList.state, file]
        emit('changeFile', [ ...dataList.state ])
    }
}

watch(() => dataList.state, formatSwitch)
</script>

<style scoped>
#fileStyle{
    display: none;
}
#upload-img{
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
}

.img-list{
    display: flex;
    align-items: stretch;
    position: relative;
    overflow: hidden;
}
.img-list .img-list-item{
    display: flex;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 0 1px rgba(0, 0, 0, .5);
    margin: 0 5px;
    position: relative;
}
.img-list-control{
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    transform: translateY(300px);
    transition: all .3s;
}
.img-list .img-list-item:hover .img-list-control{
    transform: translateY(0);
}
.img-list-control .el-icon{
    cursor: pointer;
    margin: 0 5px;
    font-weight: bold;
}
#upload-img .el-button{
    background-color: #dce7e9;
    color: #000;
}
</style>
