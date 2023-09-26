import { Link } from 'react-router-dom'
import Input from '../Forms/Input/Input'
import Button from '../Forms/Button/Button'
import useForm from '../../Hooks/useForm'

const LoginForm = () => {
    const username = useForm()
    const password = useForm()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (username.validate() && password.validate()) {
            fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                }),
            }).then((res) => {
                return res.json()
            })
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