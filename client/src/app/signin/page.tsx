"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import axios from "axios";
import Image from "next/image";
import { useState, ChangeEvent, MouseEvent } from "react";
import { setUser } from "@/lib/features/user/userSlice";
import { UserState } from "@/types/user.types";
import { integralCF } from "@/styles/fonts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies, { CookieAttributes } from "js-cookie";

const SignInPage = () => {
  const router = useRouter();
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  console.log(user);

  // Handle input changes
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitHandler = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post<{
        success: boolean;
        token?: string;
        data: UserState;
      }>(
        "http://localhost:5000/api/v1/user/login",
        { username, password },
        { withCredentials: true }
      );

      console.log(response);

      if (response.data.success) {
        const token = response.data.token as string;

        Cookies.set("authToken", token, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          path: "/",
        });

        const data = response.data.data;
        const {id,name,username,role}=data._doc;
        dispatch(setUser({ id, name, username, role }));
        console.log(user);
        router.replace("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
              Sign in to your account
            </h2>
            <div className="text-center">
              New to Nephemp?{" "}
              <Link href={"/register"}>
                <span className="underline">Create account</span>
              </Link>
            </div>
          </div>
          <div className="py-3 mx-auto mt-3 flex flex-col space-y-5 max-w-[400px]">
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
