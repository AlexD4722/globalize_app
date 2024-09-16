import clsx from "clsx";
import { MathMinus, MathPlus } from "../svg"

export const Plus = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { children, className, ...restProps } = props;

    return (
        <>
        <button className={clsx(
            "border border-borderDefault p-2 rounded-full active:scale-110 duration-200",
            className
        )} {...restProps}><MathPlus/></button>
        </>
    )
}

export const Minus = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { children, className, ...restProps } = props;

    return (
        <>
        <button className={clsx(
            "border border-borderDefault p-2 rounded-full active:scale-110 duration-200",
            className
        )} {...restProps}><MathMinus/></button>
        </>
    )
}