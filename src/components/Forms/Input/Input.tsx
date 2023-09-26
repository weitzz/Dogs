import styles from './Input.module.css'

interface InputProps {
    label: string
    type: string
    name: string
    value: string
    error: string | null
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
}

const Input = ({ label, type, name, value, onChange, error, onBlur }: InputProps) => {
    return (
        <div className={styles.wrapper}>
            <label htmlFor={name} className={styles.label}>{label}</label>
            <input type={type} id={name} name={name} className={styles.input} onChange={onChange} value={value} onBlur={onBlur} />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}

export default Input