import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import GlobalLayout from '../../components/globalLayout'
import ListAll from '../../components/listAll'
import { getFn } from '../../utils/useAxios'
import styles from './Article.module.css'

export default function Article() {
    const router = useRouter()
    const [classList, setClassList] = useState([])
    const getClass = async () => {
        const data = await getFn('class/list')
        if (data && data.statusCode === 200) {
            setClassList(data.result)
        }
    }
    useEffect(() => {
		getClass()
    }, [])
	return (
		<GlobalLayout title="文章" titleText="文章/笔记">
			<div className={styles.article}>
				<div className={styles.articleContent}>
					<ListAll url='article/list' type='article'/>
				</div>
				<div className={styles.articleRight}>
					<ul>
						{ 
							classList.length ? 
							classList.map(item => {
								return (
									<li key={item.id} onClick={ () => router.push({path:'article',query: { id: item.id }}) }>{item.name}</li>
								)
							})
							: '' 
						}
					</ul>
				</div>
			</div>
		</GlobalLayout>
	)
}
