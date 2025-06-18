import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartProductsContext = createContext()

export default function CartProductsProvider({ children }){
    const { isLogin, user } = useContext(AuthContext)
    const [cartProducts, setCartProducts] = useState(null)

    useEffect(() => {
        localStorage.setItem("cart_products", cartProducts)
    }, [cartProducts])

    useEffect(() => {
        const getAllCartProducts = async() => {
            if (isLogin === true){
                try {
                    const cartProductsAPIEndpoint = import.meta.env.VITE_API_ENDPOINT
                    const token = localStorage.getItem("token")
    
                    const { data } = await axios.get(`${cartProductsAPIEndpoint}/api/carts/${user.cart.id}`, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })
    
                    setCartProducts(data.data.cart_products)
                } catch (error) {
                    setCartProducts(null)
                }
            }
        }

        getAllCartProducts()
    }, [isLogin, user])
    
    return <CartProductsContext.Provider value={{ cartProducts, setCartProducts }}>
        {children}
    </CartProductsContext.Provider>
}