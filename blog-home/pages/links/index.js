import { useState, useEffect } from 'react'
import GlobalLayout from '../../components/globalLayout'
import Empty from '../../components/empty'
import { getFn } from '../../utils/useAxios'
import Comment from '../../components/comment'
import styles from './Links.module.css'

export default function Links() {
    const [linkList, setLinkList] = useState([])
    const [loseLinkList, setLoseLinkList] = useState([])
    const getLink = async () => {
        const data = await getFn('links/list')
        if (data && data.statusCode === 200) {
            setLinkList(data.result.filter(item => item.status === 1))
            setLoseLinkList(data.result.filter(item => item.status === 2))
        }
    }
    const imgError = (ev) => {
        ev.target.src = 'https://www.yuxuemei.top/images/portrait.jpg'
        // ev.target.src = 'https://yuxuemei.top/api/imgS/7040217969334423552.jpeg'
    }
    useEffect(() => {
        getLink()
    },[])
	return (
		<GlobalLayout title="友情链接" titleText="有朋自远方来，不想招呼">
			<div className={styles.links}>   
                <h3>朋友们：</h3>
                <div className={styles.linksList}>
                    {
                        linkList.length ? 
                        linkList.map(item => {
                            return (
                                <a href={item.http_url} target="_blank" rel="noreferrer" title={item.description} key={ item.name + item.http_url}>
                                    <img onError={ imgError } alt={item.description} src={ item.avatar }/>
                                    <span>{ item.name }</span>
                                </a>
                            )
                        })
                        : <Empty />
                    }
                </div>
                { loseLinkList.length ? <h3>失联：</h3> : '' }
                {
                    loseLinkList.length ? 
                    <div className={styles.linksList}>
                    {
                        loseLinkList.map(item => {
                            return (
                                <a href={item.http_url} target="_blank" rel="noreferrer" key={ item.name + item.http_url}>
                                    <img onError={ imgError } src={ item.avatar }/>
                                    <span>{ item.name }</span>
                                </a>
                            )
                        })
                    } 
                    </div> : ""
                }
                <div className={styles.linksExplain}>
                    <ul>
                        <li>友链要求：</li>
                        <li>1.看心情，谁都可以。</li>
                        <li>2.原创文章必须高于0%。</li>
                        <li>3.原则上只接受技术类博客的友情链接。</li>
                        <li>4.原则上不接受没有在本站留过言突然冒出来要求加友链的。</li>
                        <li>5.好感度超过80可以无视上面的要求。</li>
                        <li>6.以上要求都是在别的网站抄的，其实没要求。</li>
                    </ul>
                    <ul>
                        <li>本站信息：</li>
                        <li>名称： 渔夫Fisherman</li>
                        <li>简介： 闲得发慌，所以做了这个网站，我也不太懂!</li>
                        <li>连接： https://www.yuxuemei.top/</li>
                        <li>头像： https://www.yuxuemei.top/images/portrait.jpg</li>
                    </ul>
                </div>
			</div>
            <Comment articleId={'links'} />
		</GlobalLayout>
	)
}
