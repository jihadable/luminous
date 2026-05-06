import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";

export default function DashboardCategories(){
    return (
        <section className="dashboard flex h-screen">
            <Sidebar page={"categories"} />
            <Content />
        </section>
    )
}

function Content(){
    const { user } = useContext(AuthContext)

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT

                const { data } = await axios.get(`${APIEndpoint}/api/categories`)

                setCategories(data.data.categories)
            } catch(error){
                console.log(error)
            }
        }

        getCategories()
    }, [])

    return (
        <section className="flex flex-col text-xl w-full overflow-y-auto">
            <article className="flex flex-col gap-4 p-4 pb-12 w-full">
                <article className="w-full">
                    <p className="font-bold">{user?.name}</p>
                </article>
                <article className="flex flex-col gap-4">
                    <article className="flex">
                        <Link to={"/dashboard/add-category"} className="flex items-center gap-2 bg-primary text-white p-2 rounded-md">
                            <IconPlus stroke={1.5} />
                            <span><p>Add category</p></span>
                        </Link>
                    </article>
                    <table className="rounded-t-md overflow-hidden">
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
                                <td className="p-2">
                                    <Link to={`/dashboard/categories/${category.id}`}>{category.name}</Link>
                                </td>
                                <td className="p-2 text-center flex justify-center gap-1">
                                    <Link to={`/dashboard/categories/edit/${category.id}`} className="p-1 rounded-md bg-yellow-400 text-black">
                                        <IconEdit stroke={1.5} />
                                    </Link>
                                    <button type="button" className="p-1 rounded-md bg-red-500 text-black">
                                        <IconTrash stroke={1.5} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </article>
            </article>
        </section>
    )
}