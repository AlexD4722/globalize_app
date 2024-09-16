import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Close } from "../svg";
import Image from "next/image";
import CarouselThumbs from "../carousel/carousel_thumbs";
import clsx from "clsx";
import { JAVA_URL } from "@/settings/fe_config";

export interface Gallery {
    name: string,
    galleryState: boolean,
    setGalleryState: Dispatch<SetStateAction<boolean>>
    images: string[]
}

export default function Gallery({...props} : Gallery) {

    const { name, galleryState, setGalleryState, images } = props;
    const [focusMode, setFocusMode] = useState<{active: boolean, pos: number}>({active: false, pos: 0});

    const closeGallery = () => {
        setGalleryState(false);
        setFocusMode({active: false, pos: 0});
    }

    useEffect(() => {
        if(galleryState){
            document.body.style.overflowY = "hidden";
        }else{
            document.body.style.overflowY = "scroll";
        }
    },[galleryState]);

    return (
        <>
        {galleryState && createPortal(
            <div className="fixed top-0 left-0 w-screen h-screen bg-[#000000ab] z-20 py-[5vH] px-[2.5vW]">
                <div className="absolute top-0 left-0 w-full h-full -z-10" onClick={() => closeGallery()}/>
                {images.length > 0 && 
                <div className="bg-white h-[90vH] w-full rounded-xl p-5 z-10">
                    <div className="relative border-b border-borderDefault px-5 py-2">
                        <div className="absolute top-0 right-0 w-fit p-2 rounded-full hover:bg-slate-100 hover:cursor-pointer text-lg"
                        onClick={() => closeGallery()}>
                            <Close className="text-xl"/>
                        </div>
                        {focusMode.active && 
                        <div className="absolute top-0 left-0 w-fit p-2 rounded-full hover:bg-slate-100 hover:cursor-pointer text-lg"
                        onClick={() => setFocusMode({...focusMode, active: false})}>
                            Back to Gallery
                        </div>
                        }
                        <div className="xxl:text-2xl lg:text-xl font-medium text-center mb-2">{name}</div>
                    </div>
                    {/* Normal mode - Display all images */}
                    {!focusMode.active && 
                    <div className="grid grid-cols-5 gap-5 mt-5">
                    {images.map((image, index) => (
                        <div key={index}
                        className={clsx('aspect-video rounded-lg w-full h-auto overflow-hidden border-2', 
                            index === focusMode.pos ? "border-theme" : "border-borderDefault")}
                        onClick={() => setFocusMode({active: true, pos: index})}
                        >
                            <Image src={`${JAVA_URL}/${image}`}
                            alt={image+""+(index+1)}
                            width={50}
                            height={50}
                            className="aspect-video w-full h-auto hover:scale-110 hover:cursor-pointer duration-200"
                            />
                        </div>
                    ))}
                    </div>
                    }
                    {/* Focus mode - Display mainly 1 image with image navigator */}
                    {focusMode.active &&
                        <div className="h-[92.5%] flex items-center justify-center">
                            <CarouselThumbs selectedPos={focusMode.pos} slides={images}/>
                        </div>
                    }
                </div>
                }
            </div>,    
        document.body)}
        </>
    )
}