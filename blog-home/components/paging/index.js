// import 
import styles from './Paging.module.css'

const Paging = (props) => {
    const { paging, changePaging } = props
    const change = (value) => {
        const pagingUpdate = { ...paging }
        if (value === 'previou') {
            pagingUpdate.page -= 1
        } else if (value === 'next') {
            pagingUpdate.page += 1
        }
        changePaging(pagingUpdate)
    }
    const pageNumContnet = () => {
        return Math.floor((paging.total + paging.pageNum -1 ) / paging.pageNum > 1 ? (paging.total + paging.pageNum -1 ) / paging.pageNum : 1 )
    }
    return (
        <div className={styles.paging}>
            { paging.page !== 1 ?  <span onClick={() => change('previou')}>previou</span> : ''}
            <strong>{ paging.page }/{ pageNumContnet() }</strong>
            {
                paging.page !== pageNumContnet() ? 
                pageNumContnet() < 1 ? '' : 
                    <span onClick={() => change('next')}>next</span> : ''
            }
        </div>
    )
}


export default Paging