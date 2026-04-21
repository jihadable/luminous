import { IconLabel, IconLayoutDashboard, IconLogout, IconShoppingBag, IconUsers } from "@tabler/icons-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/luminous-logo.png";
import { AuthContext } from "../contexts/AuthContext";
import { CartProductsContext } from "../contexts/CartProductsContext";

export default function Sidebar(){
    const { setIsLogin, setUser } = useContext(AuthContext)
    const { setCartProducts } = useContext(CartProductsContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLogin(false)
        setUser(null)
        setCartProducts(null)

        navigate("/")
    }

    return (
        <section className="sidebar flex overflow-y-auto text-xl bg-white-prim h-screen">
            <article className="flex flex-col w-full">
                <article className="flex items-center gap-2 p-4 pr-20 w-full">
                    <img src={logo} alt="Luminous Logo" height={24} width={24} />
                    <span>
                        <p>Luminous</p>
                    </span>
                </article>
                <Link to={"/dashboard"} className="flex items-center gap-2 p-4 pr-20 hover:bg-primary hover:text-white transition-all w-full">
                    <span className="flex">
                        <IconLayoutDashboard stroke={1.5} />
                    </span>
                    <span>
                        <p>Dashboard</p>
                    </span>
                </Link>
                <Link to={"/dashboard/users"} className="flex items-center gap-2 p-4 pr-20 hover:bg-primary hover:text-white transition-all w-full">
                    <span className="flex">
                        <IconUsers stroke={1.5} />
                    </span>
                    <span>
                        <p>Users</p>
                    </span>
                </Link>
                <Link to={"/dashboard/products"} className="flex items-center gap-2 p-4 pr-20 hover:bg-primary hover:text-white transition-all w-full">
                    <span className="flex">
                        <IconShoppingBag stroke={1.5} />
                    </span>
                    <span>
                        <p>Products</p>
                    </span>
                </Link>
                <Link to={"/dashboard/categories"} className="flex items-center gap-2 p-4 pr-20 hover:bg-primary hover:text-white transition-all w-full">
                    <span className="flex">
                        <IconLabel stroke={1.5} />
                    </span>
                    <span>
                        <p>Categories</p>
                    </span>
                </Link>
                <button type="button" className="flex items-center gap-2 p-4 pr-20 hover:bg-red-500 hover:text-white transition-all w-full text-red-500" onClick={handleLogout}>
                    <span className="flex">
                        <IconLogout stroke={1.5} />
                    </span>
                    <span>
                        <p>Logout</p>
                    </span>
                </button>
            </article>
        </section>
    )
}