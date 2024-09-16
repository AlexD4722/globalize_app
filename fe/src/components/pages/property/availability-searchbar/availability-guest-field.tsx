import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react";

import { Minus, Plus } from "@/components/button/calculation-button";
import clsx from "clsx";
import { Close, ErrorOutlineRounded } from "@/components/svg";
import { Guests } from "@/components/layout/searchbar/searchbar";
import FieldTitle from "@/components/layout/searchbar/field-title";
import FieldContent from "@/components/layout/searchbar/field-content";
import { PropertyContext } from "@/pages/property/[id]";

const AvailabilityGuestField = ({className, glassEffect, setInnerFieldActive} 
    : {className?: string, glassEffect?:boolean, setInnerFieldActive: React.Dispatch<SetStateAction<boolean>>}) => {
    
    const { guests, setGuests, isAvailabilityError, setIsAvailabilityError, defaultGuests } = useContext(PropertyContext)!;
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const notLettingFieldEmpty = useCallback(() => {
        if(guests.adults === 0){
            setGuests(defaultGuests!);
        }
    },[guests, setGuests, defaultGuests])

    useEffect(() => {
        //Detect that if user click outside the component will close it
        function handleClickOutside(event : MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                setIsFocus(false);
                notLettingFieldEmpty();
            }
            if(!document.getElementById("availability-searchbar")!.contains(event.target as HTMLElement)){
                setInnerFieldActive(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[setInnerFieldActive, notLettingFieldEmpty])

    const addGuest = (keyword: string) => {
        if (keyword === "adults") {
            setGuests(prev => ({...prev, adults: prev.adults + 1}));
        }else if(keyword === "children"){
            if(guests.adults === 0){
                setGuests(prev => ({...prev, adults: prev.adults + 1, children: prev.children + 1}));
            }else{
                setGuests(prev => ({...prev, children: prev.children + 1}));
            }
        }else if(keyword === "pets"){
            if(guests.adults === 0){
                setGuests(prev => ({...prev, adults: prev.adults + 1, pets: prev.pets + 1}));
            }else{
                setGuests(prev => ({...prev, pets: prev.pets + 1}));
            }
        }
    }

    const cancelGuest = (keyword: string) => {
        if (keyword === "adults") {
            if(guests.adults > 1){
                setGuests(prev => ({...prev, adults: prev.adults - 1}));
            }else if(guests.adults === 1){
                setGuests({adults: 0, children: 0, pets: 0})
            }
        }else if(keyword === "children"){
            if(guests.children > 0){
                setGuests(prev => ({...prev, children: prev.children - 1}))
            }
        }else if(keyword === "pets"){
            if(guests.pets > 0){
                setGuests(prev => ({...prev, pets: prev.pets - 1}))
            }
        }
    }

    useEffect(() => {
        if(isFocus){
            setInnerFieldActive(true);
            setIsAvailabilityError(undefined);
        }
    },[isFocus, setInnerFieldActive, setIsAvailabilityError]);

    return (
        <>
        <div className={clsx(
            "h-full",
            className
        )} ref={ref}>
            <div 
            onClick={() => setIsFocus(!isFocus)}
            className={clsx(
                "flex flex-col px-8 py-2 h-full duration-200 hover:bg-[#ffffff85] hover:cursor-pointer",
                isFocus && "!bg-white elevation-shadow-2",
                "xs:rounded-2xl"
            )}>
                <FieldTitle>Guest</FieldTitle>
                <FieldContent>
                    <span className={clsx(
                        "inline-block py-1 lg:w-[135px] xs:w-full overflow-hidden text-ellipsis",
                        guests.adults === 0 && "text-textUnfocus"
                    )}>
                        {guests.adults > 0 ? <>{guests.adults + guests.children}&nbsp;guest(s)</> : <>Add guests</>}
                        {guests.pets > 0 && <>,&nbsp;{guests.pets}&nbsp;pet(s)</>}
                    </span>
                </FieldContent>
            </div>
            {(isAvailabilityError && isAvailabilityError.errorScrope === "guestField")&& 
            <div className="absolute top-full left-0 w-full bg-theme mt-3 p-3 rounded-lg text-white font-medium pointer-events-none select-none flex items-center text-sm">
                <span className="absolute bottom-full right-1/3 border-[8px] border-t-0 border-b-theme border-l-transparent border-r-transparent w-0 h-0"></span>
                <span className="mr-3 text-xl"><ErrorOutlineRounded/></span>
                <span>{isAvailabilityError!.message}</span>
            </div>
            }
            <div 
            onClick={() => setIsFocus(false)}
            className={clsx(
                "lg:hidden",
                isFocus && "xs:fixed xs:bottom-0 xs:left-0 xs:w-screen xs:h-screen bg-[#00000056] z-[15]"
            )}/>
            {isFocus &&
                <div className={clsx(
                    "bg-white mt-2 elevation-shadow-3",
                    "lg:absolute lg:top-full  lg:right-0 lg:bottom-[unset] lg:h-[auto] lg:w-fit lg:z-[5] lg:px-8 lg:py-6 lg:rounded-3xl",
                    "xs:fixed xs:bottom-0 xs:h-[50vh] xs:right-0 xs:w-full xs:z-[20] xs:px-[10%] xs:py-10 xs:rounded-t-3xl"
                )}>
                    <div className="w-full text-end mb-5 -mt-3 lg:hidden sm:block">
                        <button onClick={() => setIsFocus(false)} className="inline-block text-xl text-end border border-borderDefault p-2 rounded-full"><Close/></button>
                    </div>
                    <GuestFieldSection guest={guests} title="Adults" description="Ages 13 or above" keyword="adults"
                    minus={() => cancelGuest("adults")}
                    plus={() => addGuest("adults")}
                    />
                    <div className="h-[1px] w-full bg-borderDefault my-3"></div>
                    <GuestFieldSection guest={guests} title="Children" description="Ages 12 or below" keyword="children"
                    minus={() => cancelGuest("children")}
                    plus={() => addGuest("children")}
                    />
                    <div className="h-[1px] w-full bg-borderDefault my-3"></div>
                    <GuestFieldSection guest={guests} title="Pets" description="Cats, dogs, etc..." keyword="pets"
                    minus={() => cancelGuest("pets")}
                    plus={() => addGuest("pets")}
                    />
                </div>
                }
        </div>
        </>
    )
}

export default AvailabilityGuestField;

const GuestFieldSection = ({guest, minus, plus, keyword, title, description} : 
    {
        guest: Guests
        minus: Function,
        plus: Function,
        keyword: "adults" | "children" | "pets",
        title: string, 
        description: string,
    }) => {
    

    return (
        <>
            <div className="flex justify-between items-center py-3">
                <div className="mr-10">
                    <div className="font-medium">{title}</div>
                    <div className="text-sm text-textUnfocus">{description}</div>
                </div>
                <div className="grid grid-flow-col items-center gap-3">
                    <Minus onClick={() => minus()} />
                        <span className="w-[2rem] flex justify-center">{guest[keyword]}</span>
                    <Plus onClick={() => plus()}/>
                </div>
            </div>
        </>
    )
}