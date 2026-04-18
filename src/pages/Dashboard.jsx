import { IconLabel, IconLogout, IconShoppingBag, IconUsers } from "@tabler/icons-react";
import axios from "axios";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import logo from "../assets/luminous-logo.png";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement, 
    PointElement
);

export default function Dashboard(){
    return (
        <section className="dashboard flex">
            <Sidebar />
            <Content />
        </section>
    )
}

function Sidebar(){
    return (
        <section className="sidebar flex overflow-y-auto text-xl bg-white-prim h-screen">
            <article className="flex flex-col w-full">
                <article className="flex items-center gap-2 p-4 pr-20 w-full">
                    <img src={logo} alt="Luminous Logo" height={24} width={24} />
                    <span>
                        <p>Luminous</p>
                    </span>
                </article>
                <Link to={"/dashboard/users"} className="flex items-center gap-2 p-4 pr-20 hover:bg-primary hover:text-white transition-all w-full">
                    <span className="flex">
                        <IconUsers stroke={1.5} />
                    </span>
                    <span>
                        <p>Users</p>
                    </span>
                </Link>
                <Link to={"/dashboard/products"} className="flex items-center gap-2 p-4 pr-20 hover:bg-primary hover:text-white transition-all w-full">
                    <span className="flex">
                        <IconShoppingBag stroke={1.5} />
                    </span>
                    <span>
                        <p>Products</p>
                    </span>
                </Link>
                <Link to={"/dashboard/categories"} className="flex items-center gap-2 p-4 pr-20 hover:bg-primary hover:text-white transition-all w-full">
                    <span className="flex">
                        <IconLabel stroke={1.5} />
                    </span>
                    <span>
                        <p>Categories</p>
                    </span>
                </Link>
                <button type="button" className="flex items-center gap-2 p-4 pr-20 hover:bg-primary hover:text-white transition-all w-full">
                    <span className="flex">
                        <IconLogout stroke={1.5} />
                    </span>
                    <span>
                        <p>Logout</p>
                    </span>
                </button>
            </article>
        </section>
    )
}

function Content(){
    const [dashboardData, setDashboardData] = useState(null)
    
    const data = {
        labels: ["satu", "dua", "tiga", "empat"],
        datasets: [{
            label: "Product",
            data: [65, 59, 80, 81],
            backgroundColor: "#ffffff",
            borderColor: "#0853a6",
            borderWidth: 2
        }],
    };

    useEffect(() => {
        const getDashboard = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const jwt = localStorage.getItem("token")

                const { data } = await axios.get(`${APIEndpoint}/api/dashboard`, {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })


            } catch(error){
                console.log(error)
            }
        }
    }, [])

    return (
        <section className="flex flex-col text-xl w-full">
            <article className="p-4 w-full">
                <p className="font-bold">Admin</p>
            </article>
            <article className="flex flex-col gap-4 overflow-y-auto pl-4 pb-4 pr-4">
                <article className="flex w-full items-center gap-4">
                    <article className="w-full flex flex-col gap-4 items-center bg-primary p-4 rounded-2xl text-white">
                        <article className="flex items-center gap-2">
                            <IconUsers width={56} height={56} />
                            <p className="text-3xl">14</p>
                        </article>
                        <article>
                            <p>Users</p>
                        </article>
                    </article>
                    <article className="w-full flex flex-col gap-4 items-center bg-primary p-4 rounded-2xl text-white">
                        <article className="flex items-center gap-2">
                            <IconShoppingBag width={56} height={56} />
                            <p className="text-3xl">22</p>
                        </article>
                        <article>
                            <p>Products</p>
                        </article>
                    </article>
                    <article className="w-full flex flex-col gap-4 items-center bg-primary p-4 rounded-2xl text-white">
                        <article className="flex items-center gap-2">
                            <IconLabel width={56} height={56} />
                            <p className="text-3xl">4</p>
                        </article>
                        <article>
                            <p>Categories</p>
                        </article>
                    </article>
                </article>
                <article className="flex w-1/2">
                    <Bar data={data} />
                </article>
            </article>
        </section>
    )
}