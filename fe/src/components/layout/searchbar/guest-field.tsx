import { SetStateAction, useEffect, useRef, useState } from "react";
import FieldContent from "./field-content";
import FieldTitle from "./field-title";
import { Guests } from "./searchbar";
import { Minus, Plus } from "@/components/button/calculation-button";
import clsx from "clsx";
import { Close } from "@/components/svg";

const GuestField = ({guest, setGuest, className, glassEffect, setInnerFieldActive} 
    : {guest: Guests, setGuest: (guest: Guests) => void, className?: string, glassEffect?:boolean, setInnerFieldActive: React.Dispatch<SetStateAction<boolean>>}) => {
    
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //Detect that if user click outside the component will close it
        function handleClickOutside(event : MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                setIsFocus(false);
            }
            if(!document.getElementById("searchbar")!.contains(event.target as HTMLElement)){
                setInnerFieldActive(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[setInnerFieldActive])

    const addGuest = (keyword: string) => {
        if (keyword === "adults") {
            setGuest({...guest, adults: guest.adults + 1});
        }else if(keyword === "children"){
            if(guest.adults === 0){
                setGuest({...guest, adults: guest.adults + 1, children: guest.children + 1});
            }else{
                setGuest({...guest, children: guest.children + 1});
            }
        }else if(keyword === "pets"){
            if(guest.adults === 0){
                setGuest({...guest, adults: guest.adults + 1, pets: guest.pets + 1});
            }else{
                setGuest({...guest, pets: guest.pets + 1});
            }
        }
    }

    const cancelGuest = (keyword: string) => {
        if (keyword === "adults") {
            if(guest.adults > 1){
                setGuest({...guest, adults: guest.adults - 1});
            }else if(guest.adults === 1){
                setGuest({adults: 0, children: 0, pets: 0})
            }
        }else if(keyword === "children"){
            if(guest.children > 0){
                setGuest({...guest, children: guest.children - 1})
            }
        }else if(keyword === "pets"){
            if(guest.pets > 0){
                setGuest({...guest, pets: guest.pets - 1})
            }
        }
    }

    useEffect(() => {
        if(isFocus){
            setInnerFieldActive(true);
        }
    },[isFocus, setInnerFieldActive]);

    return (
        <>
        <div className={clsx(
            "h-full",
            className
        )} ref={ref}>
            <div 
            onClick={() => setIsFocus(!isFocus)}
            className={clsx(
                "flex flex-col lg:px-8 xs:px-4 py-2 h-full duration-200 hover:bg-[#ffffff85] hover:cursor-pointer",
                isFocus && "!bg-white elevation-shadow-2",
                "lg:rounded-full",
                "xs:rounded-3xl"
            )}>
                <FieldTitle>Guest</FieldTitle>
                <FieldContent>
                    <span className={clsx(
                        "inline-block py-1 lg:w-[135px] xs:w-full whitespace-nowrap overflow-hidden text-ellipsis",
                        guest.adults === 0 && "text-textUnfocus"
                    )}>
                        {guest.adults > 0 
                        ? <span>{guest.adults + guest.children}&nbsp;guest(s){guest.pets > 0 && <>,&nbsp;{guest.pets}&nbsp;pets</>}</span> 
                        : <span>Add guests</span>}

                    </span>
                </FieldContent>
            </div>
            <div 
            onClick={() => setIsFocus(false)}
            className={clsx(
                "lg:hidden",
                isFocus && "xs:fixed xs:bottom-0 xs:left-0 xs:w-screen xs:h-screen bg-[#00000056] z-[15]"
            )}/>
            {isFocus &&
                <div className={clsx(
                    "bg-white mt-2 elevation-shadow-3 p-3",
                    "lg:absolute lg:top-full  lg:right-0 lg:bottom-[unset] lg:h-[auto] lg:w-[50%] lg:z-[5] lg:px-8 lg:py-6 lg:rounded-3xl",
                    "xs:fixed xs:bottom-0 xs:h-[50vh] xs:right-0 xs:w-full xs:z-[20] xs:px-[10%] xs:py-10 xs:rounded-t-3xl"
                )}>
                    <div className="w-full text-end mb-5">
                        <button onClick={() => setIsFocus(false)} className="inline-block text-xl text-end border border-borderDefault p-2 rounded-full"><Close/></button>
                    </div>
                    <GuestFieldSection guest={guest} title="Adults" description="Ages 13 or above" keyword="adults"
                    minus={() => cancelGuest("adults")}
                    plus={() => addGuest("adults")}
                    />
                    <div className="h-[1px] w-full bg-borderDefault my-3"></div>
                    <GuestFieldSection guest={guest} title="Children" description="Ages 12 or below" keyword="children"
                    minus={() => cancelGuest("children")}
                    plus={() => addGuest("children")}
                    />
                    <div className="h-[1px] w-full bg-borderDefault my-3"></div>
                    <GuestFieldSection guest={guest} title="Pets" description="Cats, dogs, etc..." keyword="pets"
                    minus={() => cancelGuest("pets")}
                    plus={() => addGuest("pets")}
                    />
                </div>
                }
        </div>
        </>
    )
}

export default GuestField;

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