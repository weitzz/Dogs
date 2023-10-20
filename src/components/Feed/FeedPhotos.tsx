import { useEffect } from 'react'
import FeedPhotoItem from './FeedPhotoItem'
import useFetch from '../../Hooks/useFetch'
import { PHOTOS_GET } from '../../api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import { IPhoto } from '../../types/types'
import styles from './css/FeedPhotos.module.css'

type FeedPhotosItemProps = {
    photo?: IPhoto;
    setModalPhoto: (photo: IPhoto) => void;
};

const FeedPhotos = ({ setModalPhoto }: FeedPhotosItemProps) => {
    const { data, loading, error, request } = useFetch()
    useEffect(() => {
        const fetchPhoto = async () => {
            const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { response, json } = await request(url, options)
            console.log(response, json)
            console.log('data', data)
        }
        fetchPhoto()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request])


    if (error) return <Error error={error} />
    if (loading) return <Loading />
    if (data)
        return (
            <ul className={`animeLeft ${styles.feed}`}>
                {data.map((photo: IPhoto) => (<FeedPhotoItem key={photo.id} photo={photo} setModalPhoto={setModalPhoto} />))}

            </ul>
        )
    else return null
}

export default FeedPhotos