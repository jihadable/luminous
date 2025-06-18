import { IconCash, IconShoppingCartPlus } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import { CartProductsContext } from "../contexts/CartProductsContext"
import { ProductsContext } from "../contexts/ProductsContext"
import { getIdCurrency } from "../utils/getIdCurrency"
import NotFound from "./NotFound"

function Product(){

    const { product_id } = useParams()

    const { isLogin, user } = useContext(AuthContext)
    const { products } = useContext(ProductsContext)
    const { cartProducts, setCartProducts } = useContext(CartProductsContext)
    
    const [product, setProduct] = useState(null)
    
    useEffect(() => {
        if (products !== null){
            setProduct(products.filter(product => product.id === product_id)[0])
        }
    }, [product_id, products])
    
    const productImagesAPIEndpoint = import.meta.env.VITE_STORAGE_API
    const [quantity, setQuantity] = useState(1)

    const [isLoading, setIsLoading] = useState(false)

    const reduceQuantity = () => {
        if (quantity === 1) return

        setQuantity(quantity => quantity - 1)
    }

    const addToCart = async() => {
        if (checkCartIncludesProduct(product.id)){
            return
        }

        try {
            setIsLoading(true)
            const cartProductsAPIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const token = localStorage.getItem("token")

            const { data } = await axios.post(`${cartProductsAPIEndpoint}/api/carts/${user.cart.id}`, 
                { product_id: product.id },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            const newCartProduct = data.data.cart_product

            setCartProducts([{...newCartProduct, product: {...newCartProduct.product, quantity, price: newCartProduct.product.price * quantity}}, ...cartProducts])

            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.error("Gagal menambahakn produk ke keranjang")
        }
    }

    const checkCartIncludesProduct = product_id => {
        for (const { product } of cartProducts){
            if (product.id === product_id) return true
        }

        return false
    }

    if (product === undefined && products !== null){
        return <NotFound />
    }

    if (products !== null && product !== undefined && product !== null){
        document.title = `Luminous | ${product ? product.name : "Produk"}` 

        return (
            <>
                <Navbar link="store" />
            {
                product !== null &&
                <section className="product mt-32 mb-20 flex w-[80vw] mx-auto gap-2 mobile:w-[90vw] mobile:flex-col mobile:items-center tablet:w-[90vw]">
                    <div className="product-img w-[30vw] h-fit rounded overflow-hidden mobile:w-full tablet:w-[30%]">
                        <img src={`${productImagesAPIEndpoint}/${product.image_url}`} alt={product.name} />
                    </div>
                    <div className="product-info bg-primary/[.1] flex flex-col items-center gap-8 p-5 rounded text-xl w-[50vw] h-fit mobile:w-full tablet:w-[70%]">
                        <div className="product-name text-3xl font-semibold">{product.name}</div>
                        <div className="product-explanation text-justify">{product.description}</div>
                        <div className="product-shape text-base w-full flex items-center justify-between mobile:justify-between mobile:gap-2">
                            <span className="product-texture rounded-sm p-2 bg-white shadow-med flex flex-col">
                                <div className="font-bold">Texture:</div>
                                <div>{product.texture}</div> 
                            </span>
                            <span className="product-weight rounded-sm p-2 bg-white shadow-med flex flex-col">
                                <div className="font-bold">Weight:</div>
                                <div>{product.weight}</div>
                            </span>
                            <span className="product-size rounded-sm p-2 bg-white shadow-med flex flex-col">
                                <div className="font-bold">Size:</div>
                                <div>{product.size}</div>
                            </span>
                        </div>
                    {
                        isLogin === true &&
                        <>
                        <div className="bg-black/[.3] h-[1px] w-full" />
                        <div className="product-footer w-full flex items-center justify-between">
                            <span className="add-minus-product select-none">
                                <span className="add-product cursor-pointer py-2 px-4 bg-primary text-white-prim" onClick={reduceQuantity}>-</span>
                                <span className="py-2 px-4 bg-white">{quantity}</span>
                                <span className="minus-product cursor-pointer py-2 px-4 bg-primary text-white-prim" onClick={() => setQuantity(quantity => quantity + 1)}>+</span>
                            </span>
                            <span className="product-price  p-2 bg-primary text-white-prim rounded">{getIdCurrency(product.price * quantity)}</span>
                        </div>
                        <div className="w-full flex items-center justify-end gap-4 mobile:flex-col mobile:items-end">
                        {
                            isLoading ? 
                            <button type="button" className="flex items-center gap-2 p-2 px-24 bg-white shadow-med rounded-sm">
                                <Loader width={28} height={28} />
                            </button> :
                            <button type="button" className="add-to-cart flex items-center gap-2 p-2 px-3 bg-white cursor-pointer shadow-med rounded-sm" onClick={addToCart}>
                                <IconShoppingCartPlus stroke={1.5} />
                                <span>Add to cart</span>
                            </button>
                        }
                            <button className="checkout flex items-center gap-2 p-2 px-3 text-white-prim shadow-med bg-primary rounded-sm">
                                <IconCash stroke={1.5} />
                                <span>Checkout</span>
                            </button>
                        </div>
                        </>
                    }
                    </div>
                </section>
            }
                <Footer />
            </>
        )
    }
}

export default Product;