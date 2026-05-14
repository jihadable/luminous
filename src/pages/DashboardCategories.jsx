import { IconPlus, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import goTop from "../utils/goTop";
import NotFound from "./NotFound";

export default function DashboardCategories(){
    const { isLogin, user } = useContext(AuthContext)
    
    if (isLogin === false || user?.role == "customer"){
        return <NotFound />
    }

    if (isLogin === true && user?.role == "admin"){
        return (
            <section className="dashboard flex h-screen">
                <Sidebar page={"categories"} />
                <Content user={user} />
            </section>
        )
    }

    return null
}

function Content({ user }){
    document.title = "Luminous | Categories"

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT

                const { data } = await axios.get(`${APIEndpoint}/categories`)

                setCategories(data.data.categories)
            } catch(error){
                console.log(error)
            }
        }

        getCategories()
    }, [])

    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteCategory = async(categoryId) => {
        try {
            if (!confirm("Delete this category?")){
                return
            }

            setIsLoading(true)

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("jwt")

            await axios.delete(`${APIEndpoint}/categories/${categoryId}`, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })

            setCategories(categories => [...categories].filter(category => category.id != categoryId))
            setIsLoading(false)
            toast.success("Category deleted successfully")
        } catch(error){
            setIsLoading(false)
            toast.error("Fail to delete category")
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
                        <Link to={"/dashboard/add-category"} className="flex items-center gap-2 bg-primary text-white p-2 rounded-lg" onClick={goTop}>
                            <IconPlus stroke={1.5} />
                            <p>Add category</p>
                        </Link>
                    </article>
                    <table className="rounded-t-lg overflow-hidden">
                        <thead>
                            <tr className="bg-primary text-white">
                                <td className="p-2">No</td>
                                <td className="p-2">Name</td>
                                <td className="p-2 text-center">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map((category, index) => (
                            <tr key={index} className={`border-b border-primary`}>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{category.name}</td>
                                <td className="p-2 text-center flex justify-center gap-1">
                                    {isLoading ?
                                    <div className="p-1 rounded-lg bg-red-500 text-white flex items-center justify-center">
                                        <Loader width={24} height={24} />
                                    </div> :
                                    <button type="button" className="p-1 rounded-lg bg-red-500 text-white" title="delete" onClick={() => handleDeleteCategory(category.id)}>
                                        <IconTrash stroke={1.5} />
                                    </button>}
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </article>
            </article>
        </section>
    )
}