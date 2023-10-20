import { useEffect } from 'react'
import useFetch from '../../Hooks/useFetch'
import { IPhoto } from '../../types/types'
import styles from './css/FeedModal.module.css'
import { PHOTO_GET } from '../../api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import PhotoContent from '../Photo/PhotoContent'

type FeedModalProps = {
    photo: IPhoto;
    setModalPhoto: (photo: IPhoto | undefined) => void;
};


const FeedModal = ({ photo, setModalPhoto }: FeedModalProps) => {

    const { data, loading, error, request } = useFetch()

    const handleOutsideClick = (event: React.MouseEvent<HTMLElement>) => {
        if (event.target === event.currentTarget) {
            setModalPhoto(undefined);
        }
        console.log(photo)
    };

    useEffect(() => {
        async function fetchPhoto() {
            const { url, options } = PHOTO_GET(photo.id);
            await request(url, options);
        }
        fetchPhoto();
    }, [photo, request])
    return (
        <div className={styles.modal} onClick={handleOutsideClick} >
            {error && <Error error={error} />}
            {loading && <Loading />}
            {data && <PhotoContent data={data} />}
        </div>
    )
}

export default FeedModal