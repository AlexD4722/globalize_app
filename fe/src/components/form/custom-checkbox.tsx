import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface ICheckbox {
    label: string,
    value: string,
    icon?: React.ReactNode,
    checked?: boolean,
    // name: value that submit with FormData
    name: string,

}


export default function RHFCustomCheckbox ({...props} : ICheckbox) {

    const {name, value, icon, checked = false, label } = props;
    const { register } = useFormContext();
    const [isChecked, setIsChecked] = useState(checked);
    const inputRef = useRef<HTMLInputElement | null>();

    const { ref, ...rest } = register(name);
    return (
        <>
        <div>
            <input type="checkbox" id={label} className="peer hidden" style={{WebkitAppearance: 'none'}} onClick={() => setIsChecked(!isChecked)} value={value} checked={isChecked ? true : false}
            {...rest}
            ref={(e) => {
                ref(e)
                inputRef.current = e // you can still assign to ref
              }}
            />
            {icon && <span>{icon}</span>}
            <label htmlFor={label} className={clsx("inline-block p-3 border-2 border-borderDefault rounded-lg select-none font-medium whitespace-nowrap mb-5 mr-5",
                "active:scale-110 duration-200 hover:cursor-pointer peer-checked:border-theme hover:border-borderHover"
            )}>{label}</label>
        </div>
        </>
    )
}
