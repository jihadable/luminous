import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function Account(){

    const { isLogin } = useContext(AuthContext)

    if (isLogin === false){
        return <NotFound />
    }
    else if (isLogin === true){
        document.title = "Luminous | Akun"

        return (
            <>
            <Navbar />
            <AccountSection />
            <Footer />
            </>
        )
    }
    else {
        return null
    }
}

function AccountSection(){

    const { user } = useContext(AuthContext)
    const avatarGenerator = import.meta.env.VITE_AVATAR_GENERATOR

    const [isLoading, setIsLoading] = useState(false)

    const phoneElement = useRef(null)
    const addressElement = useRef(null)

    const updateUserProfile = async() => {
        const phonePattern = /^08\d{8,13}$/
        const phone = phoneElement.current.value == "" ? null : phoneElement.current.value
        const address = addressElement.current.value == "" ? null : addressElement.current.value

        if (!phonePattern.test(phone)){
            toast.error("No HP tidak sesuai")

            return
        }

        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT
            const token = localStorage.getItem("token")

            const { data } = await axios.patch(usersAPIEndpoint, 
                { phone, address },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            setIsLoading(false)
            toast.success(data.message)
        } catch(error){
            setIsLoading(false)
            console.log(error)
            toast.success(error.response.data.message)
        }
    }

    return (
        <section className="account-section w-[80vw] flex flex-col items-center gap-6 my-32 mx-auto mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="top flex flex-col items-center gap-2">
                <img src={`${avatarGenerator}name=${user.fullname}`} alt="Akun" className="w-36 rounded-full" />
                <div className="font-bold text-xl">{user.fullname}</div>
            </div>
            <div className="bottom flex flex-col items-center gap-2">
                <div className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconMail stroke={1.5} />
                    <span>{user.email}</span>
                </div>
                <div className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconPhone stroke={1.5} />
                    <input type="text" defaultValue={user.phone} className="bg-transparent border-none outline-none" required ref={phoneElement} />
                </div>
                <div className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconMapPin stroke={1.5} />
                    <input type="text" defaultValue={user.address} className="bg-transparent border-none outline-none" required ref={addressElement} />
                </div>
                {
                    isLoading ?
                    <div className="w-full flex items-center justify-center text-white gap-2 p-2 rounded-md bg-primary">
                        <Loader width={24} height={24} />
                    </div> :
                    <button type="button" className="w-full flex items-center justify-center text-white gap-2 p-2 rounded-md bg-primary" onClick={updateUserProfile}>Simpan</button>
                }
            </div>
        </section>
    )
}