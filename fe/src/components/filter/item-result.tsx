import React from 'react'
import { ItemResultFilter } from '../type'
import Image from 'next/image'
import { ArrowRightShortIcon, GeoAltFill, StarFillIcon } from '../svg'
import Link from 'next/link'
import { useRouter } from 'next/router'
type ItemResultSearchProps = {
    item: ItemResultFilter
}

const ItemResultSearch: React.FC<ItemResultSearchProps> = (props) => {

    const queryString = useRouter().asPath.substring(7)

    return (
        <>
            <div className="relative my-5 grid lg:grid-cols-[80%_20%] xs:grid-cols-1 w-full border border-[#D3D3D3] rounded-md overflow-hidden text-clip">
                <div className="md:flex p-4 lg:border-r lg:border-b-0 lg:border-r-[#D3D3D3] xs:border-b xs:border-b-[#D3D3D3] xs:block">
                    <div className="block relative lg:w-[13rem] md:w-[9rem] xs:w-[100%] h-max ">
                        <Image
                            src={props.item.img}
                            alt="capacity"
                            width={300}
                            height={300}
                            className=" top-0 left-0 bottom-0 right-0 w-full h-full aspect-square rounded-md object-cover "
                            priority
                        />
                    </div>
                    <div className="md:px-3 md:my-0 xs:p-0 xs:my-3  w-[calc(100%-13rem)] md:w-[calc(100%-9rem)] xs:w-[100%]  overflow-hidden">
                        <div className="w-full overflow-hidden">
                            <h5 className="font-normal text-[1.375rem] text-ellipsis overflow-hidden whitespace-nowrap">
                                {props.item.name}
                            </h5>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div className="text-[#f43f5e]">
                                    <GeoAltFill />
                                </div>
                                <p className="font-normal text-[1rem] text-ellipsis overflow-hidden whitespace-nowrap">
                                    {props.item.address}
                                </p>
                            </div>
                        </div>
                        {/* <div className="w-full overflow-hidden mt-8">
              <h5 className="font-normal text-[1rem] text-ellipsis overflow-hidden whitespace-nowrap">
                {props.item.room}
              </h5>
              <p className="font-normal text-[0.75rem] text-ellipsis overflow-hidden whitespace-nowrap">
                {props.item.bed}
              </p>
            </div> */}
                    </div>
                </div>
                <div className="block overflow-hidden p-4">
                    <div className="flex items-center gap-2">
                        <div>
                            <StarFillIcon />
                        </div>
                        <span>{props.item.rating}</span>
                    </div>
                    <div className="overflow-hidden">
                        <div className="w-full overflow-hidden">
                            <p className="font-normal text-[1rem] text-ellipsis overflow-hidden whitespace-nowrap">
                                {props.item.rating > 9 ? (
                                    <span>Excellent</span>
                                ) : props.item.rating > 8 ? (
                                    <span>Very good</span>
                                ) : props.item.rating > 7 ? (
                                    <span>Good</span>
                                ) : props.item.rating > 6 ? (
                                    <span>Pleasant 6+</span>
                                ) : props.item.rating > 5 ? (
                                    <span>Pleasant 5+</span>
                                ) : (
                                    <span>Pleasant 5-</span>
                                )}
                            </p>
                            <p className="font-normal text-[0.75rem] text-[#7B7B7B] text-ellipsis overflow-hidden whitespace-nowrap">
                                {props.item.review} reviews
                            </p>
                        </div>
                        <div className="w-full overflow-hidden mt-4">
                            {/* <p className="font-normal text-[0.75rem] text-[#7B7B7B] text-ellipsis overflow-hidden whitespace-nowrap">
                {props.item.capacity}
              </p> */}
                            <h5 className="font-normal text-[1rem] text-ellipsis overflow-hidden whitespace-nowrap">
                                $USD {props.item.price}
                            </h5>
                            {/* <p className="font-normal text-[0.75rem] text-[#7B7B7B] text-ellipsis overflow-hidden whitespace-nowrap">
                +US ${props.item.tax} taxes and charges
              </p> */}
                            <Link href={`/property/${props.item.id}${queryString}`} className="block w-full max-h-max mt-8">
                                <button
                                    type="button"
                                    className="p-2 w-full bg-[#F43F5E] rounded-md"
                                >
                                    <div className="flex items-center justify-between">
                                        
                                            <p className="font-normal text-[0.75rem] text-[#FFFF] text-ellipsis overflow-hidden whitespace-nowrap">
                                                Select
                                            </p>
                                        
                                        <div className="text-[#FFFF]">
                                            <ArrowRightShortIcon />
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ItemResultSearch
