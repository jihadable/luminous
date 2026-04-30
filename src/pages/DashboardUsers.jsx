import Sidebar from "../components/Sidebar";

export default function DashboardUsers(){
    return (
        <section className="dashboard flex">
            <Sidebar page={"users"} />
            <Content />
        </section>
    )
}

function Content(){
    return (
        <section className="flex flex-col text-xl w-full">

        </section>
    )
}