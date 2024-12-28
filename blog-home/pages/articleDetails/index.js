import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GlobalLayout from '../../components/globalLayout'
import hljs from 'highlight.js'
import { postFn } from '../../utils/useAxios'
import Comment from '../../components/comment'
import Loading from '../../components/loading'
import { Message } from '../../components/funAssembly/message'
import { imgShow } from '../../components/funAssembly/imgShow'
import styles from './AticleDetails.module.css'
import 'highlight.js/styles/vs2015.css';

export default function AticleDetails() {
    const router = useRouter()
    const [ content, setContent ] = useState({})
    const [ rightNav, setRightNav ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const loadData = async (id) => {
        setLoading(true)
        const data = await postFn('article/findOne', { id: Number(id) })
        if (data && data.statusCode === 200) {
            data.result.cover = data.result.cover[0]
            setContent(data.result)
            hljsChange()
            setLoading(false)
            // console.log(data.result)
        } else {
            setLoading(false)
            Message('失败')
            router.back()
        }
    }
    const hljsChange = () => {
        // 使用hljs库为html中code上色
        setTimeout(() => {
            document.querySelectorAll('pre code').forEach((el) => {
                hljs.highlightElement(el);
            });
        })
    }
    const jumpPosition = (domId, topSpace = 350) => {
        const dom = document.getElementById(domId);
        const targetPosition = dom.offsetTop + topSpace - 85;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const smoothScroll = setInterval(() => {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            const distance = targetPosition - scrollTop;
            if (Math.abs(distance) <= 5) {
                window.scrollTo(0, targetPosition);
                clearInterval(smoothScroll);
            } else {
                const step = Math.sign(distance) * Math.min(Math.abs(distance) / 10, 40);
                window.scrollTo(0, scrollTop + step);
            }
        }, 8); 
        setTimeout(() => clearInterval(smoothScroll), 1000);
        setRightNav(false);
    };
    const navConstruct = (contents, topSpace) => {
        // 渲染目录
        return contents.map(item => {
            return (
                <span key={item.title}>
                    <a onClick={ () => jumpPosition(item.id, topSpace) } >{ item.title }</a>
                    { item.children && item.children.length ?  
                        <ul>
                            { navConstruct(item.children, topSpace) }
                        </ul>
                    : <></> }
                </span>
            )
        })
    }
    const next = (id) => {
        router.push({ pathname: '/articleDetails', query:{ id: id } })
        loadData(id)
    }
    const imgAticlePreview = (ev) => {
        if (ev.target.nodeName === 'IMG') {
            console.log('IMG')
            imgShow(ev)
        }
    }
    useEffect(() => {
        const str = window.location.search.split('?id=')[1] || null
        if (!str) {
            router.back()
            return
        }
        loadData(str)
        document.onscroll = (ev) => {
            const top = document.body.scrollTop || document.documentElement.scrollTop
            const left = document.querySelector('.aticleDetails_content')
            const right = document.querySelector('.aticleDetails_nav div')
            let rightY = Math.max(top - 260, 0)
            rightY = Math.min(rightY, left && left.offsetHeight - right.offsetHeight)
            right && ( right.style = `transform:translateY(${rightY}px)` )
        }
        return () => {
            // componentWillUnmount
            // console.log('articleDetails end')
            document.onscroll = null
        }
    },[])
	return (
		<GlobalLayout 
            title={ content.title || '加载中...' } 
            titleText={ content.title || '加载中...' } 
            homebj={ content.cover }>
            {
                loading ? <Loading /> :
                <div className={ styles.aticleDetails }>
                    <div className={ `${styles.aticleDetailsLeft}  animate__fadeIn aticleDetails_content` }>
                        <div className={ styles.aticleDetailsHead }>
                            <span>时间：{ new Date(content.createDate).toLocaleString() }</span>
                            <span>笔者：{ content.createUserName }</span>
                            <span>阅览：{ content.clicks }</span>
                        </div>
                        {/* <div className={styles.aticleDetailsHead} >
                        </div> */}
                        <div className='aticleDetailsContent' onClick={imgAticlePreview} dangerouslySetInnerHTML={{ __html: content.content }}>
                        </div>
                    </div>
                    <div className={ `${styles.aticleDetailsRight} aticleDetails_nav` }>
                        <div>
                        {
                            content.contents ? navConstruct(content.contents) : <></>
                        }
                            <span key={"commentTap"}>
                                <a onClick={ () => jumpPosition("commentTap") } >评论</a>
                            </span>
                        </div>
                    </div>
                </div>
            }
            <div className={ styles.aticleDetailsNext }>
                <span>上一篇：{ content.before ? <i onClick={ () => next(content.before.id) }>{ content.before.title }</i> : '无' }</span>
                <span>下一篇：{ content.after ? <i onClick={ () => next(content.after.id) }>{ content.after.title }</i> : '无' }</span>
            </div>
            { content.id ?  <Comment articleId={`article${content.id}`} /> : <></> }
            <div className={ styles.navBut } onClick={ () => setRightNav(true) }></div>
            { 
                rightNav ? 
                <div className={ `${styles.rightNavList} animate__fadeInRightBig` }>
                    <h3>目录</h3>
                    <i onClick={ () => setRightNav(false) }></i>
                    { 
                        content.contents ? 
                        navConstruct(content.contents, 230) 
                        : <></> 
                    }
                    <span key={"commentTap"}>
                        <a onClick={ () => jumpPosition("commentTap") } >评论</a>
                    </span>
                </div> 
                : <></> 
            }
		</GlobalLayout>
	)
}
