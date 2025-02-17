import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../../../firebase"

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
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true };
    } catch (error) {
        console.error("Error en login:", error.message);
        return { success: false, message: error.message };
    }
};


  // Función para cerrar sesión
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext