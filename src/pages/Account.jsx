import { IconLock, IconLockCog, IconMail, IconMailForward, IconMapPin, IconPhone, IconUserCircle } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function Account(){
    const { isLogin, user } = useContext(AuthContext)

    if (isLogin === false || user?.role === "admin"){
        return <NotFound />
    }
    
    if (isLogin === true && user?.role === "customer"){
        document.title = "Luminous | Account"

        return (
            <>
            <Navbar />
            <AccountSection user={user} />
            <Footer />
            </>
        )
    }

    return null
}

function AccountSection({ user }){
    const { setUser } = useContext(AuthContext)
    const avatarGenerator = import.meta.env.VITE_AVATAR_GENERATOR

    const [isLoading, setIsLoading] = useState(false)

    const nameElement = useRef(null)
    const phoneElement = useRef(null)
    const addressElement = useRef(null)

    const [isChangePasswordSectionShowed, setIsChangePasswordSectionShowed] = useState(false)

    const updateUserProfile = async() => {
        const name = nameElement.current.value
        const phonePattern = /^08\d{8,13}$/
        const phone = phoneElement.current.value
        const address = addressElement.current.value

        if (name === "" || phone === "" || address === ""){
            toast.error("Please fill the column")

            return
        }

        if (!phonePattern.test(phone)){
            toast.error("Phone number does not match")

            return
        }

        try {
            setIsLoading(true)

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("jwt")

            await axios.put(`${APIEndpoint}/users`, 
                { name, phone, address },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            )

            setUser({...user, name, phone, address})
            setIsLoading(false)
            toast.success("User profile updated successfully")
        } catch(error){
            setIsLoading(false)
            toast.error("Fail to update user profile")
        }
    }

    const sendEmailVerification = async() => {
        try {
            setIsLoading(true)

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("jwt")

            await axios.post(`${APIEndpoint}/email-verifications/send-email-verification`, null, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })

            toast.success("Email verification sent")
            setIsLoading(false)
        } catch(error){
            setIsLoading(false)
            toast.error("Fail to send email verification")
        }
    }

    return (
        <section className="account-section w-[80vw] flex gap-4 my-32 mx-auto mobile:w-full mobile:flex-col mobile:px-4 tablet:w-[90vw]">
            <article className="img flex items-center justify-center">
                <img src={`${avatarGenerator}name=${user.name}`} alt="Account" className="w-96 rounded-full mobile:w-3/4" />
            </article>
            {isChangePasswordSectionShowed ?
            <ChangePasswordSection setIsChangePasswordSectionShowed={setIsChangePasswordSectionShowed} /> :
            <article className="desc flex flex-col items-center gap-2 w-full text-xl">
                <article className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconUserCircle stroke={1.5} />
                    <input type="text" defaultValue={user.name} placeholder="Full name" className="bg-transparent border-none outline-none" required ref={nameElement} />
                </article>
                <article className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconMail stroke={1.5} />
                    <span className="text-[#888]">{user.email}</span>
                </article>
                {user.is_email_verified === false && 
                <>{isLoading ? 
                <div className="w-full flex items-center justify-center text-white gap-2 p-2 rounded-md bg-primary">
                    <Loader width={24} height={24} />
                </div> : 
                <button type="button" className="w-full flex items-center justify-center gap-2 p-2 rounded-md text-white bg-primary" onClick={sendEmailVerification}>
                    <IconMailForward stroke={1.5} />
                    <span>Send email verification</span>
                </button>}
                </>}
                <article className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconPhone stroke={1.5} />
                    <input type="text" defaultValue={user.phone} placeholder="Phone number" className="bg-transparent border-none outline-none" required ref={phoneElement} />
                </article>
                <article className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconMapPin stroke={1.5} />
                    <input type="text" defaultValue={user.address} placeholder="Address" className="bg-transparent border-none outline-none" required ref={addressElement} />
                </article>
                <button type="button" className="w-full flex items-center justify-center gap-2 p-2 rounded-md text-white bg-primary" onClick={() => setIsChangePasswordSectionShowed(true)}>
                    <IconLockCog stroke={1.5} />
                    <span>Change password</span>
                </button>
                {isLoading ?
                <div className="w-full flex items-center justify-center text-white gap-2 p-2 rounded-md bg-primary">
                    <Loader width={24} height={24} />
                </div> :
                <button type="button" className="w-full flex items-center justify-center text-white gap-2 p-2 rounded-md bg-primary" onClick={updateUserProfile}>Save</button>}
            </article>}
        </section>
    )
}

function ChangePasswordSection({ setIsChangePasswordSectionShowed }){
    const [
        oldPasswordInputElement,
        newPasswordInputElement,
        newPasswordConfirmationInputElement
    ] = [
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    const [isLoading, setIsLoading] = useState(false)

    const handleChangePassword = async(event) => {
        try {
            event.preventDefault()

            const newPassword = newPasswordInputElement.current.value
            const newPasswordConfirmation = newPasswordConfirmationInputElement.current.value
            if (newPassword != newPasswordConfirmation){
                toast.warn("New password confirmation does not match")

                return
            }

            setIsLoading(true)

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("jwt")

            const requestBody = {
                old_password: oldPasswordInputElement.current.value,
                new_password: newPassword
            }
            await axios.patch(`${APIEndpoint}/users/update-password`, requestBody,
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            )

            setIsLoading(false)
            toast.success("Password changed successfully")
            setIsChangePasswordSectionShowed(false)
        } catch(error){
            setIsLoading(false)
            toast.error("Fail to change password")
            console.log(error)
        }
    }
    
    return (
        <article className="flex gap-2 w-full text-xl">
            <form className="flex flex-col gap-2 w-full" onSubmit={handleChangePassword}>
                <article className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Old password" className="bg-transparent border-none outline-none" required ref={oldPasswordInputElement} />
                </article>
                <article className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="New password" className="bg-transparent border-none outline-none" required ref={newPasswordInputElement} />
                </article>
                <article className="w-full flex items-center gap-2 p-2 rounded-md bg-primary/[.1]">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="New password confirmation" className="bg-transparent border-none outline-none" required ref={newPasswordConfirmationInputElement} />
                </article>
                <article className="flex items-center gap-2 w-full">
                    <button type="button" className="rounded-md text-center bg-red-500 p-2 text-white w-1/2" onClick={() => setIsChangePasswordSectionShowed(false)}>Cancel</button>
                    {isLoading ?
                    <div className="py-2.5 rounded-lg bg-primary text-white flex items-center justify-center w-1/2">
                        <Loader width={24} height={24} />
                    </div> :
                    <button type="submit" className="rounded-md text-center bg-primary p-2 text-white w-1/2">Save</button>}
                </article>
            </form>
        </article>
    )
}