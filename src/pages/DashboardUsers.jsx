import { IconChevronDown } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function DashboardUsers(){
    const { isLogin, user } = useContext(AuthContext)
    
    if (isLogin === false || user?.role == "customer"){
        return <NotFound />
    }

    if (isLogin === true && user?.role == "admin"){
        return (
            <section className="dashboard flex h-screen">
                <Sidebar page={"users"} />
                <Content user={user} />
            </section>
        )
    }

    return null
}

function Content({ user }){
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

    const statusOptions = [
        {
            label: "All",
            name: "all"
        },
        {
            label: "Verified",
            name: "verified"
        },
        {
            label: "Not verified",
            name: "not verified"
        }
    ]
    const [selectedStatusOption, setSelectedStatusOption] = useState("All")
    const [isStatusOptionsShowed, setIsStatusOptionsShowed] = useState(false)
    const status = searchParams.get("status") || "all"
    const updateSelectedStatusOption = statusOption => {
        updateQuery({ status: statusOption.name })
        setSelectedStatusOption(statusOption.label)
        setIsStatusOptionsShowed(false)
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
                if (status != "all"){
                    params.is_email_verified = status == "verified"
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
    }, [role, status])

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
                            <button type="button" className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white" onClick={() => setIsStatusOptionsShowed(!isStatusOptionsShowed)}>
                                <span>Status: {selectedStatusOption}</span>
                                <IconChevronDown stroke={1.5} className={`transition-all ${isStatusOptionsShowed ? "rotate-180" : ""}`} />
                            </button>
                            <article className={`${isStatusOptionsShowed ? "flex" : "hidden"} flex-col absolute top-full left-0 bg-white shadow-2xl rounded-md overflow-hidden`}>
                            {statusOptions.map((status, index) => (
                                <button type="button" className="text-left p-2 whitespace-nowrap hover:bg-primary/5" key={index} onClick={() => updateSelectedStatusOption(status)}>{status.label}</button>
                            ))}
                            </article>
                        </article>
                    </article>
                    <table className="rounded-t-lg overflow-hidden">
                        <thead>
                            <tr className="bg-primary text-white">
                                <td className="p-2">No</td>
                                <td className="p-2">Email</td>
                                <td className="p-2">Name</td>
                                <td className="p-2">Role</td>
                            </tr>
                        </thead>
                        <tbody>
                        {users?.map((user, index) => (
                            <tr key={index} className={`border-b border-primary`}>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </article>
            </article>
        </section>
    )
}