import { IconClipboardText, IconEdit, IconRuler2, IconShoppingBag, IconStack2, IconTag, IconTexture, IconTrash, IconWeight } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import goTop from "../utils/goTop";
import NotFound from "./NotFound";

export default function DashboardProduct(){
    const { product_id } = useParams()
    const [product, setProduct] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const { isLogin, user } = useContext(AuthContext)

    useEffect(() => {
        const getProduct = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const { data } = await axios.get(`${APIEndpoint}/products/${product_id}`)

                setProduct(data.data.product)
            } catch(error){
                setNotFound(true)
                console.log(error)
            }
        }

        getProduct()
    }, [])

    if (notFound || isLogin === false || user?.role == "customer"){
        return <NotFound />
    }
    if (product !== undefined && product !== null && isLogin === true && user?.role == "admin"){
        return (
            <section className="product flex h-screen">
                <Sidebar page={"products"} />
                <Content user={user} product={product} />
            </section>
        )
    }

    return null  
}

function Content({ user, product }){
    document.title = "Luminous | Product"

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteProduct = async() => {
        try {
            setIsLoading(true)

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("jwt")

            await axios.delete(`${APIEndpoint}/products/${product.id}`, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })

            setIsLoading(false)
            toast.success("Product deleted successfully")
            navigate("/dashboard/products")
        } catch(error){
            setIsLoading(false)
            toast.error("Fail to delete product")
            console.log(error)
        }
    }

    return (
        <section className="flex flex-col text-xl w-full overflow-y-auto">
            <article className="flex flex-col gap-4 p-4 pb-12 w-full">
                <article className="w-full">
                    <p className="font-bold">{user?.name}</p>
                </article>
                <article className="flex flex-col gap-4">
                    <article className="flex items-center gap-4 w-1/2">
                        <Link to={`/dashboard/edit-product/${product.id}`} className="flex items-center justify-center gap-2 bg-yellow-400 p-2 rounded-lg w-1/2" onClick={goTop}>
                            <IconEdit stroke={1.5} />
                            <p>Edit product</p>
                        </Link>
                        {isLoading ?
                        <div className="py-2.5 rounded-lg bg-red-500 text-white flex items-center justify-center w-1/2">
                            <Loader width={24} height={24} />
                        </div> :
                        <button type="button" className="flex items-center justify-center gap-2 bg-red-500 text-white p-2 rounded-lg w-1/2" onClick={handleDeleteProduct}>
                            <IconTrash stroke={1.5} />
                            <p>Delete product</p>
                        </button>}
                    </article>
                    <article className="flex flex-col gap-4 w-1/2">
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconShoppingBag stroke={1.5} />
                            <p>{product.name}</p>
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTag stroke={1.5} />
                            <p>{product.price}</p>
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconStack2 stroke={1.5} />
                            <p>{product.stock}</p>
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconWeight stroke={1.5} />
                            <p>{product.weight}</p>
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTexture stroke={1.5} />
                            <p>{product.texture}</p>
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconRuler2 stroke={1.5} />
                            <p>{product.size}</p>
                        </article>
                        <article className="flex flex-col gap-2 w-full">
                            <img src={`${import.meta.env.VITE_STORAGE_API}/${product.image_url}`} alt="Image Preview" className="w-full rounded-md" />
                        </article>
                        <article className="bg-primary/10 p-2 flex gap-2 rounded-lg w-full">
                            <IconClipboardText stroke={1.5} />
                            <p>{product.description}</p>
                        </article>
                    </article>
                </article>
            </article>
        </section>
    )
}