import { IconPhoto, IconRuler2, IconShoppingBag, IconStack2, IconTag, IconTexture, IconWeight } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import Sidebar from "../components/Sidebar"
import { AuthContext } from "../contexts/AuthContext"

export default function AddProduct(){
    return (
        <section className="add-product flex h-screen">
            <Sidebar page={"products"} />
            <Content />
        </section>
    )
}

function Content(){
    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const handleAddProduct = async(event) => {
        try {
            event.preventDefault()

            setIsLoading(true)
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("token")

            const requestBody = {
                name: categoryNameInputElement.current.value
            }
            await axios.post(`${APIEndpoint}/api/categories`, requestBody, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })

            setIsLoading(false)
            toast.success("Product added successfully")
        } catch(error){
            toast.error("Fail to add product")
            setIsLoading(false)
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
                    <article className="flex">
                        <p className="font-bold">Add product</p>
                    </article>
                    <form className="flex flex-col gap-4 w-1/2" onSubmit={handleAddProduct}>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconShoppingBag stroke={1.5} />
                            <input type="text" placeholder="Name" className="bg-transparent outline-none w-full" required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTag stroke={1.5} />
                            <input type="text" placeholder="Price" className="bg-transparent outline-none w-full" required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconStack2 stroke={1.5} />
                            <input type="text" placeholder="Stock" className="bg-transparent outline-none w-full" required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconWeight stroke={1.5} />
                            <input type="text" placeholder="Weight" className="bg-transparent outline-none w-full" required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTexture stroke={1.5} />
                            <input type="text" placeholder="Texture" className="bg-transparent outline-none w-full" required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconRuler2 stroke={1.5} />
                            <input type="text" placeholder="Size" className="bg-transparent outline-none w-full" required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <label className="flex items-center gap-2 w-full cursor-pointer">
                                <IconPhoto stroke={1.5} />
                                <p>Image</p>
                                <input type="file" placeholder="Image" className="bg-transparent outline-none w-full" required hidden />
                            </label>
                        </article>
                    {
                        isLoading ?
                        <div className="py-2.5 rounded-lg bg-primary text-white flex items-center justify-center">
                            <Loader width={24} height={24} />
                        </div> :
                        <button type="submit" className="py-2 rounded-lg bg-primary text-white">Submit</button>
                    }
                    </form>
                </article>
            </article>
        </section>
    )
}