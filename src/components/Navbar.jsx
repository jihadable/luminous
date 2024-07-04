import { IconCash, IconChevronDown, IconMenu2, IconShoppingCart, IconShoppingCartOff, IconShoppingCartX, IconTrash, IconX } from "@tabler/icons-react"
import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import luminousLogo from "../assets/luminous-logo.png"
import { AuthContext } from "../contexts/AuthContext"
import { ProductsContext } from "../contexts/ProductsContext"
import goTop from "../utils/goTop"

function Navbar({ link }){

    const { user, setUser, isLogin, setIsLogin } = useContext(AuthContext)
    const { cart } = useContext(ProductsContext)
    const navigate = useNavigate()

    const [showShoppingCart, setShowShoppingCart] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)

    const [
        mobileMenu, mobileMenuBtn, 
        shoppingCart, shoppingCartBtn,
        accountMenuBtn
    ] = [useRef(), useRef(), useRef(), useRef(), useRef()]

    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!mobileMenu.current.contains(e.target) && !mobileMenuBtn.current.contains(e.target)){
                setShowMobileMenu(false)
            }
            if (!accountMenuBtn.current.contains(e.target)){
                setShowAccountMenu(false)
            }
        })
    })

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("cart")
        setIsLogin(false)
        setUser(null)

        navigate("/")
    }

    const avatarGenerator = import.meta.env.VITE_AVATAR_GENERATOR

    return (
        <nav className="navbar fixed left-0 right-0 top-0 px-[10vw] py-3 flex items-center bg-white justify-between z-50 mobile:p-2 mobile:px-[5%] tablet:px-[5%]">
            <Link to="/" onClick={goTop} className="navbar-logo flex items-center gap-2">
                <img src={luminousLogo} alt="Luminous" className="w-12" />
                <span className="text-[1.3rem]">Luminous</span>
            </Link>
            <div className="navbar-nav flex gap-8 text-lg mobile:hidden">
                <Link to={"/"} onClick={goTop} className={`border-b-2 text-xl ${link === "home" ? "border-primary" : "border-white hover:border-primary"}`}>Home</Link>
                <Link to={"/store"} onClick={goTop} className={`border-b-2 text-xl ${link === "home" ? "border-white hover:border-primary" : "border-primary"}`}>Store</Link>
            </div>
            {
                (showShoppingCart || showMobileMenu) &&
                <div className="overlay fixed z-[51] left-0 right-0 top-0 h-[100vh] bg-[rgb(0,0,0,.5)]"></div>
            }
            <div className="navbar-extra flex items-center gap-4 text-lg">
            {
                isLogin === false &&
                <Link to="/login" onClick={goTop} className="py-1 px-2 bg-primary rounded text-white mobile:hidden">Login</Link>
            }
            {
                isLogin === true &&
                <>
                <button type="button" className="shopping-cart-btn flex justify-center items-center relative p-1 rounded hover:bg-[rgb(0,0,0,.1)]" onClick={() => {setShowShoppingCart(!showShoppingCart)}} ref={shoppingCartBtn}>
                    <IconShoppingCart stroke={1.5} />
                {
                    cart.length > 0 &&
                    <div className="cart-notify absolute flex justify-center items-center -top-2 -right-2 px-2 py-0 rounded-full text-white-prim text-sm bg-red-500">{cart.length}</div>
                }
                </button>
                <div className="flex relative mobile:hidden">
                    <button type="button" className="flex items-center p-1 bg-primary/[.1] rounded-full" onClick={() => setShowAccountMenu(!showAccountMenu)} ref={accountMenuBtn}>
                        <img src={`${avatarGenerator}name=${user.fullname}`} alt="User" className="w-8 rounded-full" />
                        <IconChevronDown stroke={1.5} width={16} height={16} />
                    </button>
                    <div className={`menu ${showAccountMenu ? "flex" : "hidden"} flex-col items-end gap-4 absolute top-[105%] right-0 bg-white rounded-md py-2 px-4 border-2 border-primary/[.1]`}>
                        <Link to={"/account"} className="w-full border-b-2 border-transparent hover:border-primary">Akun</Link>
                        <button type="button" className="w-full border-b-2 border-transparent hover:border-primary" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                </>
            }
                <span className="mobile-menu-btn relative hidden justify-center items-center p-1 rounded cursor-pointer hover:bg-hov mobile:flex" onClick={() => {setShowMobileMenu(!showMobileMenu)}} ref={mobileMenuBtn}>
                    <IconMenu2 stroke={1.5} />
                </span>
            </div>
            <div className={`mobile-menu flex flex-col gap-4 p-4 text-2xl items-end absolute w-[70vw] top-0 h-[100vh] z-[55] bg-white ${showMobileMenu ? "active" : ""}`} ref={mobileMenu}>
                <div className="close-mobile-menu top-4 right-4 p-1 rounded cursor-pointer hover:bg-hov" onClick={() => setShowMobileMenu(false)}>
                    <IconX stroke={1.5} />
                </div>
                <Link to="/" onClick={goTop} className={link === "home" ? "border-b-2 border-primary" : "border-b-2 border-white hover:border-primary"} >Home</Link>
                <Link to="/store" onClick={goTop} className={link === "home" ? "border-b-2 border-white hover:border-primary" : "border-b-2 border-primary"} >Store</Link>  
            {
                isLogin === false &&
                <Link to="/login" onClick={goTop} className="border-b-2 border-white hover:border-primary">Login</Link>
            }
            {
                isLogin === true &&
                <>
                <Link to={"/account"} onClick={goTop} className="border-b-2 border-white hover:border-primary">Account</Link>
                <button type="button" className="border-b-2 border-white hover:border-primary" onClick={handleLogout}>Logout</button>
                </>
            }
            </div>
            {
                isLogin === true &&
                <ShoppingCart showShoppingCart={showShoppingCart} setShowShoppingCart={setShowShoppingCart} shoppingCart={shoppingCart} shoppingCartBtn={shoppingCartBtn} />
            }
        </nav>
    )
}

