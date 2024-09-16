import Link from "next/link"
import Logo from "../../general/logo"
import clsx from "clsx"

const footerContents = [
    {
        title: "Navigation",
        links: [
            {title: "Stays", url: "/"},
            {title: "Flights", url: "/a"},
            {title: "Car Rentals", url: "/b"},
            {title: "Cruises", url: "/c"}
        ]
    },
    {
        title: "Socials",
        links: [
            {title: "Twitter", url: "/"},
            {title: "Instagram", url: "/a"},
            {title: "Facebook", url: "/b"},
        ]
    },
    {
        title: "About",
        links: [
            {title: "About us", url: "/"},
            {title: "Help center", url: "/a"},
        ]
    },
    {
        title: "Other",
        links: [
            {title: "Blog", url: "/"},
            {title: "Privacy", url: "/a"},
            {title: "Terms and Conditions", url: "/a"},
            {title: "List your property", url: "/a"},
            {title: "Be a service provider partner", url: "/a"},
        ]
    }
]

export function Footer () {
    return (
        <>
        <footer className="mt-auto border-t border-borderDefault">
            <main className="lg:w-[70%] xs:w-[80%] mx-auto">
                <div className={clsx(
                    "grid py-10",
                    "xl:grid-cols-[30%_70%] xl:gap-5",
                    "xs:grid-cols-1 xs:gap-10"
                )}>
                    <FooterContentLeft/>
                    <FooterContentRight/>
                </div>
                <div className="h-[1px] w-full bg-borderDefault"/>
                <div className="py-5">&copy;2024 Globalize. All rights reserved.</div>
            </main>
        </footer>
        </>
    )
}

const FooterContentLeft = () => {
    return (
        <>
        <div>
            <Logo className="scale-125 origin-left"/>
            <div className="mt-4">
                <p className="text-xl">Start exploring the world,</p>
                <p className="text-lg text-theme font-medium">Today.</p>
            </div>
        </div>
        </>
    )
}

const FooterContentRight = () => {
    return (
        <>
        <div className={clsx(
            "grid",
            "xl:grid-cols-4 xl:gap-2",
            "md:grid-cols-2 md:gap-3",
            "xs:grid-cols-1 xs:gap-6"
        )}>
            {footerContents.map((section) => (
                <div key={section.title}>
                    <h3 className="text-base font-medium text-textUnfocus lg:mb-2 xs:mb-1">{section.title}</h3>
                    {section.links.map((link) => (
                        <div key={link.title} className="lg:leading-[1.75] xs:leading-normal">
                            <Link className="hover:text-theme" href={link.url}>{link.title}</Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </>
    )
}