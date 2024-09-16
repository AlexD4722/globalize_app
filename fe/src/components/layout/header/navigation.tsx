import clsx from "clsx"
import Link from "next/link";
import { useRouter } from "next/router";

interface iNavLink {
    title: string,
    href: string
}

const links : Array<iNavLink> = [
    { title: "Stays", href: '/' },
    { title: "Car Rentals", href: '/a' },
    { title: "Flights", href: '/b' },
    { title: "Cruises", href: '/c' },

]

type NavigationProps = {
    className?: string,
    scrolled?: boolean
}

export default function Navigation ({className, scrolled} : NavigationProps){

    const router = useRouter();
    let flag : boolean;
    
    return (
        <>
            <div className={clsx(
                className,
                'flex flex-row items-center',
                'lg:mt-0',
                "sm:text-base",
                'xs:justify-start xs:flex-nowrap xs:overflow-auto xs:mt-3'
            )}>
                {links.map((link, i) => {
                    flag = (link.href === router.asPath.split('?')[0]);
                    return (
                    <Link href={{pathname: link.href}} key={i} className={clsx(
                        "px-3 py-1 rounded-full tracking-wide border whitespace-nowrap hover:elevation-color-2",
                        "transition-background duration-200",
                        flag ? (scrolled ? "border-borderHighlight" : "border-borderDefault") : "border-transparent",
                        (scrolled && !flag) && "hover:!bg-white", 
                        "sm:mr-2.5 sm:last:mr-0"
                    )}>
                        {link.title}
                    </Link>
                )})}
            </div>
        </>
    )
}