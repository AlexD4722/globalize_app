import { SearchbarOnRegularRoute } from "@/components/layout/searchbar/searchbar"
import Head from "next/head"

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 - Page not found</title>
            </Head>
            <div className="w-screen h-screen flex items-center justify-center">
                <h1>404 - Page Not Found</h1>
            </div>
        </>
    )
  }

