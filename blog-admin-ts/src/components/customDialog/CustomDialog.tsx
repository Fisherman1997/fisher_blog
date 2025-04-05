import { createApp, h } from 'vue'
import type { Component } from 'vue'
import { setElComponents } from '@/plugin/element_puls.js'
import CustomDialogVNode from './CustomDialogVNode.vue'

export interface ICustomDialogProps<T> {
    type: 'insert' | 'update'
    row?: T
}

interface IOptions<IComponentProps, TOpen> {
    title: string
    width?: `${number}%` | `${number}px` | `${number}vw`
    top?: `${number}vh`
    draggable?: boolean
    modal?: boolean
    alignCenter?: boolean
    component: Component
    componentProps?: ICustomDialogProps<IComponentProps> | IComponentProps
    open: (value: TOpen) => void
}

/**
 *
 * @param {*}  options { <br />
 *         title: '弹窗标题，type string',
 *         width: '弹窗的宽度  100% 自动宽高全屏, type string',
 *         top: '弹窗的宽度离顶部距离   默认8vh, type string  不建议自定义，还有问题',
 *         draggable: '弹窗是否拖拽 默认true, type boolean',
 *         modal: '弹窗是否遮罩 默认true, type boolean',
 *         component: '弹窗内容的插槽组件，！！！！必填  && 必须是一个vue组件',
 *         componentProps： '弹窗内容的插槽组件的props  type object',
 *   }
 */
const CustomDialog = function <TProps, TOpen = boolean>({
    title,
    width = '30%',
    top = '8vh',
    draggable = true,
    modal = true,
    alignCenter = false,
    component,
    componentProps,
    open,
}: IOptions<TProps, TOpen>) {
    const dialogDiv = document.createElement('div')
    const app = createApp({
        setup() {
            // const visible = ref(true)
            const handleClose = function (value: TOpen) {
                Destroy()
                open(value)
            }
            const Destroy = () => {
                app.unmount()
                dialogDiv.onkeyup = null
                dialogDiv.remove()
            }
            dialogDiv.onkeyup = (ev) => {
                if (ev.key === 'Escape' || ev.key === 'ESC' || ev.key === 'Esc' || ev.key === 'esc')
                    Destroy()
            }
            return {
                Destroy,
                handleClose,
                // visible,
            }
        },
        render() {
            const { handleClose } = this
            return (
                <CustomDialogVNode
                    title={title}
                    width={width}
                    top={top}
                    draggable={draggable}
                    alignCenter={alignCenter}
                    modal={modal}
                    onClose={handleClose}
                >
                    {h(component, { ...componentProps, onClose: handleClose })}
                </CustomDialogVNode>
            )
        },
    })
    setElComponents(app)
    app.mount(dialogDiv)
    document.body.appendChild(dialogDiv)
}

export default CustomDialog
