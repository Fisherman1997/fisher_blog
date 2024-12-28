import styles from './Loading.module.css'

const Loading = (props) => {
    const { titleText } = props
    return (
        <div className={styles.loading}>
            <div className={styles['loader-wrapper']}>
                <div className={styles.loader}>
                    <div className={styles.roller}></div>
                    <div className={styles.roller}></div>
                </div>
                <div id={styles.loader2} className={styles.loader}>
                    <div className={styles.roller}></div>
                    <div className={styles.roller}></div>
                </div>
                <div id={styles.loader3} className={styles.loader}>
                    <div className={styles.roller}></div>
                    <div className={styles.roller}></div>
                </div>
            </div>
            <span>{ titleText ? titleText : '加载中，请等待' }</span>
        </div>
    )
}


export default Loading