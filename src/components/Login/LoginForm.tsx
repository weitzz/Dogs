import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Input from '../Forms/Input/Input'
import Button from '../Forms/Button/Button'
import useForm from '../../Hooks/useForm'
import { UserContext } from '../../Hooks/userContext'


const LoginForm = () => {
    const username = useForm()
    const password = useForm()
    const { userLogin } = useContext(UserContext)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (username.validate() && password.validate()) {
            userLogin(username.value, password.value)

        }
    }
    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input label='Usuário' name='username' type='text' {...username} />
                <Input label='Senha' name='password' type='password'  {...password} />
                <Button>Entrar</Button>
            </form>
            <Link to='/login/criar'>Cadastro</Link>
        </section>
    )
}

export default LoginForm