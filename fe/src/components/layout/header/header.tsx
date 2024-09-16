import clsx from "clsx";
import Profile from "./profile-section";
import Logo from "../../general/logo";
import Navigation from "./navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../button/classic-button";
import Link from "next/link";
import useLocalAppStore from "@/services/zustand/store";
import { useRouter } from "next/router";
import useCheckLogin from "@/services/customHook/useCheckLogin";

export default function Header() {
  const router = useRouter();
  const setAuthPopup = useLocalAppStore((state) => state.setAuthPopup);
  const setPage = useLocalAppStore((state) => state.setPage);
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);

  // Use this to check login status, true if user is logged in
  const isLogin = useCheckLogin("guest");

  const changeHeaderStyleOnScroll = useCallback(() => {
    //Landing page is special route than others, cuz it have a background image, and header only need to be elevated once scroll
    //By elevating the header, it means making the header stand out, vice versa.
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);
  // Use this to check login status, true if user is logged in

  useEffect(() => {
    //If current route is not landing page, elevate the header by default
    //By elevating the header, it means making the header stand out
    if (router.asPath.split("?")[0] !== "/") {
      setIsLandingPage(false);
    } else {
      setIsLandingPage(true);
    }

    document.addEventListener("scroll", changeHeaderStyleOnScroll);
    return () =>
      document.removeEventListener("scroll", changeHeaderStyleOnScroll);
  }, [changeHeaderStyleOnScroll, router]);

  return (
    <>
      <header
        className={clsx(
          //Overall
          "z-[20] lg:px-[15%] xs:px-[10%] sticky top-0 transition-background",
          //Conditional
          scrolled
            ? "text-black glass-effect elevation-shadow-1 duration-500 transition-shadow"
            : isLandingPage && "text-white",
          //Responsive
          "lg:grid lg:gap-0 lg:grid-flow-col lg:grid-cols-none lg:h-[85px] lg:py-3",
          "xs:grid xs:gap-3 xs:grid-cols-2 xs:justify-between xs:items-center xs:h-[150px] xs:py-5"
        )}
      >
        <Logo
          height="1.75rem"
          fill={scrolled ? "black" : isLandingPage ? "white" : "black"}
          className={clsx(
            //Responsive
            "lg:col-auto lg:row-auto",
            "xs:col-[1/2] xs:row-[1/1]"
          )}
        />
        {/* <Navigation scrolled={scrolled}
             className={clsx(
                //Responsive
                "lg:col-auto lg:row-auto",
                "xs:col-[1/-1] xs:row-[2/2]"
            )}/> */}
        <div
          className={clsx(
            //Overall
            "grid grid-flow-col gap-3 items-center",
            //Responsive
            "lg:col-auto lg:row-auto",
            "xs:col-[2/2] xs:row-[1/1] xs:w-fit xs:ml-auto"
          )}
        >
          <Link
            className={clsx(
              "lg:inline-block xs:hidden px-3 py-2 hover:elevation-color-2 rounded-full duration-200",
              scrolled && "hover:!bg-white"
            )}
            href={'/owner'}
          >
            List your property
          </Link>
          {!isLogin && (
            <Button
              className="lg:inline-block xs:hidden"
              intent={"primary"}
              onClick={() => {
                setAuthPopup(true);
                setPage("signin");
              }}
            >
              Sign In
            </Button>
          )}
          <Profile scrolled={scrolled} />
        </div>
      </header>
    </>
  );
}
