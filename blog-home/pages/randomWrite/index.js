import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import GlobalLayout from '../../components/globalLayout'
import Loading from '../../components/loading'
import Comment from '../../components/comment'
import { postFn } from '../../utils/useAxios'
import { imgUrl } from '../../utils/baseUrl.cofing'
import { imgShow } from '../../components/funAssembly/imgShow'
import styles from './RandomWrite.module.css'

export default function RandomWrite() {
    const router = useRouter()
    const [ load, setload ] = useState(true)
    const [ randomId, setRandomId ] = useState(null)
    const [ content, setContent ] = useState({})
    const getInfo = async (id) => {
        setload(true)
        const data = await postFn('randomWrite/findOne', { id })
        if (data && data.statusCode === 200) {
            setContent({...data.result})
        }
        setload(false)
    }
    useEffect(() => {
        const id = window.location.search.split('?id=')[1] ? Number(window.location.search.split('?id=')[1]) : null
        if (!id) {
            router.replace('/randomList')
            return
        } else {
            setRandomId(id)
            getInfo(id)
        }
    }, [])
	return (
		<GlobalLayout title="说说" titleText="想说就说">
            {
                load ? <Loading/> :
                <div className={styles.randomInfo}>
                    <div className={styles.randomInfoNav} onClick={() => router.back()}> back </div>
                    <div className={styles.randomInfoTop}>
                        <div className={styles.randomItemHead}>
                            { content.portrait && content.portrait[0] ? <img src={ imgUrl + content.portrait } /> : <></> }
                            <div className={styles.randomUserName}>
                                <p>{ content.createUserName }</p>
                                <span>{ new Date(content.createDate).toLocaleString() }</span>
                                <span>被阅览{ content.clicks }次</span>
                            </div>
                        </div>
                        <div className={styles.randomContent}>
                            <p onClick={ () => router.push({ pathname: '/randomWrite', query:{ id: content.id } }) } >{ content.content }</p>
                            { 
                                content.cover_list ?
                                <ul className='clear'>
                                    { content.cover_list.map(citem => ( <li key={citem}><img src={citem} onClick={(ev) => imgShow(ev)} /></li> )) }
                                </ul>
                                :<></>
                            }
                        </div>
                    </div>
                    { randomId ? <Comment articleId={`Comment${randomId}`} /> : <></> }
                </div>
            }
		</GlobalLayout>
	)
}
