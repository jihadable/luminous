import { IconLabel, IconLogout, IconShoppingBag, IconUsers } from "@tabler/icons-react";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
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
        <section className="dashboard flex w-screen">
            <Sidebar />
            <Content />
        </section>
    )
}

function Sidebar(){
    return (
        <section className="sidebar flex overflow-y-auto text-xl bg-white-prim h-screen w-fit">
            <article className="flex flex-col">
                <article className="flex items-center gap-2 p-4">
                    <img src={logo} alt="Luminous Logo" height={24} width={24} />
                    <span>
                        <p>Luminous</p>
                    </span>
                </article>
                <Link to={"/dashboard/users"} className="flex items-center gap-2 p-4 hover:bg-primary hover:text-white transition-all">
                    <IconUsers stroke={1.5} />
                    <span>
                        <p>Users</p>
                    </span>
                </Link>
                <Link to={"/dashboard/products"} className="flex items-center gap-2 p-4 hover:bg-primary hover:text-white transition-all">
                    <IconShoppingBag stroke={1.5} />
                    <span>
                        <p>Products</p>
                    </span>
                </Link>
                <Link to={"/dashboard/categories"} className="flex items-center gap-2 p-4 hover:bg-primary hover:text-white transition-all">
                    <IconLabel stroke={1.5} />
                    <span>
                        <p>Categories</p>
                    </span>
                </Link>
                <button type="button" className="flex items-center gap-2 p-4 hover:bg-primary hover:text-white transition-all">
                    <IconLogout stroke={1.5} />
                    <span>
                        <p>Logout</p>
                    </span>
                </button>
            </article>
        </section>
    )
}

function Content(){
    const data = {
        labels: ["satu", "dua", "tiga", "empat"],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81],
            backgroundColor: "#0853a6"
        }],
    };

    return (
        <section className="flex flex-col text-xl w-full">
            <header className="p-4">
                <p className="font-bold">Admin</p>
            </header>
            <article className="flex flex-col overflow-y-auto p-4">
                <article className="flex w-full items-center gap-4">
                    <article className="w-full flex flex-col gap-4 items-center bg-primary p-4 rounded-2xl text-white">
                        <article className="flex items-center gap-2">
                            <IconUsers stroke={1.5} />
                            <p>14</p>
                        </article>
                        <article>
                            <p>Users</p>
                        </article>
                    </article>
                    <article className="w-full flex flex-col gap-4 items-center bg-primary p-4 rounded-2xl text-white">
                        <article className="flex items-center gap-2">
                            <IconShoppingBag stroke={1.5} />
                            <p>22</p>
                        </article>
                        <article>
                            <p>Products</p>
                        </article>
                    </article>
                    <article className="w-full flex flex-col gap-4 items-center bg-primary p-4 rounded-2xl text-white">
                        <article className="flex items-center gap-2">
                            <IconLabel stroke={1.5} />
                            <p>4</p>
                        </article>
                        <article>
                            <p>Categories</p>
                        </article>
                    </article>
                </article>
                <article className="flex">
                    <Bar data={data} />
                </article>
            </article>
        </section>
    )
}