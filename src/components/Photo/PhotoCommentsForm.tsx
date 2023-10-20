import React, { useState } from 'react'
import Enviar from '../../assets/enviar.svg'
import useFetch from '../../Hooks/useFetch'
import { COMMENT_POST } from '../../api'
import Error from '../Helper/Error'
import { TComment } from '../../types/types'
import styles from './css/PhotoCommentsForm.module.css'


interface PhotoCommentsFormProps {
    id: number
    setComments: React.Dispatch<React.SetStateAction<TComment[]>>
}

const PhotoCommentsForm = ({ id, setComments }: PhotoCommentsFormProps) => {
    const [comment, setComment] = useState('')
    const { request, error } = useFetch()

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        setComment(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const { url, options } = COMMENT_POST(id, { comment })
        const { response, json } = await request(url, options)
        if (response?.ok) {
            setComment('')
            setComments((comments: TComment[]) => [...comments, json])
        }
    }

    return (
        <form className={styles.form} onClick={handleSubmit}>
            <textarea
                className={styles.textarea}
                id='comment'
                name='comment'
                placeholder='Comente...'
                value={comment}
                onChange={handleChange} />
            <button className={styles.button}>
                <Enviar />
            </button>

            <Error error={error} />
        </form>
    )
}

export default PhotoCommentsForm