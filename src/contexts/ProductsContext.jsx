import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const ProductsContext = createContext()

export default function ProductsProvider({ children }){

    const [products, setProducts] = useState(null)
    const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        const getAllProducts = async() => {
            try {
                const producstAPIEndpoint = import.meta.env.VITE_PRODUCTS_API_ENDPOINT

                const { data } = await axios.get(producstAPIEndpoint)

                setProducts(data.products)
            } catch (error){
                console.log(error)
            }
        }

        getAllProducts()
    }, [])

    return (
        <ProductsContext.Provider value={{ products, setProducts, cart, setCart }}>
            { children }
        </ProductsContext.Provider>
    )
}