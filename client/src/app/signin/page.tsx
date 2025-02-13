"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useState, ChangeEvent, MouseEvent } from "react";

const SignInPage = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Handle form submission
  const submitHandler = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<{ success: boolean; token?: string }>(
        "http://localhost:5000/api/v1/user/login",
        { username, password }
      );
      console.log(response);
      if (response.data.success) {
        setLoading(false);
        // Handle success (e.g., store token, redirect user)
      }
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="max-w-frame mx-auto flex justify-center items-center py-auto my-5">
      <div className="p-10">
        <section>
          <div className="flex flex-col space-y-2">
            <h2 className="text-4xl font-bold text-center">
              Sign in to your account
            </h2>
            <div className="text-center">
              New to Nephemp? <span className="underline">Create account</span>
            </div>
          </div>
          <div className="py-3 mt-3 flex flex-col space-y-5">
            <Input
              value={username}
              name="username"
              onChange={onChangeHandler}
              type="text"
              placeholder="Email or Username"
              className="border-black"
            />
            <Input
              value={password}
              name="password"
              onChange={onChangeHandler}
              type="password"
              placeholder="Password"
              className="border-black"
            />
            <Button
              type="button"
              onClick={submitHandler}
              className="w-full mx-auto md:w-52 mb-5 md:mb-12 text-center bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-full hover:animate-pulse"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </section>
        <div className="h-[1px] bg-black/40 w-full my-5"></div>
        <section className="flex flex-col space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex space-x-5 h-[40px] bg-white items-center rounded-full border-black/10 w-fit px-3 mx-auto"
            >
              <Image
                src="/images/google_logo.webp"
                alt="google_logo"
                width={24}
                height={24}
              />
              <div>Continue with Google</div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default SignInPage;
