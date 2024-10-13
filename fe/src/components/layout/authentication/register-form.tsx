import useLocalAppStore from "@/services/zustand/store";
import { useForm, useFormContext, UseFormReturn } from "react-hook-form";
import Button from "@/components/button/classic-button";
import { RHFInputField } from "@/components/form/input-field";
import AuthFormWrapper from "@/components/layout/authentication/auth-form-wrapper";
interface RegisterFormProps {
    methodRegister: UseFormReturn;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ methodRegister }) => {
  const setPage = useLocalAppStore((state) => state.setPage);
  const { watch } = methodRegister;
  const password = watch("password", "");
  return (
    <div>
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
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
      <div className="lg:mt-10 xs:mt-5">
        <p className="text-center text-sm text-gray-500 flex flex-col">
          <span>Already have an account?! </span>
          <span
            className="text-theme hover:cursor-pointer"
            onClick={() => setPage("signin")}
          >
            Sign in <span className="underline">here</span>.
          </span>
        </p>
      </div>
    </div>
  );
}
export default RegisterForm;