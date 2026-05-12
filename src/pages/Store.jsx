import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { getIdCurrency } from "../utils/getIdCurrency"
import goTop from "../utils/goTop"

function Store(){
    document.title = "Luminous | Store"
    
    return (
        <>
            <Navbar link={"store"} />
            <StoreSearch />
            <Footer />
        </>
    )
}

function StoreSearch(){
    const [products, setProducts] = useState([])

    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get("category") || "all"

    const [categoryOptions, setCategoryOptions] = useState([
        {
            label: "All",
            name: "all"
        }
    ])
    const [selectedCategory, setSelectedCategory] = useState(category.charAt(0).toUpperCase() + category.slice(1))

    const page = Number(searchParams.get("page")) || 1
    const limit = 20
    const [totalPages, setTotalPages] = useState(1)
    const [paginationButtons, setPaginationButtons] = useState([1, 2, 3])

    const updateQuery = payload => {
        setSearchParams({
            page: String(page),
            category,
            ...payload
        })
    }

    const updateSelectedCategoryOption = categoryOption => {
        updateQuery({
            category: categoryOption.name
        })
        setSelectedCategory(categoryOption.label)
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

    useEffect(() => {
        const getCategories = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT

                const { data } = await axios.get(`${APIEndpoint}/categories`)

                const formattedCategories = data.data.categories.map(category => {
                    const label = category.name.charAt(0).toUpperCase() + category.name.slice(1)
                    return {...category, label}
                })
                setCategoryOptions([
                    {
                        label: "All",
                        name: "all"
                    },
                    ...formattedCategories
                ])
            } catch(error){
                console.log(error)
            }
        }

        getCategories()
    }, [])

    useEffect(() => {
        const getProducts = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                
                const params = { page, limit }
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
    }, [page, category])

    return (
        <>
        <article className="store-header w-[90vw] mx-auto flex flex-col items-center gap-4">
            <header className="text-3xl mt-36 font-semibold">Find your best will</header>
            <article className="category-value flex items-center flex-wrap gap-4 text-base justify-center mobile:w-[90vw]">
            {categoryOptions.map((categoryOption, index) => (
                <button type="button" className={`flex gap-1 items-center py-1 px-4 rounded border-2 transition-all cursor-pointer ${selectedCategory === categoryOption.label ? "border-primary bg-primary text-white-prim" : "border-primary/[.1] hover:bg-hov"}`} key={index} onClick={() => updateSelectedCategoryOption(categoryOption)}>
                    {categoryOption.label}
                </button>
            ))}
            </article>
        </article>
        <StoreGrid products={products} />
        <article className="pagination m-auto my-12 rounded-full p-2 w-fit self-center bg-primary/10 flex items-center gap-2">
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
        </>
    )
}

function StoreGrid({ products }){
    const productImagesAPIEndpoint = import.meta.env.VITE_STORAGE_API

    return (
        <article className="store-grid w-[80vw] my-12 mx-auto grid grid-cols-5 gap-4 mobile:w-full mobile:px-4 mobile:grid-cols-2 tablet:grid-cols-4 tablet:w-[90vw]">
            {products && products.map((product, index) => (
                <Link to={`/store/${product.id}`} onClick={goTop} className="product flex flex-col rounded-lg bg-white overflow-hidden border-2 border-primary/[.1] hover:border-primary hover:shadow-none" key={index}>
                    <img src={`${productImagesAPIEndpoint}/${product.image_url}`} alt={product.name} loading="lazy" />
                    <div className="info p-4 flex flex-col gap-4">
                        <div className="product-name text-xl font-bold mobile:text-xl tablet:text-xl">{product.name}</div>
                        <div className="product-price text-xl mobile:text-base tablet:text-base">{getIdCurrency(product.price)}</div>
                    </div>
                </Link>
            ))}
            {!products && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                <ItemSkeleton key={item} />
            ))}
        </article>
    )
}

function ItemSkeleton(){
    return (
        <div className="border-2 flex flex-col rounded-lg overflow-hidden cursor-pointer border-[#ddd] relative">
            <div className="img w-full pt-[100%] bg-[#ddd]"></div>
            <div className="info p-4 flex flex-col gap-4">
                <div className="product-name h-6 w-full rounded-sm bg-[#ddd]"></div>
                <div className="product-price h-6 w-1/4 rounded-sm bg-[#ddd]"></div>
            </div>
            <div className="item-skeleton-animation absolute top-0 left-0 w-[80%] h-full skew-x-[20deg] bg-white/[.07]"></div>
        </div>
    )
}

export default Store