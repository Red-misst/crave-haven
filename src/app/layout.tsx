import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// COMPONENTS
import StoreWrapper from "@/app/_components/layout/store";
import Navbar from "@/app/_components/layout/navbar";
import Header from "@/app/_components/layout/header";
import Providers from "@/app/_components/providers/sessionProvider";
// -------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crave Haven",
  description: "Tastiest meals in Moi University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiasedmin-h-screen max-w-6xl mx-auto pt-4 px-2`}
      >
        <Providers>
        <StoreWrapper>
                <Navbar />
                <Header />
                {children}
            </StoreWrapper>
            </Providers>
      </body>
    </html>
  );
}
