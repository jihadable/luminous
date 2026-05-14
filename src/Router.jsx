import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css";
import AuthProvider from './contexts/AuthContext';
import CartProductsProvider from './contexts/CartProductsContext';
import ProductsProvider from './contexts/ProductsContext';
import Account from './pages/Account';
import AddCategory from './pages/AddCategory';
import AddProduct from './pages/AddProduct';
import Dashboard from './pages/Dashboard';
import DashboardCategories from './pages/DashboardCategories';
import DashboardProduct from './pages/DashboardProduct';
import DashboardProducts from './pages/DashboardProducts';
import DashboardUsers from './pages/DashboardUsers';
import EditProduct from './pages/EditProduct';
import ForgetPassword from './pages/ForgetPassword';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
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
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/users" element={<DashboardUsers />} />
                    <Route path="/dashboard/products" element={<DashboardProducts />} />
                    <Route path="/dashboard/categories" element={<DashboardCategories />} />

                    <Route path="/dashboard/products/:product_id" element={<DashboardProduct />} />

                    <Route path="/dashboard/add-product" element={<AddProduct />} />
                    <Route path="/dashboard/add-category" element={<AddCategory />} />

                    <Route path="/dashboard/edit-product/:product_id" element={<EditProduct />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </CartProductsProvider>
            </ProductsProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}