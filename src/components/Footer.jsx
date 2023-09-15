function Footer(){

    const sosmedData = [
        {
            name: "twt",
            element: 
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>
            </svg>
        },
        {
            name: "ig",
            element: 
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M16.5 7.5l0 .01"></path>
            </svg>
        },
        {
            name: "tiktok",
            element:
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-tiktok" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"></path>
            </svg>
        }
    ]

    const footerLink = ["About", "FAQs", "Help Center"]

    return (
        <footer className="p-4 mt-12 flex flex-col items-center gap-3 bg-primary text-white-prim w-full">
            <div className="footer-link flex items-center gap-6">
                {
                    footerLink.map((link, index) => {
                        return (
                            <span className="hover:underline cursor-pointer" key={index}>{link}</span>
                        )
                    })
                }
            </div>
            <div className="footer-sosmed flex items-center gap-3">
                {
                    sosmedData.map((sosmed, index) => {
                        return (
                            <span className="p-2 rounded-full flex justify-center items-center hover:bg-hov cursor-pointer" key={index}>
                                {sosmed.element}
                            </span>
                        )
                    })
                }
            </div>
            <div className="made-by text-black font-bold">Create by Umar</div>
        </footer>
    )
}

export default Footer