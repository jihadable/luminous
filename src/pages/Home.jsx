import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import chair from "../assets/chair.jpg"
import table from "../assets/table.jpg"
import spoon from "../assets/spoon.jpg"
import household from "../assets/household.jpg"
import lazySofa from "../assets/lazy-sofa.jpg"
import sideTable from "../assets/side-table.jpg"
import neckPillow from "../assets/neck-pillow.jpg"
import handBlender from "../assets/hand-blender.jpg"
import beanBag from "../assets/bean-bag.jpg"
import johnKean from "../assets/john-kean.jpg"
import danielBone from "../assets/daniel-bone.jpg"
import carlaSofia from "../assets/carla-sofia.jpg"
import dana from "../assets/dana.png"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
import bri from "../assets/bri.png"
import bni from "../assets/bni.png"
import linkaja from "../assets/linkaja.png"
import spay from "../assets/spay.png"
import bca from "../assets/bca.png"
import qris from "../assets/qris.png"
import gopay from "../assets/gopay.png"
import paypal from "../assets/paypal.png"
import { IconUser } from "@tabler/icons-react"
import { IconMail } from "@tabler/icons-react"
import { IconMessage2 } from "@tabler/icons-react"
import { IconChevronRight } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import goTop from "../components/goTop"

// home
function Home(){

    return (
        <>
            <Navbar link="home" />
            <HomeHeader />
            <HomeTag />
            <HomeTrendingNow />
            <HomeReview />
            <Payments />
            {/* <HomeContactUs /> */}
            <Footer />
        </>
    )
}

// home header
function HomeHeader(){
    return (
        <header className="flex h-[100vh] w-[80vw] mx-auto pt-8 items-center gap-4 mobile:flex-col mobile:w-[90vw] mobile:pt-20 mobile:mb-20 mobile:h-fit tablet:h-fit tablet:flex-col tablet:items-center tablet:pt-32 tablet:mb-20 tablet:w-[90vw]">
            <div className="header-left w-[calc((80vw-.5rem)/2)] h-[calc((80vw-.5rem)/2)] bg-cover flex items-end mobile:w-full mobile:h-[90vw] tablet:w-full tablet:h-[70vw]">
            </div>
            <div className="header-right w-[calc((80vw-.5rem)/2)] h-[calc((80vw-.5rem)/2)] flex mobile:w-full mobile:h-[90vw] tablet:w-full tablet:h-[90vw]">
                <img src={spoon} alt="Spoon" className="spoon-img h-full mobile:h-[90vw]" />
                <div className="img2 flex flex-col">
                    <img src={chair} alt="Chair" className="chair-img h-full w-full" />
                    <img src={table} alt="Table" className="tabler-img h-full w-full" />
                </div>
            </div>
        </header>
    )
}

// home tag
function HomeTag(){

    return (
        <section className="home-tag flex items-center justify-center my-32 mx-auto w-[80vw] relative mobile:w-full mobile:px-4 mobile:flex-col mobile:gap-4 tablet:w-[90vw]">
            <img src={household} alt="HouseHold" className="w-full rounded-md" />
            <div className="home-tag-content absolute bg-white/[.3] backdrop-blur-lg p-8 flex flex-col gap-4 mobile:static mobile:p-0">
                <div className="home-tag-header text-3xl font-bold mobile:text-2xl">Luminous Living</div>
                <div className="home-tag-tagline text-xl mobile:text-base">Luminous help people to find their best will in household. Our products are all made to standard sizes so that you can mix and match them freely</div>
                <Link to="/store" onClick={goTop} className="w-fit py-1 px-2 rounded bg-primary text-white text-xl mobile:text-base">Shop now</Link>
            </div>
        </section>
    )
}

// home trending now
export function HomeTrendingNow(){

    const trendingItems = [
        {
            id: 2,
            name: "La-Z-Sofa",
            img: lazySofa,
            price: 120
        },
        {
            id: 5,
            name: "Side Table",
            img: sideTable,
            price: 150
        },
        {
            id: 11,
            name: "Neck Pillow",
            img: neckPillow,
            price: 50
        },
        {
            id: 21,
            name: "Hand Blender",
            img: handBlender,
            price: 215
        },
        {
            id: 12,
            name: "Bean Bag",
            img: beanBag,
            price: 120
        },
    ]

    return (
        <section className="trending-now w-[80vw] flex flex-col items-center gap-6 my-32 mx-auto mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="trending-now-header text-3xl font-semibold">Trending Now</div>
            <div className="trending-now-items grid grid-cols-5 gap-4 mobile:grid-cols-2 tablet:grid-cols-4">
                {
                    trendingItems.map((item, index) => {
                        return (
                            <Link to={`/store/product${item.id}`} onClick={goTop} className="trending-now-item flex flex-col rounded-lg bg-white overflow-hidden border-2 hover:border-primary hover:shadow-none" key={index}>
                                <img src={item.img} alt={item.name} />
                                <div className="info flex flex-col gap-4 p-4">
                                    <div className="trending-item-name text-xl font-bold mobile:text-xl">{item.name}</div>
                                    <div className="trending-item-price text-xl mobile:text-base">{`$${item.price}`}</div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    )
}

// home review
function HomeReview(){
    const reviews = [
        {
            name: "John Kean",
            job: "College Student",
            img: johnKean,
            review: "I am thrilled with my shopping experience at Luminous. The website is user-friendly, and the product quality exceeded my expectations. I'll be back for more!"
        },
        {
            name: "Daniel Bone",
            job: "College Student",
            img: danielBone,
            review: "Luminous truly stands out in the e-commerce world. Their customer service is exceptional, and the variety of products is fantastic. A go-to place for online shopping!"
        },
        {
            name: "Carla Sofia",
            job: "Teacher",
            img: carlaSofia,
            review: "Luminous made my online shopping convenient and enjoyable. The speedy delivery and secure payment options give me peace of mind. Highly recommended for all your shopping needs!"
        }
    ]

    return (
        <section className="reviews w-[80vw] mx-auto my-32 flex flex-col items-center gap-6 mobile:w-[90vw] tablet:w-[90vw]">
            <div className="reviews-header text-3xl font-semibold">Reviews</div>
            <div className="review-slide flex gap-4 mobile:flex-col tablet:gap-4">
                    {
                        reviews.map((review, index) => {
                            return (
                                <div className="review bg-white-prim flex flex-col gap-4 p-4 rounded-xl h-fit" key={index}>
                                    <div className="review-header flex gap-3">
                                        <img src={review.img} alt={review.name} className="w-[50px] rounded-full shadow-med" />
                                        <div className="name-job">
                                            <div className="name text-xl">{review.name}</div>
                                            <div className="job text-black/[.7]">{review.job}</div>
                                        </div>
                                    </div>
                                    <div className="review-text">{review.review}</div>
                                </div>
                            )
                        })
                    }
                </div>
        </section>
    )
}

// home payments
function Payments(){

    const payments = [mandiri, dana, bri, ovo, bni, spay, linkaja, qris, gopay, bca, paypal]

    return (
        <section className="payments mx-auto my-32 w-[80vw] flex flex-col gap-6 items-center">
            <div className="payments-header text-3xl font-semibold">Payment methods</div>
            <div className="payments-content flex items-center justify-center flex-wrap gap-4">
            {
                payments.map((payment, index) => {
                    return <img src={payment} alt="Payment" className="w-24 h-fit mobile:w-16" key={index} />
                })
            }
            </div>
        </section>
    )
}

export default Home