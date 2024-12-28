import GlobalLayout from '../../components/globalLayout'
import ListAll from '../../components/listAll'
import styles from './RandomList.module.css'

export default function RandomList() {
    // const router = useRouter()
	return (
		<GlobalLayout title="说说" titleText="想说就说">
			<div className={styles.randomWrite}>
				<div className={styles.randomWriteContent}>
					<ListAll url='randomWrite/list' type='randomWrite'/>
				</div>
			</div>
		</GlobalLayout>
	)
}
