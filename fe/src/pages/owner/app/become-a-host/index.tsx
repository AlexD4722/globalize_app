import Button from "@/components/button/classic-button"
import Logo from "@/components/general/logo"
import { OwnerLayout } from "@/components/layout"
import { listingProcessState } from "@/services/zustand/listing_process-slice"
import useLocalAppStore from "@/services/zustand/store"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { ReactElement } from "react"


export function generateUniqueId() {
    const length = 16;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random()   
   * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result; 
  
}

//When owner add a new listing, app will generate an unique id for a that Listing,
    //this idea' purpose is for storing the progress of adding a new listing of an owner (finish or not)

//Once owner click "Get started", 
    //this process begin, a new listing is generated with an unique id,
    //(We can save it to Database for UX, user convenient)
    
export default function AddListing () {

    const router = useRouter();

    const id = generateUniqueId();
    const setListingProcess = useLocalAppStore((state) => state.setListingProcess);

    const becomeHost = () => {
        setListingProcess({id: id});
        router.push(`/owner/app/become-a-host/${id}`)
    }

    return (
        <>
        <Head>
            <title>Add New Listing</title>
        </Head>
        <div className="min-h-[calc(100vh_-_170px)] grid lg:grid-cols-2 xs:grid-cols-1 lg:pb-[85px] xs:pb-[100px]">
            <div className="h-full w-full flex items-center justify-center px-10">
                <h1 className="lg:text-5xl xs:text-3xl font-medium lg:mt-[-85px] lg:w-[75%] leading-relaxed">It&apos;s easy to get started on Globalize!</h1>
            </div>
            <div className="h-full w-full flex items-center justify-center px-10">
                <article className="grid grid-flow-row gap-10 lg:mt-[-85px]">
                    <ProcessItem
                    step={1}
                    title="Tell us about your property"
                    desc="Share some basic info, like where it is, what its type."
                    image={
                        <Image
                        src={'/images/listings/your-place.jpg'}
                        alt="Tell us about your property"
                        width={50}
                        height={50}
                        className="h-[100px] w-auto"
                        />
                    }
                    />
                    <ProcessItem
                    step={2}
                    title="Make it stand out"
                    desc="Add photos plus more infomation about your property."
                    image={
                        <Image
                        src={'/images/listings/add-details.jpg'}
                        alt="Tell us about your property"
                        width={50}
                        height={50}
                        className="h-[100px] w-auto"
                        />
                    }
                    />
                    <ProcessItem
                    step={3}
                    title="Finish up and publish"
                    desc="Choose a starting price, verify a few details, then publish your listing."
                    image={
                        <Image
                        src={'/images/listings/finish-publish.jpg'}
                        alt="Tell us about your property"
                        width={50}
                        height={50}
                        className="h-[100px] w-auto"
                        />
                    }
                    />
                </article>
            </div>
        </div>
        <div className="fixed bottom-0 left-0 w-screen lg:h-[85px] xs:h-[100px] bg-white flex items-center justify-end px-[5%] border-t border-borderDefault">
            <Button intent={'primary'} rounded={'regular'} 
                onClick={() => {becomeHost()}}>Get started!</Button>
        </div>
        </>
    )
}

const ProcessItem = ({title, desc ,image, step} : {title: string, desc: string, image: React.ReactNode, step: number }) => {
    return (
        <>
        <section className="flex items-center justify-between py-5 border-b border-borderDefault w-full last:border-none">
            <div className="mr-5 w-[75%] flex">
                <div className="mr-3 w-[2rem]">
                    <h2 className="text-2xl font-medium">{step}.</h2>
                </div>
                <div>
                    <h3 className="text-2xl font-medium">{title}</h3>
                    <p className="text-lg">{desc}</p>
                </div>
            </div>
            <div>
                {image}
            </div>
        </section>
        </>
    )
}

export const AddNewListingLayout = ({children} : {children: React.ReactNode}) => {
    const router = useRouter();

    return (
        <main className="min-h-screen w-screen px-[5%]">
            <header className="lg:h-[85px] xs:h-[100px] flex items-center justify-between">
                <div><Logo/></div>
                <div><Button intent={'secondary'} rounded={'regular'} onClick={() => router.push('/owner/app/listings')}>Exit</Button></div>
            </header>
            {children}
        </main>
    )
}

AddListing.getLayout = function getLayout (page: ReactElement) {
    return (
        <>
        <AddNewListingLayout>
            {page}
        </AddNewListingLayout>
        </>
    )
}