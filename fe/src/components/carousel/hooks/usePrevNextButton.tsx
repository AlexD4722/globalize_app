import React, { useCallback, useEffect, useState } from 'react'

export const usePrevNextButtons = (emblaApi: any) => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  
    // READ https://www.embla-carousel.com/api/events/ for more information

    //Scroll to previous slide
    const onPrevButtonClick = useCallback(() => {
      if (!emblaApi) return
      emblaApi.scrollPrev()
    }, [emblaApi])

    //Scroll to next slide
    const onNextButtonClick = useCallback(() => {
      if (!emblaApi) return
      emblaApi.scrollNext()
    }, [emblaApi])
  
    //if there is no slide before the first slide or after the last slide, not allowed to scroll / drag
    const onSelect = useCallback((emblaApi: any) => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev())
      setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])
  
    useEffect(() => {
      if (!emblaApi) return
  
      onSelect(emblaApi)
      emblaApi.on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onSelect])
  
    return {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
    }
  }