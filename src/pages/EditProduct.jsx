import { IconClipboardText, IconRuler2, IconShoppingBag, IconStack2, IconTag, IconTexture, IconWeight } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function EditProduct(){
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
            <section className="edit-product flex h-screen">
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
                    <article className="flex">
                        <p className="font-bold">Edit product</p>
                    </article>
                    <form className="flex flex-col gap-4 w-1/2">
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconShoppingBag stroke={1.5} />
                            <input type="text" placeholder="Name" className="bg-transparent outline-none w-full" defaultValue={product.name} required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTag stroke={1.5} />
                            <input type="number" min={1} placeholder="Price (Rp)" className="bg-transparent outline-none w-full" defaultValue={product.price} required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconStack2 stroke={1.5} />
                            <input type="number" min={1} placeholder="Stock" className="bg-transparent outline-none w-full" defaultValue={product.stock} required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconWeight stroke={1.5} />
                            <input type="number" placeholder="Weight (kg)" className="bg-transparent outline-none w-full" defaultValue={product.weight} required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTexture stroke={1.5} />
                            <input type="text" placeholder="Texture" className="bg-transparent outline-none w-full" defaultValue={product.texture} required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconRuler2 stroke={1.5} />
                            <input type="text" placeholder="Size" className="bg-transparent outline-none w-full" defaultValue={product.size} required />
                        </article>
                        <article className="flex flex-col gap-2 w-full">
                            {/* <label className="bg-primary/10 p-2 rounded-lg flex items-center gap-2 w-full cursor-pointer">
                                <IconPhoto stroke={1.5} />
                                <p>{imagePreview ? "Change image" : "Image"}</p>
                                <input type="file" className="bg-transparent outline-none w-full" hidden name="image-file" />
                            </label>
                            {imagePreview &&
                            <article className="flex w-full">
                                <img src={imagePreview} alt="Image Preview" className="rounded-md" />
                            </article>} */}
                        </article>
                        <article className="bg-primary/10 p-2 flex gap-2 rounded-lg w-full">
                            <div className="flex">
                                <IconClipboardText stroke={1.5} />
                            </div>
                            <textarea rows={7} placeholder="Description" className="bg-transparent outline-none w-full resize-none" defaultValue={product.description} required ></textarea>
                        </article>
                        <article className="flex relative">
                            {/* <button type="button" className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white w-full justify-between" onClick={() => setIsCategoryOptionsShowed(!isCategoryOptionsShowed)}>
                                <span>Category: {selectedCategory.label}</span>
                                <IconChevronDown stroke={1.5} className={`transition-all ${isCategoryOptionsShowed ? "rotate-180" : ""}`} />
                            </button>
                            <article className={`${isCategoryOptionsShowed ? "flex" : "hidden"} flex-col absolute top-full left-0 bg-white shadow-2xl rounded-md overflow-hidden`}>
                            {categories.map((category, index) => (
                                <button type="button" className="text-left p-2 whitespace-nowrap hover:bg-primary/5" key={index} onClick={() => updateSelectedCategory(category)}>{category.label}</button>
                            ))}
                            </article> */}
                        </article>
                    {/* {
                        isLoading ?
                        <div className="py-2.5 rounded-lg bg-primary text-white flex items-center justify-center">
                            <Loader width={24} height={24} />
                        </div> :
                        <button type="submit" className="py-2 rounded-lg bg-primary text-white">Submit</button>
                    } */}
                    </form>
                </article>
            </article>
        </section>
    )
}