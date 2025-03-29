"use client";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks/redux";

const NewsLetterSection = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleNewsLetterSubmit = async () => {
    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      dispatch(
        showToast({
          message: "Please enter a valid email address",
          type: "error",
          duration: 3000,
        })
      );
      return;
    }

    setLoading(true);
    const token = Cookies.get("authToken");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_API}/subscriber`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        showToast({
          message: "Successfully subscribed to newsletter!",
          type: "success",
          duration: 3000,
        })
      );

      setEmail(""); // Clear input after success
    } catch (error: any) {
      dispatch(
        showToast({
          message:
            error.response?.data?.message ||
            "Failed to subscribe. Please try again.",
          type: "error",
          duration: 3000,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-[#023993] rounded-[20px]">
      <p
        className={cn([
          integralCF.className,
          "font-bold text-[32px] md:text-[40px] text-white mb-9 md:mb-0",
        ])}
      >
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </p>
      <div className="flex items-center">
        <div className="flex flex-col max-w-[400px] mx-auto">
          <InputGroup className="flex bg-white mb-[14px]">
            <InputGroup.Text>
              <Image
                priority
                src="/icons/envelope.svg"
                height={20}
                width={20}
                alt="email"
                className="min-w-5 min-h-5"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
            />
          </InputGroup>
          <Button
            variant="secondary"
            className="text-sm sm:text-base font-medium bg-[#AD0504] text-white h-12 rounded-full px-4 py-3"
            aria-label="Subscribe to Newsletter"
            type="button"
            onClick={handleNewsLetterSubmit}
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
