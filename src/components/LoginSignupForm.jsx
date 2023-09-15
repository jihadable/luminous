import React from "react"
import luminousLogo from "../assets/luminous-logo.png"
import { IconMail } from "@tabler/icons-react"
import { IconLock } from "@tabler/icons-react"
import { IconUserCircle } from "@tabler/icons-react"

function LoginSignupForm(props){

    const page = props.page

    return (
        <div className="w-[100vw] min-h-[100vh] flex flex-col gap-4 items-center justify-center">
            <header className="flex items-center gap-2">
                <img src={luminousLogo} alt="Luminous" className="w-14"/>
                <span className="text-4xl">Luminous</span>
            </header>
            <form action="" className="flex flex-col item-center p-10 rounded-lg bg-white gap-6 shadow-2xl mobile:w-[90vw] mobile:p-6 tablet:w-[60vw]">
                <div className="form-login-header text-3xl text-center">Log in</div>
                {
                    page === "signup" &&
                    <div className="form-login-email relative bg-white-prim p-3 flex items-center gap-3 rounded-lg">
                        <IconUserCircle stroke={1.5} />
                        <input type="text" placeholder="Username" className="bg-transparent outline-none w-[250px] mobile:w-full" />
                    </div>
                }
                <div className="form-login-email relative bg-white-prim p-3 flex items-center gap-3 rounded-lg">
                    <IconMail stroke={1.5} />
                    <input type={page === "login" ? "text" : "email"} placeholder={page === "login" ? "Username or email" : "Email"} className="bg-transparent outline-none w-[250px] mobile:w-full" />
                </div>
                <div className="form-login-password relative bg-white-prim p-3 flex items-center gap-3 rounded-lg">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Password" className="bg-transparent outline-none w-[250px] mobile:w-full" />
                </div>
                {
                    page === "signup" && 
                    <div className="form-login-password relative bg-white-prim p-3 flex items-center gap-3 rounded-lg">
                        <IconLock stroke={1.5} />
                        <input type="password" placeholder="Confirm password" className="bg-transparent outline-none w-[250px] mobile:w-full" />
                    </div>
                }
                <button type="submit" className="py-2 rounded bg-primary text-white">{page === "login" ? "Log in" : "Sign up"}</button>
                <div className="not-have-account">
                    {page === "login" ? "Don't have an acoount? " : "Already have an account? "}
                    <a href={page === "login" ? "/signup" : "/login"} className="text-primary">{page === "login" ? "Sign up" : "Log in"}</a>
                </div>
            </form>
        </div>
    )
}

export default LoginSignupForm