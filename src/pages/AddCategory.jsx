import { IconLabel } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useRef, useState } from "react"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import Sidebar from "../components/Sidebar"
import { AuthContext } from "../contexts/AuthContext"

export default function AddCategory(){
    return (
        <section className="add-category flex h-screen">
            <Sidebar page={"categories"} />
            <Content />
        </section>
    )
}

function Content(){
    const { user } = useContext(AuthContext)
    const categoryNameInputElement = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleAddCategory = async(event) => {
        try {
            event.preventDefault()

            setIsLoading(true)
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("jwt")

            const requestBody = {
                name: categoryNameInputElement.current.value
            }
            await axios.post(`${APIEndpoint}/categories`, requestBody, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })

            setIsLoading(false)
            toast.success("Category added successfully")
        } catch(error){
            toast.error("Fail to add category")
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
                        <p className="font-bold">Add category</p>
                    </article>
                    <form className="flex flex-col gap-4 w-1/2" onSubmit={handleAddCategory}>
                        <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                            <IconLabel stroke={1.5} />
                            <input type="text" placeholder="Category name" className="bg-transparent outline-none w-full" required ref={categoryNameInputElement} />
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