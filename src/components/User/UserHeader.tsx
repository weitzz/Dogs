import UserHeaderNav from "./UserHeaderNav"
import styles from './css/UserHeader.module.css'
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
const UserHeader = () => {
    const [title, setTitle] = useState('')
    const location = useLocation()

    useEffect(() => {
        const { pathname } = location
        switch (pathname) {
            case '/conta/post':
                setTitle('Poste sua foto')
                break;

            case '/conta/estatisticas':
                setTitle('Estatísticas')
                break;
            case '/conta':
                setTitle('Minha conta')
                break;

            default:
                break;
        }

    }, [location])
    return (
        <header className={styles.header}>
            <h1 className="title">{title}</h1>
            <UserHeaderNav />
        </header >
    )
}

export default UserHeader