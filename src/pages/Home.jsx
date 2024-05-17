import { Link } from "react-router-dom"
import bca from "../assets/bca.png"
import bni from "../assets/bni.png"
import bri from "../assets/bri.png"
import carlaSofia from "../assets/carla-sofia.jpg"
import dana from "../assets/dana.png"
import danielBone from "../assets/daniel-bone.jpg"
import gopay from "../assets/gopay.png"
import household from "../assets/household.jpg"
import household2 from "../assets/household2.jpg"
import johnKean from "../assets/john-kean.jpg"
import linkaja from "../assets/linkaja.png"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
import paypal from "../assets/paypal.png"
import qris from "../assets/qris.png"
import spay from "../assets/spay.png"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import goTop from "../components/goTop"
import { items } from "../components/items"

// home
export default function Home(){
    return (
        <>
            <Navbar link="home" />
            <HomeHeader />
            <HomeTag />
            <HomeTrendingNow />
            <HomeTag2 />
            <HomeReview />
            <Payments />
            <Footer />
        </>
    )
}

// home header
function HomeHeader(){
    return (
        <header className="grid grid-cols-4 grid-rows-2 h-[100vh] w-[80vw] mx-auto pb-8 pt-24 gap-4 mobile:w-full mobile:px-4 mobile:grid-cols-2 mobile:grid-rows-4 mobile:h-fit tablet:w-[90vw] tablet:grid-cols-2 tablet:grid-rows-4 tablet:h-fit">
            <div className="header-left col-span-2 row-span-2 w-full h-full rounded-md mobile:h-[calc(100vw-2rem)] tablet:h-[90vw]"></div>
            <div className="header-right-left row-span-2 w-full h-full rounded-md"></div>
            <div className="header-right-right-top w-full h-full rounded-md"></div>
            <div className="header-right-right-bottom w-full h-full rounded-md"></div>
        </header>
    )
}

// home tag
function HomeTag(){
    return (
        <section className="home-tag flex items-center justify-center my-32 mx-auto w-[80vw] relative mobile:w-full mobile:px-4 mobile:flex-col mobile:gap-4 tablet:w-[90vw]">
            <img src={household} alt="HouseHold" className="w-full rounded-md" loading="lazy" />
            <div className="home-tag-content absolute left-0 right-0 bg-white/[.3] backdrop-blur-lg p-8 flex flex-col gap-4 mobile:static mobile:p-0">
                <div className="home-tag-header text-3xl font-bold mobile:text-2xl">Luminous Living</div>
                <div className="home-tag-tagline text-xl mobile:text-base">Luminous help people to find their best will in household. Our products are all made to standard sizes so that you can mix and match them freely.</div>
                <Link to="/store" onClick={goTop} className="w-fit py-1 px-2 rounded bg-primary text-white text-xl mobile:text-base">Shop now</Link>
            </div>
        </section>
    )
}

// home trending now
export function HomeTrendingNow(){

    const trendingItems = items.filter(item => [2, 5, 11, 12, 21].includes(item.id))

    return (
        <section className="trending-now w-[80vw] flex flex-col items-center gap-6 my-32 mx-auto mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="trending-now-header text-3xl font-semibold">Trending Now</div>
            <div className="trending-now-items grid grid-cols-5 gap-4 mobile:grid-cols-2 tablet:grid-cols-4">
                {
                    trendingItems.map((item, index) => (
                        <Link to={`/store/${item.id}`} onClick={goTop} className="trending-now-item flex flex-col rounded-lg bg-white overflow-hidden border-2 hover:border-primary hover:shadow-none" key={index}>
                            <img src={item.img} alt={item.name} loading="lazy" />
                            <div className="info flex flex-col gap-4 p-4">
                                <div className="trending-item-name text-xl font-bold mobile:text-xl">{item.name}</div>
                                <div className="trending-item-price text-xl mobile:text-base">{`$${item.price}`}</div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}

// home tag 2
function HomeTag2(){

    return (
        <section className="home-tag flex items-center justify-center my-32 mx-auto w-[80vw] relative mobile:w-full mobile:px-4 mobile:flex-col mobile:gap-4 tablet:w-[90vw]">
            <img src={household2} alt="HouseHold" className="w-full rounded-md" loading="lazy" />
            <div className="home-tag-content absolute left-0 right-0 bg-white/[.3] backdrop-blur-lg p-8 flex flex-col gap-4 mobile:static mobile:p-0">
                <div className="home-tag-header text-3xl font-bold mobile:text-2xl">Luminous Living</div>
                <div className="home-tag-tagline text-xl mobile:text-base">Our products boast standardized sizes, allowing seamless mixing and matching for a personalized touch to your living spaces. Discover your ideal home with Luminous.</div>
                <Link to="/store" onClick={goTop} className="w-fit py-1 px-2 rounded bg-primary text-white text-xl mobile:text-base">Shop now</Link>
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
                        reviews.map((review, index) => (
                            <div className="review bg-white-prim flex flex-col gap-4 p-4 rounded-xl h-fit" key={index}>
                                <div className="review-header flex gap-3">
                                    <img src={review.img} alt={review.name} className="w-[50px] rounded-full shadow-med" loading="lazy" />
                                    <div className="name-job">
                                        <div className="name text-xl">{review.name}</div>
                                        <div className="job text-black/[.7]">{review.job}</div>
                                    </div>
                                </div>
                                <div className="review-text">{review.review}</div>
                            </div>
                        ))
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
                payments.map((payment, index) => (
                    <img src={payment} alt="Payment" className="w-24 h-fit mobile:w-16" loading="lazy" key={index} />
                ))
            }
            </div>
        </section>
    )
}