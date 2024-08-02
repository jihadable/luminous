import { Link } from "react-router-dom"
import notFoundImg from "../assets/404.png"
import goTop from "../utils/goTop"

export default function NotFound(){
    return (
        <div className="not-found w-full h-screen flex flex-col justify-center items-center gap-6 bg-primary">
            <div className="flex flex-col items-center text-xl bg-white p-8 rounded-lg">
                <img src={notFoundImg} alt="Not Found" className="h-32" />
                <div className="mt-4">404 ~ Halaman tidak ditemukan</div>
                <Link to={"/"} onClick={goTop} className="mt-2 bg-primary text-white px-2 rounded">Kembali ke Home</Link>
            </div>
        </div>
    )
}