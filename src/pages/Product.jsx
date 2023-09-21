import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { HomeTrendingNow } from "./Home"
import Footer from "../components/Footer"

function Product(props){

    const [id, sum, name, img, explanation, texture, weight, size] = [props.id, props.sum, props.name, props.img, props.explanation, props.texture, props.weight, props.size]

    document.title = `Luminous | ${name}`

    const [sumItem, setSumItem] = useState(1)
    const [price, setPrice] = useState(props.price)

    const surePrice = props.price

    function addProduct(){
        setSumItem(sumItem => sumItem + 1)
        setPrice(price => price + surePrice)
    }
    
    function minusProduct(){
        if (sumItem > 1){
            setSumItem(sumItem => sumItem - 1)
            setPrice(price => price - surePrice)
        }
    }

    const [cartItems, setCartItems] = useState([...JSON.parse(localStorage.getItem("cartItems"))])

    function addProductToCart(){
        const newItem = {
            id: id,
            sum: sum,
            name: name,
            price: surePrice,
            img: img
        }

        let localItem = [...JSON.parse(localStorage.getItem("cartItems"))]

        let valid = true
        localItem.forEach(function(item){
            if (item.name === newItem.name){
                valid = false

                return
            }
        })

        if (valid){
            localItem.push(newItem)
            setCartItems(localItem)
        }
    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    document.body.classList.add("flex", "flex-col", "items-center")

    return (
        <>
            <Navbar link="store" cartItems={cartItems} />
            <section className="product mt-32 flex w-[80vw] mx-auto gap-2 mobile:w-[90vw] mobile:flex-col mobile:items-center tablet:w-[90vw]">
                <div className="product-img w-[30vw] h-fit rounded overflow-hidden mobile:w-full tablet:w-[30%]">
                    <img src={img} alt={name} />
                </div>
                <div className="product-info bg-white-prim flex flex-col items-center gap-8 p-5 rounded text-xl w-[50vw] h-fit mobile:w-full tablet:w-[70%]">
                    <div className="product-name text-3xl font-semibold">{name}</div>
                    <div className="product-explanation text-justify">{explanation}</div>
                    <div className="product-shape text-base w-full flex items-center justify-between mobile:justify-between mobile:gap-2">
                        <span className="product-texture rounded-sm p-2 bg-white shadow-med flex flex-col">
                            <div className="font-bold">Texture</div>
                            <div>{texture}</div> 
                        </span>
                        <span className="product-weight rounded-sm p-2 bg-white shadow-med flex flex-col">
                            <div className="font-bold">Weight:</div>
                            <div>{`${weight}kg`}</div>
                        </span>
                        <span className="product-size rounded-sm p-2 bg-white shadow-med flex flex-col">
                            <div className="font-bold">Size:</div>
                            <div>{size}</div>
                        </span>
                    </div>
                    <div className="bg-black/[.3] h-[1px] w-full" />
                    <div className="product-footer w-full flex items-center justify-between">
                        <span className="add-minus-product select-none">
                            <span className="add-product cursor-pointer py-2 px-4 bg-primary text-white-prim" onClick={() => minusProduct()}>-</span>
                            <span className="py-2 px-4 bg-white">{sumItem}</span>
                            <span className="minus-product cursor-pointer py-2 px-4 bg-primary text-white-prim" onClick={() => addProduct()}>+</span>
                        </span>
                        <span className="product-price  p-2 bg-primary text-white-prim rounded">{`$${price}`}</span>
                    </div>
                    <div className="procudt-checkout w-full flex items-center justify-end gap-4">
                        <div className="add-to-cart p-2 px-3 bg-white cursor-pointer shadow-med rounded-sm" onClick={() => {addProductToCart()}}>Add to cart</div>
                        <div className="checkout p-2 px-3 text-white-prim cursor-pointer shadow-med bg-primary rounded-sm">Checkout</div>
                    </div>
                </div>
            </section>
            <HomeTrendingNow />
            <Footer />
        </>
    )
}

export default Product;