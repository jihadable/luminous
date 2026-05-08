import { IconChevronDown, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";

export default function DashboardUsers(){
    return (
        <section className="dashboard flex h-screen">
            <Sidebar page={"users"} />
            <Content />
        </section>
    )
}

function Content(){
    const { user } = useContext(AuthContext)

    const [users, setUsers] = useState([])

    const [searchParams, setSearchParams] = useSearchParams()

    const updateQuery = payload => {
        setSearchParams({
            role,
            ...payload
        })
    }

    const roleOptions = [
        {
            label: "All",
            name: "all"
        },
        {
            label: "Admin",
            name: "admin"
        },
        {
            label: "Customer",
            name: "customer"
        }
    ]
    const [selectedRoleOption, setSelectedRoleOption] = useState("All")
    const [isRoleOptionsShowed, setIsRoleOptionsShowed] = useState(false)
    const role = searchParams.get("role") || "all"
    const updateSelectedRoleOption = roleOption => {
        updateQuery({ role: roleOption.name })
        setSelectedRoleOption(roleOption.label)
        setIsRoleOptionsShowed(false)
    }

    useEffect(() => {
        const getUsers = async() => {
            try {

                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const jwt = localStorage.getItem("jwt")

                const params = {}
                if (role != "all"){
                    params.role = role
                }
                const { data } = await axios.get(`${APIEndpoint}/users`, {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    },
                    params
                })

                setUsers(data.data.users)
            } catch(error){
                console.log(error)
            }
        }

        getUsers()
    }, [role])

    return (
        <section className="flex flex-col text-xl w-full overflow-y-auto">
            <article className="flex flex-col gap-4 p-4 pb-12 w-full">
                <article className="w-full">
                    <p className="font-bold">{user?.name}</p>
                </article>
                <article className="flex flex-col gap-4">
                    <article className="flex items-center gap-4">
                        <article className="flex relative">
                            <button type="button" className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white" onClick={() => setIsRoleOptionsShowed(!isRoleOptionsShowed)}>
                                <span>Role: {selectedRoleOption}</span>
                                <IconChevronDown stroke={1.5} className={`transition-all ${isRoleOptionsShowed ? "rotate-180" : ""}`} />
                            </button>
                            <article className={`${isRoleOptionsShowed ? "flex" : "hidden"} flex-col absolute top-full left-0 bg-white shadow-2xl rounded-md overflow-hidden`}>
                            {roleOptions.map((roleOption, index) => (
                                <button type="button" className="text-left p-2 whitespace-nowrap hover:bg-primary/5" key={index} onClick={() => updateSelectedRoleOption(roleOption)}>{roleOption.label}</button>
                            ))}
                            </article>
                        </article>
                        <article className="flex relative">
                            {/* <button type="button" className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white" onClick={() => setIsCategoryOptionsShowed(!isCategoryOptionsShowed)}>
                                <span>Verification status: {selectedCategory}</span>
                                <IconChevronDown stroke={1.5} className={`transition-all ${isCategoryOptionsShowed ? "rotate-180" : ""}`} />
                            </button>
                            <article className={`${isCategoryOptionsShowed ? "flex" : "hidden"} flex-col absolute top-full left-0 bg-white shadow-2xl rounded-md overflow-hidden`}>
                            {categoryOptions.map((category, index) => (
                                <button type="button" className="text-left p-2 whitespace-nowrap hover:bg-primary/5" key={index} onClick={() => updateSelectedCategoryOption(category)}>{category.label}</button>
                            ))}
                            </article> */}
                        </article>
                    </article>
                    <table className="rounded-t-lg overflow-hidden">
                        <thead>
                            <tr className="bg-primary text-white">
                                <td className="p-2">No</td>
                                <td className="p-2">Email</td>
                                <td className="p-2">Name</td>
                                <td className="p-2">Role</td>
                                <td className="p-2 text-center">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                        {users?.map((user, index) => (
                            <tr key={index} className={`border-b border-primary`}>
                                {/* <td className="p-2">{limit * (page - 1) + index + 1}</td> */}
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.role}</td>
                                <td className="p-2 text-center flex justify-center">
                                {/* {
                                    isLoading ?
                                    <div className="p-1 rounded-lg bg-red-500 text-white flex items-center justify-center">
                                        <Loader width={24} height={24} />
                                    </div> :
                                } */}
                                    <button type="button" className="p-1 rounded-md bg-red-500 text-white">
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