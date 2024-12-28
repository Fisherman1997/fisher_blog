
/**
 * 文字弹窗提示
 * @param {*} str  文字信息
 */
export const Message = (str) => {
    let dom = document.querySelector('.Message')
    if (!dom) {
        dom = document.createElement('div')
        dom.classList.add('Message')
        document.body.appendChild(dom)
    }
    const span = document.createElement('span')
    span.classList.add('animat-topTobottom')
    span.innerText = str
    setTimeout(() => {
        span.classList.remove('animat-topTobottom')
        span.classList.add('animat-bottomTotop')
        setTimeout(() => {
            span.remove()
            if (dom.childNodes.length === 0) dom.remove()
        },300)
    },2000)
    dom.appendChild(span)
}