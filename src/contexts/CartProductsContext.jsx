import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartProductsContext = createContext()

export default function CartProductsProvider({ children }){
    const { isLogin } = useContext(AuthContext)
    const [cartProducts, setCartProducts] = useState(null)

    useEffect(() => {
        const getAllCartProducts = async() => {
            if (isLogin === true){
                try {
                    const cartProductsAPIEndpoint = import.meta.env.VITE_CART_PRODUCTS_API_ENDPOINT
                    const token = localStorage.getItem("token")
    
                    const { data } = await axios.get(cartProductsAPIEndpoint, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })
    
                    setCartProducts(data.cart_products)
                } catch (error) {
                    setCartProducts(null)
                }
            }
        }

        getAllCartProducts()
    }, [isLogin])
    
    return <CartProductsContext.Provider value={{ cartProducts, setCartProducts }}>
        {children}
    </CartProductsContext.Provider>
}