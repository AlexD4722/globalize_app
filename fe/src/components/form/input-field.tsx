import clsx from "clsx";
import { HTMLAttributes, InputHTMLAttributes } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form"
import { ErrorOutlineRounded } from "../svg";

//Input field that integrated with react-hook-form 

interface InputField {
    label: string,
    inputName: string,
    allowErrorMessage?: boolean,
    registerOptions?: RegisterOptions,
}

interface InputFieldProps extends InputField, React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {};

export const RHFInputField = ({...props} : InputFieldProps) => {

    const { label, inputName, registerOptions, allowErrorMessage = true, onChange, onBlur, ...restProp } = props;
    const { register, formState: { errors } } = useFormContext();
    const sharedPadding = "lg:px-4 lg:pb-4 lg:pt-6 xs:px-3 xs:pb-3 xs:pt-5";
    
    return (
        <>
        <div>
            <div className="relative">
                <input className={clsx(
                    "border border-borderDefault rounded-lg peer bg-transparent outline-none placeholder:text-transparent w-full duration-200 leading-[1.5]",
                    sharedPadding,
                    errors[inputName] && "!border-theme"
                )} placeholder=" " autoComplete="off" defaultValue={props.defaultValue}
                {...register(inputName, {...registerOptions, onChange: onChange, onBlur: onBlur})} {...restProp}
                />
                <label className={clsx(
                    restProp.hidden === true && "hidden",
                    "absolute -top-4 left-0 h-full w-full text-sm pointer-events-none select-none text-textUnfocus duration-200 whitespace-nowrap overflow-hidden text-ellipsis",
                    "peer-placeholder-shown:-top-1 lg:peer-placeholder-shown:text-lg xs:peer-placeholder-shown:text-base peer-focus:!-top-4 peer-focus:!text-sm peer-focus:text-theme",
                    sharedPadding
                )} >{label} {registerOptions?.required && <span className="text-theme">*</span>}</label>
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