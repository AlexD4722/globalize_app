import AvailabilitySearchbar from "./availability-searchbar";
import ReservationTable from "./reservation-table";
import { useContext, useState } from "react";
import { iRoom } from "@/components/type";
import { PropertyContext } from "@/pages/property/[id]";

interface AvailabilitySectionProps {
    id: string,
    name: string,
    address: string,
    averageRating: number,
    totalReviews: number,
    propertyRooms: Array<iRoom>
  
}


export default function AvailabilitySection ({...props} : AvailabilitySectionProps) {

    const { id, name } = props;

    const { onApplyChange, currentRooms } = useContext(PropertyContext)!;

    return (
        <>
        <div id={'availability-section'} className="mt-16">
            <div className="text-3xl font-medium">Availabity</div>
            <div className="lg:w-fit xs:w-full mt-5">
                <AvailabilitySearchbar onSearchClick={onApplyChange}/>
            </div>
            <div className="mt-10">
                <div className="text-2xl font-medium">Available Rooms in {name}</div>
                <ReservationTable rooms={currentRooms} />
            </div>
        </div>
        </>
    )
}
