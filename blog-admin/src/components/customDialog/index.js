import { createApp, h, ref } from 'vue'
import { setElComponents } from '@/plugin/element_puls'
import CustomDialogVNode from './CustomDialogVNode.vue'



/**
 * 
 * @param {*} options {
        title: 弹窗标题，type string
        width: 弹窗的宽度  100% 自动宽高全屏, type string
        top: 弹窗的宽度离顶部距离   默认8vh, type string  不建议自定义，还有问题
        draggable: 弹窗是否拖拽 默认true, type boolean
        modal: 弹窗是否遮罩 默认true, type boolean
        component: 弹窗内容的插槽组件，！！！！必填  && 必须是一个vue组件
        componentProps： 弹窗内容的插槽组件的props  type object
 * }
 */
const CustomDialog = (options) => {
    const dialogDiv = document.createElement('div')
    const app = createApp({
        setup(){
            const visible = ref(true)
            const handleClose = (value) =>  {
                Destroy()
                options.open(value)
            }
            const Destroy = () => {
                visible.value = false
                setTimeout(() => {
                    app.unmount()
                    dialogDiv.onkeyup = null
                    dialogDiv.remove()
                },300)
            }
            dialogDiv.onkeyup = (ev) => {
                if (ev.key === 'Escape' || ev.key === 'ESC' || ev.key === 'Esc' || ev.key === 'esc') Destroy()
            }
            return {
                Destroy,
                handleClose,
                visible
            }
        },
        render () {
            const { visible, handleClose } = this
            const { title, width, top, draggable, modal, componentProps = {}, component } = options
            // return h(CustomDialogVNode , {
            //         title,
            //         width,
            //         draggable,
            //         modal,
            //         visible,
            //         onClose: handleClose
            //     },
            //     () => h(component, { ...componentProps, nHandleOk: handleClose })
            // )
            return (
                <CustomDialogVNode
                    title={title}
                    width={width}
                    top={top}
                    draggable={draggable}
                    modal={modal}
                    visible={visible}
                    onClose={handleClose}>
                        { h(component, { ...componentProps, onClose: handleClose }) }
                </CustomDialogVNode>
            )
        }
    })
    setElComponents(app)
    app.mount(dialogDiv)
    document.body.appendChild(dialogDiv)
}

export default CustomDialog