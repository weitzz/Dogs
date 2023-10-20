import { ReactNode, useContext } from 'react'
import { UserContext } from '../../Hooks/userContext'
import { Navigate } from 'react-router-dom'


interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { login } = useContext(UserContext)

    if (login === true) {
        return children
    } else if (login === false) {
        return <Navigate to='/login' />
    } else {

        return <></>
    }
}

export default ProtectedRoute