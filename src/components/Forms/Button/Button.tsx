import styles from './Button.module.css'
interface ButtonProps {
  children: React.ReactNode
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.button}>{children}</button>
  )
}

export default Button