import Button from "@/components/button/classic-button";
import clsx from "clsx";
import Image from "next/image";
import { Minus, Plus } from "@/components/button/calculation-button";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { ChevronRight, Person } from "@/components/svg";
import { iRoom, iReservationInfo, iReservedRoom, iReservationRoomsInfo } from "@/components/type";
import { PropertyContext } from "@/pages/property/[id]";
import { DayCounterBetweenDateRange } from "@/function/day-counter";
import { JAVA_URL } from "@/settings/fe_config";


const ReservationTable = ({rooms} : {rooms: Array<iRoom>}) => {

    const { register, handleSubmit, watch, getValues, setValue } = useForm({});
    const [formError, setFormError] = useState<string>("");
    const [currentReserve, setCurrentReserve] = useState<Array<iReservedRoom>>([]);
    const [DetailedReserve, setDetailedReserve] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalRooms, setTotalRoom] = useState<number>(0);
    const roomWithPrice = useRef<Array<any>>([]);
    const { guests, range, onReserveRooms } = useContext(PropertyContext)!;

    const onSubmit = async (data: any) => { 
        console.log(data);

        if(totalRooms > 0){
            //Handle reservation
            let reservationRoomsInfo : iReservationRoomsInfo = {
                summary: {
                    totalRooms: totalRooms,
                    totalPricePerNight: totalPrice,
                },
                details: currentReserve
            }

            onReserveRooms(reservationRoomsInfo);
        }
    };

    useEffect(() => {

        //Listen for room amount change in react-hook-form and update (Summary / Details) data
        const subscription  = watch((value) => {
            let reservedRoom : Array<iReservedRoom> = [];
            let currentTotalPrice = 0;
            let currentTotalRooms = 0;

            for (const property in value) {
                if(value[property] > 0){
                    const name = rooms.find((room) => room.id === property)!.name
                    const price = rooms.find((room) => room.id === property)!.price
                    const bedroom = rooms.find((room) => room.id === property)!.bedroom
                    const maxGuests = rooms.find((room) => room.id === property)!.maxGuest
                    const image = rooms.find((room) => room.id === property)!.picture

                    reservedRoom.push({
                        roomId: property,
                        roomName: name,
                        roomAmount: value[property],
                        roomFeaturedImage: image,
                        pricePerRoom: price,
                        bedroom: bedroom,
                        maxGuests: maxGuests
                    })

                    currentTotalPrice = currentTotalPrice + (price * value[property]);
                    currentTotalRooms = currentTotalRooms + value[property];
                   
                }
            }

            setTotalPrice(currentTotalPrice);
            setTotalRoom(currentTotalRooms);
            setCurrentReserve(reservedRoom);
        });

        console.log(currentReserve);

        return () => subscription.unsubscribe();

    },[getValues, roomWithPrice, currentReserve, watch, totalPrice, totalRooms, rooms])

    //Display error, and reset (Details) rooms n price
    useEffect(() => {
        if(totalRooms === 0){
            setDetailedReserve(false);
            setFormError("Room amount must bigger than 0.")
        }else if(totalRooms > 0){
            setFormError("");
        }
    },[totalRooms])


    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <table className="mt-10 table-auto w-full text-left">
                <thead>
                    <tr className="sticky top-[85px] h-[65px] bg-[#f0f0f0] lg:table-row xs:hidden [&>th]:border [&>th]:border-borderDefault [&>th]:px-4 [&>th]:text-lg [&>th]:font-medium">
                        <th>Room</th>
                        <th>Guests</th>
                        <th>Price/room/night</th>
                        <th>Rooms</th>
                        <th>&nbsp;</th>
                    </tr>   
                </thead>
                {rooms && 
                <tbody>
                    {rooms.map((room, index) => (
                        <tr key={room.id} className={clsx(
                            "lg:[&>td]:border lg:[&>td]:border-borderDefault [&>td]:py-5 [&>td]:px-4 [&>td]:align-top",
                            "lg:table-row lg:border-none lg:px-0",
                            "xs:grid xs:grid-cols-1 xs:border xs:border-borderDefault xs:px-3"
                        )}>
                            <td>
                                <div className="text-2xl lg:mt-0 xs:mt-2 mb-2.5 font-medium">{room.name}</div>
                                <div className="text-sm mb-5 border border-borderDefault rounded-2xl px-3 py-1 w-fit text-theme font-medium">{room.type}</div>
                                <div>
                                    <Image
                                    src={`${JAVA_URL}/${room.picture}`}
                                    alt={room.name}
                                    width={50}
                                    height={50}
                                    className="w-full h-auto lg:max-w-[350px] aspect-video rounded-lg"
                                    />
                                </div>
                                <div className="mt-3">
                                    <div className="text-xl font-medium mb-2">Room Information:</div>
                                    <div className="lg:hidden xs:flex items-center text-lg mb-1"><span className="mr-2 text-xl"><Person/></span>{room.maxGuest} guest(s)</div>
                                    {/* <div className="text-lg flex flex-col pl-1">
                                        {room.bedroom.map((bedroom) => (
                                            <span key={bedroom.bed_type}>{bedroom.quantity} {bedroom.bed_type} Bed</span>
                                        ))}
                                    </div> */}
                                    <div className="mt-3 text-textUnfocus">View all amentities...</div>
                                </div>
                            </td>
                            <td className="lg:table-cell xs:hidden">
                                <div>
                                    <span className="flex items-center"><Person/> <span>x {room.maxGuest}</span></span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className="lg:hidden xs:block text-xl font-medium mb-2">Price:</div>
                                    <div className="lg:text-2xl xs:text-xl font-medium">${room.price}<span className="lg:hidden xs:inline-block text-textUnfocus">&nbsp;/room/night</span></div>
                                    <div>(include taxes & fees)</div>
                                </div>
                            </td>
                            <td>
                                <div className="flex flex-col justify-between items-start">
                                    <div className="lg:hidden xs:block text-xl font-medium mb-3">Select amount:</div>
                                    <div className="grid grid-flow-col items-center gap-2 text-base">
                                        <Minus type="button" onClick={() => {setValue(room.id, getValues(room.id) > 0 ? getValues(room.id) - 1 : getValues(room.id))}} />
                                            <input type="number" className="w-[2rem] flex justify-center text-center" 
                                                {...register(room.id, {value: 0})}/>
                                        <Plus type="button" onClick={() => {setValue(room.id, getValues(room.id) < (room.available ? room.available : 1) ? getValues(room.id) + 1 : getValues(room.id))}}/>
                                    </div>
                                    <div className="mt-3 text-textUnfocus">{room.available ? room.available : 1} room(s) available.</div>
                                </div>
                            </td>
                            {index === 0 && 
                            <td rowSpan={rooms.length} className="w-[30%] lg:table-cell xs:hidden">
                                <div className="sticky top-[165px]">
                                    <div className="px-4"><Button type="submit" className="w-full" rounded={'regular'}>Reserve</Button></div>
                                    {/** Room must > 0 */}
                                    {formError && <div className="text-red-500 px-4 py-2">{formError}</div>}
                                    {/** Summary current room amount and total price */}
                                    {totalRooms > 0 && 
                                    <div className="mt-5 px-4">
                                        <div>Summary:</div>
                                        <div>
                                            <div><span className="font-medium">{totalRooms}</span> room(s) for <span className="font-medium">${totalPrice}</span></div>
                                        </div>
                                        <div className={clsx('mt-3 flex items-center hover:text-theme hover:cursor-pointer', DetailedReserve ? "" : "text-textUnfocus")} 
                                        onClick={() => {setDetailedReserve(!DetailedReserve)}}>View details... <span className={clsx(DetailedReserve && "rotate-90")}><ChevronRight/></span></div>
                                    </div>
                                    }
                                    {/** Details each room type amount and it's total price */}
                                    {(currentReserve.length > 0 && DetailedReserve) && 
                                    <div className="mt-2 px-4">
                                        {/* <div>Details:</div> */}
                                        <div>
                                            {currentReserve.map((room) => {
                                                if(room.roomAmount > 0){
                                                    return (
                                                        <div key={room.roomName} className="mt-1">
                                                            <div>x {room.roomAmount} <span className="font-medium">{room.roomName}</span> for <span className="font-medium">${room.pricePerRoom * room.roomAmount}</span></div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                    }
                                </div>
                            </td>
                            }
                        </tr>
                    ))}
                    <tr className="lg:hidden xs:block border border-borderDefault sticky bottom-0 bg-[#f0f0f0] w-full px-3">
                        <td rowSpan={rooms.length} className="px-4 grid grid-cols-2 items-start justify-between">
                            <div className="py-2"><Button type="submit" className="w-fit" rounded={'regular'}>Reserve</Button></div>  
                            {formError && <div className="text-red-500 py-2 leading-[1.25] text-sm">{formError}</div>}
                            {totalRooms > 0 &&  
                            <div className="py-2 lg:hidden xs:block">
                                <div className="text-sm">Summary:</div>
                                <div>
                                    <div><span className="font-medium">{totalRooms}</span> room(s) for <span className="font-medium">${totalPrice}</span></div>
                                </div>
                            </div>
                            }
                        </td>
                    </tr>
                </tbody>
                }
            </table>
        </form>
        </>
    )
}

export default ReservationTable;