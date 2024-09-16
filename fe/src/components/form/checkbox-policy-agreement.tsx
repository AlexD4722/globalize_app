import { useFormContext } from "react-hook-form"
import { ErrorOutlineRounded } from "../svg";

export default function PolicyAgreementCheckbox () {
    
    const { register, formState: {errors} } = useFormContext();

    return (
        <>
        <div>
            <div className="flex items-center text-sm py-2">
                <input type="checkbox" id="policies-agreement" {...register("policies", {required: {value: true, message: "Accept our policies is necessary to use our platform!"}})} 
                className="mr-2 accent-theme h-[1rem] w-[1rem]"/>
                <label htmlFor="policies-agreement">By register, you agree to our <span className="text-theme">terms</span> and <span className="text-theme">conditions</span>.</label>
            </div>
            {errors["policies"] && 
                <div className="text-red-400 flex items-center mt-2">
                    <span className="mr-2"><ErrorOutlineRounded/></span>
                    <span>{errors["policies"]!.message as string}</span>
                </div>
            }
        </div>
        </>
    )
}