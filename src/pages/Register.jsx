import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import luminousLogo from "../assets/luminous-logo.png"
import { AuthContext } from "../contexts/AuthContext"
import goTop from "../utils/goTop"

function Register(){
    document.title = "Luminous | Register"

    const { setIsLogin, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const fullnameElement = useRef(null)
    const emailElement = useRef(null)
    const passwordElement = useRef(null)
    const confirmPasswordElement = useRef(null)

    const handleRegister = async(e) => {
        e.preventDefault()

        const [
            fullname, email, password, confirmPassword
        ] = [
            fullnameElement.current.value,
            emailElement.current.value,
            passwordElement.current.value,
            confirmPasswordElement.current.value,
        ]

        if (password !== confirmPassword){
            console.log("Password tidak sama")

            return
        }

        try {
            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT

            const { data } = await axios.post(`${usersAPIEndpoint}/register`, {
                fullname, email, password
            })

            console.log(data)
            localStorage.setItem("token", data.token)
            setIsLogin(true)
            setUser(data.user)

            navigate("/")
        } catch(error){
            setIsLogin(false)
            localStorage.removeItem("token")
            setUser(null)
            console.log(error)
        }
    }

    return (
        <div className="w-[100vw] min-h-[100vh] flex flex-col gap-4 items-center justify-center bg-primary/[.1]">
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
                <div className="form-login-password relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Password" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={passwordElement} />
                </div>
                <div className="form-login-password relative bg-primary/[.1] p-3 flex items-center gap-3 rounded-lg">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Confirm password" className="bg-transparent outline-none w-[250px] mobile:w-full" required ref={confirmPasswordElement} />
                </div>
                <button type="submit" className="py-2 rounded bg-primary text-white">Register</button>
                <div className="not-have-account">
                    Already have an account? <Link to={"/login"} onClick={goTop} className="text-primary">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register