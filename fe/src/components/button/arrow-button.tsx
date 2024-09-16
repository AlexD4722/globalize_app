import { ChevronLeft, ChevronRight } from '../svg'
import clsx from 'clsx'

//Classname is passed for customization ability
//Main purpose is Prev & Next button is the svg inside it

export const PrevButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, className, ...restProps } = props

  return (
    <button
    className={clsx(
      className
    )}
      type="button"
      {...restProps}
    >
      <ChevronLeft/>
      {children}
    </button>
  )
}

export const NextButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, className, ...restProps } = props

  return (
    <button
      className={clsx(
        className
      )}
      type="button"
      {...restProps}
    >
     <ChevronRight/>
      {children}
    </button>
  )
}
