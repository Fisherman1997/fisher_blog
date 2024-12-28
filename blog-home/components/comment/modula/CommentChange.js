import { useState, useEffect } from 'react'
import { postFn } from '../../../utils/useAxios'
// import { qqUsers } from '../../../utils/baseUrl.cofing'
// import request from '../../../utils/request'
import { Message } from '../../funAssembly/message'
import { setStorageItme, getStorageItme } from '../../../utils/storage'
import styles from '../Comment.module.css'



/**
 * CommentChange Component
 * 
 * 用于处理评论功能的组件，允许用户填写并提交评论。
 * 
 * @param {number} articleId - 当前文章的ID，决定评论关联的文章。
 * @param {number} [parentId] - 父评论的ID，用于回复某条评论时传入该评论的ID。
 * @param {string} [replyName] - 被回复的评论者昵称，用于显示谁是被回复的对象。
 * @param {string} [replyQQ] - 被回复者的QQ号码。
 * @param {Function} loadData - 用于在评论提交后刷新数据的回调函数。
 */
const CommentChange = ({ 
    articleId, 
    parentId = null, 
    replyName = null, 
    replyQQ = null, 
    loadData }) => {
    // const  = props
    const [ commentItme, setComment ] = useState({
        articleId: articleId,
        parentId: parentId,
        qq: null,
        replyName: replyName,
        reviewerName: '',
        httpsrc: '',
        content: '',
        articleUrl: '',
        replyQQ: replyQQ
    })
    const componentDidMount = async () => {
        const change = { ...commentItme }
        const reviewer = getStorageItme('reviewer')
        change.articleUrl = location.href
        if (reviewer && reviewer.qq) {
            change.qq = reviewer.qq
            change.reviewerName = reviewer.reviewerName
            change.httpsrc = reviewer.httpsrc
        }
        setComment({ ...change })
    }
    const changeInput = (type, ev) => {
        const data = { ...commentItme }
        data[type] = ev.target.value
        setComment(data)
    }
    const verification = () => {
        if (commentItme.qq.replace(/[1-9][0-9]{4,14}/g,'').length !== 0) {
            Message('只能是qq号! 别乱填!')
            return false
        }
        if (commentItme.content.length === 5) {
            Message('内容最少也要五个字')
            return false
        }
        return true
    }
    const insert = async (element) => {
        const bodyContent = { ...element }
        if (!element.content.length) return Message('请输入内容')
        const data = await postFn('comment/insert', element)
        if (data && data.statusCode === 200) {
            bodyContent.content = ''
            setComment(bodyContent)
            setStorageItme('reviewer',bodyContent)
            loadData()
        } else {
            Message(data.remarks || '不知道是为什么，反正是失败了')
        }
    }
    // const getUserInfo = async () => {
    //     const { statusCode, result } = await postFn('comment/check', { qq: Number(commentItme.qq) })
    //     if (statusCode === 200) {
    //         const element = { ...commentItme }
    //         element.reviewerName = result
    //         return element
    //     } else {
    //         Message('我寻思， 你这号码也不是qq的啊? ( •̀ .̫ •́ )✧')
    //         return false
    //     }
    // }
    const onSubmit = async () => {
        var qqRegex = /^\d{5,12}$/;
        const verif = await verification()
        const reviewer = getStorageItme('reviewer') || {}
        if (!verif) return
        if (!commentItme.reviewerName.length) return Message("昵称没填")
        if (commentItme.qq !== reviewer.qq && !qqRegex.test(commentItme.qq)) return Message('你这号不对呀，没有qq不准说话 (╯°□°）╯︵ ┻━┻')
        await insert({ ...commentItme })
    }
    
    useEffect(() => {
        componentDidMount()
    },[])
    return (
        <div className={ styles.commentChange }>
            <div className={styles.changeTop}>
                <span>
                    <i>QQ： </i>
                    <input value={ commentItme.qq || '' } onChange={ (ev) => changeInput('qq',ev)} placeholder='你的qq ，必须' type="text" />
                </span>
                <span>
                    <i>昵称： </i>
                    <input value={ commentItme.reviewerName || '' } onChange={ (ev) => changeInput('reviewerName',ev)} placeholder='你的昵称 ，必须' type="text" />
                </span>
                <span>
                    <i>网站：</i>
                    <input value={ commentItme.httpsrc || '' } onChange={ (ev) => changeInput('httpsrc',ev)} placeholder='你的网站，不是必须' type="text" />
                </span>
            </div>
            <div className={styles.changeContent}>
                <span><i>内容：</i><textarea value={commentItme.content || ''} onChange={ (ev) => changeInput('content',ev)}  placeholder='内容必填,不少于5字'/></span>
                <span>
                    <button onClick={ onSubmit }>提交</button>
                </span>
            </div>
        </div>
    )
}


export default CommentChange