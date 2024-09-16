import CarouselSingleProduct, { SlideSingleProduct } from "@/components/carousel/carousel_single_view";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import Gallery from "@/components/gallery";
import { JAVA_URL } from "@/settings/fe_config";


//Image Section responsive for 2 main size, mobile and tablet

//In tablet or larger, the section displays 5 main images with 1 is a featured image with bigger size. 
    //Images could have more than 5, so there is "See all photos" button, when clicked open a gallery (Gallery component not made yet) 

//In mobile, the section allow users to use hand gesture to swipe, and display the tracked image slide on right-bottom corner

const ImageSection = ({featured_picture, name, pictures, smallImages = 3} : {featured_picture: string, name: string, pictures: Array<string>, smallImages?: 3 | 5}) => {

    const [responsiveISValue, setResponsiveISValue] = useState<"xs" | "lg">("lg");
    const [galleryModal, setgalleryModal] = useState<boolean>(false);

    useEffect(() => {
        const mediaWatcher = window.matchMedia("(min-width: 1024px)");

        const responsiveImageSection = () => {
            if(window.matchMedia("(min-width: 1024px)").matches){
               setResponsiveISValue("lg");
            }else{
                setResponsiveISValue("xs");
            }
        }
        responsiveImageSection();
        
        mediaWatcher.addEventListener('change', responsiveImageSection)
        
        // clean up after ourselves
        return function cleanup() {
        mediaWatcher.removeEventListener('change', responsiveImageSection)
        }
    },[])

    return (
        <>
        {responsiveISValue === "lg" &&
        <div className={`grid ${smallImages < 5 ? "grid-cols-2" : "grid-cols-[40fr_60fr]"} gap-5 w-full h-fit`}>
            <div className="w-full rounded-md overflow-hidden">
                <Image src={`${JAVA_URL}/${featured_picture}`} alt={name} width={50} height={50} className="aspect-square w-full h-auto object-cover"/>
            </div>
            <div className={`grid ${smallImages < 5 ? "grid-cols-2" : "grid-cols-3"} gap-5 items-center h-full`}>
                {pictures.map((pic, index) => {
                    if(index > smallImages) return;

                    return (
                        <div className="relative rounded-md overflow-hidden" key={index}>
                            {index === smallImages && 
                            <div className="absolute h-full w-full top-0 left-0 !bg-[#00000098] hover:!bg-[#000000cc] duration-200 flex items-center justify-center group hover:cursor-pointer" onClick={() => setgalleryModal(true)}>
                                <span className="text-white font-medium relative group-hover:scale-110 duration-200 origin-center tracking-wider">See all photos</span>
                            </div>
                            }
                            <Image src={`${JAVA_URL}/${pic}`} alt={name} width={50} height={50} className="aspect-square w-auto h-auto object-cover"/>
                        </div>
                    )
                })}
            </div>
            <Gallery name={name} galleryState={galleryModal} setGalleryState={setgalleryModal} images={pictures}/>
        </div>
        }

        {responsiveISValue === "xs" &&
       <div className="relative rounded-2xl overflow-hidden">

       <CarouselSingleProduct options={{watchDrag: true}} slideNumberTracking={{totalSlide: pictures.length + 1, allow: true}}>
           {[featured_picture, ...pictures].map((picture, index) => (
               <SlideSingleProduct key={index}>
                   <div 
                   className={clsx(
                       "flex items-center justify-center",
                   )}>
                   <Image 
                   src={picture}
                   alt={name}
                   width={200}
                   height={200}
                   className="w-full h-full object-cover aspect-video" />
               </div>
               </SlideSingleProduct>
           ))}
       </CarouselSingleProduct>     
   </div>
        }

        </>
    )
}

export default ImageSection;