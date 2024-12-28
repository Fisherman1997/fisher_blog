import { ElLoading } from 'element-plus'


export const useLoading = () => {
    let loading
    let delayed
    const startLoading = (text = '加载中...', time = 800) => {
        delayed = setTimeout(() => {
            loading = ElLoading.service({
                lock: true,
                text,
                background: 'rgba(0, 0, 0, 0.7)',
            })
        }, time)
    }
    const stopLoading = () => {
        clearTimeout(delayed)
        if (loading) loading.close()
    }
    return [
        startLoading,
        stopLoading
    ]
}