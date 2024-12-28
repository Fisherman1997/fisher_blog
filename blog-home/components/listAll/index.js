import { useRouter } from 'next/router'
import { useEffect, useState, forwardRef, useImperativeHandle, useRef  } from 'react'
import Empty from '../../components/empty'
import Loading from '../loading'
import Paging from '../paging'
import { postFn } from '../../utils/useAxios'
import { imgUrl } from '../../utils/baseUrl.cofing'
import { imgShow } from '../../components/funAssembly/imgShow'
import style from './listAll.module.css'


/**
 * ListAll 组件用于展示一个分页列表，支持按条件筛选数据。
 * 
 * @param {string} url - 请求数据的 API 地址。
 * @param {string} type - 列表类型'article' 或 'search'，用于区分不同的加载逻辑。
 * @param {boolean} [reload=true] - 是否在首次加载时自动请求数据，默认为 `true`。如果为 `false`，首次加载时不会请求数据，但后续的 `id` 或 `paging.page` 变化时仍会加载数据。
 * 
 * @returns {JSX.Element} - 渲染的分页列表组件。
 */
const ListAll = forwardRef(({ 
        url, 
        type, 
        reload = true }, ref) => {
    const [ list, setList ] = useState([]);
    const [ loadingState, setloadingState ] = useState(false);
    const [ paging, setPaging ] = useState({ page: 1, pageNum:8, total: 0 });
    const isLoad = useRef(reload)
    const router = useRouter()
	const { id } = router.query
    const getSearch = () => {
        let search = new URLSearchParams(location.search).get('search')
        return search
    }
    const changePaging = (value) => {
        setPaging({ ...value })
    }

    const loadData = async () => {
        setloadingState(true)
        const element = { page: paging.page, pageNum: paging.pageNum }
        if (type === 'article' && id) element.classId = Number(id)
        if (type === 'search') element.search = getSearch()
        const data = await postFn(url , element)
        if (data && data.statusCode === 200) {
            setList(data.result.list)
            const changePaging = { ...paging }
            changePaging.total = data.result.total
            setPaging(changePaging)
        }
        if(!isLoad.current) isLoad.current = true
        setloadingState(false)
    }
    useEffect(() => {
        if (isLoad.current) loadData()
        // console.log(paging.page)
    },[id, paging.page])

    // useEffect(() => {
    //     if (reload) loadData()
    // },[])

    useImperativeHandle(ref, () => ({
        loadData
    }))
    return (
        <div className={ style.ListAll }>
            {   loadingState ? <Loading /> :
                list.length ? list.map(item => {
                    if (!item.className) {
                        return (
                            <div className={ `${style.randomlist} animate__flipInX` } key={(item.id + 'random')}>
                                <div className={style.randomItemHead}>
                                    { item.portrait && item.portrait[0] ? <img src={ imgUrl + item.portrait } /> : <></> }
                                    <div className={style.randomUserName}>
                                        <p>{ item.createUserName }</p>
                                        <span>{ new Date(item.createDate).toLocaleString() }</span>
                                        <span>被阅览{ item.clicks }次</span>
                                    </div>
                                </div>
                                <div className={style.randomContent}>
                                    <p onClick={ () => router.push({ pathname: '/randomWrite', query:{ id: item.id } }) } >{ item.content }</p>
                                    { 
                                        item.coverList ?  
                                        <ul className='clear'>
                                            { item.coverList.map(citem => ( <li key={citem}><img src={imgUrl+citem} onClick={(ev) => imgShow(ev)} /></li> )) }
                                        </ul> 
                                        : <></>
                                    } 
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className={`${style.articlelist} animate__flipInX`} key={(item.id + 'article')} onClick={ () => router.push({ pathname: '/articleDetails', query:{ id: item.id } }) }>
                                <div className={style.articleLeft}>
                                    <h4>{ item.title }</h4>
                                    <p>{ item.content }</p>
                                    <div className={style.articleLeftFooter}>
                                        <span>时间：{ new Date(item.createDate).toLocaleString() }</span>
                                        <span>点击：{ item.clicks }</span>
                                        <span>创建：{ item.createUserName }</span>
                                    </div>
                                </div>
                                <div className={style.articleRight} >
                                    <span></span>
                                    <img src={`${imgUrl}${item.coverList ? item.coverList[0] : item.cover[0]}`} />
                                </div>
                            </div>
                        )
                    }
                })
                : <Empty />
            }
            { 
                list.length ? 
                <Paging changePaging={ changePaging } paging={ paging } />
                : ''
            }
        </div>
    )
})

ListAll.displayName = 'ListAll';

export default ListAll