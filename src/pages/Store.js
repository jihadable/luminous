import React, { useEffect, useState, useRef } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

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

export const goods = [
    {
        id: 1,
        sum: 1,
        name: "Midback Chair",
        price: 110,
        img: require ("../assets/midback-chair.jpg"),
        searchCategories: ["house", "midback", "chair", "furniture", "ofiice", "seat"],
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nemo repellendus consequuntur illo deserunt debitis eveniet amet. Voluptatibus sed aperiam placeat molestias, aliquam non laboriosam dolore provident tempore alias impedit.",
        texture: "Plastic",
        weight: 7,
        size: "60cmx50cm"
    },
    {
        id: 2,
        sum: 1,
        name: "La-Z-Sofa",
        price: 120,
        img: require ("../assets/lazy-sofa.jpg"),
        searchCategories: [ "house","chair", "lazy", "sofa", "furniture", "seat"],
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto provident modi optio omnis ut ipsa voluptatem soluta fugit? Aliquam labore nam voluptate debitis nesciunt! Cum architecto repellat earum excepturi ut.",
        texture: "Kapok",
        weight: 4,
        size: "150cmx75cm"
    },
    {
        id: 3,
        sum: 1,
        name: "End Table",
        price: 130,
        img: require ('../assets/end-table.jpg'),
        searchCategories: ["house", "end", "table", "desk", "furniture"],
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem eum explicabo iusto? Nesciunt in placeat ipsum vel explicabo nostrum, illum sunt! Quia soluta deserunt quis natus! Corrupti rem ad saepe.",
        texture: "Wood",
        weight: 7,
        size: "100cmx100cm"
    },
    {
        id: 4,
        sum: 1,
        name: "Writing Desk",
        price: 200,
        img: require ('../assets/writing-desk.jpg'),
        searchCategories: ["house", "table", "writing", "desk", "furniture"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa at ad consequuntur accusamus doloremque ducimus repellendus, deserunt praesentium cumque! Hic beatae ducimus facere? Doloribus accusantium sint nostrum accusamus impedit qui.`,
        texture: "Wood",
        weight: 7,
        size: "170cmx70cm"
    },
    {
        id: 5,
        sum: 1,
        name: "Side Table",
        price: 150,
        img: require ('../assets/side-table.jpg'),
        searchCategories: ["house", "side", "table", "desk", "furniture"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem facere et fugit, nulla nesciunt voluptas tempora temporibus necessitatibus magni, praesentium quas voluptatibus delectus laudantium rem quae! Nobis hic veritatis temporibus.`,
        texture: "Wood",
        weight: 6,
        size: "60cmx60cm"
    },
    {
        id: 6,
        sum: 1,
        name: "Spring Bed",
        price: 400,
        img: require ('../assets/spring-bed.jpg'),
        searchCategories: ["house", "spring", "bed", "bedroom", "sleep"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Error animi facilis accusantium aliquid perferendis tempora autem doloribus quidem facere, molestias sapiente modi iste aliquam dolor, excepturi iusto tempore deleniti. Cupiditate.`,
        texture: "Kapok",
        weight: 70,
        size: "200cmx170cm"
    },
    {
        id: 7,
        sum: 1,
        name: "Memory Foam",
        price: 395,
        img: require ('../assets/memory-foam.jpg'),
        searchCategories: ["house", "bed", "bedroom", "sleep", "memory", "foam"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab eligendi maiores perferendis earum enim consectetur officiis, quod eveniet laudantium ipsum at quisquam et modi. Culpa magnam cum cupiditate quidem esse.`,
        texture: "Foam",
        weight: 65,
        size: "190cmx150cm"
    },
    {
        id: 8,
        sum: 1,
        name: "Latex Bed",
        price: 375,
        img: require ('../assets/latex-bed.jpg'),
        searchCategories: ["house", "bed", "bedroom", "sleep", "latex"],
        explanation: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, quae fuga? Numquam sapiente, incidunt excepturi error nemo aspernatur impedit culpa molestiae nesciunt! Consequatur, reprehenderit cumque nam praesentium labore ut nemo.`,
        texture: "Latex",
        weight: 65,
        size: "190cmx150cm"
    },
    {
        id: 9,
        sum: 1,
        name: "Polypropylene Carpet",
        price: 300,
        img: require ('../assets/polypropylene-carpet.jpg'),
        searchCategories: ["house", "furniture", "bed", "bedroom", "carpet", "floor", "polypropylene"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam officiis rerum architecto delectus, iure veritatis tempora ex consequuntur facere facilis repudiandae necessitatibus, mollitia eveniet laborum eos! Beatae repellendus quod quidem.`,
        texture: "Polypropylene",
        weight: 15,
        size: "400cmx400cm"
    },
    {
        id: 10,
        sum: 1,
        name: "Vinyl Carpet",
        price: 290,
        img: require ('../assets/vinyl-carpet.jpg'),
        searchCategories: ["house", "bed", "furniture", "bedroom", "carpet", "floor", "vinyl"],
        explanation: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, quae fuga? Numquam sapiente, incidunt excepturi error nemo aspernatur impedit culpa molestiae nesciunt! Consequatur, reprehenderit cumque nam praesentium labore ut nemo.`,
        texture: "Vinyl",
        weight: 15,
        size: "400cmx400cm"
    },
    {
        id: 11,
        sum: 1,
        name: "Neck Pillow",
        price: 50,
        img: require ('../assets/neck-pillow.jpg'),
        searchCategories: ["house", "bed", "bedroom", "sleep", "pillow", "neck", "relax"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, tenetur. Dicta saepe quae odit rem facilis, repellat non, aspernatur vitae fugit amet praesentium minus accusamus, dignissimos commodi magni exercitationem corrupti.`,
        texture: "Kapok",
        weight: 1,
        size: "50cmx50cm"
    },
    {
        id: 12,
        sum: 1,
        name: "Bean Bag",
        price: 120,
        img: require ('../assets/bean-bag.jpg'),
        searchCategories: ["house", "furniture", "bean", "bag", "pillow", "relax"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa libero modi perferendis rem illo atque dolorem doloremque reiciendis, voluptas, aut, praesentium possimus ad dolore doloribus eaque tenetur maxime! Quis, et.`,
        texture: "Kapok",
        weight: 2,
        size: "150cmx75cm"
    },
    {
        id: 13,
        sum: 1,
        name: "Soup Plate",
        price: 30,
        img: require ('../assets/soup-plate.jpg'),
        searchCategories: ["house", "kitchen", "plate", "soap", "eat"],
        explanation: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad velit dolores doloremque cum consequatur iste obcaecati? Accusamus temporibus dolore, nam pariatur, voluptatem ipsa velit repudiandae consectetur voluptate porro minus sapiente.`,
        texture: "Metal",
        weight: 0.3,
        size: "15cmx15cm"
    },
    {
        id: 14,
        sum: 1,
        name: "Dessert Plate",
        price: 30,
        img: require ('../assets/dessert-plate.jpg'),
        searchCategories: ["house", "kitchen", "plate", "dessert", "eat",],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim obcaecati rerum molestias eius saepe iure incidunt! Possimus dolorum quas est earum harum aspernatur soluta. Repellendus similique temporibus dolore tempora.`,
        texture: "Metal",
        weight: 0.3,
        size: "15cmx15cm"
    },
    {
        id: 15,
        sum: 1,
        name: "Tea Spoon",
        price: 20,
        img: require ('../assets/tea-spoon.jpg'),
        searchCategories: ["house", "kitchen", "spoon", "tea", "eat"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sunt facere quaerat omnis repellendus! Velit optio, iste eligendi repudiandae minima illum ab eos corrupti ex consequuntur delectus, vel commodi consectetur.`,
        texture: "Metal",
        weight: 0.1,
        size: "10cmx2cm"
    },
    {
        id: 16,
        sum: 1,
        name: "Salad Spoon",
        price: 20,
        img: require ('../assets/salad-spoon.jpg'),
        searchCategories: ["house", "kitchen", "spoon", "salad", "eat"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sunt facere quaerat omnis repellendus! Velit optio, iste eligendi repudiandae minima illum ab eos corrupti ex consequuntur delectus, vel commodi consectetur.`,
        texture: "Metal",
        weight: 0.1,
        size: "10cmx2cm"
    },
    {
        id: 17,
        sum: 1,
        name: "Slicing Knife",
        price: 90,
        img: require ('../assets/slicing-knife.jpg'),
        searchCategories: ["house", "kitchen", "knife", "slicing", "slice", "eat"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores beatae, necessitatibus animi quia amet adipisci, natus inventore modi rem iure repellendus provident sed. Autem quibusdam molestias dolorem temporibus voluptate in.`,
        texture: "Metal",
        weight: 0.2,
        size: "30cmx5cm"
    },
    {
        id: 18,
        sum: 1,
        name: "Boning Knife",
        price: 100,
        img: require ('../assets/boning-knife.jpg'),
        searchCategories: ["house", "kitchen", "knife", "boning", "bone", "eat"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores beatae, necessitatibus animi quia amet adipisci, natus inventore modi rem iure repellendus provident sed. Autem quibusdam molestias dolorem temporibus voluptate in.`,
        texture: "Metal",
        weight: 0.2,
        size: "30cmx5cm"
    },
    {
        id: 19,
        sum: 1,
        name: "Basic Microwave",
        price: 425,
        img: require ('../assets/basic-microwave.jpg'),
        searchCategories: ["house", "kitchen", "basic", "microwave", "heat", "eat"],
        explanation: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam eius, libero repellendus natus facere fuga autem! Sunt facilis assumenda dolore quos quis aperiam hic, doloribus voluptas? Aliquid sit minima consequatur.`,
        texture: "Metal",
        weight: 5,
        size: "90cmx60cm"
    },
    {
        id: 20,
        sum: 1,
        name: "Grill Microwave",
        price: 445,
        img: require ('../assets/grill-microwave.jpg'),
        searchCategories: ["house", "kitchen", "microwave", "grill", "heat", "eat"],
        explanation: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam eius, libero repellendus natus facere fuga autem! Sunt facilis assumenda dolore quos quis aperiam hic, doloribus voluptas? Aliquid sit minima consequatur.`,
        texture: "Metal",
        weight: 5,
        size: "90cmx60cm"
    },
    {
        id: 21,
        sum: 1,
        name: "Hand Blender",
        price: 215,
        img: require ('../assets/hand-blender.jpg'),
        searchCategories: ["house", "kitchen", "hand", "blender", "eat"],
        explanation: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, natus? Velit architecto distinctio harum nesciunt laboriosam magni cum est? Libero itaque recusandae odit similique dignissimos accusantium laudantium reiciendis totam placeat.`,
        texture: "Metal",
        weight: 2,
        size: "80cmx20cm"
    },
    {
        id: 22,
        sum: 1,
        name: "Full Size Blender",
        price: 200,
        img: require ('../assets/full-size-blender.jpg'),
        searchCategories: ["house", "kitchen", "full", "size", "blender", "eat"],
        explanation: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores et at, id dicta accusantium quas quod autem rerum rem. A sint ut rerum eaque omnis porro quidem aspernatur laborum iure.`,
        texture: "Metal",
        weight: 3,
        size: "80cmx30cm"
    }
]

function StoreSearch(){

    document.body.classList.add("flex", "flex-col", "items-center", "gap-8")

    const categoryMenu = ["All", "Furniture", "Bedroom", "Kitchen"]

    const [categoryValue, setCategoryValue] = useState("All")

    const [searchValue, setSearchValue] = useState("")

    function clickEnterOnSearchInput(e){
        const key = e.key

        if (key === "Enter"){
            changeGoods(searchValue, false)
        }
    }

    const [showGoods, setShowGoods] = useState(goods)

    function changeGoods(value, click){

        let searchKey = value.toLowerCase()

        if (searchKey === ""){
            return
        }

        if (searchKey === "all"){
            setShowGoods(goods)

            return
        }

        let newGoods = [...goods]
        
        let newShowGoods = []

        newGoods.forEach(good => {
            if ((good.searchCategories.includes(searchKey) || good.name.toLowerCase().includes(searchKey)) && !newShowGoods.includes(good)){
                newShowGoods.push(good)
            }
            
            good.searchCategories.forEach(function(key){
                if (key.includes(searchKey) && !newShowGoods.includes(good)){
                    newShowGoods.push(good)
                }
            })
        })

        if (newShowGoods.length === 0){
            alert("There is not such item")

            return
        }

        if (click){
            setSearchValue("")
        }
        else {
            setCategoryValue("All")
        }

        setShowGoods(newShowGoods)
    }

    return (
        <>
            <header className="text-3xl mt-36">Find your best will</header>
            <div className="category-search relative">
                <input type="text" value={searchValue} placeholder="Search..." className="category-search-input text-xl w-[50vw] p-2 rounded outline-none bg-white-prim border-2 border-white-prim focus:border-primary mobile:w-[90vw] tablet:w-[80vw]" onChange={e => setSearchValue(e.target.value)} onKeyUp={e => clickEnterOnSearchInput(e)} autoComplete={false} />
                <span className="category-search-btn absolute right-0 top-0 bottom-0 flex justify-center items-center p-2 px-3 rounded-r cursor-pointer bg-primary text-white-prim" onClick={() => changeGoods(searchValue, false)}>
                    <span class="material-symbols-rounded">search</span>
                </span>
            </div>
            <div className="category-value flex items-center gap-6 text-base mobile:justify-between mobile:gap-0 mobile:w-[90vw] tablet:gap-4">
                {
                    categoryMenu.map((menu, index) => {
                        return (
                            <div className={`category-value py-1 px-2 rounded border-2 cursor-pointer ${categoryValue === menu ? "border-primary bg-primary text-white-prim" : "border-[#7e8187] hover:bg-hov"}`} key={index} 
                            onClick={() => {
                                setCategoryValue(menu)
                                changeGoods(menu, true)
                            }}>{menu}</div>
                        )
                    })
                }
            </div>
            <StoreGrid goods={showGoods} />
        </>
    )
}

function StoreGrid(props){

    const goods = props.goods

    return (
        <section className="store-grid w-[90vw] grid grid-cols-5 gap-5 mobile:grid-cols-2 tablet:grid-cols-4">
            {
                goods.map((item, index) => {
                    return (
                        <a href={`/store/product${index + 1}`} className="product-item flex flex-col gap-4 rounded-lg bg-white p-3 shadow-med border-2 border-white hover:border-primary hover:shadow-none" key={index}>
                            <img src={item.img} alt={item.name} />
                            <div className="product-name text-2xl mobile:text-xl tablet:text-xl">{item.name}</div>
                            <div className="product-price text-xl mobile:text-base tablet:text-base">{`$${item.price}`}</div>
                        </a>
                    )
                })
            }
        </section>
    )
}

export default Store