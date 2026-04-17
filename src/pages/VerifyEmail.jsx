import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import logo from "../assets/luminous-logo.png"
import Loader from "../components/Loader"
import { AuthContext } from "../contexts/AuthContext"
import NotFound from "./NotFound"

export default function VerifyEmail(){
    const { token } = useParams()
    const [status, setStatus] = useState("error")
    const { user, setUser, isLogin } = useContext(AuthContext)

    if (!token){
        return <NotFound />
    }

    useEffect(() => {
        const handleVerifyEmail = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                await axios.post(`${APIEndpoint}/api/email-verifications/verify-email`, {
                    token
                })

                if (isLogin === true && user){
                    setUser({...user, is_email_verified: true})
                }

                setStatus("success")
            } catch(error){
                console.log(error)
                setStatus("error")
            }
        }

        handleVerifyEmail()
    }, [token])
    
    if (status == "loading"){
        return (
            <section className="flex flex-col h-screen w-screen items-center justify-center">
                <Loader width={24} height={24} />
            </section>
        )
    }
    if (status == "error"){
        return (
            <section className="flex flex-col h-screen w-screen items-center justify-center p-2">
                <div className="text-xl font-bold text-center">Luminous</div>
                <img src={logo} alt="Luminous Logo" className="w-12" />
                <div className="flex items-center mt-4 gap-1 text-center"><p>Verification failed</p> <IconX className="text-red-500" /></div>
                <p className="text-center">This verification link is invalid or has expired.</p>
                <Link to={"/"} className="mt-2 rounded-md bg-primary text-white p-2 flex items-center gap-2">
                    <IconArrowLeft stroke={1.5} />
                    <span>Back to home</span>
                </Link>
            </section>
        )
    }
    if (status == "success"){
        return (
            <section className="flex flex-col h-screen w-screen items-center justify-center p-2">
                <div className="text-xl font-bold text-center">Luminous</div>
                <img src={logo} alt="Luminous Logo" className="w-12" />
                <div className="flex items-center mt-4 gap-1 text-center"><p>Email verified</p> <IconCheck className="text-green-500" /></div>
                <p className="text-center">Your email address has been successfully verified.</p>
                <Link to={"/"} className="mt-2 rounded-md bg-primary text-white p-2 flex items-center gap-2">
                    <IconArrowLeft stroke={1.5} />
                    <span>Back to home</span>
                </Link>
            </section>
        )
    }
}