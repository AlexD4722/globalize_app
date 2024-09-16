import { SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { DateRange, DayPicker } from "react-day-picker";
import clsx from "clsx";
import Button from "@/components/button/classic-button";
import { Close, ErrorOutlineRounded } from "@/components/svg";
import FieldTitle from "@/components/layout/searchbar/field-title";
import FieldContent from "@/components/layout/searchbar/field-content";
import { initialRange } from "@/components/layout/searchbar/searchbar";
import { PropertyContext } from "@/pages/property/[id]";

const AvailabilityDateField = ({className, glassEffect, setInnerFieldActive} 
    : {
        className?:string, glassEffect?:boolean, 
        setInnerFieldActive: React.Dispatch<SetStateAction<boolean>> 
    }) => {
    
    const { range, setRange, isAvailabilityError, setIsAvailabilityError, defaultRange } = useContext(PropertyContext)!;
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const notLettingFieldEmpty = useCallback(() => {
        if(!range || !range.from || !range.to){
            setRange(defaultRange);
        }
    },[defaultRange, setRange, range])

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
                "h-full hover:cursor-pointer hover:bg-[#ffffff85] duration-150",
                isFocus && "!bg-white elevation-shadow-2",
                "lg:flex",
                "xs:rounded-2xl xs:grid xs:grid-cols-2 xs:w-full"
            )}>
                <div className="flex flex-col pl-8 pr-4 py-2">
                    <FieldTitle>Check-in</FieldTitle>
                    <FieldContent>
                        <span className={clsx(
                            "inline-block py-1 lg:min-w-[85px] lg:max-w-[100px] xs:overflow-hidden xs:whitespace-nowrap xs:text-ellipsis",
                            !(range && range.from) && "text-textUnfocus"
                        )}>{(range && range.from) ? range.from.toLocaleDateString() : "Add Dates"}</span>

                    </FieldContent>
                </div>
                <div className="flex flex-col pr-8 lg:pl-4 xs:pl-8 py-2">
                    <FieldTitle>Check-out</FieldTitle>
                    <FieldContent>
                        <span  className={clsx(
                            "inline-block py-1 lg:min-w-[85px] lg:max-w-[100px] xs:overflow-hidden xs:whitespace-nowrap xs:text-ellipsis",
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
            {(isAvailabilityError && isAvailabilityError.errorScrope === "dateField")&& 
            <div className="absolute top-full left-0 w-full bg-theme mt-3 p-3 rounded-lg text-white font-medium pointer-events-none select-none flex items-center text-sm">
                <span className="absolute bottom-full left-6 border-[8px] border-t-0 border-b-theme border-l-transparent border-r-transparent w-0 h-0"></span>
                <span className="mr-3 text-xl"><ErrorOutlineRounded/></span>
                <span>{isAvailabilityError!.message}</span>
            </div>
            }
            {isFocus && 
            <div
            className={clsx(
                "bg-white mt-2 elevation-shadow-3 p-3",
                "lg:absolute lg:top-full lg:right-0 lg:bottom-[unset] lg:h-[auto] lg:w-fit lg:z-[5] lg:rounded-3xl",
                "xs:fixed xs:bottom-0 xs:h-[80vh] xs:left-0 xs:w-full xs:z-[20] xs:py-10 xs:rounded-t-3xl xs:overflow-auto"
            )}>
                <div className="w-full text-end mb-5  -mt-3 lg:hidden sm:block">
                    <button onClick={() => setIsFocus(false)} className="inline-block mx-10 text-xl text-end border border-borderDefault p-2 rounded-full"><Close/></button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Range range={range} setRange={setRange}/>
                    <div className={clsx(
                        "mt-3 bg-white",
                        "lg:relative lg:px-10 lg:py-0 lg:w-full lg:mx-[0] lg:border-0 lg:block",
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

const disabledDate = [
    new Date("2024-08-30"),
    new Date("2024-08-08"),
]



export function Range({range, setRange} : {range: DateRange | undefined, setRange: React.Dispatch<SetStateAction<DateRange | undefined>>}) {
 
    const today = useMemo(() => (new Date()),[]);
    const [datePickerMonths, setDatePickerMonths] = useState<number>(2);
    const [disableNavigation, setDisableNavigation] = useState<boolean>(false);
    const [toDate, setToDate] = useState<Date | undefined>(undefined);
    const [fromDate, setFromDate] = useState<Date | undefined>(today);

    useEffect(() => {
        const mediaWatcher = window.matchMedia("(min-width: 1024px)");
       
        const resonsiveCalendar = () => {
            if(window.matchMedia("(min-width: 1024px)").matches){
                setDatePickerMonths(2);
                setDisableNavigation(false);
            }else{
                setDatePickerMonths(5);
                setDisableNavigation(true);
            }
        }

        resonsiveCalendar();
        mediaWatcher.addEventListener('change', resonsiveCalendar)
        
        // clean up after ourselves
        return function cleanup() {
        mediaWatcher.removeEventListener('change', resonsiveCalendar)
        }
    },[])

    useEffect(() => {
        //DayPicker library lacks of props/feature for business specific usecase
        //This code below use already provided function from DayPicker to handle booking date-range logics (checkin-checkout range) if there are blocked dates
        if(range && range.from){
            const nearestBlockedDateBehindCheckin = disabledDate.sort((a,b) => a.getTime()- b.getTime()).map((date) => {
                if(date.getTime() > range.from!.getTime()){
                    return date;
                }
            }).filter(item => item)[0];

            const nearestBlockedDateInfrontCheckin = disabledDate.sort((a,b) => b.getTime()- a.getTime()).map((date) => {
                if(date.getTime() < range.from!.getTime()){
                    return date;
                }
            }).filter(item => item)[0];
            
            setFromDate(nearestBlockedDateInfrontCheckin === undefined ? new Date() : nearestBlockedDateInfrontCheckin);
            setToDate(nearestBlockedDateBehindCheckin);
        }else{
            setFromDate(new Date());
            setToDate(undefined);
        }
    },[range])

    return ( 
        <DayPicker pagedNavigation
        mode="range" selected={range} onSelect={setRange}
        numberOfMonths={datePickerMonths}    
        fromDate={fromDate}
        toDate={toDate}
        disabled={disabledDate}
        disableNavigation={disableNavigation}
        /> 
    );
}

export default AvailabilityDateField;