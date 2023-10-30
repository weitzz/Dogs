import { useEffect } from 'react'


type Props = {
    title: string | undefined
    description?: string
}

const Head = ({ title, description }: Props) => {

    useEffect(() => {
        document.title = title + " | Dogs"
        document.querySelector("meta[name='description']")?.setAttribute('content', description || '')
    }, [title, description])

    return (
        null
    )
}

export default Head