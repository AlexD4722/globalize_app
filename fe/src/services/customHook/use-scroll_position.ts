import { useEffect, useState } from "react";

export const useScrollPosition = () => {
     
    const [scrollPos, setScrollPos] = useState(0);  
  
    const  scrollProgress = () => {
      const {scrollTop , scrollHeight} = document.documentElement;
  
      const scrolled = (scrollTop / (scrollHeight - window.innerHeight)) * 100;
  
      setScrollPos(scrolled);
    }
  
    useEffect(() => {
      const observer = new ResizeObserver(scrollProgress)
      observer.observe(document.documentElement);
  
      window.addEventListener('scroll', scrollProgress);
  
      return () => { 
        window.removeEventListener('scroll', scrollProgress); 
        observer.disconnect();
      }
    },[])
  
      return scrollPos;
    }