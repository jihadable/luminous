import { useParams } from "react-router-dom";
import { items } from "../components/items";
import NotFound from "./NotFound";
import { Outlet } from "react-router-dom";

export default function ProductOutlet(){
    const { id } = useParams()

    if (items.filter(item => item.id == id)[0] === undefined) return <NotFound />
    else return <Outlet />
}