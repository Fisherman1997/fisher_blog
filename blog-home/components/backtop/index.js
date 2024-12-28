import { useState, useEffect } from 'react'
import styles from './Backtop.module.css'

 
const Backtop = () => {
    const [ backTopBol, setBackTopBol ] = useState(false)
    const scrollFunction = () =>{
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) setBackTopBol(true)
        else setBackTopBol(false)
    }
    const topFunction = ()=> {
        const time = setInterval(()=>{
            if(document.body.scrollTop || document.documentElement.scrollTop){
                document.body.scrollTop && (document.body.scrollTop = document.body.scrollTop - 60)
                document.documentElement.scrollTop && (document.documentElement.scrollTop = document.documentElement.scrollTop - 60)
            }else{
                clearInterval(time)
            }
        },8)
    }
    useEffect(() => {
        window.onscroll = () => scrollFunction();
    },[])
    return (
        <div 
            className={ `${styles.backtop} ${ backTopBol ? styles.backtopDisp : '' } ${ backTopBol ? "animate__fadeInRight" : ''}` } 
            onClick={ topFunction }>
            ︿
        </div>
    )
}

export default Backtop