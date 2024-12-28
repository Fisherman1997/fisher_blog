import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GlobalLayout from '../../components/globalLayout'
import { postFn } from '../../utils/useAxios'
import Comment from '../../components/comment'
import hljs from 'highlight.js'
import styles from './Custom.module.css'
import 'highlight.js/styles/vs2015.css';

export default function Custom() {
    const router = useRouter()
    const [ content, setContent ] = useState('')
    const [ name, setName ] = useState('')
    const loadData = async (name) => {
        const data = await postFn('custom/find', { name: decodeURIComponent(name) })
        if (data && data.statusCode === 200) {
            setContent(data.result.content)
            hljsChange()
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
    useEffect(() => {
        const str = window.location.search.split('?name=')[1] || null
        if (!str) {
            router.replace('/')
            return
        }
        setName(str)
        loadData(str)
    }, [])
	return (
		<GlobalLayout title="关于本站" titleText="不作介绍">
			<div className={ styles.custom }>
                <div className='aticleDetailsContent' dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            {/* <Comment articleId={'custom' + name} /> */}
            { name ? <Comment articleId={'custom' + name} /> : <></> }
		</GlobalLayout>
	)
}
