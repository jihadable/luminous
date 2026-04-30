import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";

export default function DashboardProducts(){
    return (
        <section className="dashboard flex">
            <Sidebar page={"products"} />
            <Content />
        </section>
    )
}

function Content(){
    const { user } = useContext(AuthContext)
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const getProducts = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const { data } = await axios.get(`${APIEndpoint}/api/products?category=furniture`)

                setProducts(data.data.products)
            } catch(error){
                console.log(error)
            }
        }

        getProducts()
    }, [])

    return (
        <section className="flex flex-col text-xl w-full">
            <article className="p-4 w-full">
                <p className="font-bold">{user?.name}</p>
            </article>
            <article className="p-4 pt-0 flex flex-col">
                <article className="flex">
                    <Link to={"/dashboard/add-product"} className="flex items-center gap-2 bg-primary text-white p-2 rounded-md">
                        <IconPlus stroke={1.5} />
                        <span><p>Add product</p></span>
                    </Link>
                </article>
                <article className="flex flex-col">
                {products?.map((product, index) => (
                    <article key={index}>
                        <p>{index + 1}. {product.name}. {product.category.name}</p>
                    </article>
                ))}
                </article>
            </article>
        </section>
    )
}