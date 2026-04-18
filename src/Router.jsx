import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css";
import AuthProvider from './contexts/AuthContext';
import CartProductsProvider from './contexts/CartProductsContext';
import ProductsProvider from './contexts/ProductsContext';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Register from './pages/Register';
import Store from "./pages/Store";
import VerifyEmail from './pages/VerifyEmail';

export default function Router(){
    return (
        <BrowserRouter>
            <AuthProvider>
            <ProductsProvider>
            <CartProductsProvider>
            <ToastContainer 
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store/:product_id" element={<Product />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/verify-email/:token" element={<VerifyEmail />} />

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </CartProductsProvider>
            </ProductsProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}