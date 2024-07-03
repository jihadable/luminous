import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import ProductsProvider from './contexts/ProductsContext';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Register from './pages/Register';
import Store from "./pages/Store";

export default function Router(){
    return (
        <BrowserRouter>
            <AuthProvider>
            <ProductsProvider>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store/:id" element={<Product />} />
                    {/* <Route path="/checkout/product/:id" element={<ProductOutlet />}>
                        <Route path="/checkout/product/:id" element={
                            <Checkout />}
                        />
                    </Route>
                    <Route path="/checkout" element={
                        <Checkout />}
                    /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ProductsProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}