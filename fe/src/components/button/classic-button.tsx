import { cva, VariantProps } from 'class-variance-authority'

const buttonStyles = cva(
    [
      'px-4 py-2 rounded-full text-md hover:elevation-shadow-2 duration-300 border'
    ], {
    variants: { 
    intent: {
        primary: 'text-white bg-theme border-transparent',
        secondary: 'border-theme bg-white text-black'
    },
    rounded: {
        none: 'rounded-none',
        regular: 'rounded-md',
        full: 'rounded-full'
    }
    },
    defaultVariants: {
        intent: 'primary',
        rounded: 'full'
    }
  })
  
interface IButton { 

}
  
interface ButtonProps extends IButton, React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {};

export default function Button ({...props} : ButtonProps) {

    const { children, intent, rounded, className, ...restProp } = props;

    return (
        <>
        <button className={buttonStyles({intent, rounded, className: className})} {...restProp}>{children}</button>
        </>
    )
}