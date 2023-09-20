import luminousLogo from "../assets/luminous-logo.png"
import emptyCart from "../assets/empty-cart.png"
import { useState, useRef, useEffect } from "react"
import { IconShoppingCart } from "@tabler/icons-react"
import { IconMenu2 } from "@tabler/icons-react"
import { IconShoppingCartX } from "@tabler/icons-react"
import { IconTrash } from "@tabler/icons-react"
import { IconX } from "@tabler/icons-react"

function Navbar(props){

    const [cartItems, setCartItems] = useState(props.cartItems)

    useEffect(() => {
        setCartItems(props.cartItems)
    }, [props.cartItems])

    const [[showShoppingCart, setShowShoppingCart], [showMobileMenu, setShowMobileMenu]] = [useState(false), useState(false)]

    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!mobileMenu.current.contains(e.target) && !mobileMenuBtn.current.contains(e.target)){
                setShowMobileMenu(false)
            }
        })
    })

    const [mobileMenu, mobileMenuBtn, shoppingCartBtn] = [useRef(), useRef(), useRef()]

    return (
        <nav className="navbar fixed left-0 right-0 top-0 px-[10vw] py-3 flex items-center bg-white justify-between z-50 mobile:p-2 mobile:px-[5%] tablet:px-[5%]">
            <a href="/" className="navbar-logo flex items-center gap-2">
                <img src={luminousLogo} alt="" className="w-12" />
                <span className="text-[1.3rem]">Luminous</span>
            </a>
            <div className="navbar-nav flex gap-8 text-lg mobile:hidden">
                <a href="/" className={`border-b-2 text-xl ${props.link === "home" ? "border-primary" : "border-white hover:border-primary"}`} >Home</a>
                <a href="/store" className={`border-b-2 text-xl ${props.link === "home" ? "border-white hover:border-primary" : "border-primary"}`} >Store</a>
            </div>
            {
                (showShoppingCart || showMobileMenu) &&
                <div className="overlay fixed z-[51] left-0 right-0 top-0 h-[100vh] bg-[rgb(0,0,0,.5)]"></div>
            }
            <div className="navbar-extra flex items-center gap-4 text-lg">
                <a href="/login" className="py-1 px-2 bg-primary rounded text-white mobile:hidden">Login</a>
                <span className="shopping-cart-btn flex justify-center items-center relative p-1 rounded cursor-pointer hover:bg-[rgb(0,0,0,.1)]" onClick={() => {setShowShoppingCart(!showShoppingCart)}} ref={shoppingCartBtn}>
                    <IconShoppingCart stroke={1.5} />
                    {
                        cartItems.length > 0 &&
                        <div className="cart-notify absolute flex justify-center items-center -top-2 -right-2 px-2 py-0 rounded-full text-white-prim text-sm bg-red-500">{cartItems.length}</div>
                    }
                </span>
                {/* mobile menu button */}
                <span className="mobile-menu-btn relative hidden justify-center items-center p-1 rounded cursor-pointer hover:bg-hov mobile:flex" onClick={() => {setShowMobileMenu(!showMobileMenu)}} ref={mobileMenuBtn}>
                    <IconMenu2 stroke={1.5} />
                </span>
            </div>

            {/* <div className={`overlay absolute top-0 left-0 h-[100vh] right-0 bg-black/[.5] ${showMobileMenu ? "block" : "hidden"}`}></div> */}

            {/* mobile menu */}
            <div className={`mobile-menu flex flex-col gap-4 p-4 text-2xl items-end absolute w-[70vw] top-0 h-[100vh] z-[55] bg-white ${showMobileMenu ? "active" : ""}`} ref={mobileMenu}>
                <div className="close-mobile-menu top-4 right-4 p-1 rounded cursor-pointer hover:bg-hov" onClick={() => setShowMobileMenu(false)}>
                    <IconX stroke={1.5} />
                </div>
                <a href="/" className={props.link === "home" ? "border-b-2 border-primary" : "border-b-2 border-white hover:border-primary"} >Home</a>
                <a href="/store" className={props.link === "home" ? "border-b-2 border-white hover:border-primary" : "border-b-2 border-primary"} >Store</a>  
                <a href="/login" className="border-b-2 border-white hover:border-primary" >Login</a>
            </div>

            {/* shopping cart */}
            <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} showShoppingCart={showShoppingCart} setShowShoppingCart={setShowShoppingCart} shoppingCartBtn={shoppingCartBtn} />
        </nav>
    )
}

Navbar.defaultProps = {
    cartItems: JSON.parse(localStorage.getItem("cartItems"))
}

