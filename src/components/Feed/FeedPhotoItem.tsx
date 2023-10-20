import { IPhoto } from "../../types/types"
import styles from './css/FeedPhotoItem.module.css'

type FeedPhotosItemProps = {
    photo: IPhoto;
    setModalPhoto: (photo: IPhoto) => void;
};


const FeedPhotoItem = ({ photo, setModalPhoto }: FeedPhotosItemProps) => {
    const handleClick = () => {
        setModalPhoto(photo)
    }
    return (
        <li className={styles.photo} onClick={handleClick}>
            <img src={photo.src} alt={photo.title} />
            <span className={styles.views}>{photo.acessos}</span>
        </li>
    )
}

export default FeedPhotoItem