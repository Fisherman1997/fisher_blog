import { reactive } from 'vue'
import { useLoading } from '@/hooks/useLoading.js'
import { useAxios } from '@/hooks/useAxios'

// 上传图片
export const useUploadimg = () => {
    const state = reactive<{
        deleteList: (string | File)[]
    }>({
        deleteList: [],
    })
    const [startLoading, endLoading] = useLoading()
    const { post } = useAxios()
    const setDeleteListImg = (value: string | File) => {
        state.deleteList.push(value)
    }

    const daleteImg = async () => {
        if (!state.deleteList.length) return
        const element = [...state.deleteList]
        startLoading()
        const data = await post('file/img/remove', element).finally(endLoading)
        if (data && data.statusCode === 200) {
            console.log(data)
            return true
        }
    }

    const uploadImg = async (dataList: File[]) => {
        const files = new FormData()
        // console.log(dataList)
        dataList.forEach((item) => {
            files.append('files', item)
        })
        startLoading()
        const data = await post<string[], FormData>('file/img/add', files).finally(endLoading)
        if (data && data.statusCode === 200) {
            console.log(data)
            return data.result
        }
    }
    return {
        uploadImg,
        setDeleteListImg,
        daleteImg,
    }
}
