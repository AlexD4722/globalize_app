import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react'

export const useDotButton = (emblaApi : any) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  // READ https://www.embla-carousel.com/api/events/ for more information
  //When click on specific dot, scroll to the image with a relevant index
  const onDotButtonClick = useCallback(
    (index : number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  //Runs when the carousel mounts for the first time
  const onInit = useCallback((emblaApi : any) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  //Runs when the selected scroll snap changes
  const onSelect = useCallback((emblaApi : any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    //Listen to events
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect) 
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}
