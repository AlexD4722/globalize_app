import Button from "@/components/button/classic-button";
import { RHFInputField } from "@/components/form/input-field";
import useLocalAppStore from "@/services/zustand/store";
import AuthFormWrapper from "./auth-form-wrapper";
import { useFormContext } from "react-hook-form";

export default function SignInForm () {

    const setPage = useLocalAppStore((state) => state.setPage)
    const { formState: { errors } } = useFormContext();

    return (
        <>
        <AuthFormWrapper>
            <RHFInputField inputName="email-signin" label="Username"/>
            <RHFInputField inputName="password-signin" label="Password" type="password"/>
            <Button rounded={"regular"} className="py-4" type="submit">Sign In</Button>
        </AuthFormWrapper>
        <div className="lg:mt-10 xs:mt-5">
            <p className="text-center text-sm text-gray-500 flex flex-col">
                <span>Don&apos;t have an account yet? </span>
                <span className="text-theme hover:cursor-pointer" onClick={() => setPage("register")}>Register <span className="underline">here</span>.</span>
            </p>
        </div>
        </>
    )
}