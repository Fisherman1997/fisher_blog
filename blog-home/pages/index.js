// import { useRouter } from 'next/router'
import GlobalLayout from '../components/globalLayout'
import ListAll from '../components/listAll'

export default function Home() {
	// const router = useRouter()
	return (
		<GlobalLayout title="首页">
			<div>
				<ListAll url='article/findArticleAndRandomWrite' />
			</div>
		</GlobalLayout>
	)
}
