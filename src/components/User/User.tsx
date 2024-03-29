import UserHeader from './UserHeader'
import { Route, Routes } from 'react-router-dom'
import Feed from '../Feed/Feed'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import { useUserContext } from '../../Hooks/userContext'
import NotFound from '../NotFound'
import Head from '../Helper/Head'


const User = () => {
    const { user } = useUserContext()

    return (
        <section className='container'>
            <Head title='Minha conta' />
            <UserHeader />
            <Routes>
                <Route path='/' element={<Feed user={user?.id} />} />
                <Route path='/post' element={<UserPhotoPost />} />
                <Route path='/estatisticas' element={<UserStats />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </section>
    )
}

export default User