import Logo from '@/components/general/logo'
import Button from '@/components/button/classic-button'
import { RHFInputField } from '@/components/form/input-field'
import AuthFormWrapper from '@/components/layout/authentication/auth-form-wrapper'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { ReactElement, useEffect, useState } from 'react'
import { OwnerLayout } from '@/components/layout'
import { useMutation } from '@tanstack/react-query'
import { UserToken } from '@/services/react_query/functions/mutations'
const OwnerLogin = () => {
    const methodLogin = useForm()
    const router = useRouter()

    const loginMutation = useMutation<any, Error, any>({
        mutationKey: ['login'],
    })

    const onSubmitLogin = (data: any) => {
        const loginInfo: UserToken = {
            username: data.username,
            password: data.password,
            type: { actor: 'owner' },
        }
        loginMutation.mutate(loginInfo)
    }
    const onClickRegister = () => {
        router.push('/owner/register')
    }

    useEffect(() => {
        if (loginMutation.isSuccess) {
            console.log(document.cookie)
            router.push('/owner/app')
        }
    },[loginMutation.isSuccess])

    return (
        <div>
            <div className="relative min-h-screen flex items-center justify-center z-11">
                <div className="w-full max-w-[35rem]">
                    <div className="w-full flex flex-col items-center justify-center mb-10">
                        <Logo height="3rem" />
                        <p className="text-textUnfocus text-sm opacity-75 underline">
                            Owner only.
                        </p>
                    </div>

                    <FormProvider {...methodLogin}>
                        <form
                            onSubmit={methodLogin.handleSubmit(onSubmitLogin)}
                        >
                            <AuthFormWrapper>
                                <RHFInputField
                                    inputName="username"
                                    label="Username"
                                    registerOptions={{
                                        required: {
                                            value: true,
                                            message: 'This field is required!',
                                        },
                                    }}
                                />
                                <RHFInputField
                                    inputName="password"
                                    label="Password"
                                    type="password"
                                    registerOptions={{
                                        required: {
                                            value: true,
                                            message: 'This field is required!',
                                        },
                                    }}
                                />
                                <Button
                                    rounded={'regular'}
                                    className="py-4"
                                    type="submit"
                                >
                                    Sign In
                                </Button>
                            </AuthFormWrapper>
                        </form>
                    </FormProvider>
                    <div className="lg:mt-10 xs:mt-5">
                        <p className="text-center text-lg text-gray-500 flex flex-col cursor-pointer">
                            <span>Don't have an account yet? </span>
                            <span className="text-theme hover:cursor-pointer">
                                Register{' '}
                                <span
                                    className="underline"
                                    onClick={() => onClickRegister()}
                                >
                                    here
                                </span>
                                .
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OwnerLogin