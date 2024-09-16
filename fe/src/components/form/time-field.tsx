import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { ErrorOutlineRounded } from "../svg";

interface TimeField {
    label: string,
    inputName: string,
    allowErrorMessage?: boolean,
    registerOptions?: RegisterOptions,
}

interface InputFieldProps extends TimeField, React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {};


export default function TimeField ({...props} : InputFieldProps) {

    const { label, inputName, registerOptions, className, allowErrorMessage = true, onChange, onBlur, ...restProp } = props;
    const { register, formState: { errors } } = useFormContext();
    const sharedPadding = "lg:px-4 lg:pb-3 lg:pt-7 xs:px-3 xs:pb-3 xs:pt-5";

    return (
        <>
        <div>
            <div className={clsx("relative", className)}>
                <input defaultValue={props.defaultValue} type="time"
                className={clsx(sharedPadding, "border border-borderDefault rounded-lg lg:text-2xl xs:text-base font-medium hover:elevation-shadow-2 duration-200 leading-[1.5] peer")}
                {...register(inputName, {...registerOptions, onChange: onChange, onBlur: onBlur})} {...restProp}
                />
                <label className={clsx(sharedPadding,
                    "absolute -top-5 left-0 h-full w-full text-sm pointer-events-none select-none whitespace-nowrap overflow-hidden text-ellipsis",
                )} htmlFor="">
                    <span className="text-sm">{label}</span>
                </label>
            </div>
            {(!restProp.hidden && allowErrorMessage && errors[inputName]) && 
                <div className="text-red-400 flex items-center mt-2">
                    <span className="mr-2"><ErrorOutlineRounded/></span>
                    <span>{errors[inputName]!.message as string}</span>
                </div>
            }
        </div>
        </>
    )
}