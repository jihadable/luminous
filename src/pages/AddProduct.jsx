import { IconChevronDown, IconClipboardText, IconPhoto, IconRuler2, IconShoppingBag, IconStack2, IconTag, IconTexture, IconWeight } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
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
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({
        id: "",
        name: "",
        label: "None"
    })
    const [isCategoryOptionsShowed, setIsCategoryOptionsShowed] = useState(false)

    const [
        nameInputElement,
        priceInputElement,
        stockInputElement,
        weightInputElement,
        textureInputElement,
        sizeInputElement
    ] = [
        useRef(null)
    ]

    useEffect(() => {
        const getCategories = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const { data } = await axios.get(`${APIEndpoint}/api/categories`)

                setCategories(data.data.categories.map(category => {
                    const label = category.name.charAt(0).toUpperCase() + category.name.slice(1)
                    return {...category, label}
                }))
            } catch(error){
                console.log(error)
            }
        }

        getCategories()
    }, [])

    const updateSelectedCategory = (category) => {
        setSelectedCategory(category)
        setIsCategoryOptionsShowed(false)
    }

    const handleAddProduct = async(event) => {
        try {
            event.preventDefault()

            setIsLoading(true)
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("token")

            const requestBody = {
                
            }
            await axios.post(`${APIEndpoint}/api/products`, requestBody, {
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
                            <input type="number" min={1} placeholder="Price (Rp)" className="bg-transparent outline-none w-full" required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconStack2 stroke={1.5} />
                            <input type="number" min={1} placeholder="Stock" className="bg-transparent outline-none w-full" required />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconWeight stroke={1.5} />
                            <input type="number" placeholder="Weight (kg)" className="bg-transparent outline-none w-full" required />
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
                        <article className="bg-primary/10 p-2 flex gap-2 rounded-lg w-full">
                            <div className="flex">
                                <IconClipboardText stroke={1.5} />
                            </div>
                            <textarea rows={7} placeholder="Description" className="bg-transparent outline-none w-full resize-none"></textarea>
                        </article>
                        <article className="flex relative">
                            <button type="button" className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white" onClick={() => setIsCategoryOptionsShowed(!isCategoryOptionsShowed)}>
                                <span>Category: {selectedCategory.label}</span>
                                <IconChevronDown stroke={1.5} className={`transition-all ${isCategoryOptionsShowed ? "rotate-180" : ""}`} />
                            </button>
                            <article className={`${isCategoryOptionsShowed ? "flex" : "hidden"} flex-col absolute top-full left-0 bg-white shadow-2xl rounded-md overflow-hidden`}>
                            {categories.map((category, index) => (
                                <button type="button" className="text-left p-2 whitespace-nowrap hover:bg-primary/5" key={index} onClick={() => updateSelectedCategory(category)}>{category.label}</button>
                            ))}
                            </article>
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