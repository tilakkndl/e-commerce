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
import { showToast } from "@/lib/features/toast/toastSlice";

const SignInPage = () => {
  const router = useRouter();
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

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

    // Validation checks
    if (!username || !password) {
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
        data: { user: UserState; token?: string };
      }>(
        `${process.env.NEXT_PUBLIC_ROOT_API}/user/login`,
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        const { token, user } = response.data.data;

        if (!token) {
          throw new Error("No token received from server");
        }

        dispatch(setUser({ ...user, token }));
        dispatch(
          showToast({
            message: "Signed in successfully!",
            type: "success",
            duration: 3000,
          })
        );
        router.replace("/");
      }
    } catch (error: any) {
      dispatch(
        showToast({
          message:
            error.response?.data?.message ||
            "Sign in failed. Please check your credentials.",
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
              disabled={loading}
              className="w-full mx-auto md:w-52 mb-5 md:mb-12 text-center bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-full hover:animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </section>
        <div className="h-[1px] bg-black/40 w-full my-5"></div>
      </div>
    </main>
  );
};

export default SignInPage;
