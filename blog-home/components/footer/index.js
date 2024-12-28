import WaveCanvas from './modula/waveCanvas'

import styles from './Footer.module.css'

const Footer = () => {
    const TopAadmin = () => {
        window.open('/admin','_blank')
    }
    return (
        <div className={ styles.footer }>
            <div>
                <a 
                    className={ styles.record } 
                    href="https://beian.miit.gov.cn/#/Integrated/index" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <span>桂ICP备</span>
                    <span>2021004940号</span>
                </a>
                <a 
                    className={ styles.record } 
                    href="https://icp.gov.moe/?keyword=20240566" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <span>萌ICP备</span>
                    <span>20240566号</span>
                    </a>
            </div>
            <div className={styles.end}>
                <span>@2021-2024</span>
                <span>渔夫Fisherman</span>
                <span>|</span>
                <span onClick={ TopAadmin } className={ styles.admin }>后台管理</span>
            </div>
            <WaveCanvas />
        </div>
    )
}

export default Footer