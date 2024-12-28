import { apiUrl } from '../../utils/baseUrl.cofing'

/**
 * 图片放大预览
 * @param {*} src  图片路径
 */
export const imgShow = (ev) => {
    const dom = document.createElement('div')
    const img = document.createElement('img')
    const span = document.createElement('span')
    const imgHeight = {
        X: 0,
        Y: 0
    } 
    dom.className = 'imgShow'
    img.src = ev.target.src
    span.innerText = "x"
    span.className = 'sign-out'
    const close = () => {
        dom.ondblclick = null
        dom.remove()
    }
    const down = (ev) => {
        ev.perventDefault ? ev.perventDefault() : ev.returnValue = false
        const img = ev.target
        var strY = ev.clientY;
        var strX = ev.clientX;
        var nowX,nowY
        const move = (ev) => {
            nowX = ev.clientX;
            nowY = ev.clientY;
            imgHeight.X = nowX - strX
            imgHeight.Y = nowY - strY
            img.style = `transForm: translateY(${imgHeight.Y}px) translateX(${imgHeight.X}px)`
        }
        const up = () => {
            img.onmousemove = null
            img.onmouseup = null
            let tiem = setInterval(() => {
                if (imgHeight.X === 0 && imgHeight.Y === 0) {
                    clearInterval(tiem)
                    return
                }
                imgHeight.X = Math.abs(imgHeight.X * 0.8) < 0.5 ? 0 : imgHeight.X * 0.8
                imgHeight.Y = Math.abs(imgHeight.Y * 0.8) < 0.5 ? 0 : imgHeight.Y * 0.8
                img.style = `transForm: translateY(${imgHeight.Y}px) translateX(${imgHeight.X}px)`
            }, 1000/60)
        }
        img.onmousemove = move
        img.onmouseup = up
    }
    // dom.ontouchstart = down
    dom.onmousedown = down
    dom.ondblclick = close
    span.onclick = close
    dom.appendChild(span)
    dom.appendChild(img)
    document.body.appendChild(dom)
}