//Style of this component in directory: styles/emble-carousel

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import { PrevButton, NextButton } from '../button/arrow-button'
import {  usePrevNextButtons } from './hooks/usePrevNextButton'
import clsx from 'clsx'
import { useRouter } from 'next/router'

type ContainsReactNode = {
  children: React.ReactNode
}

type iCarouselSingleView = {
  link?: string,
  options?: object
  //https://www.embla-carousel.com/api/options
  slideNumberTracking?: {
    allow: boolean,
    totalSlide: number
  } 
}

interface CarouselProps extends ContainsReactNode, iCarouselSingleView {}
interface SlideProps extends ContainsReactNode {}

export default function CarouselSingleProduct ({children, link, options, slideNumberTracking = { allow: false, totalSlide: 0}} : CarouselProps){

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isFocus, setIsFocus] = useState(false);
  const router = useRouter();

  const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
      if (emblaApi) {
      // Listen carousel srolling and get current scroll (slide) value, start with 0.
      emblaApi.on("scroll", () => {setScrollProgress(emblaApi.selectedScrollSnap())})
      }
  }, [emblaApi])

  const navigate = () => {
    if(link){
      router.push(link);
    }
  }
  

  return (
    <section className="carousel">
      {/** Main content*/}
      <div onMouseEnter={() => setIsFocus(true)} onMouseLeave={() => setIsFocus(false)} className='relative'>
        <div className='carousel_viewport' ref={emblaRef}>
            <div className="carousel_container_product">
            {children}
            </div>
        </div>

        {slideNumberTracking.allow &&
        <div className={clsx(
          "absolute top-0 left-0 w-full h-full transition-opacity",
          "xs:pointer-events-none"
      )}>
        <div className='absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1 font-medium leading-[1.25]'>
          <span>{scrollProgress + 1}</span> / <span>{slideNumberTracking.totalSlide}</span>
        </div>
      </div>
        }
        
        {/** Prev and Next button for Property Card */}
        <div className={clsx(
            "absolute top-0 left-0 w-full h-full transition-opacity duration-200",
            isFocus ? "opacity-100" : "opacity-0 select-none",
            "lg:pointer-events-auto",
            "xs:pointer-events-none"
        )}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 lg:block xs:hidden">
                <PrevButton 
                className={clsx(
                    "text-2xl border border-borderDefault rounded-full p-1 active:scale-105 duration-200 bg-white elevation-shadow-1",
                    "hover:text-white hover:bg-theme hover:border-theme hover:elevation-shadow-2",
                    "disabled:hidden",
                )}
                onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 lg:block xs:hidden">
                <NextButton
                className={clsx(
                    "text-2xl border border-borderDefault rounded-full p-1 active:scale-105 duration-200 bg-white elevation-shadow-1",
                    "hover:text-white hover:bg-theme hover:border-theme hover:elevation-shadow-2",
                    "disabled:hidden",
                )}
                onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
        </div>  
      </div>
      
    </section>
  )
}


//ProperyCard top comp is a carousel of images, inside it are multiple slides 
//This comp provide essential css attribute for it to function as single slide
//Check styles/embla-carousel and READ IT
export const SlideSingleProduct = ({children} : SlideProps) => {

  return (
    <>
    <div className='carousel_slide_product'>
      <div className='relative'>
        {children}
      </div>
    </div>
    </>
  )
}
