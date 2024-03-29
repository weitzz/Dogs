import Head from "../Helper/Head"
import Input from "../Forms/Input/Input"
import Button from "../Forms/Button/Button"
import useForm from "../../Hooks/useForm"
import useFetch from "../../Hooks/useFetch"
import { useEffect, useState } from "react"
import { PASSWORD_RESET } from "../../api"
import Error from "../Helper/Error"
import { useNavigate } from "react-router-dom"
const LoginReset = () => {
    const [login, setLogin] = useState('')
    const [key, setKey] = useState('')
    const password = useForm()
    const { error, loading, request } = useFetch()
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const key = params.get('key')
        const login = params.get('login')
        if (key) setKey(key)
        if (login) setLogin(login)
    }, [])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (password.validate()) {
            const { url, options } = PASSWORD_RESET({ login, key, password: password.value })
            const { response } = await request(url, options)

            if (response && response.ok) navigate('/login')
        }
    }

    return (
        <section className="animeLeft">
            <Head title='Resete a senha' />
            <form onSubmit={handleSubmit}>
                <Input label="Nova senha" type="password" name='password' {...password} />
                {loading ? <Button disabled >Resetando...</Button> : <Button>Resetar</Button>}
            </form>
            <Error error={error} />
        </section>
    )
}

export default LoginReset