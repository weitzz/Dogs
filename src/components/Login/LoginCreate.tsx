import { useContext } from "react"
import useForm from "../../Hooks/useForm"
import Button from "../Forms/Button/Button"
import Input from "../Forms/Input/Input"
import Error from "../Helper/Error"
import { UserContext } from "../../Hooks/userContext"
import { USER_POST } from "../../api"
import useFetch from "../../Hooks/useFetch"
import Head from "../Helper/Head"

const LoginCreate = () => {
    const username = useForm()
    const email = useForm()
    const password = useForm()
    const { userLogin } = useContext(UserContext)
    const { error, loading, request } = useFetch()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { url, options } = USER_POST({
            username: username.value,
            email: email.value,
            password: password.value
        })
        const { response } = await request(url, options);
        if (response && response.ok)
            userLogin(username.value, password.value);

    }

    return (
        <section className='animeLeft'>
            <Head title='Criar conta' />
            <h1 className='title'>Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input label='Usuário' name='username' type='text' {...username} />
                <Input label='Email' name='email' type='email' {...email} />
                <Input label='Senha' name='password' type='password'  {...password} />
                {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button>}
                {error && <Error error={error} />}
            </form>
        </section>
    )

}



export default LoginCreate