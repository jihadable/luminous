import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Store from "./pages/Store"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Product from './pages/Product';
import { items } from './components/items';
import { useState } from 'react';
import { useEffect } from 'react';

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
                <Route path='/' exact element={<Home cartItems={cartItems} setCartItems={setCartItems} />}></Route>
                <Route path='/store' element={<Store items={items} cartItems={cartItems} setCartItems={setCartItems} />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                {
                    items.map((item, index) => {
                        return (
                            <Route path={`/store/product${item.id}`} key={index} element={
                                <Product item={item} cartItems={cartItems} setCartItems={setCartItems} />
                            }></Route>
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router