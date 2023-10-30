import { useParams } from 'react-router-dom'
import Feed from '../Feed/Feed'

const UserProfile = () => {
    const { user } = useParams()
    return (
        <div>
            <h1 className='title'>{user}</h1>
            <Feed user={user} />
        </div>
    )
}

export default UserProfile