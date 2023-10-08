import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Store from "./pages/Store"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Product from './pages/Product';
import Checkout from "./pages/Checkout"
// import { items } from './components/items';
import { useState } from 'react';
import { useEffect } from 'react';

function Router(){

    const [items, setItems] = useState([])
    const item_api_endpoint = import.meta.env.VITE_ITEM_API_ENDPOINT

    useEffect(() => {
        const getItems = async() => {
            let response = await fetch(item_api_endpoint)
            response = await response.json()
            response = response.map(item => ({...item, quantity: parseInt(item.quantity), price: parseInt(item.price), categories: JSON.parse(item.categories)}))
            
            setItems(response)
        }
    
        getItems()
    }, [])

    if (!localStorage.getItem("cartItems")){
        localStorage.setItem("cartItems", JSON.stringify([]))
    }

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")))

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path='/store' element={<Store cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                {
                    items.map((item, index) => {
                        return (
                            <Route path={`/store/product${item.id}`} element={
                                <Product item={item} cartItems={cartItems} setCartItems={setCartItems} />} key={index}
                            />
                        )
                    })
                }
                {
                    items.map((item, index) => {
                        return (
                            <Route path={`/checkout/product${item.id}`} element={
                                <Checkout item={item} cartItems={cartItems} setCartItems={setCartItems} />} key={index}
                            />
                        )
                    })
                }
                <Route path="/checkout" element={
                    <Checkout item={null} cartItems={cartItems} setCartItems={setCartItems} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Router