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
        url: "#",
      },
      {
        id: 12,
        label: "shop",
        url: "#",
      },
      {
        id: 13,
        label: "reviews",
        url: "#",
      },
      {
        id: 14,
        label: "contact",
        url: "#",
      },
    ],
  },
  {
    id: 2,
    title: "User",
    children: [
     
      {
        id: 22,
        label: "My Account",
        url: "#",
      },
      {
        id: 23,
        label: "Wish list",
        url: "#",
      },
      {
        id: 24,
        label: "Cart",
        url: "#",
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
        url: "#",
      },
      {
        id: 33,
        label: "Delivery and Payment",
        url: "deliveryandpayment",
      },
      {
        id: 34,
        label: "terms & conditions",
        url: "#",
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
        url: "#",
      },
      {
        id: 42,
        label: "Purse",
        url: "#",
      },
      {
        id: 43,
        label: "Jacket",
        url: "#",
      },
      {
        id: 44,
        label: "Trousers",
        url: "#",
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
