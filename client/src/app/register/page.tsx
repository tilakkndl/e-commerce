"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/lib/hooks/redux";

import axios from "axios";

import { useState, ChangeEvent, MouseEvent } from "react";
import { setUser } from "@/lib/features/user/userSlice";
import { UserState } from "@/types/user.types";
import { integralCF } from "@/styles/fonts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { showToast } from "@/lib/features/toast/toastSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const registerPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");

  const dispatch = useAppDispatch();

  const inputFields = [
    {
      value: name,
      name: "name",
      type: "text",
      placeholder: "Fullname",
    },
    {
      value: email,
      name: "email",
      type: "text",
      placeholder: "Email",
    },
    {
      value: address,
      name: "address",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      value: password,
      name: "password",
      type: "password",
      placeholder: "Enter a Password",
    },
    {
      value: confirmPassword,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  // Handle input changes
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const submitHandler = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    // Validation check
    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      dispatch(
        showToast({
          message: "Please fill in all fields",
          type: "error",
          duration: 3000,
        })
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<{
        success: boolean;
        token?: string;
        data: UserState;
      }>(`${process.env.NEXT_PUBLIC_ROOT_API}/user/register`, {
        name,
        phoneNumber: phone,
        username: email,
        address,
        password,
        passwordConfirm: confirmPassword,
      });

      if (response.data.success) {
        dispatch(
          showToast({
            message: "Registered successfully!",
            type: "success",
            duration: 3000,
          })
        );

        router.replace("/signin");
      }
    } catch (error: any) {
      dispatch(
        showToast({
          message:
            error.response?.data?.message ||
            "Registration failed. Please try again.",
          type: "error",
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="max-w-frame mx-auto flex justify-center items-center py-auto my-5">
      <div className="p-10">
        <section>
          <div className="flex flex-col space-y-2">
            <h2
              className={`${integralCF.className} text-4xl font-bold text-center`}
            >
              Register an account
            </h2>
            <div className="text-center">
              Already have an account?{" "}
              <Link rel="preload" href={"/signin"}>
                <span className="underline">Log in</span>
              </Link>
            </div>
          </div>
          <div className="py-3 mx-auto mt-3 flex flex-col space-y-5 max-w-[400px]">
            <div className="relative">
              <PhoneInput
                country={"np"}
                value={phone}
                onChange={(value) => setPhone(value)}
                containerClass="!w-full"
                inputClass="!w-full !h-10 !py-2 !px-12 !text-base !border-black !rounded-md focus:!border-black focus:!ring-1 focus:!ring-black"
                buttonClass="!border-black !h-10 !bg-transparent hover:!bg-gray-50 !transition-colors"
                dropdownClass="!bg-white !shadow-lg !border !border-gray-200"
                searchClass="!bg-white !border !border-gray-200 !p-2"
                buttonStyle={{
                  borderRadius: "0.375rem 0 0 0.375rem",
                  borderRight: "none",
                }}
              />
            </div>

            {inputFields.map((field, index) => {
              return (
                <Input
                  value={field.value}
                  name={field.name}
                  onChange={onChangeHandler}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="border-black"
                  key={index}
                />
              );
            })}

            <Button
              type="button"
              onClick={submitHandler}
              className="w-full mx-auto md:w-52 mb-5 md:mb-12 text-center bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-full hover:animate-pulse"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default registerPage;
