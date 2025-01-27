"use client";
import { useState } from "react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectItems } from "@/utils/cartslice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "@/app/_components/search/search";

type SessionUser = {
    name: string;
    image?: string;
    role: string;
};

type Session = {
    user: SessionUser;
};

function Header() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const items = useSelector(selectItems);
    const [dropDown, setDropDown] = useState<boolean>(false);
    const router = useRouter();

    return (
        <>
            {/* Mobile Header */}
            <div className="flex-grow sticky top-0 inset-x-0 bg-white text-gray-900 dark:bg-gray-800 dark:text-white glassmorphism px-1 py-2 block sm:hidden z-20">
                <div className="flex items-center justify-between space-x-4">
                  
                    <div className="flex-grow">
                        <Search />
                    </div>
                 
                </div>
            </div>

            {/* Desktop Header */}
            <header className="sticky top-0 inset-x-0 text-gray-900 dark:text-white glassmorphism px-1 hidden sm:flex z-10">
                <div className="flex items-center w-full max-w-screen-xl py-2 xl:space-x-16 lg:space-x-12 space-x-7 mx-auto">
                    <div className="flex items-center">
                        <Link href="/food-e">
                            <Image
                                src="/images/food-e.png"
                                alt="food-e logo"
                                className="cursor-pointer rounded-full border-2 border-gray-300 dark:border-gray-700 shadow-lg"
                                width={50}
                                height={50}
                            />
                        </Link>
                    </div>
                    <div className="flex-grow">
                        <Search />
                    </div>
                    <div className="flex items-center xl:space-x-12 lg:space-x-10 space-x-7 font-medium lg:text-base text-sm">
                        <Link href="/orders">
                            <span className="link cursor-pointer">Orders</span>
                        </Link>
                    </div>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => router.push("/cart")}
                    >
                        <FaShoppingCart className="xl:w-10 lg:w-9 w-8 link" />
                        {items.length > 0 && (
                            <div className="absolute -top-2 -right-1 rounded-full text-white bg-indigo-500 p-1 flex items-center justify-center text-xs font-extrabold">
                                {items.length}
                            </div>
                        )}
                    </div>
                    {session ? (
                        <span
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                if (session?.user) {
                                    session.user.role === "admin"
                                        ? router.push("/admin/dashboard")
                                        : router.push("/profile");
                                }
                            }}
                        >
                            <img
                                src={session?.user?.image || "/img/profile_pic.svg"}
                                loading="lazy"
                                alt={session?.user?.name || "Profile Image"}
                                width="24"
                                height="24"
                                className="object-contain w-10 h-10 rounded-full mr-1 hover:shadow-md"
                            />
                        </span>
                    ) : (
                        <span className="link cursor-pointer" onClick={() => signIn()}>
                            Login
                        </span>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;