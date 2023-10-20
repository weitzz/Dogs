import useFetch from '../../Hooks/useFetch';
import { PHOTO_DELETE } from '../../api';
import styles from './css/PhotoDelete.module.css'

type Props = {
    id: number
}

const PhotoDelete = ({ id }: Props) => {
    const { loading, request } = useFetch();
    const handleClick = async () => {
        const confirm = window.confirm("Tem certeza que deseja deletar ? ")
        if (confirm) {
            const { url, options } = PHOTO_DELETE(id)
            const { response } = await request(url, options)
            if (response?.ok) window.location.reload();
        }
    }
    return (
        <>
            {loading ? <button disabled className={styles.delete}> Deletando...</button > : <button onClick={handleClick} className={styles.delete}>Deletar</button>}
        </>

    )
}

export default PhotoDelete