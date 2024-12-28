import styles from './Empty.module.css'

const Empty = (props) => {
    const { titleText } = props
    return (
        <div className={ styles.empty }>
            { <span>{ titleText }</span> || <span>暂无数据</span> }
        </div>
    )
}


export default Empty