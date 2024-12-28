import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import GlobalLayout from '../../components/globalLayout'
import ListAll from '../../components/listAll'
import styles from './Search.module.css'

export default function Search(props) {
    const [searchText, setSearchText] = useState("")
    const ListAllRef = useRef()
    const router = useRouter()

    const searchLoad = (search) => {
        console.log(search)
        window.history.pushState({},'',`${location.pathname}?search=${search}`)
        ListAllRef.current.loadData()
    }
    
    const handleKeyUp = (e) => {
        if (e.key === 'Enter') searchLoad(searchText)
    }

    useEffect(() => {
        let { search } = router.query
        if (!search) {
            search = new URLSearchParams(location.search).get("search")
        }
        if (search) {
            setSearchText(search)
            searchLoad(search)
        }
    },[])
	return (
		<GlobalLayout title="搜索" titleText={ ` 搜索：${searchText}` }>
            <div className={styles.search}> 
                <span>内容：</span>
                <input 
                    value={ searchText } 
                    onChange={ (ev) => setSearchText(ev.target.value)} 
                    onKeyUp={handleKeyUp}
                    placeholder='搜索内容' 
                    type="text" />
                <button onClick={() => searchLoad(searchText)}>搜索</button>
            </div>
            <ListAll ref={ListAllRef} url='article/findArticleAndRandomWrite' type='search' reload={false}/>
		</GlobalLayout>
	)
}
