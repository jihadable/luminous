import { IconClipboardText, IconRuler2, IconShoppingBag, IconStack2, IconTag, IconTexture, IconWeight } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function DashboardProduct(){
    const { product_id } = useParams()
    const [product, setProduct] = useState(null)
    const [notFound, setNotFound] = useState(false)

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

    if (notFound){
        return <NotFound />
    }
    if (product !== undefined && product !== null){
        return (
            <section className="product flex h-screen">
                <Sidebar page={"products"} />
                <Content product={product} />
            </section>
        )
    }

    return null  
}

function Content({ product }){
    const { user } = useContext(AuthContext)

    return (
        <section className="flex flex-col text-xl w-full overflow-y-auto">
            <article className="flex flex-col gap-4 p-4 pb-12 w-full">
                <article className="w-full">
                    <p className="font-bold">{user?.name}</p>
                </article>
                <article className="flex flex-col gap-4">
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