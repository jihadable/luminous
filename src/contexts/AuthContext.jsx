import { createContext, useState } from "react"

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [isLogin, setIsLogin] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={{ token, setToken, isLogin, setIsLogin, isAdmin, setIsAdmin, user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}