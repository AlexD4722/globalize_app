import clsx from "clsx";
import { useState } from "react";

import AvailabilityDateField from "./availability-date-field";
import AvailabilityGuestField from "./availability-guest-field";


export default function AvailabilitySearch ({onSearchClick} 
    : {onSearchClick: React.MouseEventHandler<HTMLButtonElement>}) {

    const [innerFieldActive, setInnerFieldActive] = useState<boolean>(false);

    return (
        <>
         <div id={"availability-searchbar"} className="relative group">
            <div className={clsx(
                "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none border elevation-shadow-1",
                "xs:rounded-2xl"
            )}>
                <div className={clsx("absolute top-0 left-0 w-full h-full", (innerFieldActive ? "bg-[#e9e9e9]" : "bg-white"))}></div>
            </div>
            <div className={clsx(
                "relative items-center text-black",
                "lg:grid-flow-col lg:grid-cols-[unset] lg:gap-1 lg:p-1",
                "xs:grid xs:grid-cols-2 xs:gap-2 xs:p-2"
            )}>
                <AvailabilityDateField className={clsx(
                    "lg:col-auto lg:row-auto",
                    "xs:col-[1/-1] xs:row-[2/2]"
                )} 
                setInnerFieldActive={setInnerFieldActive}/>
                <AvailabilityGuestField  className={clsx(
                    "lg:col-auto lg:row-auto",
                    "xs:col-[1/-1] xs:row-[1/1]"
                )} 
                setInnerFieldActive={setInnerFieldActive}/>
                <div className={clsx(
                    "lg:mx-4 lg:col-auto lg:row-auto",
                    "xs:mx-4 xs:col-[1/-1] xs:row-[3/3]"
                )}>
                      <button 
                       className={clsx(
                        "bg-theme text-white px-4 py-3 flex items-center leading-[1.5]",
                        "lg:col-auto lg:row-auto",
                        "xs:rounded-xl xs:w-full xs:col-[1/-1] xs:row-[3/3]"
                        )}
                        onClick={onSearchClick}>
                       <span>Apply Change</span>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}