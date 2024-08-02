import { IconLock, IconMail, IconMapPin, IconPhone, IconUserCircle } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import luminousLogo from "../assets/luminous-logo.png"
import Loader from "../components/Loader"
import { AuthContext } from "../contexts/AuthContext"
import goTop from "../utils/goTop"
import NotFound from "./NotFound"

function Register(){

    const { isLogin, setIsLogin, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const fullnameElement = useRef(null)
    const emailElement = useRef(null)
    const phoneElement = useRef(null)
    const addressElement = useRef(null)
    const passwordElement = useRef(null)
    const confirmPasswordElement = useRef(null)

    const handleRegister = async(e) => {
        e.preventDefault()

        const phonePattern = /^08\d{8,13}$/
        const [
            fullname, email, phone, address, password, confirmPassword
        ] = [
            fullnameElement.current.value,
            emailElement.current.value,
            phoneElement.current.value,
            addressElement.current.value,
            passwordElement.current.value,
            confirmPasswordElement.current.value
        ]

        if (password.length < 8){
            toast.error("Password harus minimal 8 karakter")

            return
        }

        if (password !== confirmPassword){
            toast.error("Konfirmasi password tidak sesuai")

            return
        }

        if (!phonePattern.test(phone)){
            toast.error("No HP tidak sesuai")

            return
        }

        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT

            const { data } = await axios.post(`${usersAPIEndpoint}/register`, {
                fullname, email, phone, address, password
            })

            localStorage.setItem("token", data.token)
            setIsLogin(true)
            setUser(data.user)

            setIsLoading(false)
            navigate("/")
        } catch(error){
            setIsLoading(false)
            localStorage.removeItem("token")
            setIsLogin(false)
            setUser(null)
            toast.error(error.response.data.message)
        }
    }

    if (isLogin === true){
        return <NotFound />
    }

    if (isLogin === false){
        document.title = "Luminous | Register"
        
        return (
            <div className="min-h-[100vh] flex flex-col gap-4 items-center justify-center py-8 bg-primary/[.1]">
                <header className="flex items-center gap-2">
                    <img src={luminousLogo} alt="Luminous" className="w-14"/>
                    <span className="text-4xl">Luminous</span>
                </header>
                <form action="" className="flex flex-col item-center p-10 rounded-lg bg-white gap-6 shadow-2xl mobile:w-[90vw] mobile:p-6 tablet:w-[60vw]" onSubmit={handleRegister}>
                    <div className="form-login-header text-3xl text-center">Register</div>
                    <div className="form-login-email relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                        <IconUserCircle stroke={1.5} />
                        <input type="text" placeholder="Full name" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={fullnameElement} />
                    </div>
                    <div className="form-login-email relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                        <IconMail stroke={1.5} />
                        <input type="email" placeholder="Email" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={emailElement} />
                    </div>
                    <div className="form-login-phone relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                        <IconPhone stroke={1.5} />
                        <input type="text" placeholder="No HP" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={phoneElement} />
                    </div>
                    <div className="form-login-address relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                        <IconMapPin stroke={1.5} />
                        <input type="text" placeholder="Alamat" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={addressElement} />
                    </div>
                    <div className="form-login-password relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                        <IconLock stroke={1.5} />
                        <input type="password" placeholder="Password" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={passwordElement} />
                    </div>
                    <div className="form-login-password relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                        <IconLock stroke={1.5} />
                        <input type="password" placeholder="Confirm password" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={confirmPasswordElement} />
                    </div>
                    {
                        isLoading ?
                        <div className="py-2 rounded bg-primary text-white flex items-center justify-center">
                            <Loader width={24} height={24} />
                        </div> :
                        <button type="submit" className="py-2 rounded bg-primary text-white">Register</button>
                    }
                    <div className="not-have-account">
                        Sudah punya akun? <Link to={"/login"} onClick={goTop} className="text-primary hover:underline">Login</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register