// 仅针对login 和 register 页面的,通过切换元素class实现动画处理逻辑

import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

export const useSetAnimation = () => {
    const route = useRoute()
    const animatLoginLeft = ref('')
    const animatloginRight = ref('')
    const colorball1 = ref('')
    const colorball2 = ref('')
    const colorball3 = ref('')

    type UrlType = '/admin/login' | '/admin/register'

    const initCss = (type: UrlType) => {
        if (type === '/admin/login') {
            animatLoginLeft.value = 'animat-leftToright'
            animatloginRight.value = 'animat-FadeFrom'
            colorball1.value = 'ball1-login animat-bottomTotop'
            colorball2.value = 'ball2-login animat-topTobottom'
            colorball3.value = 'ball3-login animat-topTobottom'
        } else if (type === '/admin/register') {
            animatLoginLeft.value = 'animat-rightToleft'
            animatloginRight.value = 'animat-FadeFrom'
            colorball1.value = 'ball1-register animat-bottomTotop'
            colorball2.value = 'ball2-register animat-topTobottom'
            colorball3.value = 'ball3-register animat-leftToright'
        }
    }

    const changeCss = (type: UrlType) => {
        if (type === '/admin/login') {
            animatLoginLeft.value = 'animat-leftToright'
            animatloginRight.value = 'animat-FadeFrom'
            colorball1.value = 'ball1-login'
            colorball2.value = 'ball2-login'
            colorball3.value = 'ball3-login'
        } else if (type === '/admin/register') {
            // console.log('register')
            animatLoginLeft.value = 'animat-rightToleft'
            // console.log(animatLoginLeft.value)
            animatloginRight.value = 'animat-FadeFrom'
            colorball1.value = 'ball1-register'
            colorball2.value = 'ball2-register'
            colorball3.value = 'ball3-register'
        }
    }
    onBeforeMount(() => {
        initCss(route.path as UrlType)
    })
    return {
        animatLoginLeft,
        animatloginRight,
        colorball1,
        colorball2,
        colorball3,
        changeCss,
    }
}
