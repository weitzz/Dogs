import { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../../Hooks/userContext'
import PhotoCommentsForm from './PhotoCommentsForm'
import styles from './css/PhotoComments.module.css'
import { TComment } from '../../types/types'


type Props = {
    id: number;
    commentsList: TComment[];
    single: boolean
}

const PhotoComments = ({ id, commentsList, single }: Props) => {
    const [comments, setComments] = useState(() => commentsList)
    const commentSection = useRef<HTMLUListElement | null>(null)
    const { login } = useUserContext()
    console.log(comments)
    useEffect(() => {
        if (commentSection.current) {
            commentSection.current.scrollTop = commentSection.current.scrollHeight;
        }
    }, [comments, commentSection])
    return (
        <>
            <ul ref={commentSection} className={`${styles.comments} ${single ? styles.single : ""} `}>
                {comments.map(comment => <li key={comment.comment_ID}>
                    <b>{comment.comment_author}:</b>
                    <span>{comment.comment_content}</span>
                </li>)}
            </ul>

            {login && <PhotoCommentsForm id={id} setComments={setComments} single={single} />}
        </>
    )
}

export default PhotoComments