import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css";
import AuthProvider from './contexts/AuthContext';
import ProductsProvider from './contexts/ProductsContext';
import Account from './pages/Account';
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
            <ToastContainer 
            position="top-center"
            autoClose={750}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable />
            <ProductsProvider>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store/:slug" element={<Product />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ProductsProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}