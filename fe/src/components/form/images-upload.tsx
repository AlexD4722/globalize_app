import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Button from "../button/classic-button";
import clsx from "clsx";
import { StarRate, ThreeDotsFill } from "../svg";

export type ImageUpload = {
    image: File;
    url: string;
}

export type ImagesUploadProps = {
    images: ImageUpload[] | undefined,
    setImages: Dispatch<SetStateAction<ImageUpload[]>>,
    coverImage: ImageUpload | undefined,
    setCoverImage: Dispatch<SetStateAction<ImageUpload | undefined>>,
    onChange?: () => void
    sizeContainer?: string;
}

export default function ImagesUpload ({images, setImages, coverImage, setCoverImage, onChange, sizeContainer} : ImagesUploadProps) {

    const { register } = useFormContext();
    const inputRef = useRef<HTMLInputElement | null>();

    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange();
        if(event.target.files && event.target.files.length > 0){

            let tempImages = [];

            for (let i = 0; i < event.target.files.length; i++) {
                const urlImage = URL.createObjectURL(event.target.files[i]);
                tempImages.push({url: urlImage, image: event.target.files[i]});

                if(!coverImage && i === 0){
                    setCoverImage({url: urlImage, image: event.target.files[i]})
                }
            }

            if(images && images.length > 0){
                setImages([...images, ...tempImages]); 
            }else{
                setImages(tempImages);
            }
        }
    }

    const removeImage = (url : string) => {
        if(images && images.length > 0){
            const newImages = images.map((image) => {
                if(image.url !== url)
                    return image;
            }).filter(( element ) => {
                return element !== undefined;
             })

            setImages(newImages);

            if(coverImage?.url === url){
                setCoverImage(newImages[0]);
            }
        }
    }

    const changeCover = (image: ImageUpload) => {
        setCoverImage(image);
    }

    const { ref, ...rest } = register('imagesUpload', { onChange: handleUploadFile});

    return (
        <div className={clsx(`w-full min-h-[${sizeContainer ? sizeContainer : '500px'}] border border-borderDefault rounded-xl bg-slate-100 p-10`,
            (!images || images?.length === 0) && "flex items-center justify-center"
        )}>
            <input type="file" 
            accept="image/*"
            multiple
            className="hidden"
            {...rest}
            ref={(e) => {
                ref(e)
                inputRef.current = e // you can still assign to ref
              }}
            />
            {(!images || images.length === 0) && <Button type="button" intent={'primary'} rounded={'regular'} onClick={() => {inputRef.current!.click()}}>Add images</Button>}

            {(images && images.length > 0) && 
            <div className="grid grid-cols-3 gap-5 mt-5">
                {images.map((image, index) => (
                   <SingleImage key={index} image={image} coverImage={coverImage} removeImage={removeImage} changeCover={changeCover}/>
                ))}
                <div 
                onClick={() => {inputRef.current!.click()}}
                className="flex w-full rounded-lg aspect-square border border-dashed border-borderDefault items-center justify-center bg-white hover:cursor-pointer">
                    <span className="font-medium text-textUnfocus">Add More</span>
                </div>
            </div>
            }
        </div>
    )
}

const SingleImage = ({image, coverImage, changeCover, removeImage} 
    : {image: ImageUpload, coverImage: ImageUpload | undefined, changeCover: (image: ImageUpload) => void, removeImage:(url: string) => void }) => {

    const [toggle, setToggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event : any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setToggle(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
    },[])

    return (
        <>
        <div ref={ref} className="relative">
            <Image src={image.url} alt={image.image!.name}
            width={50}
            height={50}
            className="inline-block w-full rounded-lg aspect-square object-cover"
            />
            <div 
            onClick={() => setToggle(!toggle)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full hover:cursor-pointer group">
                <ThreeDotsFill className="group-hover:scale-110 duration-200"/>
                <ul className={clsx("absolute top-full right-0 duration-150 text-sm rounded-lg overflow-hidden bg-white mt-1 elevation-shadow-2 w-auto [&>li]:whitespace-nowrap [&>li]:p-2 [&>li]:px-3",
                    toggle ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                )}>
                    <li className="hover:bg-slate-100" onClick={() => changeCover(image)}>Make Cover</li>
                    <li className="hover:bg-slate-100" onClick={() => removeImage(image.url)}>Remove</li>
                </ul>
            </div>
                {coverImage?.url === image.url && <div 
            className={clsx("absolute top-2 left-2 text-sm p-2 px-3 bg-white rounded-lg hover:cursor-pointer font-medium")}>
                <span className="flex items-center"><StarRate className="mr-1 text-theme"/> Cover</span>
            </div>}
        </div>
        </>
    )
}