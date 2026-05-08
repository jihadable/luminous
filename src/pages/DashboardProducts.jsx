import { IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";

export default function DashboardProducts(){
    return (
        <section className="dashboard flex h-screen">
            <Sidebar page={"products"} />
            <Content />
        </section>
    )
}

function Content(){
    const { user } = useContext(AuthContext)
    const [products, setProducts] = useState(null)
    const sortByOptions = [
        {
            label: "Name", 
            sort: "name",
            order: "asc"
        },
        {
            label: "Lowest price", 
            sort: "price",
            order: "asc"
        },
        {
            label: "Highest price", 
            sort: "price",
            order: "desc"
        },
        {
            label: "Lowest stock", 
            sort: "stock",
            order: "asc"
        },
        {
            label: "Highest stock", 
            sort: "stock",
            order: "desc"
        }
    ]

    const [searchParams, setSearchParams] = useSearchParams()

    const sort = searchParams.get("sort") || "name"
    const order = searchParams.get("order") || "asc"
    const [selectedSortByOption, setSelectedSortByOption] = useState(sortByOptions.find(sortByOption => sortByOption.sort == sort && sortByOption.order == order).label)
    const [isSortByOptionsShowed, setIsSortByOptionsShowed] = useState(false)
    
    const page = Number(searchParams.get("page")) || 1
    const limit = 20
    const [totalPages, setTotalPages] = useState(1)
    const [paginationButtons, setPaginationButtons] = useState([1, 2, 3])

    const [categoryOptions, setCategoryOptions] = useState([
        {
            label: "All",
            category: "all"
        }
    ])
    const category = searchParams.get("category") || "all"
    const [selectedCategory, setSelectedCategory] = useState(category.charAt(0).toUpperCase() + category.slice(1))
    const [isCategoryOptionsShowed, setIsCategoryOptionsShowed] = useState(false)

    useEffect(() => {
        const getCategories = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const { data } = await axios.get(`${APIEndpoint}/categories`)

                const formattedCategories = data.data.categories.map(category => ({
                    label: category.name.charAt(0).toUpperCase() + category.name.slice(1),
                    category: category.name
                }))
                setCategoryOptions([
                    {
                        label: "All",
                        category: "all"
                    },
                    ...formattedCategories
                ])
            } catch(error){
                console.log(error)
            }
        }

        getCategories()
    }, [])

    // useEffect(() => {
    //     if (searchParams.size == 0) {
    //         setSearchParams({
    //             sort: "name",
    //             order: "asc",
    //             page: 1,
    //             category: "all"
    //         })
    //     }
    // }, [searchParams, setSearchParams])

    const updateQuery = payload => {
        setSearchParams({
            sort,
            order,
            page: String(page),
            category,
            ...payload
        })
    }

    const updateSelectedCategoryOption = categoryOption => {
        updateQuery({
            category: categoryOption.category
        })
        setSelectedCategory(categoryOption.label)
        setIsCategoryOptionsShowed(false)
    }

    const updateSelectedSortByOption = sortByOption => {
        updateQuery({
            sort: sortByOption.sort,
            order: sortByOption.order
        })
        setSelectedSortByOption(sortByOption.label)
        setIsSortByOptionsShowed(false)
    }

    useEffect(() => {
        if (totalPages <= 3){
            setPaginationButtons(
                Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                )
            )

            return
        }

        if (page <= 1){
            setPaginationButtons([1, 2, 3])
        } else if (page >= totalPages){
            setPaginationButtons([
                totalPages - 2,
                totalPages - 1,
                totalPages
            ])
        } else {
            setPaginationButtons([
                page - 1,
                page,
                page + 1
            ])
        }

    }, [page, totalPages])

    const updatePage = newPage => {
        updateQuery({ page: newPage })
    }

    const jumpToFirstPage = () => {
        if (page > 1){
            updateQuery({ page: "1" })
        }
    }

    const jumpToPreviousPage = () => {
        if (page > 1){
            updateQuery({ page: page - 1 })
        }
    }

    const jumpToNextPage = () => {
        if (page < totalPages){
            updateQuery({ page: page + 1 })
        }
    }

    const jumpToLastPage = () => {
        if (page < totalPages){
            updateQuery({ page: totalPages })
        }
    }

    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteProduct = async(productId) => {
        try {
            if (!confirm("Delete this product?")){
                return
            }

            setIsLoading(true)

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("jwt")
            await axios.delete(`${APIEndpoint}/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            setProducts(products => [...products].filter(product => product.id != productId))
            setIsLoading(false)
            toast.success("Product deleted successfully")
        } catch(error){
            setIsLoading(false)
            toast.error("Fail to delete product")
            console.log(error)
        }
    }

    useEffect(() => {
        const getProducts = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const params = {
                    sort, order, page, limit
                }
                if (category != "all"){
                    params.category = category
                }
                const { data } = await axios.get(`${APIEndpoint}/products`, {
                    params
                })

                setProducts(data.data.products)
                setTotalPages(data.data.pagination.total_pages)
            } catch(error){
                console.log(error)
            }
        }

        getProducts()
    }, [sort, order, page, category])

    return (
        <section className="flex flex-col text-xl w-full overflow-y-auto">
            <article className="flex flex-col gap-4 p-4 pb-12 w-full">
                <article className="w-full">
                    <p className="font-bold">{user?.name}</p>
                </article>
                <article className="flex flex-col gap-4">
                    <article className="flex">
                        <Link to={"/dashboard/add-product"} className="flex items-center gap-2 bg-primary text-white p-2 rounded-lg">
                            <IconPlus stroke={1.5} />
                            <span><p>Add product</p></span>
                        </Link>
                    </article>
                    <article className="flex items-center gap-4">
                        <article className="flex relative">
                            <button type="button" className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white" onClick={() => setIsSortByOptionsShowed(!isSortByOptionsShowed)}>
                                <span>Sort by: {selectedSortByOption}</span>
                                <IconChevronDown stroke={1.5} className={`transition-all ${isSortByOptionsShowed ? "rotate-180" : ""}`} />
                            </button>
                            <article className={`${isSortByOptionsShowed ? "flex" : "hidden"} flex-col absolute top-full left-0 bg-white shadow-2xl rounded-md overflow-hidden`}>
                            {sortByOptions.map((sortByOption, index) => (
                                <button type="button" className="text-left p-2 whitespace-nowrap hover:bg-primary/5" key={index} onClick={() => updateSelectedSortByOption(sortByOption)}>{sortByOption.label}</button>
                            ))}
                            </article>
                        </article>
                        <article className="flex relative">
                            <button type="button" className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white" onClick={() => setIsCategoryOptionsShowed(!isCategoryOptionsShowed)}>
                                <span>Category: {selectedCategory}</span>
                                <IconChevronDown stroke={1.5} className={`transition-all ${isCategoryOptionsShowed ? "rotate-180" : ""}`} />
                            </button>
                            <article className={`${isCategoryOptionsShowed ? "flex" : "hidden"} flex-col absolute top-full left-0 bg-white shadow-2xl rounded-md overflow-hidden`}>
                            {categoryOptions.map((category, index) => (
                                <button type="button" className="text-left p-2 whitespace-nowrap hover:bg-primary/5" key={index} onClick={() => updateSelectedCategoryOption(category)}>{category.label}</button>
                            ))}
                            </article>
                        </article>
                    </article>
                    <table className="rounded-t-lg overflow-hidden">
                        <thead>
                            <tr className="bg-primary text-white">
                                <td className="p-2">No</td>
                                <td className="p-2">Name</td>
                                <td className="p-2 text-center">Price (Rp)</td>
                                <td className="p-2 text-center">Stock</td>
                                <td className="p-2 text-center">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                        {products?.map((product, index) => (
                            <tr key={index} className={`border-b border-primary`}>
                                <td className="p-2">{limit * (page - 1) + index + 1}</td>
                                <td className="p-2">
                                    <Link to={`/dashboard/products/${product.id}`}>{product.name}</Link>
                                </td>
                                <td className="p-2 text-center">{(Number(product.price)).toLocaleString("id-ID")}</td>
                                <td className="p-2 text-center">{product.stock}</td>
                                <td className="p-2 text-center flex justify-center gap-1">
                                    <Link to={`/dashboard/edit-product/${product.id}`} className="p-1 rounded-md bg-yellow-400 text-black">
                                        <IconEdit stroke={1.5} />
                                    </Link>
                                {
                                    isLoading ?
                                    <div className="p-1 rounded-lg bg-red-500 text-white flex items-center justify-center">
                                        <Loader width={24} height={24} />
                                    </div> :
                                    <button type="button" className="p-1 rounded-md bg-red-500 text-white" onClick={() => handleDeleteProduct(product.id)}>
                                        <IconTrash stroke={1.5} />
                                    </button>
                                }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <article className="pagination rounded-full p-2 w-fit self-center bg-primary/10 flex items-center gap-2">
                        <button type="button" className="flex items-center justify-center hover:bg-primary hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300 disabled:hover:bg-transparent rounded-full p-2 transition-all" disabled={page < 2} onClick={jumpToFirstPage}>
                            <IconChevronsLeft stroke={1.5} />
                        </button>
                        <button type="button" className="flex items-center justify-center hover:bg-primary hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300 disabled:hover:bg-transparent rounded-full p-2 transition-all" disabled={page < 2} onClick={jumpToPreviousPage}>
                            <IconChevronLeft stroke={1.5} />
                        </button>
                    {paginationButtons.map(number => (
                        <button type="button" className={`px-4 hover:bg-primary hover:text-white rounded-md p-2 transition-all ${page == number ? "border border-primary" : ""}`} onClick={() => updatePage(`${number}`)} key={number}>
                            <p>{number}</p>
                        </button>
                    ))}
                        <button type="button" className="flex items-center justify-center hover:bg-primary hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300 disabled:hover:bg-transparent rounded-full p-2 transition-all" disabled={page > totalPages - 1} onClick={jumpToNextPage}>
                            <IconChevronRight stroke={1.5} />
                        </button>
                        <button type="button" className="flex items-center justify-center hover:bg-primary hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300 disabled:hover:bg-transparent rounded-full p-2 transition-all" disabled={page > totalPages - 1} onClick={jumpToLastPage}>
                            <IconChevronsRight stroke={1.5} />
                        </button>
                    </article>
                </article>
            </article>
        </section>
    )
}