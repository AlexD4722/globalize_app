import { HTMLAttributes } from "react";
import CarouselSingleProduct, { SlideSingleProduct } from "../carousel/carousel_single_view";
import Image from "next/image";
import { PrevButton } from "../button/arrow-button";
import clsx from "clsx";
import { StarRate } from "../svg";

//Attribute image should have
type iImage = {
    id: number,
    name: string,
    image: string
}

//as the name said, props of the top comp of property card
type PropertyCardTopProps = {
    images: Array<iImage>,
    isFavorite: boolean
}

//as the name said, props of the bottom comp of property card
type PropertyCardBottomProps = {
    pid: number,
    rate: number,
    address: string,
    name: string,
    price: string,

}

//Contains both needed props from top and bottom comps
interface PropertyCardProps extends PropertyCardTopProps, PropertyCardBottomProps, HTMLAttributes<HTMLDivElement> {};


export default function PropertyCard ({...props} : PropertyCardProps) {

    const { images, pid, rate, name, address, price, isFavorite, className, ...restProp } = props;

    return ( 
        <>
        <div className={clsx("flex flex-col h-full", className)} {...restProp}>
            <PropertyCardTop isFavorite={isFavorite} images={images}/>
            <PropertyCardBottom pid={pid} name={name} rate={rate} address={address} price={price}/>
        </div>
        </>
    )
}

const PropertyCardTop = ({images, isFavorite} : PropertyCardTopProps) => {
    return ( 
        <>
        <div className="relative rounded-2xl overflow-hidden">
            {isFavorite && 
                <div className='absolute top-3 left-3 bg-white px-2 py-1 rounded-full elevation-shadow-1 text-sm font-medium z-10'>Guest Farvorite</div>
            }

            <CarouselSingleProduct options={{watchDrag: false}}>
                {images.map((product, index) => (
                    <SlideSingleProduct key={index}>
                        <div 
                        className={clsx(
                            "flex items-center justify-center",
                        )}>
                        <Image 
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover aspect-square" />
                    </div>
                    </SlideSingleProduct>
                ))}
            </CarouselSingleProduct>     
        </div>
        </>
    )
}

const PropertyCardBottom = ({...props} : PropertyCardBottomProps) => {
    
    const {pid, rate, name, address, price} = props;

    return ( 
        <>
        <div className="mt-3 flex flex-col flex-grow">
            <div className="flex justify-between items-center">
                <div className="text-textUnfocus whitespace-nowrap overflow-hidden text-ellipsis">{address}</div>
                <div className="grid grid-flow-col items-center gap-1 ml-3">
                    <span><StarRate/></span>
                    <span className="font-medium">{rate}</span>
                </div>
            </div>
            <div className="py-1 text-lg font-medium line-clamp-2 leading-[1.25] text-ellipsis">{name}</div>
            <div className="mt-auto"> 
                <span>{price}</span>
                <span className="text-textUnfocus">&nbsp;per night</span>
            </div>
        </div>
        </>
    )
}