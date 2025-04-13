"use client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import ProfileButton from "./ProfileBtn";
import { useRouter } from "next/navigation";

const data: NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuItem",
    url: "/shop?status=active",
    // type: "MenuList",
    children: [
      // {
      //   id: 11,
      //   label: "Men's clothes",
      //   url: "/shop?status=active&sex=male",
      //   description: "In attractive and spectacular colors and designs",
      // },
      // {
      //   id: 12,
      //   label: "Women's clothes",
      //   url: "/shop?status=active&sex=female",
      //   description: "Ladies, your style and tastes are important to us",
      // },
      // {
      //   id: 13,
      //   label: "Kids clothes",
      //   url: "/shop?status=active&age=kid",
      //   description: "For all ages, with happy and beautiful colors",
      // },
      // {
      //   id: 14,
      //   label: "Bags",
      //   url: "/shop?status=active&category=67bc8c6910042b46ed451b3d",
      //   description: "Suitable for men, women and all tastes and styles",
      // },
    ],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "About Us",
    url: "/about",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "Contact Us",
    url: "/contact",
    children: [],
  },
];

const TopNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // If search is cleared (empty), redirect to shop with active status
    if (!value) {
      router.push("/shop?status=active");
    }
  };

  const handleMobileSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center ">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px]  mr-3 lg:mr-10",
            ])}
          >
            <Image
              src="/images/logo.png"
              height={150}
              width={150}
              alt="logo"
              className="w-20 h-15 md:w-40 md:h-20"
            />
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {/* {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )} */}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <form
          onSubmit={handleSearch}
          className="hidden md:block flex-1 max-w-md mr-3 lg:mr-10"
        >
          <InputGroup className="hidden md:flex bg-[#F0F0F0]">
            <InputGroup.Text>
              <Image
                priority
                src="/icons/search.svg"
                height={20}
                width={20}
                alt="search"
                className="min-w-5 min-h-5"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="search"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="bg-transparent placeholder:text-black/40"
            />
          </InputGroup>
        </form>
        <div className="flex items-center">
          <div ref={dropdownRef} className="relative block md:hidden mr-[14px]">
            <button
              onClick={() => setSearchDropdownOpen(!searchDropdownOpen)}
              className="p-1"
            >
              <Image
                priority
                src="/icons/search-black.svg"
                height={100}
                width={100}
                alt="search"
                className="max-w-[22px] max-h-[22px]"
              />
            </button>
            {searchDropdownOpen && (
              <div className="absolute top-full -left-32 mt-2 bg-white shadow-lg rounded-md p-4 w-64">
                <form onSubmit={handleSearch}>
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Text>
                      <Image
                        priority
                        src="/icons/search.svg"
                        height={20}
                        width={20}
                        alt="search"
                        className="min-w-5 min-h-5"
                      />
                    </InputGroup.Text>
                    <InputGroup.Input
                      type="search"
                      name="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search for products..."
                      className="bg-transparent placeholder:text-black/40"
                    />
                  </InputGroup>
                </form>
              </div>
            )}
          </div>
          <CartBtn />
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
