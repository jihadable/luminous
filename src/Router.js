import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Store from "./pages/Store"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Product from './pages/Product';
import { goods } from './pages/Store';

function Router(){

    if (!localStorage.getItem("cartItems")){
        localStorage.setItem("cartItems", JSON.stringify([]))
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home />}></Route>
                <Route path='/store' element={<Store />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                {
                    goods.map((good, index) => {
                        return (
                            <Route path={`/store/product${good.id}`} key={index} element={
                                <Product 
                                id={good.id}
                                sum={good.sum}
                                name={good.name} 
                                price={good.price} 
                                img={good.img} 
                                explanation={good.explanation} 
                                texture={good.texture} 
                                weight={good.weight}
                                size={good.size} />
                            }></Route>
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router