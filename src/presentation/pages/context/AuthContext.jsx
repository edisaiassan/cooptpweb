import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../../../firebase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  //Recupera el user del localStorage, si no existe se setea null
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  //Majear persistencia de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      if (currentuser) {
        const userData = { uid: currentuser.uid, email: currentuser.email }

        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
    })
    return () => unsubscribe()
  }, [auth])

  //Función para iniciar sesión
  const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; // Acceder correctamente al usuario

        const userData = { uid: user.uid, email: user.email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        return { success: true };
    } catch (e) {
        const passwordErrors = [
            { test: 'auth/network-request-failed', message: 'Error de conexión' },
            { test: 'auth/invalid-credential', message: 'Datos inválidos' }
        ];

        const errorMessage = passwordErrors.find(error => error.test === e.code)?.message || 'Error desconocido';

        return { success: false, message: errorMessage };
    }
}


  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {

      if (error.code === 'auth/network-request-failed') {
        return { success: false, message: 'Error de conexión. Verifica tu internet.' };
      } else {
        return { success: false, message: 'Ocurrió un error inesperado al cerrar sesión.' };
      }
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext