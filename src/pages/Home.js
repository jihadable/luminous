import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import chair from "../assets/chair.jpg"
import table from "../assets/table.jpg"
import spoon from "../assets/spoon.jpg"
import household from "../assets/household.jpg"

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
            <HomeContactUs />
            <Footer />
        </>
    )
}

// home header
function HomeHeader(){
    return (
        <header className="flex h-[100vh] w-[80vw] mx-auto pt-8 items-center gap-4 mobile:flex-col mobile:w-[90vw] mobile:pt-20 mobile:mb-20 mobile:h-fit tablet:h-fit tablet:flex-col tablet:items-center tablet:pt-32 tablet:mb-20 tablet:w-[90vw]">
            <div className="header-left w-[calc((80vw-.5rem)/2)] h-[calc((80vw-.5rem)/2)] bg-cover flex items-end mobile:w-full mobile:h-[90vw] tablet:w-full tablet:h-[70vw]">
                <div className="flex flex-col gap-4 w-full p-8 bg-[rgb(0,0,0,.5)]">
                    <div className="shop-name text-4xl font-bold text-white-prim">Luminous</div>
                    <div className="tagline text-2xl text-white-prim">live comfortably with Luminous</div>
                    <a href="/store" className="w-fit py-1 px-2 rounded bg-primary text-white text-xl">Shop now</a>
                </div>
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
        <section className="home-tag flex items-center justify-center m-auto relative">
            <img src={household} alt="HouseHold" className="w-[80vw] rounded-md mobile:w-[90vw] tablet:w-[90vw]" />
            <div className="home-tag-content backdrop-blur shadow-med flex flex-col gap-3 absolute p-10 rounded-xl w-[60%] mobile:w-[90vw] mobile:h-full mobile:backdrop-blur-sm mobile:rounded-md tablet:w-[70vw]">
                <div className="home-tag-header text-3xl font-bold mobile:text-2xl">Luminous Living</div>
                <div className="home-tag-tagline text-xl mobile:text-base">Luminous help people to find their best will in household. Our products are all made to standard sizes so that you can mix and match them freely</div>
                <a href="/store" className="w-fit py-1 px-2 rounded bg-primary text-white text-xl mobile:text-base">Shop now</a>
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
            img: require ("../assets/lazy-sofa.jpg"),
            price: 120
        },
        {
            id: 5,
            name: "Side Table",
            img: require ("../assets/side-table.jpg"),
            price: 150
        },
        {
            id: 11,
            name: "Neck Pillow",
            img: require ("../assets/neck-pillow.jpg"),
            price: 50
        },
        {
            id: 21,
            name: "Hand Blender",
            img: require ("../assets/hand-blender.jpg"),
            price: 215
        },
        {
            id: 12,
            name: "Bean Bag",
            img: require ("../assets/bean-bag.jpg"),
            price: 120
        },
    ]

    return (
        <section className="trending-now flex flex-col items-center gap-6 p-8 my-32 mx-auto mobile:w-full">
            <div className="trending-now-header text-3xl font-semibold">Trending Now</div>
            <div className="trending-now-items w-[80vw] grid grid-cols-5 gap-5 mobile:w-[90vw] mobile:grid-cols-2 tablet:w-[90vw] tablet:grid-cols-4">
                {
                    trendingItems.map((item, index) => {
                        return (
                            <a href={`/store/product${item.id}`} className="trending-now-item flex flex-col gap-4 rounded-lg bg-white p-3 shadow-med border-2 border-white hover:border-primary hover:shadow-none" key={index}>
                                <img src={item.img} alt={item.name} />
                                <div className="trending-item-name text-2xl mobile:text-xl">{item.name}</div>
                                <div className="trending-item-price text-xl mobile:text-base">{`$${item.price}`}</div>
                            </a>
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
            img: require ("../assets/john-kean.jpg"),
            review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quisquam dignissimos saepe. Tenetur, dolore animi? Ullam id, beatae sapiente eius, hic provident laboriosam ut, corporis quisquam necessitatibus deserunt voluptas ea.`
        },
        {
            name: "Daniel Bone",
            img: require ("../assets/daniel-bone.jpg"),
            review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptate ab facilis, itaque aperiam, iste odit autem exercitationem ut temporibus distinctio est recusandae veritatis? Quos, maxime aliquam! Fugit, libero repellat.`
        },
        {
            name: "Carla Sofia",
            img: require ("../assets/carla-sofia.jpg"),
            review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse neque accusantium totam quibusdam praesentium. Ipsam enim quam praesentium harum facere voluptas voluptatibus sequi ratione blanditiis reprehenderit, natus expedita architecto molestias.`
        }
    ]

    return (
        <section className="reviews w-[80vw] mx-auto my-32 flex flex-col items-center gap-6 mobile:w-[90vw] tablet:w-[90vw]">
            <div className="reviews-header text-3xl font-semibold">Reviews</div>
            <div className="review-slide flex gap-8 mobile:flex-col tablet:gap-4">
                    {
                        reviews.map((review, index) => {
                            return (
                                <div className="review bg-white-prim flex flex-col gap-4 p-6 rounded-xl h-fit" key={index}>
                                    <div className="review-header flex gap-3">
                                        <img src={review.img} alt={review.name} className="w-[50px] rounded-full shadow-med" />
                                        <div className="review-name text-xl">{review.name}</div>
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

    const payments = [require("../assets/ovo.png"), require("../assets/mandiri.png"), require("../assets/dana.png"), require("../assets/bri.png"), require("../assets/linkaja.png"), require("../assets/spay.png"), require("../assets/bni.png")]

    return (
        <section className="payments mx-auto my-32 w-[80vw] flex flex-col gap-6 items-center">
            <div className="payments-header text-3xl font-semibold">Payment methods</div>
            <div className="payments-content flex items-center flex-wrap gap-4">
            {
                payments.map((payment, index) => {
                    return <img src={payment} alt="Payment" className="w-24 h-fit mobile:w-16" key={index} />
                })
            }
            </div>
        </section>
    )
}

// home contact us
function HomeContactUs(){
    return (
        <section className="contact-us w-[80vw] mx-auto mt-20 flex flex-col gap-6 items-center mobile:w-full">
            <div className="contact-header text-3xl font-semibold">Contact Us</div>
            <div className="contact-content w-full mb-10 rounded flex justify-center gap-10 p-10 overflow-hidden bg-white-prim mobile:flex-col mobile:px-[5vw] mobile:pt-6 mobile:w-full mobile:gap-4 mobile:rounded-none tablet:flex-col tablet:w-[90vw]">
                <div className="location w-3/5 shadow-med mobile:w-full tablet:w-full">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63245.983719494!2d110.33364490508032!3d-7.803163418805134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6bc5%3A0x21723fd4d3684f71!2sYogyakarta%2C%20Kota%20Yogyakarta%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1684329849117!5m2!1sid!2sid" title="Location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="w-full h-[450px] mobile:w-[90vw] tablet:w-full"></iframe>
                </div>
                <form action="" className="contact-form w-2/5 flex flex-col gap-4 mobile:w-full tablet:w-full tablet:p-0">
                    <div className="name flex items-center gap-3 p-3 bg-white shadow-med rounded-md mobile:w-[90vw] tablet:w-full">
                        <label htmlFor="name" className="flex justify-center items-center">
                            <span class="material-symbols-rounded">person</span>
                        </label>
                        <input id="name" type="text" placeholder="Name" className="w-full outline-none text-xl" />
                    </div>
                    <div className="email flex items-center gap-3 p-3 bg-white shadow-med rounded-md mobile:w-[90vw] tablet:w-full">
                        <label htmlFor="email" className="flex justify-center items-center">
                            <span class="material-symbols-rounded">mail</span>
                        </label>
                        <input id="email" type="email" placeholder="Email" className="w-full outline-none text-xl" />
                    </div>
                    <div className="message flex items-center gap-3 p-3 bg-white shadow-med rounded-md mobile:w-[90vw] tablet:w-full">
                        <label htmlFor="message" className="flex justify-center items-center self-start">
                            <span class="material-symbols-rounded">chat</span>
                        </label>
                        <textarea id="message" cols="30" rows="7" placeholder="Message" className="outline-none text-xl resize-none"></textarea>
                    </div>
                    <button type="button" className="w-fit py-1 px-2 rounded bg-primary text-white text-xl self-end flex items-center">
                        Send <span class="material-symbols-rounded">chevron_right</span>
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Home