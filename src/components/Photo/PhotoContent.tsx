import { Link } from 'react-router-dom'
import sytles from './css/PhotoContent.module.css'
import PhotoComments from './PhotoComments'
import { IPhoto, TComment } from '../../types/types'
import { useUserContext } from '../../Hooks/userContext'
import PhotoDelete from './PhotoDelete'
import Image from '../Helper/Image/Image'

interface PhotoContentProps {
    data: {
        photo: IPhoto,
        comments: TComment[]
    }
}

const PhotoContent = ({ data }: PhotoContentProps) => {
    const { photo, comments } = data
    const { user } = useUserContext();
    return (
        <div className={sytles.photo}>
            <div className={sytles.img}>
                <Image alt={photo.title} src={photo.src} />
            </div>
            <div className={sytles.details}>
                <div>
                    <p className={sytles.author}>
                        {user && user.username === photo.author ? <PhotoDelete id={photo.id} /> :
                            <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>}
                        <span className={sytles.views}>{photo.acessos}</span>
                    </p>
                    <h1 className='title'>
                        <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
                    </h1>
                    <ul className={sytles.attributes}>
                        <li>{photo.peso} kg</li>
                        <li>{photo.idade} anos</li>

                    </ul>
                </div>
            </div>
            <PhotoComments id={photo.id} commentsList={comments} />
        </div>
    )
}

export default PhotoContent