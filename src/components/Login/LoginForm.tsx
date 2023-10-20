import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Input from '../Forms/Input/Input'
import Button from '../Forms/Button/Button'
import useForm from '../../Hooks/useForm'
import { UserContext } from '../../Hooks/userContext'
import Error from '../Helper/Error'
import styles from './css/LoginForm.module.css'
import stylesBtn from '../Forms/Button/Button.module.css'


const LoginForm = () => {
    const username = useForm()
    const password = useForm()
    const { userLogin, error, loading } = useContext(UserContext)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (username.validate() && password.validate()) {
            userLogin(username.value, password.value)

        }
    }
    return (
        <section className='animeLeft'>
            <h1 className='title'>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input label='Usuário' name='username' type='text' {...username} />
                <Input label='Senha' name='password' type='password'  {...password} />
                {loading ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button>}
                {error && <Error error={error} />}
            </form>
            <Link to='/login/perdeu' className={styles.perdeu}>Perdeu a senha ?</Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
                <Link to='/login/criar' className={stylesBtn.button}>Cadastro</Link>

            </div>
        </section>
    )
}

export default LoginForm