import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { IconSearch } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import goTop from "../components/goTop"

function Store({ items, cartItems, setCartItems }){
    document.title = "Luminous | Store"
    
    return (
        <>
            <Navbar link={"store"} cartItems={cartItems} setCartItems={setCartItems} />
            <StoreSearch items={items} />
            <Footer />
        </>
    )
}

function StoreSearch({ items }){

    const categoryMenu = ["All", "Furniture", "Bedroom", "Kitchen"]

    const [categoryValue, setCategoryValue] = useState("All")

    const [searchValue, setSearchValue] = useState("")

    function clickEnterOnSearchInput(e){
        const key = e.key

        if (key === "Enter"){
            changeItems(searchValue, false)
        }
    }

    const [showItems, setShowItems] = useState(items)

    function changeItems(value, click){

        let searchKey = value.toLowerCase()

        if (searchKey === ""){
            return
        }

        if (searchKey === "all"){
            setShowItems(items)

            return
        }

        let newItems = [...items]
        
        let newShowItems = []

        newItems.forEach(item => {
            if ((item.searchCategories.includes(searchKey) || item.name.toLowerCase().includes(searchKey)) && !newShowItems.includes(item)){
                newShowItems.push(item)
            }
            
            item.searchCategories.forEach(function(key){
                if (key.includes(searchKey) && !newShowItems.includes(item)){
                    newShowItems.push(item)
                }
            })
        })

        if (newShowItems.length === 0){
            alert("There is not such item")

            return
        }

        if (click){
            setSearchValue("")
        }
        else {
            setCategoryValue("All")
        }

        setShowItems(newShowItems)
    }

    return (
        <>
        <div className="store-header w-[90vw] mx-auto flex flex-col items-center gap-4">
            <header className="text-3xl mt-36 font-semibold">Find your best will</header>
            <div className="category-search relative">
                <input type="text" value={searchValue} placeholder="Search..." className="category-search-input text-xl w-[50vw] p-2 rounded outline-none bg-white-prim border-2 border-white-prim focus:border-primary mobile:w-[90vw] tablet:w-[80vw]" onChange={e => setSearchValue(e.target.value)} onKeyUp={e => clickEnterOnSearchInput(e)} />
                <span className="category-search-btn absolute right-0 top-0 bottom-0 flex justify-center items-center p-2 px-3 rounded-r cursor-pointer bg-primary text-white-prim" onClick={() => changeItems(searchValue, false)}>
                    <IconSearch stroke={1.5} />
                </span>
            </div>
            <div className="category-value flex items-center flex-wrap gap-4 text-base justify-center mobile:w-[90vw]">
                {
                    categoryMenu.map((menu, index) => {
                        return (
                            <div className={`category-value flex gap-1 items-center py-1 px-4 rounded border-2 cursor-pointer ${categoryValue === menu ? "border-primary bg-primary text-white-prim" : "border-[#999] hover:bg-hov"}`} key={index} 
                            onClick={() => {
                                setCategoryValue(menu)
                                changeItems(menu, true)
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
        </section>
    )
}

export default Store