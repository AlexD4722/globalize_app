import Button from "@/components/button/classic-button";
import { RHFInputField } from "@/components/form/input-field";
import useLocalAppStore from "@/services/zustand/store";
import AuthFormWrapper from "./auth-form-wrapper";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import PolicyAgreementCheckbox from "@/components/form/checkbox-policy-agreement";
import { ErrorOutlineRounded, SuccessOutline } from "@/components/svg";

export default function RegisterForm () {

    const setPage = useLocalAppStore((state) => state.setPage)
    const { formState: { errors } } = useFormContext();
    const [currentPassword, setCurrentPassword] = useState<string>("");

    const matchErrorStyles = (boolean: RegExpMatchArray | null) => {
        return !boolean 
        ? <span className="text-red-600 ml-2 absolute right-full top-1/2 -translate-y-1/2"><ErrorOutlineRounded/></span> 
        : <span className="text-green-600 ml-2 absolute right-full top-1/2 -translate-y-1/2"><SuccessOutline/></span>;
    }

    return (
        <>
        <AuthFormWrapper>
            <RHFInputField inputName="email-register" label="Email address" 
            registerOptions={{
                pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email must in correct format!'},
                required: {value: true, message: "This field is required!"}
            }}/>

            <RHFInputField inputName="phone" label="Phone number" 
            registerOptions={{
                pattern: {value: /^[0-9]{10,}$/, message: 'Phone number must atleast 10 digits!'},
                required: {value: true, message: "This field is required!"}
            }}/>

            <RHFInputField inputName="fullname" label="Your fullname"
             registerOptions={{
                required: {value: true, message: "This field is required!"}
            }}/>

            <RHFInputField inputName="password-register" label="Password" onChange={(e) => {setCurrentPassword(e.target.value)}}
            allowErrorMessage={false}
            registerOptions={{
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                required: {value: true, message: "This field is required!"}
            }}/>
            <div className="-mt-3 text-sm !leading-[1.5] pl-2">
                <div className="mb-1">For security concern, your password must contains:</div>
                <ul className="pl-3">
                    <li className="relative pl-1">{matchErrorStyles(currentPassword.match(/^[A-Za-z\d]{8,}$/))}Atleast 8 characters!</li>
                    <li className="relative pl-1">{matchErrorStyles(currentPassword.match(/(?=.*\d)/))}Atleast 1 digit! </li>
                    <li className="relative pl-1">{matchErrorStyles(currentPassword.match(/(?=.*[a-z])/))}Atleast 1 lowercase letter!</li>
                    <li className="relative pl-1">{matchErrorStyles(currentPassword.match(/(?=.*[A-Z])/))}Atleast 1 uppercase letter!</li>
                </ul>
            </div>
           
            <RHFInputField inputName="repeat-password" label="Repeat password"
            registerOptions={{
                pattern: {value: new RegExp(currentPassword), message: 'Repeated password not match!'},
                required: {value: true, message: "This field is required!"}
            }}
            />
            <PolicyAgreementCheckbox/>
            <Button rounded={"regular"} className="py-4" type="submit">Register</Button>
        </AuthFormWrapper>
        <div className="lg:mt-10 xs:mt-5">
            <p className="text-center text-sm text-gray-500 flex flex-col">
                <span>Already have an account?! </span>
                <span className="text-theme hover:cursor-pointer" onClick={() => setPage("signin")}>Sign in <span className="underline">here</span>.</span>
            </p>
        </div>
        </>
    )
}