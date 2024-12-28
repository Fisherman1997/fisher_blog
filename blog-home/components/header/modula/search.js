import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { Message } from '../../../components/funAssembly/message'
import styles from '../Header.module.css'

const Search = () => {
    const [ searchDis, setSearchDis ] = useState(false)
    const [ searchAnimateClass, setSearchAnimateClass ] = useState('')
    const searchIpn = useRef(null)
    const router = useRouter()
    const navLeftChange = (bol) => {
        if (bol) {
            setSearchDis(bol)
            setSearchAnimateClass('animate__bounceInUp')
            setTimeout(() => searchIpn.current.focus())
        } else {
            setSearchAnimateClass('animate__bounceOutUp')
            setTimeout(() => {
                setSearchDis(bol)
            },350)
        }
    }
    const searchLoad = () => {
        if (!searchIpn.current.value.length) return Message('请输入关键字')
            
        if (location.pathname === "/search") {
            window.history.pushState({},'',`${location.pathname}?search=${searchIpn.current.value}`)
            location.reload()
        } else {
            router.push({ pathname: '/search', query:{ search: searchIpn.current.value } })
        }
        
    } 
    const onEnter = (ev) => {
        if (ev.key === "Enter") searchLoad()
    }
    useEffect(() => {
        if (searchDis) {
            document.onclick = (ev) => {
                if (ev.target.parentNode.parentNode.classList[0] !== 'search' 
                    && ev.target.parentNode.classList[0] !== 'search') {
                    navLeftChange(false)
                }
            }
            document.onmousewheel = () => {
                navLeftChange(false)
            }
        } else {
            document.onclick = null
            document.onmousewheel = null
            searchIpn.current.value = ''
        }
    },[searchDis])
    return (
        <div className='search'>
            <div onClick={ () => navLeftChange(true) } className={ styles.SearchIcon }>
                <img src='/images/search.png' />
            </div>
            <div className={ `${styles.Search} ${searchAnimateClass}` } style={ { display: searchDis ? 'flex' : 'none' } }>
                <input onKeyDown={ onEnter } ref={ searchIpn } type="text" placeholder='输入关键字检索'/>
                <button onClick={ searchLoad }>搜索</button>
                <div onClick={ () => navLeftChange(false) }></div>
            </div>
        </div>
    )
}


export default Search