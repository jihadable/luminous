import { IconCash } from "@tabler/icons-react"
import Navbar from "../components/Navbar"
import { IconTrash } from "@tabler/icons-react"
import { IconCheck } from "@tabler/icons-react"
import { IconDiscount } from "@tabler/icons-react"
import { useState } from "react"
import { IconChecks } from "@tabler/icons-react"
import Footer from "../components/Footer"
import { IconShoppingCartOff } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import goTop from "../components/goTop"

export default function Checkout({ item, cartItems, setCartItems }){

    document.title = "Luminous | Checkout"

    const [initialItem, setInitialItem] = useState(item)

    if (initialItem && cartItems.length > 0){

        for (let i = 0 ; i < cartItems.length ; i++){
            if (cartItems[i].id === initialItem.id){
                setInitialItem(null)
                break
            }
        }
    }

    const [checkoutItems, setCheckoutItems] = useState([])

    function addRemoveCheckoutItems(item){
        if (checkingCheckoutItems(item.id)){
            const updatedCheckoutItems = [...checkoutItems].filter(checkoutItem => checkoutItem.id !== item.id)

            setCheckoutItems(updatedCheckoutItems)

            return
        }
        
        setCheckoutItems(checkoutItems => ([...checkoutItems, item]))
    }

    function checkingCheckoutItems(id){
        for (let i = 0 ; i < checkoutItems.length ; i++){
            if (checkoutItems[i].id === id){
                return true
            }
        }

        return false
    }

    function checkoutTotalPrice(){
        let price = 0
        checkoutItems.forEach(function(item){
            price += item.price
        })

        return price
    }

    function addQuantity(id){
        const updatedCartItems = [...cartItems].map(cartItem => {
            if (cartItem.id === id){
                let quantity = cartItem.quantity + 1
                let price = cartItem.price + (cartItem.price / (quantity - 1))

                return {...cartItem, quantity: quantity, price: price}
            }

            return cartItem
        })

        setCartItems(updatedCartItems)

        const updatedCheckoutItems = [...checkoutItems].map(checkoutItem => {
            if (checkoutItem.id === id){
                let quantity = checkoutItem.quantity + 1
                let price = checkoutItem.price + (checkoutItem.price / (quantity - 1))

                return {...checkoutItem, quantity: quantity, price: price}
            }

            return checkoutItem
        })

        setCheckoutItems(updatedCheckoutItems)
    }

    function minQuantity(id){
        const updatedCartItems = [...cartItems].map(cartItem => {
            if (cartItem.id === id){
                if (cartItem.quantity > 1){
                    let quantity = cartItem.quantity - 1
                    let price = cartItem.price - (cartItem.price / (quantity + 1))

                    return {...cartItem, quantity: quantity, price: price}
                }
            }

            return cartItem
        })

        setCartItems(updatedCartItems)

        const updatedCheckoutItems = [...checkoutItems].map(checkoutItem => {
            if (checkoutItem.id === id){
                if (checkoutItem.quantity > 1){
                    let quantity = checkoutItem.quantity - 1
                    let price = checkoutItem.price - (checkoutItem.price / (quantity + 1))

                    return {...checkoutItem, quantity: quantity, price: price}
                }
            }

            return checkoutItem
        })

        setCheckoutItems(updatedCheckoutItems)
    }

    function removeCartItems(id){
        if (initialItem && initialItem.id === id){
            setInitialItem(null)
        }
        setCartItems(cartItems => cartItems.filter(cartItem => cartItem.id !== id))
        setCheckoutItems(checkoutItems => checkoutItems.filter(checkoutItem => checkoutItem.id !== id))
    }

    function addItemQuantity(){
        let quantity = initialItem.quantity + 1
        let price = initialItem.price + (initialItem.price / (quantity - 1))

        setInitialItem(initialItem => ({...initialItem, quantity: quantity, price: price}))

        const updatedCheckoutItems = [...checkoutItems].map(checkoutItem => {
            if (checkoutItem.id === initialItem.id){
                let quantity = checkoutItem.quantity + 1
                let price = checkoutItem.price + (checkoutItem.price / (quantity - 1))

                return {...checkoutItem, quantity: quantity, price: price}
            }

            return checkoutItem
        })

        setCheckoutItems(updatedCheckoutItems)
    }

    function minItemQuantity(){
        if (initialItem.quantity > 1){
            let quantity = initialItem.quantity - 1
            let price = initialItem.price - (initialItem.price / (quantity + 1))

            setInitialItem(initialItem => ({...initialItem, quantity: quantity, price: price}))
        }

        const updatedCheckoutItems = [...checkoutItems].map(checkoutItem => {
            if (checkoutItem.id === initialItem.id){
                if (checkoutItem.quantity > 1){
                    let quantity = checkoutItem.quantity - 1
                    let price = checkoutItem.price - (checkoutItem.price / (quantity + 1))

                    return {...checkoutItem, quantity: quantity, price: price}
                }
            }

            return checkoutItem
        })

        setCheckoutItems(updatedCheckoutItems)
    }

    return (
        <>
        <Navbar link={"store"} cartItems={cartItems} setCartItems={setCartItems} />
        <section className="checkout-container w-[80vw] flex gap-2 mx-auto mt-24 mb-36 text-xl mobile:w-full mobile:px-4 mobile:flex-col-reverse tablet:w-[90vw]">
        {
            (cartItems.length === 0 && !initialItem) &&
            <div className="flex flex-col gap-4 items-center justify-center w-full py-[40vh]">
                <IconShoppingCartOff stroke={1.5} width={128} height={128} />
                <Link to={"/store"} onClick={goTop} className="px-2 py-1 rounded bg-primary text-white">Shop now</Link>
            </div>
        }
        {
            (cartItems.length > 0 || initialItem) &&
            <>
            <div className="cart-items-container flex flex-col gap-2 w-3/5 mobile:w-full">
                <div className="select-all-btn flex items-center gap-2 cursor-pointer bg-white-prim w-fit p-2 rounded" onClick={() => {
                    {
                        initialItem ? setCheckoutItems([...cartItems, {...initialItem}]) : setCheckoutItems([...cartItems]) 
                    }
                }}>
                    <IconChecks stroke={1.5} />
                    <span>Select all</span>
                </div>
                <div className="cart-items flex flex-col gap-2">
                {
                    cartItems.map((item, index) => {
                        return (
                            <div className="cart-item w-full flex items-stretch gap-2 p-2 rounded-md border-2" key={index}>
                                <div className={`checkbox border p-1 rounded cursor-pointer h-fit ${checkingCheckoutItems(item.id) ? "bg-primary text-white" : "text-transparent"}`} onClick={() => addRemoveCheckoutItems(item)}>
                                    <IconCheck stroke={1.5} width={16} height={16} />
                                </div>
                                <div className="item w-full h-full flex gap-2">
                                    <div className="item-img w-1/5 flex h-full mobile:w-2/5">
                                        <img src={item.img} alt="Item" className="rounded" />
                                    </div>
                                    <div className="item-info w-4/5 flex flex-col justify-between mobile:w-3/5">
                                        <div className="header flex items-center justify-between">
                                            <span className="item-name font-bold overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</span>
                                            <span className="remove-item-btn flex justify-center items-center cursor-pointer p-1 rounded hover:bg-hov" title="Remove item" onClick={() => removeCartItems(item.id)}>
                                                <IconTrash stroke={1.5} />
                                            </span>
                                        </div>
                                        <div className="footer flex items-center justify-between">
                                            <span className="add-minus-item select-none">
                                                <span className="add-item cursor-pointer px-2 bg-primary text-white" onClick={() => minQuantity(item.id)}>-</span>
                                                <span className="px-2 bg-white-prim">{item.quantity}</span>
                                                <span className="minus-item cursor-pointer px-2 bg-primary text-white" onClick={() => addQuantity(item.id)}>+</span>
                                            </span>
                                            <span className="item-total-price">{`$${item.price}`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    initialItem &&
                    <div className="item-checkout w-full flex items-stretch gap-2 p-2 rounded-md border-2">
                        <div className={`checkbox border p-1 rounded cursor-pointer h-fit ${checkingCheckoutItems(initialItem.id) ? "bg-primary text-white" : "text-transparent"}`} onClick={() => addRemoveCheckoutItems(initialItem)}>
                            <IconCheck stroke={1.5} width={16} height={16} />
                        </div>
                        <div className="item w-full h-full flex gap-2">
                            <div className="item-img w-1/5 flex h-full mobile:w-2/5">
                                <img src={initialItem.img} alt="Item" className="rounded" />
                            </div>
                            <div className="item-info w-4/5 flex flex-col justify-between mobile:w-3/5">
                                <div className="header flex items-center justify-between">
                                    <span className="item-name font-bold overflow-hidden text-ellipsis whitespace-nowrap">{initialItem.name}</span>
                                    <span className="remove-item-btn flex justify-center items-center cursor-pointer p-1 rounded hover:bg-hov" title="Remove item" onClick={() => removeCartItems(initialItem.id)}>
                                        <IconTrash stroke={1.5} />
                                    </span>
                                </div>
                                <div className="footer flex items-center justify-between">
                                    <span className="add-minus-item select-none">
                                        <span className="cursor-pointer px-2 bg-primary text-white" onClick={() => minItemQuantity()}>-</span>
                                        <span className="px-2 bg-white-prim">{item.quantity}</span>
                                        <span className="cursor-pointer px-2 bg-primary text-white" onClick={() => addItemQuantity()}>+</span>
                                    </span>
                                    <span className="item-total-price">{`$${initialItem.price}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                </div>
            </div>
            <div className="checkout w-2/5 flex flex-col gap-2 rounded bg-white-prim h-fit p-2 mobile:w-full">
            <div className="discount flex items-center gap-2 cursor-pointer p-2 bg-white w-fit rounded">
                <IconDiscount stroke={1.5} />
                <span>Discount code</span>
            </div>
            <div className="cart-items-list flex flex-col items-center">
            {
                checkoutItems.length === 0 &&
                <span className="text-base text-black/[.5] py-8">Selected items will appear here</span>
            }
            {
                checkoutItems.length > 0 &&
                checkoutItems.map((checkoutItem, index) => {
                    return (
                        <div className="flex w-full items-center justify-between" key={index}>
                            <div className="name max-w-[80%] whitespace-nowrap text-ellipsis overflow-hidden">{checkoutItem.name}</div>
                            <div className="price">${checkoutItem.price}</div>
                        </div>
                    )
                })
            }
            </div>
                <div className="total-price w-full flex justify-end pt-2 border-t-2 border-dashed border-black">
                {
                    checkoutItems.length === 0 ? "$0" : `$${checkoutTotalPrice()}`
                }
                </div>
                <div className="checkout-btn flex items-center gap-2 self-end cursor-pointer p-2 rounded bg-primary text-white">
                    <IconCash stroke={1.5} />
                    <span>Checkout</span>
                </div>
            </div>
            </>
        }
        </section>
        <Footer />
        </>
    )
}