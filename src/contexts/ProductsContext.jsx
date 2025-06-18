import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const ProductsContext = createContext()

export default function ProductsProvider({ children }){
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const getAllProducts = async() => {
            try {
                const producstAPIEndpoint = import.meta.env.VITE_API_ENDPOINT

                const { data } = await axios.get(`${producstAPIEndpoint}/api/products`)

                setProducts(data.data.products)
            } catch (error){
                console.log(error)
            }
        }

        getAllProducts()
    }, [])

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            { children }
        </ProductsContext.Provider>
    )
}