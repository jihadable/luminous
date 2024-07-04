import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { ProductsContext } from "../contexts/ProductsContext"
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

    const { products } = useContext(ProductsContext)

    const [displayedProducts, setDisplayedProducts] = useState(null)

    useEffect(() => {
        setDisplayedProducts(products)
    }, [products])

    const categories = ["Semua", "Furniture", "Kamar tidur", "Dapur", "Elektronik"]
    const [selectedCategory, setSelectedCategory] = useState("Semua")
    
    const handleSelectCategory = category => {
        setSelectedCategory(category)

        if (category === "Semua"){
            setDisplayedProducts(products)
        }
        else {
            setDisplayedProducts(products.filter(product => product.categories.includes(category.toLowerCase())))
        }
    }

    return (
        <>
        <div className="store-header w-[90vw] mx-auto flex flex-col items-center gap-4">
            <header className="text-3xl mt-36 font-semibold">Temukan barang impian Anda</header>
            <div className="category-value flex items-center flex-wrap gap-4 text-base justify-center mobile:w-[90vw]">
            {
                categories.map(category => (
                    <div className={`category-value flex gap-1 items-center py-1 px-4 rounded border-2 cursor-pointer ${selectedCategory === category ? "border-primary bg-primary text-white-prim" : "border-primary/[.1] hover:bg-hov"}`} key={category} onClick={() => handleSelectCategory(category)}>
                        <span>{category}</span>
                    </div>
                ))
            }
            </div>
        </div>
        <StoreGrid products={displayedProducts} />
        </>
    )
}

function StoreGrid({ products }){

    const productImagesAPIEndpoint = import.meta.env.VITE_PRODUCT_IMAGES_API_ENDPOINT

    return (
        <section className="store-grid w-[80vw] my-12 mx-auto grid grid-cols-5 gap-4 mobile:w-full mobile:px-4 mobile:grid-cols-2 tablet:grid-cols-4 tablet:w-[90vw]">
            {
                products &&
                products.map((product, index) => (
                    <Link to={`/store/${product.id}`} onClick={goTop} className="product flex flex-col rounded-lg bg-white overflow-hidden border-2 border-primary/[.1] hover:border-primary hover:shadow-none" key={index}>
                        <img src={`${productImagesAPIEndpoint}/${product.img}`} alt={product.name} loading="lazy" />
                        <div className="info p-4 flex flex-col gap-4">
                            <div className="product-name text-xl font-bold mobile:text-xl tablet:text-xl">{product.name}</div>
                            <div className="product-price text-xl mobile:text-base tablet:text-base">{getIdCurrency(product.price)}</div>
                        </div>
                    </Link>
                ))
            }
            {
                !products && 
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                    <ItemSkeleton key={item} />
                ))
            }
        </section>
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