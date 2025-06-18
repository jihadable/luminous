import { IconBrandInstagram, IconBrandTiktok, IconBrandTwitter } from "@tabler/icons-react"
import logo from "../assets/luminous-logo.png"

function Footer(){

    const sosmedData = [
        <IconBrandTwitter stroke={1.5} />,
        <IconBrandInstagram stroke={1.5} />,
        <IconBrandTiktok stroke={1.5} />
    ]

    const footerLink = ["About", "FAQs", "Help Center"]

    return (
        <footer className="w-full bg-[#222] flex flex-col py-4 px-[10vw] text-white-prim mobile:px-4 tablet:px-[5vw]">
            <div className="top w-full flex flex-col items-center gap-4 pb-4">
                <div className="logo flex">
                    <img src={logo} alt="Logo" className="w-24" />
                </div>
                <div className="links w-full flex items-center justify-between gap-4 mobile:flex-col">
                    <div className="sosmed flex items-center gap-4">
                    {
                        sosmedData.map((item, index) => {
                            return <div className="item cursor-pointer bg-primary p-2 rounded-full" key={index}>{item}</div>
                        })
                    }
                    </div>
                    <div className="other-links flex items-center gap-4">
                    {
                        footerLink.map((item, index) => {
                            return <a className="hover:underline cursor-pointer" key={index}>{item}</a>
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="bottom pt-4 border-t text-center">©2025 Luminous</div>
        </footer>
    )
}

export default Footer