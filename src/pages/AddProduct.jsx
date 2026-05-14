import { IconChevronDown, IconClipboardText, IconPhoto, IconRuler2, IconShoppingBag, IconStack2, IconTag, IconTexture, IconWeight } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import Sidebar from "../components/Sidebar"
import { AuthContext } from "../contexts/AuthContext"
import NotFound from "./NotFound"

export default function AddProduct(){
    const { isLogin, user } = useContext(AuthContext)
    
    if (isLogin === false || user?.role == "customer"){
        return <NotFound />
    }

    if (isLogin === true && user?.role == "admin"){
        return (
            <section className="add-product flex h-screen">
                <Sidebar page={"products"} />
                <Content user={user} />
            </section>
        )
    }

    return null
}

function Content({ user }){
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([{
        id: "",
        name: "",
        label: "None"
    }])
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
        sizeInputElement,
        imageFileInputElement,
        descriptionInputElement,
    ] = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        const getCategories = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const { data } = await axios.get(`${APIEndpoint}/categories`)

                const formattedCategories = data.data.categories.map(category => {
                    const label = category.name.charAt(0).toUpperCase() + category.name.slice(1)
                    return {...category, label}
                })
                setCategories([
                    {
                        id: "",
                        name: "",
                        label: "None"
                    },
                    ...formattedCategories
                ])
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

    const handleImagePreview = () => {
        const imageFile = imageFileInputElement.current.files[0]

        if (imageFile) {
            const allowedExtensions = ["jpg", "jpeg", "png"]
            const extension = imageFile.name.split(".").pop()?.toLowerCase()
        
            if (extension && allowedExtensions.includes(extension)){
                if (imageFile.size > 1024 * 1024){
                    toast.warn("Image size can not larger than 1MB")

                    return
                }

                const imagePreviewURL = URL.createObjectURL(imageFile)
                setImagePreview(imagePreviewURL)
            } 
            else {
                toast.warn("Unsupported image extension")

                return
            }
        }
    }

    const handleAddProduct = async(event) => {
        try {
            event.preventDefault()

            if (!imageFileInputElement.current.files.length){
                toast.warn("Please fill the image input")

                return
            }

            setIsLoading(true)
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("jwt")
            
            const requestBody = new FormData()
            requestBody.append("name", nameInputElement.current.value)
            requestBody.append("price", priceInputElement.current.value)
            requestBody.append("stock", stockInputElement.current.value)
            requestBody.append("weight", weightInputElement.current.value)
            requestBody.append("texture", textureInputElement.current.value)
            requestBody.append("size", sizeInputElement.current.value)
            requestBody.append("image", imageFileInputElement.current.files[0])
            requestBody.append("description", descriptionInputElement.current.value)
            if (selectedCategory.label != "None"){
                requestBody.append("category_id", selectedCategory.id)
            }

            await axios.post(`${APIEndpoint}/products`, requestBody, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })

            setIsLoading(false)
            toast.success("Product added successfully")

            nameInputElement.current.value = ""
            priceInputElement.current.value = ""
            stockInputElement.current.value = ""
            weightInputElement.current.value = ""
            textureInputElement.current.value = ""
            sizeInputElement.current.value = ""
            imageFileInputElement.current.value = ""
            setImagePreview(null)
            descriptionInputElement.current.value = ""
            setSelectedCategory({ id: "", name: "", label: "None" })
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
                            <input type="text" placeholder="Name" className="bg-transparent outline-none w-full" required ref={nameInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTag stroke={1.5} />
                            <input type="number" min={1} placeholder="Price (Rp)" className="bg-transparent outline-none w-full" required ref={priceInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconStack2 stroke={1.5} />
                            <input type="number" min={1} placeholder="Stock" className="bg-transparent outline-none w-full" required ref={stockInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconWeight stroke={1.5} />
                            <input type="number" placeholder="Weight (kg)" className="bg-transparent outline-none w-full" required ref={weightInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTexture stroke={1.5} />
                            <input type="text" placeholder="Texture" className="bg-transparent outline-none w-full" required ref={textureInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconRuler2 stroke={1.5} />
                            <input type="text" placeholder="Size" className="bg-transparent outline-none w-full" required ref={sizeInputElement} />
                        </article>
                        <article className="flex flex-col gap-2 w-full">
                            <label className="bg-primary/10 p-2 rounded-lg flex items-center gap-2 w-full cursor-pointer">
                                <IconPhoto stroke={1.5} />
                                <p>{imagePreview ? "Change image" : "Image"}</p>
                                <input type="file" className="bg-transparent outline-none w-full" hidden name="image-file" ref={imageFileInputElement} onChange={handleImagePreview} />
                            </label>
                            {imagePreview &&
                            <article className="flex w-full">
                                <img src={imagePreview} alt="Image Preview" className="rounded-md" />
                            </article>}
                        </article>
                        <article className="bg-primary/10 p-2 flex gap-2 rounded-lg w-full">
                            <div className="flex">
                                <IconClipboardText stroke={1.5} />
                            </div>
                            <textarea rows={7} placeholder="Description" className="bg-transparent outline-none w-full resize-none" required ref={descriptionInputElement}></textarea>
                        </article>
                        <article className="flex relative">
                            <button type="button" className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white w-full justify-between" onClick={() => setIsCategoryOptionsShowed(!isCategoryOptionsShowed)}>
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