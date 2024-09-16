import Button from "@/components/button/classic-button";
import { RHFInputField } from "@/components/form/input-field";
import Logo from "@/components/general/logo";
import AuthFormWrapper from "@/components/layout/authentication/auth-form-wrapper";
import SignInForm from "@/components/layout/authentication/signin-form";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

export default function AdminLanding () {

    const methods = useForm();
    const router = useRouter();

    const onSubmit = (data: any) => {
        router.push('/admin/app');
    }

    return (
        <>
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[35%]">
                <div className="w-full flex flex-col items-center justify-center mb-10">
                    <Logo height="3rem" />
                    <p className="text-textUnfocus text-sm opacity-75">Administrator only.</p>
                </div>
              
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <AuthFormWrapper>
                        <RHFInputField inputName="username" label="Username"/>
                        <RHFInputField inputName="password" label="Password" type="password"/>
                        <Button rounded={"regular"} className="py-4" type="submit">Sign In</Button>
                    </AuthFormWrapper>
                    </form>
                </FormProvider>
            </div>
        </div>
        </>
    )
}
