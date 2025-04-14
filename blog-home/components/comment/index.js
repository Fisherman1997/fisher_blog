import { useState, useEffect } from 'react'
import { postFn } from '../../utils/useAxios'
import Loading from '../loading'
import Empty from '../empty'
import Paging from '../paging'
import CommentChange from './modula/CommentChange'
import styles from './Comment.module.css'

const Comment = (props) => {
    const { articleId } = props
    const [ loadingState, setLoadingState ] = useState(true)
    const [ paging, setPaging ] = useState({ page: 1, pageNum:10, total: 0 });
    const [ comment, setComment ] = useState(null)
    const [ commentList, setCommentList ] = useState([])
    const loadData = async () => {
        setLoadingState(true)
        const element = { ...paging }
        element.articleId = articleId
        delete element.total
        const data = await postFn('comment/list', element)
        if (data && data.statusCode === 200) {
            setCommentList(data.result.list)
            const changePaging = { ...paging }
            changePaging.total = data.result.total
            setComment(null)
            setPaging(changePaging)
        }
        setLoadingState(false)
    }
    const changePaging = (value) => {
        setPaging(value)
        loadData()
    }
    const changeComment = (index) => {
        if (comment === index) setComment(null)
        else setComment(index)
    }
    useEffect(() => {
        loadData()
    },[])
    return (
        <div className={ styles.comment } id='commentTap'>
            <h3>评论（{ commentList.length || 0 }） <button onClick={() => setComment(null)} >回复</button></h3>
            {
                comment === null ?
                <CommentChange articleId={ articleId }  loadData={loadData} />
                : ''
            }
            {
                loadingState ? <Loading /> :
                commentList.length ?
                commentList.map((itme, index) => {
                    return (
                        <div className={ styles.commentItme } key={itme.id}>
                            <div className={ styles.commentInfo }>
                                <img src={ `https://q2.qlogo.cn/headimg_dl?dst_uin=${itme.qq}&spec=100` } />
                                <span>{itme.reviewerName}</span>
                            </div>
                            <p>{ itme.content }</p>
                            <div className={ styles.commentCtrl }>
                                <span>{ new Date(itme.createDate).toLocaleString() }</span>
                                <span onClick={() => changeComment(index)}>回复</span>
                                {   
                                    comment === index ?
                                    <CommentChange
                                        articleId={ articleId }
                                        loadData={loadData}
                                        parentId={itme.id}
                                        replyName={itme.reviewerName}
                                        replyQQ={itme.qq} />
                                    : ''
                                }
                            </div>
                            {
                                itme.childList && itme.childList.length ? 
                                itme.childList.map( (element, cindex) => {
                                    const select = index + '-' + cindex
                                    return (
                                        <div className={ styles.commentItme } key={element.id}>
                                            <div className={ styles.commentInfo }>
                                                <img src={ `https://q2.qlogo.cn/headimg_dl?dst_uin=${element.qq}&spec=100` } />
                                                <span>{ element.reviewerName } </span>
                                                <i>-回复-</i>
                                                <span>{ element.replyName }</span>
                                            </div>
                                            <p>{ element.content }</p>
                                            <div className={ styles.commentCtrl }>
                                                <span>{ new Date(element.createDate).toLocaleString() }</span>
                                                <span onClick={() => changeComment(select)}>回复</span>
                                                {   
                                                    comment === select ?
                                                    <CommentChange
                                                        articleId={ articleId }
                                                        loadData={loadData}
                                                        parentId={itme.id}
                                                        replyName={element.reviewerName}
                                                        replyQQ={element.qq} />
                                                    : ''
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                                : ''
                            }
                        </div>
                    )
                })
                :  <Empty titleText='没有评论哦、(┬┬﹏┬┬)'/>
            }
            { 
                commentList.length ? 
                <Paging changePaging={ changePaging } paging={ paging } />
                : ''
            }
        </div>
    )
}


export default Comment