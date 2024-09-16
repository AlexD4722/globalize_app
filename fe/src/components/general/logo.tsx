import clsx from "clsx";
import Link from "next/link";


export default function Logo({ className, fill = "black", height="2rem", href = '/'} : { className?: string, fill?: "black" | "white", height?:string, href?: string}){


    return (
        <>
        <Link 
        href={href}
        className={clsx(
            "text-theme w-fit",
            className

        )}>
            <svg width="189" height="46" viewBox="0 0 189 46" style={{width: "auto", height: height}} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill={fill} d="M2.64 22.4796C2.64 13.1196 8.265 6.45961 17.67 6.45961C24.375 6.45961 29.64 10.2396 30.855 16.9896H26.985C25.77 12.4446 22.215 10.0596 17.58 10.0596C10.515 10.0596 6.645 15.7296 6.645 22.4796C6.645 29.0046 10.335 34.8996 17.49 34.8996C22.935 34.8996 27.48 31.7496 27.48 25.8546V24.7746H18.03V21.1746H31.305V38.2296H28.065L27.66 33.2346C25.5 36.7446 21.45 38.4996 17.445 38.4996C8.265 38.4996 2.64 31.4796 2.64 22.4796ZM35.9882 6.72961H39.6782V38.2296H35.9882V6.72961ZM88.0303 15.0096C95.1853 15.0096 99.0553 20.0496 99.0553 26.7546C99.0553 33.2346 94.9153 38.4996 88.0303 38.4996C84.9253 38.4996 81.9103 37.4196 80.1553 34.7196L79.6603 38.2296H76.4653V6.72961H80.1553V18.9696C82.0903 16.3146 84.7003 15.0096 88.0303 15.0096ZM87.6703 35.2146C92.5753 35.2146 95.2753 31.3896 95.2753 26.7546C95.2753 22.0746 92.6203 18.2946 87.6703 18.2946C82.9003 18.2946 80.1103 22.0296 80.1103 26.6646C80.1103 31.1646 82.7203 35.2146 87.6703 35.2146ZM123.837 34.8546V38.2296H121.812C119.247 38.2296 117.762 37.3746 117.672 34.6746C115.917 37.2396 113.352 38.4996 109.977 38.4996C105.747 38.4996 101.517 36.5646 101.517 31.7946C101.517 26.3496 105.972 24.6396 110.742 24.6396H117.492V23.0646C117.492 19.6446 114.882 18.2946 111.777 18.2946C109.257 18.2946 106.467 19.4196 105.927 22.1646H102.237C102.867 17.0346 107.277 15.0096 111.957 15.0096C117.402 15.0096 121.182 17.5296 121.182 23.2896V33.1896C121.182 34.3146 121.677 34.8546 122.712 34.8546H123.837ZM117.492 27.7446H110.382C106.962 27.7446 105.252 29.0046 105.252 31.5696C105.252 34.3146 107.862 35.3496 110.247 35.3496C114.297 35.3496 117.492 33.1446 117.492 28.8696V27.7446ZM125.774 6.72961H129.464V38.2296H125.774V6.72961ZM133.619 15.2796H137.309V38.2296H133.619V15.2796ZM135.464 6.41461C136.859 6.41461 137.849 7.40461 137.849 8.79961C137.849 10.1946 136.859 11.1846 135.464 11.1846C134.069 11.1846 133.079 10.1946 133.079 8.79961C133.079 7.40461 134.069 6.41461 135.464 6.41461ZM140.519 15.2796H158.789V18.0696L144.839 34.8546H159.374V38.2296H139.934V35.4396L153.839 18.6546H140.519V15.2796ZM159.969 26.7546C159.969 20.0496 164.064 15.0096 170.859 15.0096C177.339 15.0096 181.614 19.2846 181.749 25.8996C181.749 26.2146 181.704 26.7546 181.659 27.4746H163.839V27.7896C163.929 32.1096 166.674 35.2146 171.084 35.2146C174.234 35.2146 176.754 33.6396 177.609 30.5346H181.344C180.399 35.4396 176.304 38.4996 171.354 38.4996C164.469 38.4996 159.969 33.7296 159.969 26.7546ZM177.924 24.4146C177.564 20.4546 174.819 18.2496 170.904 18.2496C167.304 18.2496 164.424 20.8146 164.064 24.4146H177.924Z" />
                <circle cx="58.25" cy="25.7299" r="12" stroke="#F43F5E" strokeOpacity="0.88" strokeWidth="3"/>
                <ellipse cx="58.25" cy="25.7299" rx="4.5" ry="12" stroke="#F43F5E" strokeOpacity="0.88" strokeWidth="3"/>
                <path d="M46.25 25.7299H70.25" stroke="#F43F5E" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round"/>
            </svg>
        </Link>
        </>
    )
}