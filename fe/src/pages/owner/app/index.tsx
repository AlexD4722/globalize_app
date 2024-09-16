import { OwnerLayout } from "@/components/layout";
import Head from "next/head";
import { ReactElement } from "react";


export default function OwnerRoute () {

    return (
        <>
        <Head>
            <title>Hosting</title>
        </Head>
        <main className="my-20 min-h-screen">
            
        </main>
        </>
    )
}


OwnerRoute.getLayout = function getLayout(page : ReactElement) {
    return (
        <>
            <OwnerLayout>{page}</OwnerLayout>
        </>
    )
}