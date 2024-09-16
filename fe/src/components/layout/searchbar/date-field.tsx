import { SetStateAction, useEffect, useRef, useState } from "react";
import FieldContent from "./field-content";
import FieldTitle from "./field-title";
import { DateRange, DayPicker } from "react-day-picker";
import clsx from "clsx";
import Button from "@/components/button/classic-button";
import { initialRange } from "./searchbar";
import { Close } from "@/components/svg";


const DateField = ({range, setRange, className, glassEffect, setInnerFieldActive} 
    : {
        range: DateRange | undefined, 
        setRange: (range: DateRange | undefined) => void, 
        className?:string, glassEffect?:boolean, 
        setInnerFieldActive: React.Dispatch<SetStateAction<boolean>> 
    }) => {
    
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
                "h-full hover:cursor-pointer hover:bg-[#ffffff85] duration-150",
                isFocus && "!bg-white elevation-shadow-2",
                "lg:rounded-full lg:flex",
                "xs:rounded-3xl xs:grid xs:grid-cols-2 xs:w-full"
            )}>
                <div className="flex flex-col lg:pl-8 xs:pl-4 lg:pr-4 xs:pr-2 py-2">
                    <FieldTitle>Check-in</FieldTitle>
                    <FieldContent>
                        <span className={clsx(
                            "inline-block py-1 lg:min-w-[85px] xs:overflow-hidden xs:whitespace-nowrap xs:text-ellipsis",
                            !(range && range.from) && "text-textUnfocus"
                        )}>{(range && range.from) ? range.from.toLocaleDateString() : "Add Dates"}</span>

                    </FieldContent>
                </div>
                <div className="flex flex-col lg:pr-8 xs:pr-4 lg:pl-4 xs:pl-2 py-2">
                    <FieldTitle>Check-out</FieldTitle>
                    <FieldContent>
                        <span  className={clsx(
                            "inline-block py-1 lg:min-w-[85px] xs:overflow-hidden xs:whitespace-nowrap xs:text-ellipsis",
                            !(range && range.to) && "text-textUnfocus"
                        )}>{(range && range.to) ? range.to?.toLocaleDateString() : "Add Dates"}</span>
                    </FieldContent>
                </div>
            </div>
            <div 
            onClick={() => setIsFocus(false)}
            className={clsx(
                "lg:hidden",
                isFocus && "xs:fixed xs:bottom-0 xs:left-0 xs:w-screen xs:h-screen bg-[#00000056] z-[15]"
            )}/>
            {isFocus && 
            <div
            className={clsx(
                "bg-white mt-2 elevation-shadow-3 p-3",
                "lg:absolute lg:top-full lg:right-0 lg:bottom-[unset] lg:h-[auto] lg:w-full lg:z-[5] lg:py-6 lg:rounded-3xl",
                "xs:fixed xs:bottom-0 xs:h-[80vh] xs:left-0 xs:w-full xs:z-[20] xs:py-10 xs:rounded-t-3xl xs:overflow-auto"
            )}>
                <div className="w-full text-end mb-5 mt-3">
                    <button onClick={() => setIsFocus(false)} className="inline-block mx-10 text-xl text-end border border-borderDefault p-2 rounded-full"><Close/></button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Range range={range} setRange={setRange}/>
                    <div className={clsx(
                        "mt-3 bg-white",
                        "lg:relative lg:px-5 lg:py-0 lg:w-full lg:mx-[0] lg:border-0 lg:block",
                        "xs:px-[10%] xs:w-full xs:py-5 xs:fixed xs:bottom-0 xs:left-0 xs:border xs:border-t-borderDefault xs:flex xs:justify-end"
                    )}>
                        <Button type="button" intent={"secondary"} className="lg:w-full xs:w-auto" onClick={() => {setRange(initialRange)}}>Reset</Button>
                        <Button type="button" intent={"secondary"} className="lg:w-full xs:w-auto lg:hidden xs:inline-block ml-3" onClick={() => setIsFocus(false)}>Close</Button>
                    </div>
                </div>
            </div>
            }
        </div>
        </>
    )
}

export function Range({range, setRange} : {range: DateRange | undefined, setRange: (range: DateRange | undefined) => void}) {
 

    const [datePickerMonths, setDatePickerMonths] = useState<number>(2);
    const [disableNavigation, setDisableNavigation] = useState<boolean>(false);

    useEffect(() => {
        const mediaWatcher = window.matchMedia("(min-width: 1024px)");
       
        const responsiveCalendar = () => {
            if(window.matchMedia("(min-width: 1024px)").matches){
                setDatePickerMonths(2);
                setDisableNavigation(false);
            }else{
                setDatePickerMonths(5);
                setDisableNavigation(true);
            }
        }

        responsiveCalendar();
        
        mediaWatcher.addEventListener('change', responsiveCalendar)
        
        // clean up after ourselves
        return function cleanup() {
        mediaWatcher.removeEventListener('change', responsiveCalendar)
        }
    },[])

    return ( 
        <DayPicker pagedNavigation
        mode="range" selected={range} onSelect={setRange}
        numberOfMonths={datePickerMonths}    
        fromDate={new Date()}
        disableNavigation={disableNavigation}
        /> 
    );
}

export default DateField;