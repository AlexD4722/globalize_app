import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { NextButton, PrevButton } from '../button/arrow-button'
import { usePrevNextButtons } from './hooks/usePrevNextButton'
import clsx from 'clsx'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType,
  selectedPos: number
}

const CarouselThumbs: React.FC<PropType> = (props) => {
  const { slides, selectedPos, options } = props
  const [selectedIndex, setSelectedIndex] = useState(selectedPos)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )


  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaMainApi)

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    emblaMainApi.on("scroll", () => {setScrollProgress(emblaMainApi.selectedScrollSnap())})
  }, [emblaMainApi, onSelect])

  useEffect(() => {
    if (!emblaThumbsApi || !emblaMainApi) return
    emblaMainApi.scrollTo(selectedPos, true)
    emblaThumbsApi.scrollTo(selectedPos, true)

  }, [emblaThumbsApi, emblaMainApi, selectedPos])

  return (
    <div className="carousel relative h-[90%]">
      <div className="carousel_viewport relative w-[70%] h-[85%] m-auto rounded-xl" ref={emblaMainRef}>
        <div className="carousel_container">
          {slides.map((slide, index) => (
            <div className="carousel_slide_product" key={index}>
                <Image 
                src={slide}
                alt={index + ""}
                width={50}
                height={50}
                className="w-auto h-auto object-cover" />
            </div>
          ))}
        </div>

        <div className={clsx(
          "absolute top-0 left-0 w-full h-full transition-opacity",
          "xs:pointer-events-none"
        )}>
            <div className='absolute bottom-3 right-1/2 translate-x-1/2 bg-white rounded-lg px-3 py-1 font-medium leading-[1.25]'>
            <span>{scrollProgress + 1}</span> / <span>{slides.length}</span>
            </div>
        </div>
      </div>

      <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
            <div className='absolute top-0 left-0 h-full pointer-events-auto w-[12.5%]'>
                <PrevButton 
                className={clsx(
                "text-5xl flex items-center justify-center rounded-xl w-full h-full border border-borderDefault hover:cursor-pointer duration-200",
                "hover:border-theme hover:bg-[#f8f8f8] hover:text-theme",
                "disabled:!text-textUnfocus disabled:!bg-transparent disabled:!border-borderDefault disabled:!cursor-default",
                )}
                onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </div>
            <div className='absolute top-0 right-0 h-full pointer-events-auto w-[12.5%]'>
                <NextButton 
                className={clsx(
                "text-5xl flex items-center justify-center rounded-xl w-full h-full border border-borderDefault hover:cursor-pointer duration-200",
                "hover:border-theme hover:bg-[#f8f8f8] hover:text-theme",
                "disabled:!text-textUnfocus disabled:!bg-transparent disabled:!border-borderDefault disabled:!cursor-default"
                )}
                onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
      </div>

      <div className="embla-thumbs w-[70%] h-[15%] mx-auto">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                image={slide}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselThumbs

type ThumbPropType = {
    selected: boolean,
    image: string,
    index: number
    onClick: () => void
  }
  
const Thumb: React.FC<ThumbPropType> = (props) => {
    const { selected, index, image, onClick } = props
  
    return (
    <div
    className={clsx('embla-thumbs__slide')}>
        <Image 
        onClick={onClick}
        src={image}
        alt={index + ""}
        width={200}
        height={200}
        className={clsx('w-full h-auto object-cover aspect-video border rounded-lg hover:cursor-pointer', selected ? 'border-theme' : 'border-borderDefault')} />
    </div>
    )
  }
  