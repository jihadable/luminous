import { IconCash, IconShoppingCartPlus } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import goTop from "../components/goTop"
import { items } from "../components/items"
import { AuthContext } from "../contexts/AuthContext"
import { HomeTrendingNow } from "./Home"

function Product(){

    const { id } = useParams()

    const item = items.filter(item => item.id == id)[0]

    document.title = `Luminous | ${item.name}`

    const { setCart } = useContext(AuthContext)

    const [quantity, setQuantity] = useState(item.quantity)
    const [price, setPrice] = useState(item.price)

    function addProduct(){
        setQuantity(quantity + 1)
    }
    
    function minusProduct(){
        if (quantity > 1){
            setQuantity(quantity - 1)
        }
    }

    useEffect(() => {
        setPrice(item.price * quantity)
    }, [quantity])

    function addProductToCart(){
        let localItems = [...JSON.parse(localStorage.getItem("cartItems"))]

        for (let i = 0 ; i < localItems.length ; i++){
            if (localItems[i].id === item.id){
                return
            }
        }

        setCart(cartItems => ([...cartItems, {...item, quantity: quantity, price: price}]))
    }

    return (
        <>
            <Navbar link="store" />
            <section className="product mt-32 flex w-[80vw] mx-auto gap-2 mobile:w-[90vw] mobile:flex-col mobile:items-center tablet:w-[90vw]">
                <div className="product-img w-[30vw] h-fit rounded overflow-hidden mobile:w-full tablet:w-[30%]">
                    <img src={item.img} alt={item.name} />
                </div>
                <div className="product-info bg-white-prim flex flex-col items-center gap-8 p-5 rounded text-xl w-[50vw] h-fit mobile:w-full tablet:w-[70%]">
                    <div className="product-name text-3xl font-semibold">{item.name}</div>
                    <div className="product-explanation text-justify">{item.explanation}</div>
                    <div className="product-shape text-base w-full flex items-center justify-between mobile:justify-between mobile:gap-2">
                        <span className="product-texture rounded-sm p-2 bg-white shadow-med flex flex-col">
                            <div className="font-bold">Texture</div>
                            <div>{item.texture}</div> 
                        </span>
                        <span className="product-weight rounded-sm p-2 bg-white shadow-med flex flex-col">
                            <div className="font-bold">Weight:</div>
                            <div>{`${item.weight}kg`}</div>
                        </span>
                        <span className="product-size rounded-sm p-2 bg-white shadow-med flex flex-col">
                            <div className="font-bold">Size:</div>
                            <div>{item.size}</div>
                        </span>
                    </div>
                    <div className="bg-black/[.3] h-[1px] w-full" />
                    <div className="product-footer w-full flex items-center justify-between">
                        <span className="add-minus-product select-none">
                            <span className="add-product cursor-pointer py-2 px-4 bg-primary text-white-prim" onClick={() => minusProduct()}>-</span>
                            <span className="py-2 px-4 bg-white">{quantity}</span>
                            <span className="minus-product cursor-pointer py-2 px-4 bg-primary text-white-prim" onClick={() => addProduct()}>+</span>
                        </span>
                        <span className="product-price  p-2 bg-primary text-white-prim rounded">{`$${price}`}</span>
                    </div>
                    <div className="product-checkout w-full flex items-center justify-end gap-4">
                        <div className="add-to-cart flex items-center gap-2 p-2 px-3 bg-white cursor-pointer shadow-med rounded-sm" onClick={() => {addProductToCart()}}>
                            <IconShoppingCartPlus stroke={1.5} />
                            <span>Add to cart</span>
                        </div>
                        <Link to={`/checkout/product/${item.id}`} onClick={goTop} className="checkout flex items-center gap-2 p-2 px-3 text-white-prim cursor-pointer shadow-med bg-primary rounded-sm">
                            <IconCash stroke={1.5} />
                            <span>Checkout</span>
                        </Link>
                    </div>
                </div>
            </section>
            <HomeTrendingNow />
            <Footer />
        </>
    )
}

export default Product;