import { OwnerLayout } from "@/components/layout"
import { ReactElement } from "react"

export default function EditListing () {
    return (
        <>
        
        </>
    )
}

EditListing.getLayout = function getLayout (page: ReactElement) {
    return (
        <>
        <OwnerLayout>
            {page}
        </OwnerLayout>
        </>
    )
}