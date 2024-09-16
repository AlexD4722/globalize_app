import { ArrowUp } from "@/components/svg"
import { useScrollPosition } from "@/services/customHook/use-scroll_position"

export const ScrollToTop = () => {
  
    const pos = useScrollPosition();

    const scrollTop = (behavior: ScrollBehavior) => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: behavior
        })
    }
      
    return (
      <>
       <div 
        onClick={() => {scrollTop("smooth")}} 
        className={`fixed rounded-full text-theme border-theme border p-1
        z-[25] duration-500 hover:cursor-pointer hover:text-white hover:bg-theme
        md:right-10 md:bottom-10 md:text-2xl
        xs:right-2 xs:bottom-2 xs:text-xl
        ${(pos > 30 && document.documentElement.scrollHeight > 1350) ? 'opacity-100' : 'opacity-0 -rotate-180 pointer-events-none select-none'}
        `}>
          <ArrowUp className={`lg:duration-200 ease-out`} />
        </div>
      </>
    )
  }