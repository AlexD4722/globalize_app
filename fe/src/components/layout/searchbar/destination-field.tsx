import { SetStateAction, useEffect, useRef, useState } from "react";
import FieldContent from "./field-content";
import FieldTitle from "./field-title";
import clsx from "clsx";
import { ErrorOutlineRounded } from "@/components/svg";

type DestinationField = {
    className?: string, 
    glassEffect?: boolean, 
    setInnerFieldActive: React.Dispatch<SetStateAction<boolean>>,
    destination: string, 
    setDestination: (destination: string) => void,
    setIsFocus: React.Dispatch<SetStateAction<boolean>>,
    isFocus: boolean,
    isError: string,
    setIsError: React.Dispatch<SetStateAction<string>>,

}

const DestinationField = ({className, glassEffect, setIsError, isError, isFocus, setIsFocus, setInnerFieldActive, destination, setDestination} : DestinationField) => {

    const ref = useRef<HTMLDivElement>(null);

    const focusInput = () => {
        setIsFocus(true);
        document.getElementById("destination")?.focus();
    }

    useEffect(() => {
        //Detect that if user click outside the component will close it
        function handleClickOutside(event : MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                setIsFocus(false);
                setIsError("");
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
    },[setInnerFieldActive, setIsFocus, setIsError])

    useEffect(() => {
        if(isFocus){
            setInnerFieldActive(true);
            setIsError("");
        }
    },[isFocus, setInnerFieldActive, setIsError]);

    return (
        <>
        <div ref={ref} onClick={focusInput} className={clsx(
            "xl:relative xs:static flex flex-col lg:px-8 xs:px-4 py-2 border border-transparent h-full duration-200 hover:bg-[#ffffff85] w-full",
            isFocus && "!bg-white elevation-shadow-2",
            "lg:rounded-full",
            "xs:rounded-3xl",
            className
        )}>
            <FieldTitle>Destination</FieldTitle>
            <FieldContent>
                <div className="relative">
                    <input id={"destination"} className="peer bg-transparent py-1 outline-none placeholder:text-transparent w-full" type="text" placeholder="..." autoComplete="off"
                    value={destination} onChange={(e) => {setDestination(e.currentTarget.value)}} />
                    <label className="absolute top-0 left-0 py-1 h-full w-full hidden peer-placeholder-shown:block pointer-events-none select-none text-textUnfocus" >Destination</label>
                </div>
            </FieldContent>

            {isError && 
            <div className="absolute top-full left-0 w-full bg-theme mt-3 p-3 rounded-lg text-white font-medium pointer-events-none select-none flex items-center text-sm">
                <span className="absolute bottom-full left-6 border-[8px] border-t-0 border-b-theme border-l-transparent border-r-transparent w-0 h-0"></span>
                <span className="mr-3 text-xl"><ErrorOutlineRounded/></span>
                <span>{isError}</span>
            </div>
            }
        </div>
        </>
    )
}

export default DestinationField;