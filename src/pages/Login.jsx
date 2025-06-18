import { IconLock, IconMail } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import luminousLogo from "../assets/luminous-logo.png"
import Loader from "../components/Loader"
import { AuthContext } from "../contexts/AuthContext"
import goTop from "../utils/goTop"
import NotFound from "./NotFound"

function Login(){
    const { isLogin, setIsLogin, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const emailElement = useRef(null)
    const passwordElement = useRef(null)
    
    const handleLogin = async(e) => {
        e.preventDefault()

        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_API_ENDPOINT

            const [email, password] = [emailElement.current.value, passwordElement.current.value]

            const { data } = await axios.post(`${usersAPIEndpoint}/api/users/login`, {
                email, password
            })

            localStorage.setItem("token", data.data.token)
            setIsLogin(true)
            setUser(data.data.user)

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
        document.title = "Luminous | Login"
        
        return (
            <div className="w-[100vw] min-h-[100vh] flex flex-col gap-4 items-center justify-center bg-primary/[.1]">
                <header className="flex items-center gap-2">
                    <img src={luminousLogo} alt="Luminous" className="w-14"/>
                    <span className="text-4xl">Luminous</span>
                </header>
                <form action="" className="flex flex-col item-center p-10 rounded-lg bg-white gap-6 shadow-2xl mobile:w-[90vw] mobile:p-6 tablet:w-[60vw]" onSubmit={handleLogin}>
                    <div className="form-login-header text-3xl text-center">Login</div>
                    <div className="form-login-email relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                        <IconMail stroke={1.5} />
                        <input type="email" placeholder="Email" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={emailElement} />
                    </div>
                    <div className="form-login-password relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                        <IconLock stroke={1.5} />
                        <input type="password" placeholder="Password" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={passwordElement} />
                    </div>
                    {
                        isLoading ?
                        <div className="py-2 rounded bg-primary text-white flex items-center justify-center">
                            <Loader width={24} height={24} />
                        </div> :
                        <button type="submit" className="py-2 rounded bg-primary text-white">Login</button>
                    }
                    <div className="not-have-account">
                        Do not have account yet? <Link to={"/register"} onClick={goTop} className="text-primary hover:underline">Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login