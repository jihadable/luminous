import { IconLabel, IconShoppingBag, IconUsers } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import logo from "../assets/luminous-logo.png"

export default function Dashboard(){
    return (
        <section className="dashboard flex w-screen">
            <Sidebar />
        </section>
    )
}

function Sidebar(){
    return (
        <section className="sidebar flex overflow-y-auto text-xl bg-white-prim h-screen">
            <article className="flex flex-col">
                <article className="flex items-center gap-2 p-4">
                    <img src={logo} alt="Luminous Logo" height={24} width={24} />
                    <span>
                        <p>Luminous</p>
                    </span>
                </article>
                <Link to={"/dashboard/users"} className="flex items-center gap-2 p-4 hover:bg-primary hover:text-white transition-all">
                    <IconUsers stroke={1.5} />
                    <span>
                        <p>Users</p>
                    </span>
                </Link>
                <Link to={"/dashboard/products"} className="flex items-center gap-2 p-4 hover:bg-primary hover:text-white transition-all">
                    <IconShoppingBag stroke={1.5} />
                    <span>
                        <p>Products</p>
                    </span>
                </Link>
                <Link to={"/dashboard/categories"} className="flex items-center gap-2 p-4 hover:bg-primary hover:text-white transition-all">
                    <IconLabel stroke={1.5} />
                    <span>
                        <p>Categories</p>
                    </span>
                </Link>
            </article>
        </section>
    )
}