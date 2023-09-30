import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { IconSearch } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import goTop from "../components/goTop"

function Store({ cartItems, setCartItems }){
    document.title = "Luminous | Store"
    
    return (
        <>
            <Navbar link={"store"} cartItems={cartItems} setCartItems={setCartItems} />
            <StoreSearch />
            <Footer />
        </>
    )
}

function StoreSearch(){

    const [items, setItems] = useState(null)
    const [showItems, setShowItems] = useState(null)

    useEffect(() => {
        setTimeout(async() => {
            let response = await fetch("https://umar-api.000webhostapp.com/luminous/items/")
            response = await response.json()
            response = response.map(item => ({...item, quantity: parseInt(item.quantity), price: parseInt(item.price), categories: JSON.parse(item.categories)}))
            
            setItems(response)
        }, 3000)
    }, [])
    
    useEffect(() => {
        setShowItems(items)
    }, [items])

    const categoryMenu = ["All", "Furniture", "Bedroom", "Kitchen"]
    const [categoryMenuValue, setCategoryMenuValue] = useState("All")

    const [categorySearchValue, setCategorySearchValue] = useState("")

    const handleEnter = (key) => {
        if (key === "Enter" && items){
            handleSearchValidItems(categorySearchValue)
        }
    }
    
    const handleSearchClick = () => {
        if (items){
            handleSearchValidItems(categorySearchValue)
        }
    }

    useEffect(() => {
        handleSearchValidItems(categoryMenuValue)
    }, [categoryMenuValue])

    const handleSearchValidItems = (keyword) => {

        keyword = keyword.toLowerCase()
        
        if (["all", "house", "home", "room"].includes(keyword)){
            setShowItems(items)

            return
        }

        const updatedShowItems = [...items].filter(item => item.categories.includes(keyword) || item.name.toLowerCase().includes(keyword))

        if (updatedShowItems.length === 0){
            alert("There is not such item")

            return
        }

        setShowItems(updatedShowItems)
    }

    return (
        <>
        <div className="store-header w-[90vw] mx-auto flex flex-col items-center gap-4">
            <header className="text-3xl mt-36 font-semibold">Find your best will</header>
            <div className="category-search relative">
                <input type="text" value={categorySearchValue} placeholder="Search..." className="category-search-input text-xl w-[50vw] p-2 rounded outline-none bg-white-prim border-2 border-white-prim focus:border-primary mobile:w-[90vw] tablet:w-[80vw]" onChange={e => setCategorySearchValue(e.target.value)} onKeyUp={(e) => handleEnter(e.key)} />
                <span className="category-search-btn absolute right-0 top-0 bottom-0 flex justify-center items-center p-2 px-3 rounded-r cursor-pointer bg-primary text-white-prim" onClick={() => handleSearchClick()}>
                    <IconSearch stroke={1.5} />
                </span>
            </div>
            <div className="category-value flex items-center flex-wrap gap-4 text-base justify-center mobile:w-[90vw]">
                {
                    categoryMenu.map((menu, index) => {
                        return (
                            <div className={`category-value flex gap-1 items-center py-1 px-4 rounded border-2 cursor-pointer ${categoryMenuValue === menu ? "border-primary bg-primary text-white-prim" : "border-[#999] hover:bg-hov"}`} key={index} 
                            onClick={() => {
                                if(items){
                                    setCategoryMenuValue(menu)
                                    handleSearchValidItems(menu.toLowerCase())
                                }
                            }}>
                                <span>{menu}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <StoreGrid items={showItems} />
        </>
    )
}

function StoreGrid({ items }){

    return (
        <section className="store-grid w-[80vw] my-12 mx-auto grid grid-cols-5 gap-4 mobile:w-full mobile:px-4 mobile:grid-cols-2 tablet:grid-cols-4 tablet:w-[90vw]">
            {
                items &&
                items.map((item, index) => {
                    return (
                        <Link to={`/store/product${item.id}`} onClick={goTop} className="product-item flex flex-col rounded-lg bg-white overflow-hidden border-2 hover:border-primary hover:shadow-none" key={index}>
                            <img src={item.img} alt={item.name} loading="lazy" />
                            <div className="info p-4 flex flex-col gap-4">
                                <div className="product-name text-xl font-bold mobile:text-xl tablet:text-xl">{item.name}</div>
                                <div className="product-price text-xl mobile:text-base tablet:text-base">{`$${item.price}`}</div>
                            </div>
                        </Link>
                    )
                })
            }
            {
                !items && 
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((item) => {
                    return (
                        <ItemSkeleton key={item} />
                    )
                })
            }
        </section>
    )
}

function ItemSkeleton(){
    return (
        <div className="border-2 flex flex-col rounded-lg overflow-hidden cursor-pointer border-white-prim">
            <div className="img w-full pt-[100%] bg-white-prim"></div>
            <div className="info p-4 flex flex-col gap-4">
                <div className="product-name h-6 w-full rounded-sm bg-white-prim"></div>
                <div className="product-price h-6 w-1/4 rounded-sm bg-white-prim"></div>
            </div>
        </div>
    )
}

export default Store