function ShoppingCart({ showShoppingCart, setShowShoppingCart, shoppingCart, shoppingCartBtn }){

    const { cart, setCart } = useContext(ProductsContext)

    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!shoppingCart.current.contains(e.target) && !shoppingCartBtn.current.contains(e.target)){
                setShowShoppingCart(false)
            }
        })
    })

    function removeItem(id){
        setCart(cartItems => cartItems.filter(cartItem => cartItem.id !== id))
    }

    function sumPrice(array){
        let price = 0

        array.forEach(function(item){
            price += item.price
        })

        return `${price}`
    }

    function addQuantity(id){
        const updatedCartItems = [...cart].map(cartItem => {
            if (cartItem.id === id){
                let quantity = cartItem.quantity + 1
                let price = cartItem.price + (cartItem.price / (quantity - 1))

                return {...cartItem, quantity: quantity, price: price}
            }

            return cartItem
        })

        setCart(updatedCartItems)
    }

    function minQuantity(id){
        const updatedCartItems = [...cart].map(cartItem => {
            if (cartItem.id === id){
                if (cartItem.quantity > 1){
                    let quantity = cartItem.quantity - 1
                    let price = cartItem.price - (cartItem.price / (quantity + 1))

                    return {...cartItem, quantity: quantity, price: price}
                }
            }

            return cartItem
        })

        setCart(updatedCartItems)
    }

    const imagesAPIEndpoint = import.meta.env.VITE_PRODUCT_IMAGES_API_ENDPOINT

    return (
        <div className={`shopping-cart z-[60] w-[30vw] h-[100vh] flex flex-col absolute top-0 ${showShoppingCart ? "active" : ""} bg-white text-xl mobile:w-full tablet:w-[70vw] tablet:h-[70vh]`} ref={shoppingCart}>
            <div className="header flex items-center justify-between p-2">
                <div className="info">{`Shopping cart (${cart.length})`}</div>
                <div className="btns flex gap-2 items-center">
                    {
                        cart.length > 0 &&
                        <div className="remove-all-btn flex items-center justify-center gap-2 p-1 rounded cursor-pointer bg-red-200" onClick={() => {setCart([])}} title="Empty cart">
                            <IconShoppingCartX stroke={1.5} />
                        </div>
                    }
                    <span className="close-shopping-cart-btn cursor-pointer flex justify-center items-center p-1 rounded hover:bg-hov" onClick={() => setShowShoppingCart(false)} title="Close cart">
                        <IconX stroke={1.5} />
                    </span>
                </div>
            </div>
            <div className={`content flex flex-1 ${cart.length > 0 ? "overflow-y-auto scrollbar-hide p-2" : "justify-center items-center"}`}>
                {
                    cart.length === 0 &&
                    <div className="empty-cart flex flex-col items-center gap-2 h-3/4 justify-center">
                        <IconShoppingCartOff stroke={1.5} width={128} height={128} />
                        <div>Your cart is empty</div>
                        <Link to={"/store"} onClick={goTop} className="px-2 py-1 bg-primary text-white rounded">Shop now</Link>
                    </div>
                }
                {
                    cart.length > 0 &&
                    <div className="items flex flex-col gap-2">
                    {
                        [...cart].reverse().map((product, index) => (
                            <div className="item w-full flex gap-2 p-2 bg-white rounded border-2 border-[#ccc]" key={index}>
                                <div className="item-img flex w-2/5">
                                    <img src={`${imagesAPIEndpoint}/${product.img}`} alt="Item" className="rounded" />
                                </div>
                                <div className="item-info w-3/5 h-full flex flex-col justify-between">
                                    <div className="header flex items-center justify-between">
                                        <span className="item-name font-bold">{product.name}</span>
                                        <span className="remove-item-btn flex justify-center items-center cursor-pointer p-1 rounded hover:bg-hov" onClick={() => {removeItem(product.id)}} title="Remove item">
                                            <IconTrash stroke={1.5} />
                                        </span>
                                    </div>
                                    <div className="footer flex items-center justify-between">
                                        <span className="add-minus-item select-none">
                                            <span className="add-item cursor-pointer px-2 bg-primary text-white" onClick={() => minQuantity(product.id)}>-</span>
                                            <span className="px-2 bg-white-prim">{product.quantity}</span>
                                            <span className="minus-item cursor-pointer px-2 bg-primary text-white" onClick={() => addQuantity(product.id)}>+</span>
                                        </span>
                                        <span className="item-total-price">{`$${product.price}`}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                }
            </div>
            {
                cart.length > 0 &&
                <div className="footer flex items-center justify-between p-2 mt-2 border-t-2 border-black border-dashed">
                    <span className="total-price">
                        <p>{`Total: $${sumPrice(cart)}`}</p>
                    </span>
                    <Link to={"/checkout"} onClick={goTop} className="p-1 px-2 flex gap-2 items-center rounded bg-primary text-white text-base">
                        <IconCash stroke={1.5} />
                        <span>Checkout</span>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Navbar