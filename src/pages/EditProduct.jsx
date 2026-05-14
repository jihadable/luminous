import { IconChevronDown, IconClipboardText, IconPhoto, IconRuler2, IconShoppingBag, IconStack2, IconTag, IconTexture, IconWeight } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import goTop from "../utils/goTop";
import NotFound from "./NotFound";

export default function EditProduct(){
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
            <section className="edit-product flex h-screen">
                <Sidebar page={"products"} />
                <Content user={user} product={product} />
            </section>
        )
    }

    return null
}

function Content({ user, product }){
    document.title = "Luminous | Edit product"

    const productImagesAPIEndpoint = import.meta.env.VITE_STORAGE_API
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
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
    const [imagePreview, setImagePreview] = useState(`${productImagesAPIEndpoint}/${product.image_url}`)

    const [categoryOptions, setCategoryOptions] = useState([{
        id: "",
        label: "None"
    }])

    const [selectedCategory, setSelectedCategory] = useState({
        id: product.category.id,
        label: product.category.name.charAt(0).toUpperCase() + product.category.name.slice(1)
    })
    const [isCategoryOptionsShowed, setIsCategoryOptionsShowed] = useState(false)

    useEffect(() => {
        const getCategories = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const { data } = await axios.get(`${APIEndpoint}/categories`)

                const formattedCategories = data.data.categories.map(category => {
                    const label = category.name.charAt(0).toUpperCase() + category.name.slice(1)
                    return {...category, label}
                })
                setCategoryOptions([
                    {
                        id: "",
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

    const handleEditProduct = async(event) => {
        try {
            event.preventDefault()

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
            if (imageFileInputElement.current.files.length){
                requestBody.append("image", imageFileInputElement.current.files[0])
            }
            requestBody.append("description", descriptionInputElement.current.value)
            if (selectedCategory.label != "None"){
                requestBody.append("category_id", selectedCategory.id)
            }

            await axios.put(`${APIEndpoint}/products/${product.id}`, requestBody, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })

            setIsLoading(false)
            toast.success("Product updated successfully")
            navigate("/dashboard/products")
        } catch(error){
            setIsLoading(false)
            toast.error("Fail to update product")
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
                        <p className="font-bold">Edit product</p>
                    </article>
                    <form className="flex flex-col gap-4 w-1/2" onSubmit={handleEditProduct}>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconShoppingBag stroke={1.5} />
                            <input type="text" placeholder="Name" className="bg-transparent outline-none w-full" defaultValue={product.name} required ref={nameInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTag stroke={1.5} />
                            <input type="number" min={1} placeholder="Price (Rp)" className="bg-transparent outline-none w-full" defaultValue={product.price} required ref={priceInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconStack2 stroke={1.5} />
                            <input type="number" min={1} placeholder="Stock" className="bg-transparent outline-none w-full" defaultValue={product.stock} required ref={stockInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconWeight stroke={1.5} />
                            <input type="text" placeholder="Weight (kg)" className="bg-transparent outline-none w-full" defaultValue={product.weight} required ref={weightInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconTexture stroke={1.5} />
                            <input type="text" placeholder="Texture" className="bg-transparent outline-none w-full" defaultValue={product.texture} required ref={textureInputElement} />
                        </article>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconRuler2 stroke={1.5} />
                            <input type="text" placeholder="Size" className="bg-transparent outline-none w-full" defaultValue={product.size} required ref={sizeInputElement} />
                        </article>
                        <article className="flex flex-col gap-2 w-full">
                            <label className="bg-primary/10 p-2 rounded-lg flex items-center gap-2 w-full cursor-pointer">
                                <IconPhoto stroke={1.5} />
                                <p>Change image</p>
                                <input type="file" className="bg-transparent outline-none w-full" hidden name="image-file" ref={imageFileInputElement} onChange={handleImagePreview} />
                            </label>
                            <article className="flex w-full">
                                <img src={imagePreview} alt="Image Preview" className="w-full rounded-md" />
                            </article>
                        </article>
                        <article className="bg-primary/10 p-2 flex gap-2 rounded-lg w-full">
                            <div className="flex">
                                <IconClipboardText stroke={1.5} />
                            </div>
                            <textarea rows={7} placeholder="Description" className="bg-transparent outline-none w-full resize-none" defaultValue={product.description} required ref={descriptionInputElement}></textarea>
                        </article>
                        <article className="flex relative">
                            <button type="button" className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white w-full justify-between" onClick={() => setIsCategoryOptionsShowed(!isCategoryOptionsShowed)}>
                                <span>Category: {selectedCategory.label}</span>
                                <IconChevronDown stroke={1.5} className={`transition-all ${isCategoryOptionsShowed ? "rotate-180" : ""}`} />
                            </button>
                            <article className={`${isCategoryOptionsShowed ? "flex" : "hidden"} flex-col absolute top-full left-0 bg-white shadow-2xl rounded-md overflow-hidden`}>
                                {categoryOptions.map((category, index) => (
                                <button type="button" className="text-left p-2 whitespace-nowrap hover:bg-primary/5" key={index} onClick={() => updateSelectedCategory(category)}>{category.label}</button>))}
                            </article>
                        </article>
                        <article className="flex items-center gap-4">
                            <Link to={"/dashboard/products"} className="py-2 rounded-lg w-full bg-red-500 text-white text-center" onClick={goTop}>Cancel</Link>
                            {isLoading ?
                            <div className="py-2.5 w-full rounded-lg bg-primary text-white flex items-center justify-center">
                                <Loader width={24} height={24} />
                            </div> :
                            <button type="submit" className="py-2 rounded-lg w-full bg-primary text-white">Submit</button>}
                        </article>
                    </form>
                </article>
            </article>
        </section>
    )
}