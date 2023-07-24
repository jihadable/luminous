import luminousLogo from "../assets/luminous-logo.png"
import emptyCart from "../assets/empty-cart.png"
import { useState, useRef, useEffect } from "react"

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
        
        document.addEventListener("scroll", function(){
            setShowMobileMenu(false)
        })
    })

    const [mobileMenu, mobileMenuBtn, shoppingCartBtn, shoppingCartBtnMobile] = [useRef(), useRef(), useRef(), useRef()]

    return (
        <nav className="navbar fixed left-0 right-0 top-0 px-[7%] py-3 flex items-center bg-white justify-between z-50 mobile:p-2 mobile:px-[5%] tablet:px-[5%]">
            <a href="/" className="navbar-logo flex items-center gap-2">
                <img src={luminousLogo} alt="" className="w-12" />
                <span className="text-[1.3rem]">Luminous</span>
            </a>
            <div className="navbar-nav flex gap-10 text-lg mobile:hidden">
                <a href="/" className={`border-b-2 text-xl ${props.link === "home" ? "border-primary" : "border-white hover:border-primary"}`} >Home</a>
                <a href="/store" className={`border-b-2 text-xl ${props.link === "home" ? "border-white hover:border-primary" : "border-primary"}`} >Store</a>
            </div>
            <div className="navbar-extra flex items-center gap-6 text-lg mobile:hidden">
                <a href="/login" className="text-xl border-b-2 border-white hover:border-primary" >Login</a>
                <a href="/signup" className="py-1 px-2 bg-primary rounded text-white">Sign Up</a>
                <span className="shopping-cart-btn flex justify-center items-center relative p-1 rounded cursor-pointer hover:bg-[rgb(0,0,0,.1)]" onClick={() => {setShowShoppingCart(!showShoppingCart)}} ref={shoppingCartBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M17 17h-11v-14h-2"></path>
                        <path d="M6 5l14 1l-1 7h-13"></path>
                    </svg>
                    {
                        cartItems.length > 0 &&
                        <div className="cart-notify absolute flex justify-center items-center -top-2 -right-2 w-5 h-5 rounded-full text-white-prim bg-red-500">{cartItems.length}</div>
                    }
                </span>
            </div>

            {/* mobile menu */}
            <div className={`navbar-link hidden flex-col gap-3 items-end absolute right-[5px] top-[calc(100%+5px)] p-2 text-xl w-[150px] rounded shadow-[0_0_10px_-2px_rgb(0,0,0,.5)] bg-white ${showMobileMenu ? "" : "scale-0"} origin-top-right transition mobile:flex`} ref={mobileMenu}>
                <a href="/" className={props.link === "home" ? "border-b-2 border-primary" : "border-b-2 border-white hover:border-primary"} >Home</a>
                <a href="/store" className={props.link === "home" ? "border-b-2 border-white hover:border-primary" : "border-b-2 border-primary"} >Store</a>  
                <a href="/login" className="border-b-2 border-white hover:border-primary" >Login</a>
                <span className="shopping-cart-btn-mobile relative flex items-center gap-1 border-b-2 border-white hover:border-primary" onClick={() => {setShowShoppingCart(!showShoppingCart)}} ref={shoppingCartBtnMobile}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M17 17h-11v-14h-2"></path>
                        <path d="M6 5l14 1l-1 7h-13"></path>
                    </svg>
                    <span>Cart</span>
                    {
                        cartItems.length > 0 &&
                        <div className="cart-notify absolute flex justify-center items-center -top-2 -left-2 w-5 h-5 rounded-full text-white-prim bg-red-500">{cartItems.length}</div>
                    }
                </span>
            </div>

            {/* mobile menu button */}
            <span className="mobile-menu-btn relative hidden justify-center items-center p-1 rounded cursor-pointer hover:bg-hov mobile:flex" onClick={() => {setShowMobileMenu(!showMobileMenu)}} ref={mobileMenuBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 6l16 0"></path>
                    <path d="M4 12l16 0"></path>
                    <path d="M4 18l16 0"></path>
                </svg>
                {
                    cartItems.length > 0 &&
                    <div className={`cart-notify absolute ${showMobileMenu ? "hidden" : "flex"} justify-center items-center -top-2 -right-2 w-5 h-5 rounded-full text-white-prim bg-red-500`}>{cartItems.length}</div>
                }
            </span>

            {/* shopping cart */}
            <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} showShoppingCart={showShoppingCart} setShowShoppingCart={setShowShoppingCart} shoppingCartBtn={shoppingCartBtn} shoppingCartBtnMobile={shoppingCartBtnMobile} />
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
    const shoppingCartBtnMobile = props.shoppingCartBtnMobile
    const shoppingCart = useRef()

    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!shoppingCart.current.contains(e.target) && !shoppingCartBtn.current.contains(e.target) && !shoppingCartBtnMobile.current.contains(e.target)){
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
            itemPrice = itemPrice / item["sum"]
            if (item["name"] === itemName){
                item["sum"] += 1
                item["price"] += itemPrice
            }
        })

        setCartItems(locatItem)
    }

    function minusProduct(itemName, itemPrice){
        let locatItem = JSON.parse(localStorage.getItem("cartItems"))

        locatItem.forEach(function(item){
            itemPrice = itemPrice / item["sum"]
            if (item["name"] === itemName && item["sum"] > 1){
                item["sum"] -= 1
                item["price"] -= itemPrice
            }
        })

        setCartItems(locatItem)
    }
    
    return (
        <div className={`shopping-cart absolute top-[90%] right-0 ${(showShoppingCart) ? "" : "scale-x-0"} bg-white h-[100vh] py-4 px-1  text-xl flex flex-col items-center gap-4 origin-right transition duration-75 ${(cartItems.length === 0) ? "w-[372px]" : ""} mobile:w-full tablet:h-fit tablet:rounded-bl-md`} ref={shoppingCart}>
            <div className="shopping-cart-header px-2 w-full text-center flex items-center justify-between">
                <span className="text-xl">{`Shopping cart (${cartItems.length})`}</span>
                <span className="close-shopping-cart-btn cursor-pointer flex justify-center items-center p-1 rounded hover:bg-hov" onClick={() => setShowShoppingCart(false)}>
                    <span className="material-symbols-rounded">close</span>
                </span>
            </div>
            {
                cartItems.length > 0 &&
                <>
                <div className={`items p-3 flex flex-col items-center gap-3 h-[400px] overflow-y-auto scrollbar-hide`}>
                    {cartItems.map((item, index) => {
                        return (
                            <div className="item bg-white p-2 flex items-center gap-6 rounded-md shadow-med" key={index}>
                                <div className="item-img">
                                    <img src={item.img} alt="Item" className="w-[100px]" />
                                </div>
                                <div className="item-info h-[100px] flex flex-col justify-between">
                                    <div className="item-info-header w-[200px] flex items-center justify-between">
                                        <span className="item-name">{item.name}</span>
                                        <span className="remove-item-btn flex justify-center items-center cursor-pointer p-1 rounded hover:bg-hov" onClick={() => {removeItem(item.name)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 7l16 0"></path>
                                                <path d="M10 11l0 6"></path>
                                                <path d="M14 11l0 6"></path>
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="item-info-footer w-[200px] flex items-center justify-between">
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
                    })}
                </div>
                <div className="shopping-cart-footer border-t-2 border-black py-4 px-2 w-full flex items-center justify-between">
                    <span className="total-price">
                        <p>
                            Total: <span>
                                {
                                    `$${sumPrice(cartItems)}`
                                }
                            </span>
                        </p>
                    </span>
                    <button type="button" className="p-1 px-2 rounded bg-primary text-white text-base">Checkout</button>
                </div>
                </>
            }
            {
                cartItems.length === 0 && 
                <>
                    <div className="empty-cart flex flex-col items-center gap-2 h-3/4 justify-center">
                        <img src={emptyCart} alt="Empty cart" className="w-[100px]" />
                        <div>Your cart is empty</div>
                        <div>Keep browsing</div>
                    </div>
                </>
            }
        </div>
    )
}

export default Navbar