import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [isLogin, setIsLogin] = useState(null)
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    return (
        <AuthContext.Provider value={{ token, setToken, isLogin, setIsLogin, user, setUser, cart, setCart }}>
            { children }
        </AuthContext.Provider>
    )
}