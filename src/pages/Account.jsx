import { IconMail, IconMapPin, IconPhone, IconUserCircle } from "@tabler/icons-react";
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

    const { user, setUser } = useContext(AuthContext)
    const avatarGenerator = import.meta.env.VITE_AVATAR_GENERATOR

    const [isLoading, setIsLoading] = useState(false)

    const nameElement = useRef(null)
    const phoneElement = useRef(null)
    const addressElement = useRef(null)

    const updateUserProfile = async() => {
        const name = nameElement.current.value
        const phonePattern = /^08\d{8,13}$/
        const phone = phoneElement.current.value
        const address = addressElement.current.value

        if (name === "" || phone === "" || address === ""){
            toast.error("Masih ada kolom yang belum diisi!")

            return
        }

        if (!phonePattern.test(phone)){
            toast.error("No HP tidak sesuai")

            return
        }

        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const token = localStorage.getItem("token")

            const { data } = await axios.put(`${usersAPIEndpoint}/api/users`, 
                { name, phone, address },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            setUser({...user, name, phone, address})
            setIsLoading(false)
            toast.success(data.message)
        } catch(error){
            setIsLoading(false)
            toast.success(error.response.data.message)
        }
    }

    return (
        <section className="account-section w-[80vw] flex gap-4 my-32 mx-auto mobile:w-full mobile:flex-col mobile:px-4 tablet:w-[90vw]">
            <div className="img flex items-center justify-center">
                <img src={`${avatarGenerator}name=${user.name}`} alt="Akun" className="w-96 rounded-full mobile:w-3/4" />
            </div>
            <div className="desc flex flex-col items-center gap-2 w-full">
                <label className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconUserCircle stroke={1.5} />
                    <input type="text" defaultValue={user.name} placeholder="Nama Lengkap" className="bg-transparent border-none outline-none" required ref={nameElement} />
                </label>
                <div className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconMail stroke={1.5} />
                    <span>{user.email}</span>
                </div>
                <label className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconPhone stroke={1.5} />
                    <input type="text" defaultValue={user.phone} placeholder="No HP" className="bg-transparent border-none outline-none" required ref={phoneElement} />
                </label>
                <label className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconMapPin stroke={1.5} />
                    <input type="text" defaultValue={user.address} placeholder="Alamat" className="bg-transparent border-none outline-none" required ref={addressElement} />
                </label>
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