import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Store from "./pages/Store"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Product from './pages/Product';
import Checkout from "./pages/Checkout"
import { useState, useEffect } from 'react';
import NotFound from './pages/NotFound';
import ProductOutlet from './pages/ProductOutlet';

function Router(){

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
                <Route path='*' element={<NotFound />} />
                <Route path='/' exact element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path='/store' element={<Store cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/store/product/:id' element={<ProductOutlet />}>
                    <Route path="/store/product/:id" element={
                        <Product cartItems={cartItems} setCartItems={setCartItems} />}
                    />
                </Route>
                <Route path='/checkout/product/:id' element={<ProductOutlet />}>
                    <Route path="/checkout/product/:id" element={
                        <Checkout cartItems={cartItems} setCartItems={setCartItems} />}
                    />
                </Route>
                <Route path="/checkout" element={
                    <Checkout item={null} cartItems={cartItems} setCartItems={setCartItems} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Router