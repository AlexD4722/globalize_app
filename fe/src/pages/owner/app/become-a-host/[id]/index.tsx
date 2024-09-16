import { ReactElement, useEffect, useState } from "react"
import { AddNewListingLayout } from "..";
import { useRouter } from "next/router";
import useLocalAppStore from "@/services/zustand/store";

//This page act as a redirect page, dont have any content
export default function InitialNewListing () {
    
    const router = useRouter();
    const { id } = router.query;
    const listingProcess = useLocalAppStore((state) => state.listingProcess);
    const setListingProcess = useLocalAppStore((state) => state.setListingProcess);

    useEffect(() => {
        if(listingProcess && Object.hasOwn(listingProcess, 'id') && listingProcess.id === id){
            if(Object.hasOwn(listingProcess, 'currentStep') && listingProcess.currentStep){
                router.replace({
                    pathname: `/owner/app/become-a-host/${id}/${listingProcess.currentStep}`
                })
            }else{
                router.replace({
                    pathname: `/owner/app/become-a-host/${id}/about-your-property`
                })
            }
        }else{
            router.replace({
                pathname: `/owner/app/become-a-host`
            })
        }
    },[id, router, listingProcess])
    
    return (
        <>
        </>
    )
}


InitialNewListing.getLayout = function getLayout (page: ReactElement) {
    return (
        <>
        <AddNewListingLayout>
            {page}
        </AddNewListingLayout>
        </>
    )
}