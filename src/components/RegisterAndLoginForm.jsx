import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import luminousLogo from "../assets/luminous-logo.png"
import goTop from "./goTop"

function RegisterLoginForm({ page }){

    return (
        <div className="w-[100vw] min-h-[100vh] flex flex-col gap-4 items-center justify-center bg-white-prim">
            <header className="flex items-center gap-2">
                <img src={luminousLogo} alt="Luminous" className="w-14"/>
                <span className="text-4xl">Luminous</span>
            </header>
            <form action="" className="flex flex-col item-center p-10 rounded-lg bg-white gap-6 shadow-2xl mobile:w-[90vw] mobile:p-6 tablet:w-[60vw]">
                <div className="form-login-header text-3xl text-center">{page === "register" ? "Register" : "Login"}</div>
                {
                    page === "register" &&
                    <div className="form-login-email relative bg-white-prim p-3 flex items-center gap-3 rounded-lg">
                        <IconUserCircle stroke={1.5} />
                        <input type="text" placeholder="Full name" className="bg-transparent outline-none w-[250px] mobile:w-full" />
                    </div>
                }
                <div className="form-login-email relative bg-white-prim p-3 flex items-center gap-3 rounded-lg">
                    <IconMail stroke={1.5} />
                    <input type={page === "login" ? "text" : "email"} placeholder="Email" className="bg-transparent outline-none w-[250px] mobile:w-full" />
                </div>
                <div className="form-login-password relative bg-white-prim p-3 flex items-center gap-3 rounded-lg">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Password" className="bg-transparent outline-none w-[250px] mobile:w-full" />
                </div>
                {
                    page === "register" && 
                    <div className="form-login-password relative bg-white-prim p-3 flex items-center gap-3 rounded-lg">
                        <IconLock stroke={1.5} />
                        <input type="password" placeholder="Confirm password" className="bg-transparent outline-none w-[250px] mobile:w-full" />
                    </div>
                }
                <button type="submit" className="py-2 rounded bg-primary text-white">{page === "login" ? "Login" : "Register"}</button>
                <div className="not-have-account">
                    {page === "login" ? "Don't have an acoount? " : "Already have an account? "}
                    <Link to={page === "login" ? "/register" : "/login"} onClick={goTop} className="text-primary">{page === "login" ? "Register" : "Login"}</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterLoginForm