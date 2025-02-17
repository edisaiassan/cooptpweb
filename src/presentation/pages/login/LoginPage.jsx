import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"

export const LoginPage = () => {

    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await login(email, password)
        if (!response.success) {
            setError(response.message)
        }
    }

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Ingresar</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}
