import { useState } from 'react'

interface TypesProps {
    [key: string]: EmailProps;
}

interface EmailProps {
    regex: RegExp;
    message: string;
}

const types: TypesProps = {
    email: {
        regex: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
        message: 'Preencha um email válido'
    },
    password: {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        message: 'A senha deve conter 1 caracter maiúsculo, 1 minúsculo e 1 dígito.Com no mínimo 8 caracteres.'
    },
    number: {
        regex: /^\d+$/,
        message: 'Utilize apenas números.'
    }
}

const useForm = (type?: keyof typeof types | false) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)



    const validate = (value: string) => {
        if (type === false) return true;
        if (value.length === 0) {
            setError('Preencha um valor');
            return false;
        } else if (type && type in types && !types[type].regex.test(value)) {
            setError(types[type].message);
            return false;
        } else {
            setError(null);
            return true;
        }
    };

    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setValue(target.value)
        setValue(target.value);
    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value)
    }
}

export default useForm