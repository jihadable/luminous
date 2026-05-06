import axios from "axios";
import { useContext, useEffect, useState } from "react";
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

    useEffect(() => {
        const getUsers = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const jwt = localStorage.getItem("token")

                const { data } = await axios.get(`${APIEndpoint}/api/users`, {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })

                console.log(data)
                setUsers(data.data.users)
            } catch(error){
                console.log(error)
            }
        }

        getUsers()
    }, [])

    return (
        <section className="flex flex-col text-xl w-full overflow-y-auto">
            <article className="flex flex-col gap-4 p-4 pb-12 w-full">
                <article className="w-full">
                    <p className="font-bold">{user?.name}</p>
                </article>
                <article className="flex flex-col gap-4">

                </article>
            </article>
        </section>
    )
}