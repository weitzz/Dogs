import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../Hooks/userContext';
import MinhasFotos from '../../assets/feed.svg';
import Estatisticas from '../../assets/estatisticas.svg'
import AdicionarFoto from '../../assets/adicionar.svg'
import Sair from '../../assets/sair.svg'
import styles from './css/UserHeaderNav.module.css'
import useMedia from '../../Hooks/useMedia';
const UserHeaderNav = () => {
    const [mobileMenu, setMobileMenu] = useState(false)
    const { userLogout } = useUserContext();
    const mobile = useMedia('(max-width: 40rem)');
    const { pathname } = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        setMobileMenu(false)
    }, [pathname])

    const handleLogout = () => {
        if (userLogout) {
            userLogout();
        }
        navigate('/login')
    }
    return (
        <>
            {mobile &&
                <button aria-label='Menu' className={`${styles.mobileBtn} ${mobileMenu && styles.mobileBtnActive}`} onClick={() => setMobileMenu(!mobileMenu)}></button>}
            <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
                <NavLink to='/conta' end><MinhasFotos />{mobile && 'Minhas fotos'}</NavLink>
                <NavLink to='/conta/estatisticas'><Estatisticas />{mobile && 'Estatísticas'}</NavLink>
                <NavLink to='/conta/post'><AdicionarFoto />{mobile && 'Adicionar foto'}</NavLink>
                <button onClick={handleLogout}><Sair />{mobile && 'Sair'}</button>

            </nav>

        </>
    )
}

export default UserHeaderNav