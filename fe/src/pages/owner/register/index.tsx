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
import { Store } from "react-notifications-component";
const OwnerRegister = () => {
  const methodRegister = useForm();
  const { watch } = methodRegister;
  const password = watch("password", "");
  const router = useRouter();

  const registerMutation = useMutation<any, Error, any>({
    mutationKey: ["register"],
  });

  const onSubmitRegister = (data: any) => {
    registerMutation.mutate({ actor: "owner", UserRegister: data });
    if (registerMutation.isError) {
      Store.addNotification({
        title: "Error!",
        message: "An error occurred while registering!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else {
      router.push("/owner/auth");
      //save data to local storage
      localStorage.setItem("userRegister", JSON.stringify(data));

      //show notification
      Store.addNotification({
        title: "Success!",
        message: "Register successfully!",
        type: "success",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  };

  return (
    <div>
      <div className="relative min-h-screen flex items-center justify-center mt-10 mb-30 z-11">
        <div className="w-full max-w-[35rem]">
          <div className="w-full flex flex-col items-center justify-center mb-10">
            <Logo height="3rem" />
            <p className="text-textUnfocus text-sm opacity-75 underline">
              Owner only.
            </p>
          </div>

          <FormProvider {...methodRegister}>
            <form onSubmit={methodRegister.handleSubmit(onSubmitRegister)}>
              <AuthFormWrapper>
                <div className="flex flex-wrap gap-1 justify-between">
                  <RHFInputField
                    inputName="firstName"
                    label="First Name"
                    registerOptions={{
                      required: {
                        value: true,
                        message: "This field is required!",
                      },
                    }}
                  />
                  <RHFInputField
                    inputName="lastName"
                    label="Last Name"
                    registerOptions={{
                      required: {
                        value: true,
                        message: "This field is required!",
                      },
                    }}
                  />
                </div>
                <RHFInputField
                  inputName="email"
                  label="Email"
                  registerOptions={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address!",
                    },
                  }}
                />
                <RHFInputField
                  inputName="username"
                  label="Username"
                  registerOptions={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                    minLength: {
                      value: 6,
                      message: "Username must be at least 6 characters long!",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "Username can only contain letters and numbers!",
                    },
                  }}
                />
                <RHFInputField
                  inputName="idNumber"
                  label="ID Number"
                  registerOptions={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "ID Number must contain only numbers!",
                    },
                  }}
                />
                <RHFInputField
                  inputName="phoneNumber"
                  label="Phone Number"
                  registerOptions={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must contain only numbers!",
                    },
                  }}
                />
                <RHFInputField
                  inputName="taxNumber"
                  label="Tax Number"
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
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long!",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
                    },
                  }}
                />
                <RHFInputField
                  inputName="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  registerOptions={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                    validate: (value) =>
                      value === password || "Passwords do not match!",
                  }}
                />
                <Button rounded={"regular"} className="py-4" type="submit">
                  Sign Up
                </Button>
              </AuthFormWrapper>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
export default OwnerRegister;
