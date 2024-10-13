import Logo from "@/components/general/logo";
import Button from "@/components/button/classic-button";
import { RHFInputField } from "@/components/form/input-field";
import AuthFormWrapper from "@/components/layout/authentication/auth-form-wrapper";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ReactElement, useEffect, useState } from "react";
import { OwnerLayout } from "@/components/layout";
import { useMutation } from "@tanstack/react-query";
import { UserToken } from "@/services/react_query/functions/mutations";
import { Spinner } from "@/components/ui/spinner";
import { Store } from "react-notifications-component";
const OwnerLogin = () => {
  const methodLogin = useForm();
  const router = useRouter();

  const loginMutation = useMutation<any, Error, any>({
    mutationKey: ["login"],
  });

  const onSubmitLogin = (data: any) => {
    const loginInfo: UserToken = {
      username: data.username,
      password: data.password,
      type: { actor: "owner" },
    };
    loginMutation.mutate(loginInfo);
  };
  const onClickRegister = () => {
    router.push("/owner/register");
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      Store.addNotification({
        title: "Success",
        message: "Login successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      router.push("/owner/app");
    }
  }, [loginMutation.isSuccess]);
  useEffect(() => {
    if (loginMutation.error) {
      Store.addNotification({
        title: "Error",
        message: "Login failed",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  }, [loginMutation.error]);

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
            <form onSubmit={methodLogin.handleSubmit(onSubmitLogin)}>
              <AuthFormWrapper>
                <RHFInputField
                  inputName="username"
                  label="Username"
                  registerOptions={{
                    required: {
                      value: true,
                      message: "This field is required!",
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
                      message: "This field is required!",
                    },
                  }}
                />
                <Button
                  rounded={"regular"}
                  className="py-4 flex items-center justify-center"
                  type="submit"
                >
                  {loginMutation.isPending ? (
                    <div className="flex items-center">
                      <Spinner className="w-5 h-5 text-[#ffffff] mr-2" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </AuthFormWrapper>
            </form>
          </FormProvider>
          <div className="lg:mt-10 xs:mt-5">
            <p className="text-center text-lg text-gray-500 flex flex-col cursor-pointer">
              <span>Don't have an account yet? </span>
              <span className="text-theme hover:cursor-pointer">
                Register{" "}
                <span className="underline" onClick={() => onClickRegister()}>
                  here
                </span>
                .
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OwnerLogin;
