import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { useUserContext } from '../../Hooks/userContext'
// import { ReactComponent as Dogs } from '../../assets/dogs.svg'

const Header = () => {
    const { user, login } = useUserContext();
    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <Link className={styles.logo} to='/' aria-label='Dogs - Home'>
                    {/* <Dogs /> */}
                </Link>
                {(login && user &&
                    <Link to='/conta' className={styles.login}>{user.nome}
                    </Link>) ||
                    <Link to='/login' className={styles.login}>Login / Criar</Link>}

            </nav>
        </header>
    )
}

export default Header