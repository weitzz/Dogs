import { useEffect } from 'react'
import FeedPhotoItem from './FeedPhotoItem'
import useFetch from '../../Hooks/useFetch'
import { PHOTOS_GET } from '../../api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading/Loading'
import { IPhoto } from '../../types/types'
import styles from './css/FeedPhotos.module.css'

type FeedPhotosItemProps = {
    photo?: IPhoto;
    setModalPhoto: (photo: IPhoto) => void;
    user?: number | string
    page?: number
    setInfinite: React.Dispatch<React.SetStateAction<boolean>>
};

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }: FeedPhotosItemProps) => {
    const { data, loading, error, request } = useFetch()
    useEffect(() => {
        const fetchPhoto = async () => {
            const total = 6
            const { url, options } = PHOTOS_GET({ page: page, total: total, user: user })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { response, json } = await request(url, options)
            if (response && response.ok && json.length < 3) {
                setInfinite(false);
            }
        }
        fetchPhoto()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request, user, page, setInfinite])


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