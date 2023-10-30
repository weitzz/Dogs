import { useParams } from 'react-router-dom'
import Feed from '../Feed/Feed'
import Head from '../Helper/Head'

const UserProfile = () => {
    const { user } = useParams()
    return (
        <div>
            <Head title={user} description="Página do usuário" />
            <h1 className='title'>{user}</h1>
            <Feed user={user} />
        </div>
    )
}

export default UserProfile