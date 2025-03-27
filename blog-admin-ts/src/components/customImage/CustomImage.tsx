import { createApp, ref } from 'vue'
import CustomImageVNode from './CustomImageVNode.vue'

interface ICustomImageOptions {
    url: string
}

/**
 *
 * @param {*} options {
 *      url: 图片url
 * }
 */
const CustomImage = (options: ICustomImageOptions) => {
    const dialogDiv = document.createElement('div')
    const app = createApp({
        setup() {
            const visible = ref(true)
            const Destroy = () => {
                visible.value = false
                setTimeout(() => {
                    app.unmount()
                    dialogDiv.remove()
                }, 300)
            }
            return {
                Destroy,
                visible,
            }
        },
        render() {
            const { Destroy, visible } = this
            const { url } = options
            return (
                <CustomImageVNode url={url} visible={visible} onClose={Destroy}></CustomImageVNode>
            )
        },
    })
    app.mount(dialogDiv)
    document.body.appendChild(dialogDiv)
}

export default CustomImage
