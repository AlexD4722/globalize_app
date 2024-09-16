import { AdminLayout } from "@/components/layout"
import { ReactElement } from "react"

export default function AdminApp () {
    return (
        <>
        Home
        </>
    )
}

AdminApp.getLayout = function getLayout(page: ReactElement) {
    return (
      <AdminLayout>
        {page}
      </AdminLayout>
    )
}