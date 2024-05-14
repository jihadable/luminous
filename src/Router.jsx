import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import ProductOutlet from './pages/ProductOutlet';
import Register from './pages/Register';
import Store from "./pages/Store";

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
            <AuthProvider>
                <Routes>
                    <Route path="/" exact element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
                    <Route path="/store" element={<Store cartItems={cartItems} setCartItems={setCartItems} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store/product/:id" element={<ProductOutlet />}>
                        <Route path="/store/product/:id" element={
                            <Product cartItems={cartItems} setCartItems={setCartItems} />}
                        />
                    </Route>
                    <Route path="/checkout/product/:id" element={<ProductOutlet />}>
                        <Route path="/checkout/product/:id" element={
                            <Checkout cartItems={cartItems} setCartItems={setCartItems} />}
                        />
                    </Route>
                    <Route path="/checkout" element={
                        <Checkout item={null} cartItems={cartItems} setCartItems={setCartItems} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Router