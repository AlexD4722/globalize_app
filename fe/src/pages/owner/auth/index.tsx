import { UserToken } from "@/services/react_query/functions/mutations";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";

const EmailVerification = () => {
  const authEmailMutation = useMutation<any, Error, any>({
    mutationKey: ["authEmail"],
  });

  const [code, setCode] = useState(Array(6).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input field if a number is entered
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userRegisterResponse = JSON.parse(
      localStorage.getItem("userRegisterResponse") || "{}"
    );
    const verificationCode = code.join("");

    if (userRegisterResponse) {
      authEmailMutation.mutate({
        actor: "owner",
        id: userRegisterResponse.id,
        code: verificationCode,
      });
    
    }
    // Xử lý logic xác thực mã ở đây
  };
  useEffect(() => {
    if (authEmailMutation.isSuccess) {
        router.push("/owner");
        //remove data local storage
        localStorage.removeItem("userRegisterResponse");
        localStorage.removeItem("userRegister");
        Store.addNotification({
            title: "Success!",
            message: "Complete verification successfully! Please sign in!",
            type: "success",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
    }
  }, [authEmailMutation.isSuccess]);
  useEffect(() => {
    if (authEmailMutation.isError) {
      Store.addNotification({
        title: "Error!",
        message: "An error occurred while verifying email!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  }, [authEmailMutation.error]);
  useEffect(() => {
    const userRegisterResponse = JSON.parse(
      localStorage.getItem("userRegisterResponse") || "{}"
    );
    if (!userRegisterResponse) {
      router.push("/owner/app");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Email Verification
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex justify-between mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-[#f43f5e] focus:outline-none "
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#f43f5e] text-white font-semibold rounded-lg shadow-md hover:bg-[#f43f5e] focus:outline-none focus:ring-2 focus:ring-[#f43f5e] focus:ring-opacity-75"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
