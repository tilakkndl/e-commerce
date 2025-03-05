import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import HolyLoader from "holy-loader";
import LayoutWrapper from "@/components/LayoutWrapper";
import Providers from "@/app/providers";
import Modal from "@/components/Modal";

export const metadata: Metadata = {
  title: "Mr. Nephemp",
  description: "For those who admire quality!",
};

export const viewport: Viewport = {
  themeColor: "#023993",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Modal />
        </Providers>
      </body>
    </html>
  );
}