function ShoppingCart(props){

    const cartItems = props.cartItems
    const setCartItems = props.setCartItems

    const showShoppingCart = props.showShoppingCart
    const setShowShoppingCart = props.setShowShoppingCart

    const shoppingCartBtn = props.shoppingCartBtn
    const shoppingCart = useRef()

    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!shoppingCart.current.contains(e.target) && !shoppingCartBtn.current.contains(e.target)){
                setShowShoppingCart(false)
            }
        })
    })

    function removeItem(itemName){
        let locatItem = JSON.parse(localStorage.getItem("cartItems"))

        let index
        locatItem.forEach(function(item, i){
            if (item.name === itemName){
                index = i

                return
            }
        })

        locatItem.splice(index, 1)

        setCartItems(locatItem)
    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    function sumPrice(array){
        let price = 0

        array.forEach(function(item){
            price += item.price
        })

        return `${price}`
    }

    function addProduct(itemName, itemPrice){
        let locatItem = JSON.parse(localStorage.getItem("cartItems"))

        locatItem.forEach(function(item){
            if (item["name"] === itemName){
                itemPrice = itemPrice / item["sum"]
                item["sum"] += 1
                item["price"] += itemPrice
            }
        })

        setCartItems(locatItem)
    }

    function minusProduct(itemName, itemPrice){
        let locatItem = JSON.parse(localStorage.getItem("cartItems"))

        locatItem.forEach(function(item){
            if ((item["name"] === itemName) && item["sum"] > 1){
                itemPrice = itemPrice / item["sum"]
                item["sum"] -= 1
                item["price"] -= itemPrice
            }
        })

        setCartItems(locatItem)
    }

    return (
        <div className={`shopping-cart z-[60] w-[30vw] h-[100vh] flex flex-col absolute top-0 ${showShoppingCart ? "active" : ""} bg-white text-xl mobile:w-full tablet:w-[70vw] tablet:h-[70vh]`} ref={shoppingCart}>
            <div className="header flex items-center justify-between p-2">
                <div className="info">{`Shopping cart (${cartItems.length})`}</div>
                <div className="btns flex gap-2 items-center">
                    {
                        cartItems.length > 0 &&
                        <div className="remove-all-btn flex items-center justify-center gap-2 p-1 rounded cursor-pointer bg-red-200" onClick={() => {setCartItems([])}} title="Empty cart">
                            <IconShoppingCartX stroke={1.5} />
                        </div>
                    }
                    <span className="close-shopping-cart-btn cursor-pointer flex justify-center items-center p-1 rounded hover:bg-hov" onClick={() => setShowShoppingCart(false)} title="Close cart">
                        <IconX stroke={1.5} />
                    </span>
                </div>
            </div>
            <div className={`content flex flex-1 ${cartItems.length > 0 ? "overflow-y-auto scrollbar-hide p-2" : "justify-center items-center"}`}>
                {
                    cartItems.length === 0 &&
                    <div className="empty-cart flex flex-col items-center gap-2 h-3/4 justify-center">
                        <img src={emptyCart} alt="Empty cart" className="w-[100px]" />
                        <div>Your cart is empty</div>
                        <div>Keep browsing</div>
                    </div>
                }
                {
                    cartItems.length > 0 &&
                    <div className="items flex flex-col gap-2">
                    {
                        cartItems.map((item, index) => {
                            return (
                                <div className="item w-full flex gap-2 p-2 bg-white rounded border-2 border-[#ccc]" key={index}>
                                    <div className="item-img w-2/5">
                                        <img src={item.img} alt="Item" />
                                    </div>
                                    <div className="item-info w-3/5 h-full flex flex-col justify-between">
                                        <div className="header flex items-center justify-between">
                                            <span className="item-name font-bold">{item.name}</span>
                                            <span className="remove-item-btn flex justify-center items-center cursor-pointer p-1 rounded hover:bg-hov" onClick={() => {removeItem(item.name)}} title="Remove item">
                                                <IconTrash stroke={1.5} />
                                            </span>
                                        </div>
                                        <div className="footer flex items-center justify-between">
                                            <span className="add-minus-item select-none">
                                                <span className="add-item cursor-pointer px-2 bg-primary text-white" onClick={() => {minusProduct(item.name, item.price)}}>-</span>
                                                <span className="px-2 bg-white-prim">{item.sum}</span>
                                                <span className="minus-item cursor-pointer px-2 bg-primary text-white" onClick={() => {addProduct(item.name, item.price)}}>+</span>
                                            </span>
                                            <span className="item-total-price">{`$${item.price}`}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                }
            </div>
            {
                cartItems.length > 0 &&
                <div className="footer flex items-center justify-between p-2 mt-2 border-t-2 border-black border-dashed">
                    <span className="total-price">
                        <p>{`Total: $${sumPrice(cartItems)}`}</p>
                    </span>
                    <button type="button" className="p-1 px-2 rounded bg-primary text-white text-base">Checkout</button>
                </div>
            }
        </div>
    )
}

export default Navbar