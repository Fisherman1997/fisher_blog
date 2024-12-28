import { reactive, unref } from 'vue'
import { useLoading } from '@/hooks/useLoading'
import { useAxios } from '@/hooks/useAxios'


// 上传图片
export const useUploadimg = (url = {}) => {
    const state = reactive({
        daleteList: [],
    })
    const [ startLoading, endLoading ] = useLoading()
    const { post } = useAxios()
    const setDaleteListImg  = (value) => {
        state.daleteList.push(value)
    }

    const daleteImg = async () => {
        if (!state.daleteList.length) return
        const element = [...state.daleteList]
        startLoading()
        const data = await post('file/img/remove',element).finally(endLoading)
        if (data && data.statusCode === 200) {
            console.log(data)
            return true
        }
    }
    
    const uploadImg = async (dataList) => {
        const files = new FormData()
        // console.log(dataList)
        dataList.forEach(item =>{
            files.append('files', item)
        })
        startLoading()
        const data = await post('file/img/add',files).finally(endLoading)
        if (data && data.statusCode === 200) {
            console.log(data)
            return data.result
        }
    }
	return {
		uploadImg,
        setDaleteListImg,
        daleteImg
	}
}
