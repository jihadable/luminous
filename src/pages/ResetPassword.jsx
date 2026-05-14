import { IconLock } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function ResetPassword(){
    return (
        <>
        <Navbar />
        <ResetPasswordSection />
        <Footer />
        </>
    )
}

function ResetPasswordSection(){
    const { token } = useParams()

    const [
        newPasswordInputElement,
        newPasswordConfirmationInputElement
    ] = [
        useRef(null),
        useRef(null)
    ]

    const [isLoading, setIsLoading] = useState(false)

    const handleResetPassword = async(event) => {
        try {
            event.preventDefault()

            setIsLoading(true)

            // setIsLoading(false)
            // toast.success("Password reset successfully")
        } catch(error){
            setIsLoading(false)
            toast.error("Fail to reset password")
            console.log(error)
        }
    }

    return (
        <section className="flex items-center justify-center h-screen w-full text-xl">
            <article className="flex flex-col items-center gap-4 w-1/2">
                <p className="font-bold text-2xl text-center">Reset password</p>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleResetPassword}>
                    <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                        <IconLock stroke={1.5} />
                        <input type="password" placeholder="New password" className="bg-transparent outline-none w-full" required ref={newPasswordInputElement} />
                    </article>
                    <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                        <IconLock stroke={1.5} />
                        <input type="password" placeholder="New password confirmation" className="bg-transparent outline-none w-full" required ref={newPasswordConfirmationInputElement} />
                    </article>
                {
                    isLoading ?
                    <div className="py-2.5 rounded-lg bg-primary text-white flex items-center justify-center">
                        <Loader width={24} height={24} />
                    </div> :
                    <button type="submit" className="py-2 rounded-lg bg-primary text-white">Submit</button>
                }
                </form>
            </article>
        </section>
    )
}