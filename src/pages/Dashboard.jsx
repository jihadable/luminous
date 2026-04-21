import { IconLabel, IconShoppingBag, IconUsers } from "@tabler/icons-react";
import axios from "axios";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";

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

function Content(){
    const { user } = useContext(AuthContext)
    const [dashboardData, setDashboardData] = useState(null)
    const [categories, setCategories] = useState({
        datasets: [{
            label: "Products",
            backgroundColor: "#ffffff",
            borderColor: "#0853a6",
            borderWidth: 2
        }],
    })

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

                console.log(data.data)
                setDashboardData(data.data)
                const labels = data.data.products_per_category.map(category => category.name)
                const totalProducts = data.data.products_per_category.map(category => category.total_products)

                setCategories(categories => {
                    return {
                        labels,
                        datasets: [{
                            ...categories.datasets[0],
                            data: totalProducts
                        }]
                    }
                })
            } catch(error){
                console.log(error)
            }
        }

        getDashboard()
    }, [])

    return (
        <section className="flex flex-col text-xl w-full">
            <article className="p-4 w-full">
                <p className="font-bold">{user?.name}</p>
            </article>
            <article className="flex flex-col gap-12 overflow-y-auto pl-4 pb-4 pr-4">
                <article className="flex w-full items-center gap-4">
                    <article className="w-full flex flex-col gap-4 items-center bg-primary p-4 rounded-md text-white">
                        <article className="flex items-center gap-2">
                            <IconUsers width={56} height={56} />
                            <p className="text-3xl">{dashboardData?.total_users}</p>
                        </article>
                        <article>
                            <p>Users</p>
                        </article>
                    </article>
                    <article className="w-full flex flex-col gap-4 items-center bg-primary p-4 rounded-md text-white">
                        <article className="flex items-center gap-2">
                            <IconShoppingBag width={56} height={56} />
                            <p className="text-3xl">{dashboardData?.total_products}</p>
                        </article>
                        <article>
                            <p>Products</p>
                        </article>
                    </article>
                    <article className="w-full flex flex-col gap-4 items-center bg-primary p-4 rounded-md text-white">
                        <article className="flex items-center gap-2">
                            <IconLabel width={56} height={56} />
                            <p className="text-3xl">{dashboardData?.total_categories}</p>
                        </article>
                        <article>
                            <p>Categories</p>
                        </article>
                    </article>
                </article>
                <article className="flex w-1/2">
                    {categories &&
                    <Bar data={categories} />}
                </article>
            </article>
        </section>
    )
}