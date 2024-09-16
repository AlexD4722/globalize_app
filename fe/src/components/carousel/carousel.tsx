//Style of this component in directory: styles/emble-carousel

import useEmblaCarousel from 'embla-carousel-react'
import { HTMLAttributes, useEffect } from 'react'
import { NextButton, PrevButton } from '../button/arrow-button'
import clsx from 'clsx'
import { usePrevNextButtons } from './hooks/usePrevNextButton'
import { useDotButton } from './hooks/useDotButton'

type ContainsReactNode = {
  children: React.ReactNode
}

type ICarousel = {
  control?: boolean,
  options?: object 
  //https://www.embla-carousel.com/api/options
}

interface CarouselProps extends ContainsReactNode, ICarousel {}
interface SlideProps extends ContainsReactNode {}

export default function Carousel ({children, control, options} : CarouselProps){
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    if (emblaApi) {
      // console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  return (
    <section className="carousel">
      {/** Main content*/}
      <div className='carousel_viewport' ref={emblaRef}>
        <div className="carousel_container">
          {children}
        </div>
      </div>

      {/** Prev/Next button and Dot buttons that showed below the carousel to manually control it, this is optional*/}
      {control &&
      <>
        <div className='carousel_controls'>
          <div className="carousel_buttons">
            <PrevButton 
            className={clsx(
              "text-2xl border border-borderDefault rounded-full p-1 active:scale-105 duration-200 elevation-shadow-1",
              "hover:text-white hover:bg-theme hover:border-theme hover:elevation-shadow-2",
              "disabled:!bg-borderDefault disabled:!text-gray-700 disabled:!border-borderDefault disabled:active:!scale-100",
            )}
            onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton 
            className={clsx(
              "text-2xl border border-borderDefault rounded-full p-1 active:scale-105 duration-200 elevation-shadow-1",
              "hover:text-white hover:bg-theme hover:border-theme hover:elevation-shadow-2",
              "disabled:!bg-borderDefault disabled:!text-gray-700 disabled:!border-borderDefault disabled:active:!scale-100"
            )}
            onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
          <div className="carousel_dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'carousel_dot'.concat(
                  index === selectedIndex ? ' carousel_dot-selected' : ''
                )}
              />
            ))}
          </div>
      </div>
      </>
      }
    </section>
  )
}

export const Slide = ({children} : SlideProps) => {
  return (
    <>
    <div className='carousel_slide'>
        {children}
    </div>
    </>
  )
}


export const DotButton = (props : HTMLAttributes<HTMLButtonElement>) => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}
