import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import { useEffect } from 'react'
import { PHOTO_GET } from '../../api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading/Loading'
import PhotoContent from './PhotoContent'
import Head from '../Helper/Head'

const Photo = () => {
    const { id } = useParams()
    const { data, loading, error, request } = useFetch()

    useEffect(() => {
        const { url } = PHOTO_GET(id as string)
        request(url)
    }, [id, request])

    if (error) return <Error error={error} />
    if (loading) return <Loading />
    if (data)
        return (
            <section className='container mainContainer'>
                <Head title={data.photo.title} />
                <PhotoContent data={data} single={true} /></section>
        )
}

export default Photo