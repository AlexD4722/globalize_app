import clsx from 'clsx'
import Authentication from './authentication'
import { Footer } from './footer/footer'
import Header from './header/header'
import { useRouter } from 'next/router'
import { ScrollToTop } from './content-related/scrollToTop'
import Logo from '../general/logo'
import { NavComplex, NavSimple } from './header/owner_navigation'
import OwnerProfile from './header/owner_profile-section'
import { OwnerFooter } from './footer/owner-footer'
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/layout/admin/admin-sidebar";
import AdminHeader from "@/components/layout/admin/admin-header"; 

export function GuestLayout({children} : {children: React.ReactNode}){
    
    const router = useRouter()
    const currentRoutePath = router.asPath.split('?')[0].split('/')[1];

    return (
        <>
        <div
            id="layout"
            className={clsx(
                'relative w-screen min-h-screen flex flex-col'
            )}
        >
            {currentRoutePath === '' && <div className="landing-bg" />}
            <Header />
            <div className={clsx('mx-auto lg:w-[70%] xs:w-[80%]')}>
                {children}
            </div>
            <Footer />
        </div>
        <Authentication />
        <ScrollToTop />
        </>
    )

}

export function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}

export function OwnerLayout({children, footer = true} : {children: React.ReactNode, footer?: boolean}){
    
    const router = useRouter()
    const currentRoutePath = router.asPath.split('?')[0].split('/')[3];
    const [navigation, setNavigation] = useState(false);

    return (
        <>
        <div
            id="layout"
            className={clsx(
                'relative w-screen min-h-screen flex flex-col'
            )}
        >
            <header className='
            sticky top-0 bg-white z-20
            lg:px-[15%] xs:px-[10%] lg:h-[85px] xs:h-[100px] lg:grid lg:grid-cols-3 lg:justify-normal xs:flex xs:justify-between items-center border-b border-borderDefault'>
                <Logo height="1.75rem" 
                className='z-10'
                fill={"black"}
                href='/owner'
                />
                
                <div className='flex items-center  justify-center relative pointer-events-auto z-0'>
                    <div className="z-[30] flex items-center relative">
                        <NavSimple className={navigation ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}/>               
                    </div>
                    <NavComplex setNavigation={setNavigation} navigation={navigation}/>
                </div>

                <OwnerProfile/>
            </header>
            <div className={clsx('mx-auto lg:w-[70%] xs:w-[80%]')}>
                {children}
            </div>
            {footer && <OwnerFooter/>}
        </div>
        <ScrollToTop />
        </>
    )
}