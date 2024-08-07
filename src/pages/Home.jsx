import { Link } from "react-router-dom"
import bca from "../assets/bca.png"
import beanBag from "../assets/bean-bag.jpg"
import bni from "../assets/bni.png"
import bri from "../assets/bri.png"
import carlaSofia from "../assets/carla-sofia.jpg"
import dana from "../assets/dana.png"
import danielBone from "../assets/daniel-bone.jpg"
import gopay from "../assets/gopay.png"
import handBlender from "../assets/hand-blender.jpg"
import household from "../assets/household.jpg"
import household2 from "../assets/household2.jpg"
import johnKean from "../assets/john-kean.jpg"
import lazySofa from "../assets/lazy-sofa.jpg"
import linkaja from "../assets/linkaja.png"
import mandiri from "../assets/mandiri.png"
import neckPillow from "../assets/neck-pillow.jpg"
import ovo from "../assets/ovo.png"
import paypal from "../assets/paypal.png"
import qris from "../assets/qris.png"
import sideTable from "../assets/side-table.jpg"
import spay from "../assets/spay.png"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { getIdCurrency } from "../utils/getIdCurrency"
import goTop from "../utils/goTop"

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
            <div className="home-tag-content absolute left-0 right-0 bg-primary/[.1] backdrop-blur-lg p-8 flex flex-col gap-4 mobile:static mobile:p-0">
                <div className="home-tag-header text-3xl font-bold mobile:text-2xl">Luminous Living</div>
                <div className="home-tag-tagline text-xl mobile:text-base">Luminous membantu pelanggan menemukan kehendak terbaiknya dalam rumah tangga. Semua produk kami dibuat dengan ukuran standar sehingga Anda dapat memadupadankannya dengan bebas.</div>
                <Link to="/store" onClick={goTop} className="w-fit py-1 px-2 rounded bg-primary text-white text-xl mobile:text-base">Belanja sekarang</Link>
            </div>
        </section>
    )
}

// home trending now
export function HomeTrendingNow(){

    const trendingProducts = [
        {
            slug: "a3495264-134d-4050-a767-84d1a8a1130f",
            name: "La-Z-Sofa",
            price: 250000,
            img: lazySofa
        },
        {
            slug: "6890a820-b709-4eb1-91b4-e42e6b8ee9d7",
            name: "Meja Samping",
            price: 175000,
            img: sideTable
        },
        {
            slug: "4d7b95b9-ba40-4ede-9d24-a58d2ef37b5d",
            name: "Bantal Leher",
            price: 50000,
            img: neckPillow
        },
        {
            slug: "7b34e99a-7489-4e25-8b53-14f23620ce88",
            name: "Kursi Malas",
            price: 185000,
            img: beanBag
        },
        {
            slug: "3094f2eb-e81a-4d02-a31f-e97a0e2233fc",
            name: "Blender Genggam",
            price: 215000,
            img: handBlender
        }
    ]

    return (
        <section className="trending-now w-[80vw] flex flex-col items-center gap-6 my-32 mx-auto mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="trending-now-header text-3xl font-semibold">Produk trending</div>
            <div className="trending-now-items grid grid-cols-5 gap-4 mobile:grid-cols-2 tablet:grid-cols-4">
            {
                trendingProducts.map((product, index) => (
                    <Link to={`/store/${product.slug}`} onClick={goTop} className="trending-now-item flex flex-col rounded-lg bg-white overflow-hidden border-2 hover:border-primary hover:shadow-none" key={index}>
                        <img src={product.img} alt={product.name} loading="lazy" />
                        <div className="info flex flex-col gap-4 p-4">
                            <div className="trending-item-name text-xl font-bold mobile:text-xl">{product.name}</div>
                            <div className="trending-item-price text-xl mobile:text-base">{getIdCurrency(product.price)}</div>
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
            <div className="home-tag-content absolute left-0 right-0 bg-primary/[.1] backdrop-blur-lg p-8 flex flex-col gap-4 mobile:static mobile:p-0">
                <div className="home-tag-header text-3xl font-bold mobile:text-2xl">Luminous Living</div>
                <div className="home-tag-tagline text-xl mobile:text-base">Produk kami memiliki ukuran standar, memungkinkan pencampuran dan pencocokan yang mulus untuk sentuhan pribadi pada ruang keluarga Anda. Temukan rumah ideal Anda dengan Luminous.</div>
                <Link to="/store" onClick={goTop} className="w-fit py-1 px-2 rounded bg-primary text-white text-xl mobile:text-base">Belanja sekarang</Link>
            </div>
        </section>
    )
}

// home review
function HomeReview(){
    const reviews = [
        {
            name: "John Kean",
            job: "Mahasiswa",
            img: johnKean,
            review: "Saya senang dengan pengalaman berbelanja saya di Luminous. Situs webnya ramah pengguna, dan kualitas produk melebihi ekspektasi saya. Saya akan kembali belanja lagi!"
        },
        {
            name: "Daniel Bone",
            job: "Mahasiswa",
            img: danielBone,
            review: "Layanan pelanggan mereka luar biasa, dan variasi produknya luar biasa. Tempat yang tepat untuk belanja online!"
        },
        {
            name: "Carla Sofia",
            job: "Guru",
            img: carlaSofia,
            review: "Luminous membuat belanja online saya nyaman dan menyenangkan. Pengiriman yang cepat dan opsi pembayaran yang aman memberi saya ketenangan pikiran. Sangat direkomendasikan untuk semua kebutuhan belanja Anda!"
        }
    ]

    return (
        <section className="reviews w-[80vw] mx-auto my-32 flex flex-col items-center gap-6 mobile:w-[90vw] tablet:w-[90vw]">
            <div className="reviews-header text-3xl font-semibold">Review</div>
            <div className="review-slide flex gap-4 mobile:flex-col tablet:gap-4">
            {
                reviews.map((review, index) => (
                    <div className="review bg-primary/[.1] flex flex-col gap-4 p-4 rounded-xl h-fit" key={index}>
                        <div className="review-header flex gap-3">
                            <img src={review.img} alt={review.name} className="w-[50px] h-fit rounded-full shadow-med" loading="lazy" />
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
            <div className="payments-header text-3xl font-semibold">Metode pembayaran</div>
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