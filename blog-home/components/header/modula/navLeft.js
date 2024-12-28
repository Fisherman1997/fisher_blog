import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { getFn } from '../../../utils/useAxios'
import styles from '../Header.module.css'

const NavLeft = (props) => {
    const router = useRouter()
    const [classList, setClassList] = useState([])
    const [navDis, setNavDis] = useState(false)
    const [navClass, setNavClass] = useState('')
    const getClass = async () => {
        const data = await getFn('class/list')
        if (data && data.statusCode === 200) {
            setClassList(data.result)
        }
    }
    useEffect(() => {
        if (navDis) getClass()
    },[navDis])
    const navLeftChange = (bol, routerUrl, className) => {
        if (bol) {
            setNavDis(bol)
            setNavClass('animate__slideInRight')
        } else {
            setNavClass(className || 'animate__slideOutLeft')
            setTimeout(() => {
                setNavDis(bol)
                if (routerUrl) router.push(routerUrl)
            },300)
        }
    }
    const travel = () => {
        window.open("https://travel.moe/go?travel=on","_blank")
    }
    return (
        <>
            <div className={ styles.navDown } onClick={ () => navLeftChange(true) }></div>
            <div className={ `${styles.navLeft} ${ navClass }` } style={{ display: navDis ? 'block' : 'none' }}> 
                <span onClick={ () => navLeftChange(false, null, 'animate__slideOutRight') }> 返回 </span>
                <span onClick={ () => navLeftChange(false, '/') }>首页</span>
                <span className={styles.navDropDown} onClick={ () => navLeftChange(false, '/article') }>文章/笔记</span>
                <ul>
                    {
                        classList.length ? 
                        classList.map(item => {
                            return (
                                <li key={item.id} onClick={ () => navLeftChange(false, `/article?id=${ item.id }`) }>{item.name}</li>
                            )
                        })
                        : '' 
                    }
                </ul>
                <span onClick={ () => navLeftChange(false, '/randomList') }>说说</span>
                <span onClick={ () => navLeftChange(false, '/links') }>友链</span>
                <span onClick={ () => navLeftChange(false, '/custom?name=关于') }>关于</span>
                <span onClick={ travel }>异次元</span>
            </div>
        </>
    )
}


export default NavLeft