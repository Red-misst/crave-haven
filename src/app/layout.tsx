import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// COMPONENTS
import StoreWrapper from "../_components/food-e/layout/store";
import Navbar from "../_components/food-e/layout/navbar";
import Header from "../_components/food-e/layout/header";

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
        <StoreWrapper>
                <Navbar />
                <Header />
                {children}
            </StoreWrapper>
      </body>
    </html>
  );
}
