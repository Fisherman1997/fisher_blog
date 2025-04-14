import { useRouter } from 'next/router'
import { imgUrl } from '../../utils/baseUrl.cofing'
import NavLeft from './modula/navLeft'
import Search from './modula/search'
import styles from './Header.module.css'

const Header = (props) => {
    const router = useRouter()
    const { titleText, homebj } = props
    const load = () => {
        location.assign('/')
    }
    const travel = () => {
        window.open("https://travel.moe/go?travel=on","_blank")
    }
    return (
        <div className={styles.header} style={{
            background: `linear-gradient(to bottom, rgba(255,255,255,0),#30435b),url(${ homebj ? imgUrl + homebj : '/images/homebj.jpg' }) center`,
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: 'cover'
        }}>
            <div className={styles.nav}>    
                <div className='center'>
                    <h1 className={ styles.logo } onClick={ load }>Fisherman</h1>
                    <div>
                        <div className={ styles.list }>
                            <span onClick={ () => router.push('/') }>首页</span>
                            <span onClick={ () => router.push('/article') }>文章/笔记</span>
                            <span onClick={ () => router.push('/randomList') }>说说</span>
                            <span onClick={ () => router.push('/links') }>友链</span>
                            <span onClick={ () => router.push('/custom?name=关于') }>关于</span>
                            <span onClick={ travel }>异次元</span>
                        </div>
                        
                        <Search/>
                        <NavLeft/>
                    </div>
                </div>
            </div>
            <h3>{ titleText || '天行健，君子以自强不息' }</h3>
        </div>
    )
}


export default Header