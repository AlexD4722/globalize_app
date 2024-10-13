import useLocalAppStore from "@/services/zustand/store";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import SignInForm from "./signin-form";
import RegisterForm from "./register-form";
import { Close } from "@/components/svg";
import { useMutation } from "@tanstack/react-query";
import useCheckLogin from "@/services/customHook/useCheckLogin";
import { UserToken } from "@/services/react_query/functions/mutations";
import { useRouter } from "next/router";
import { Store } from "react-notifications-component";

// Form handle and validation using React-hook-form library
//https://www.react-hook-form.com/api/useformcontext/

export default function Authentication() {
  const router = useRouter();
  const popup = useLocalAppStore((state) => state.authPopup);
  const setPopup = useLocalAppStore((state) => state.setAuthPopup);
  const page = useLocalAppStore((state) => state.page);
  const methods = useForm();

  const registerMutation = useMutation<any, Error, any>({
    mutationKey: ["register"],
  });
  // Use this to check login status, true if user is logged in
  const isLogin = useCheckLogin("guest");

  const mutation = useMutation<unknown, Error, UserToken, unknown>({
    mutationKey: ["login"],
  });

  const onSubmit = (data: any) => {
    //Handle submitted data here

    if (page === "signin") {
      //Handle signin data from form
      mutation.mutate({
        username: data["email-signin"],
        password: data["password-signin"],
        type: { actor: "guest" },
      });
    }

    if (page === "register") {
        registerMutation.mutate({ actor: "guest", UserRegister: data });
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
          router.push("/guest/auth");
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
    }
  };

  useEffect(() => {
    if (popup) {
      //Disable scrolling on html root when pop up open
      document.body.classList.add("disable-scrolling");
    } else {
      document.body.classList.remove("disable-scrolling");
    }
  }, [popup]);

  useEffect(() => {
    if (isLogin) {
      setPopup(false);
    }
  }, [isLogin, setPopup]);

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 left-0 w-screen min-h-screen z-[50] py-[10vh] overflow-auto",
          popup ? "opacity-100" : "opacity-0 pointer-events-none select-none"
        )}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#000000ad] z-0"
          onClick={() => setPopup(false)}
        />
        <div
          className={clsx(
            "relative pb-10 lg:w-[50vW] xs:w-[80vW] max-h-[80vH] overflow-auto bg-white m-auto rounded-xl z-10 duration-300 ease-out",
            popup ? "opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="border-b border-borderDefault bg-white px-[10%] rounded-t-3xl sticky top-0 z-[5]">
            <h2 className="w-fit m-auto py-5 text-2xl font-bold">
              {page === "signin" ? <>Sign In</> : <>Register</>}
            </h2>
            <button
              onClick={() => setPopup(false)}
              className="absolute top-1/2 -translate-y-1/2 right-5 p-2 border-borderDefault border rounded-full text-xl hover:elevation-color-2"
            >
              <Close />
            </button>
          </div>
          <div className="px-[10%]">
            <h3 className="my-5 lg:text-2xl xs:text-xl font-medium">
              Welcome to Globalize
            </h3>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {page === "signin" ? <SignInForm /> : <RegisterForm methodRegister={methods} />}
              </form>
            </FormProvider>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
