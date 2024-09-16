import clsx from "clsx";
import { Menu, PersonCircleOutline } from "../../svg";
import React, { useEffect, useRef, useState } from "react";
import useLocalAppStore from "@/services/zustand/store";
import useCheckLogin from "@/services/customHook/useCheckLogin";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

type ContainsFocusState = {
    isFocus: boolean
}

type watchScrolledState = {
    scrolled?: boolean
}

interface ProfilePopupTriggerProps extends watchScrolledState, ContainsFocusState, React.HTMLAttributes<HTMLDivElement> {}; 
interface ProfilePopupLinkProps extends React.HTMLAttributes<HTMLDivElement> {}; 


export default function Profile ({scrolled} : watchScrolledState) {

    const [isFocus, setIsFocus] = useState<boolean>(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //Detect that if user click outside the component will close it
        function handleClickOutside(event : MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as HTMLElement)) {
                setIsFocus(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[])

    return (
        <>
        <div ref={profileRef} className="relative z-10">
            <ProfilePopupTrigger scrolled={scrolled} isFocus={isFocus} onClick={() => setIsFocus(!isFocus)}/>
            <div className={clsx(
                "absolute top-full right-0 mt-3",
                !isFocus && "pointer-events-none select-none",
            )}>
               <ProfilePopup isFocus={isFocus}/>
            </div>
        </div>
        </>
    )
}

const ProfilePopupTrigger = ({...props} : ProfilePopupTriggerProps) => {
    
    const { className, isFocus, scrolled, ...restProps } = props;
    return (
        <>
          <div {...restProps}
          className={clsx(
                "flex border border-borderDefault px-3 py-2 rounded-3xl",
                "duration-300 hover:elevation-shadow-2 hover:cursor-pointer",
                "text-2xl",
                isFocus && "elevation-shadow-2",
                (isFocus && scrolled) && "bg-white",
                scrolled && "hover:bg-[#ffffff]",
                className
            )}>
                <span className="mr-2"><Menu/></span>
                <span><PersonCircleOutline/></span>
            </div>
        </>
    )
}

const ProfilePopup = ({isFocus} : ContainsFocusState) => {

    const setPage = useLocalAppStore((state) => state.setPage);
    const setAuthPopup = useLocalAppStore((state) => state.setAuthPopup)
    const isLogin = useCheckLogin('guest');
    const mutation = useMutation({ mutationKey: ['logout']})
    const router = useRouter();

    return (
        <>
            <div className={clsx(
                "relative border text-black rounded-xl overflow-hidden glass-effect before:bg-[#ffffffbb] elevation-shadow-1",
                isFocus ? "opacity-100" : "opacity-0 pointer-events-none select-none",
                "lg:w-[250px]",
                "xs:w-[200px]"
            )}>
                {!isLogin && 
                <>
                    <ProfilePopupLink className="font-medium" onClick={() => {setAuthPopup(true); setPage("register")}}>Register</ProfilePopupLink>
                    <ProfilePopupLink onClick={() => {setAuthPopup(true); setPage("signin")}}>Sign in</ProfilePopupLink>
                    <div className="h-[1px] border-t border-borderDefault w-full"/>
                    <ProfilePopupLink>List your property</ProfilePopupLink>
                    <ProfilePopupLink>Help center</ProfilePopupLink>
                </>}
                {isLogin && 
                <>
                    <ProfilePopupLink onClick={() => {router.push('/guest/profile')}}>Profile</ProfilePopupLink>
                    <ProfilePopupLink className="font-medium" onClick={() => {mutation.mutate()}}>Logout</ProfilePopupLink>
                </>}
            </div>
        </>
    )
}

const ProfilePopupLink = ({...props} : ProfilePopupLinkProps) => {

    const {children, className} = props;

    return (
    <>
    <div {...props} className={`px-3 py-2 duration-100 hover:!bg-[#ffffffde] hover:cursor-pointer select-none ${className}`}>
        {children}
    </div>
    </>
    ) 
}