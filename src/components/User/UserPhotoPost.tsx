import { useEffect, useState } from 'react'
import useForm from '../../Hooks/useForm'
import Button from '../Forms/Button/Button'
import Input from '../Forms/Input/Input'
import styles from './css/UserPhotoPost.module.css'
import useFetch from '../../Hooks/useFetch'
import { PHOTO_POST } from '../../api'
import Error from '../Helper/Error'
import { useNavigate } from 'react-router-dom'

type Img = {
    raw: File,
    preview: string
}

const UserPhotoPost = () => {
    const nome = useForm()
    const peso = useForm('number')
    const idade = useForm('number')
    const [image, setImage] = useState<Img>({} as Img)
    const { data, error, loading, request } = useFetch()
    const navigate = useNavigate()


    useEffect(() => {
        if (data) navigate('/conta')
    }, [data, navigate])


    const handleSubmitFoto = async (event: React.FormEvent) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('img', image.raw)
        formData.append('nome', nome.value)
        formData.append('peso', peso.value)
        formData.append('idade', idade.value)
        const token = window.localStorage.getItem('token') as string
        const { url, options } = PHOTO_POST(formData, token)
        const { response, json } = await request(url, options)
        console.log(response, json)
    }


    const handleImgChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setImage({
            preview: URL.createObjectURL((target.files as FileList)[0]),
            raw: (target.files as FileList)[0]
        })
    }
    return (
        <section className={`${styles.photoPost} animeLeft`}>
            <form onSubmit={handleSubmitFoto}>
                <Input label='Nome' type='text' name='nome' {...nome} />
                <Input label='Peso' type='text' name='peso' {...peso} />
                <Input label='Idade' type='text' name='idade' {...idade} />
                <input className={styles.file} type="file" name='img' id='img' onChange={handleImgChange} />
                {loading ? <Button>Enviando...</Button> : <Button>Enviar</Button>}
                <Error error={error} />
            </form>
            <div >
                {image.preview &&
                    <div className={`${styles.preview}`} style={{ backgroundImage: `url('${image.preview}')` }}></div>
                }
            </div>
        </section>
    )
}

export default UserPhotoPost