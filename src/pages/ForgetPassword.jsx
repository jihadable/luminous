import { IconMail } from "@tabler/icons-react";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function ForgetPassword(){
    return (
        <>
        <Navbar />
        <ForgetPasswordSection />
        <Footer />
        </>
    )
}

function ForgetPasswordSection(){
    document.title = "Luminous | Forget password"
    
    const emailInputElement = useRef(null)

    const [isLoading, setIsLoading] = useState(false)

    const handleSendPasswordResetEmail = async(event) => {
        try {
            event.preventDefault()

            setIsLoading(true)

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT

            const requestBody = {
                email: emailInputElement.current.value
            }
            await axios.post(`${APIEndpoint}/password-reset/send-password-reset-email`, requestBody)

            setIsLoading(false)
            toast.success("Email sent!")
        } catch(error){
            setIsLoading(false)
            toast.error("Fail to send email")
            console.log(error)
        }
    }

    return (
        <section className="flex items-center justify-center h-screen w-full text-xl">
            <article className="flex flex-col items-center gap-4 w-1/2">
                <p className="font-bold text-2xl text-center">Forget password</p>
                <p className="text-center">Enter your email address below, and we'll send you an email allowing you to reset your password.</p>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSendPasswordResetEmail}>
                    <article className="bg-primary/10 p-2 flex items-center gap-2 rounded-lg w-full">
                        <IconMail stroke={1.5} />
                        <input type="email" placeholder="Email" className="bg-transparent outline-none w-full" required ref={emailInputElement} />
                    </article>
                    {isLoading ?
                    <div className="py-2.5 rounded-lg bg-primary text-white flex items-center justify-center">
                        <Loader width={24} height={24} />
                    </div> :
                    <button type="submit" className="py-2 rounded-lg bg-primary text-white">Submit</button>}
                </form>
            </article>
        </section>
    )
}