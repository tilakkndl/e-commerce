import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinksData: FooterLinks[] = [
  {
    id: 1,
    title: "company",
    children: [
      {
        id: 11,
        label: "about",
        url: "/about",
      },
      {
        id: 12,
        label: "shop",
        url: "/shop",
      },

      {
        id: 14,
        label: "contact",
        url: "/contact",
      },
    ],
  },
  {
    id: 2,
    title: "User",
    children: [
      {
        id: 22,
        label: "Login",
        url: "/signin",
      },
      {
        id: 23,
        label: "Sign Up",
        url: "/register",
      },
    ],
  },
  {
    id: 3,
    title: "Information",
    children: [
      {
        id: 32,
        label: "FAQ",
        url: "/faq",
      },
      {
        id: 33,
        label: "Delivery and Payment",
        url: "/deliveryandpayment",
      },
      {
        id: 34,
        label: "terms & conditions",
        url: "/terms-and-conditions",
      },
    ],
  },
  {
    id: 4,
    title: "Categories",
    children: [
      {
        id: 41,
        label: "Bags",
        url: "/shop?category=67bc8c6910042b46ed451b3d",
      },
      {
        id: 42,
        label: "Purse",
        url: "/shop?category=67e945a1f90aa9015caf1d7a",
      },
      {
        id: 43,
        label: "Jacket",
        url: "/shop?category=67e945acf90aa9015caf1d80",
      },
      {
        id: 44,
        label: "Trousers",
        url: "/shop?category=67e945a7f90aa9015caf1d7d",
      },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6 text-[#023993]">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                link.id !== 41 && link.id !== 43 && "capitalize",
                "text-black/60 text-sm md:text-base mb-4 w-fit",
              ])}
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
