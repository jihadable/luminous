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
            <HomeContactUs />
            <Footer />
        </>
    )
}

// home header
function HomeHeader(){
    return (
        <header className="flex h-[100vh] items-center justify-evenly mobile:flex-col-reverse mobile:justify-center tablet:flex-col-reverse tablet:justify-center tablet:gap-4">
            <div className="header-left flex flex-col gap-2">
                <div className="shop-name text-4xl font-bold">Luminous</div>
                <div className="tagline text-2xl">live comfortably with Luminous</div>
                <a href="/store" className="w-fit py-1 px-2 rounded bg-primary text-white text-xl">Shop now</a>
            </div>
            <div className="header-right flex items-center gap-4 p-4">
                <img src={spoon} alt="Spoon" className="spoon-img h-[400px] shadow-med cursor-pointer rounded-xl mobile:h-[90vw] tablet:h-[60vw]" />
                <div className="img2 flex flex-col gap-4">
                    <img src={chair} alt="Chair" className="chair-img w-[200px] shadow-med cursor-pointer rounded-xl mobile:w-[45vw] tablet:w-[30vw]" />
                    <img src={table} alt="Table" className="tabler-img w-[200px] shadow-med cursor-pointer rounded-xl mobile:w-[45vw] tablet:w-[30vw]" />
                </div>
            </div>
        </header>
    )
}

// home tag
function HomeTag(){

    return (
        <section className="home-tag flex items-center justify-center m-auto relative">
            <img src={household} alt="HouseHold" className="w-[60vw] rounded-md mobile:w-[90vw] tablet:w-[90vw]" />
            <div className="home-tag-content backdrop-blur shadow-med flex flex-col gap-3 absolute p-10 rounded-xl w-[40vw] mobile:w-[90vw] mobile:h-full mobile:backdrop-blur-sm mobile:rounded-md tablet:w-[70vw]">
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
        <section className="trending-now flex flex-col items-center gap-6 p-8 pb-16 m-auto mt-5 mobile:w-[100vw]">
            <div className="trending-now-header text-3xl">Trending Now</div>
            <div className="trending-now-items w-[90vw] grid grid-cols-5 gap-5 mobile:grid-cols-2 tablet:grid-cols-4">
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
        <section className="reviews w-[80vw] m-auto mb-16 flex flex-col items-center gap-6 mobile:w-[90vw] tablet:w-[90vw]">
            <div className="reviews-header text-3xl">Reviews</div>
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

// home contact us
function HomeContactUs(){
    return (
        <section className="contact-us w-fit m-auto flex flex-col gap-6 items-center mobile:w-[100vw]">
            <div className="contact-header text-3xl">Contact Us</div>
            <div className="contact-content mb-10 rounded flex items-center justify-center gap-6 p-10 overflow-hidden bg-white-prim mobile:flex-col mobile:p-0 mobile:pt-6 mobile:w-full mobile:gap-4 mobile:rounded-none tablet:flex-col tablet:w-[90vw]">
                <div className="location shadow-med tablet:w-full">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63245.983719494!2d110.33364490508032!3d-7.803163418805134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6bc5%3A0x21723fd4d3684f71!2sYogyakarta%2C%20Kota%20Yogyakarta%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1684329849117!5m2!1sid!2sid" title="Location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="w-[600px] h-[450px] mobile:w-[90vw] tablet:w-full"></iframe>
                </div>
                <form action="" className="contact-form flex flex-col gap-4 p-6 tablet:w-full tablet:p-0">
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