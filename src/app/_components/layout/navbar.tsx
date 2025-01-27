"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { BsPerson } from "react-icons/bs";
import { FiHome, FiPackage } from "react-icons/fi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectItems } from "@/utils/cartslice"
import Image from "next/image";

interface MenuItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

const Navbar: React.FC = () => {
  const [active, setActive] = useState<number>(0);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { data: session } = useSession();
  const items = useSelector(selectItems);

  const Menus: MenuItem[] = [
    {
      name: "Home",
      icon: <FiHome className={`font-weight-500 ${active === 0 ? "font-bold h-5 w-5" : ""}`} />,
      path: "/",
    },
    {
      name: "Cart",
      icon: (
        <FaShoppingCart className={`font-weight-500 ${active === 1 ? "font-bold h-5 w-5" : ""}`} />
      ),
      path: "/cart",
    },
    {
      name: "Orders",
      icon: <FiPackage className={`font-weight-500 ${active === 2 ? "font-bold h-5 w-5" : ""}`} />,
      path: "/orders",
    },
    {
      name: "Profile",
      icon: <BsPerson className={`font-weight-500 ${active === 3 ? "font-bold h-5 w-5" : ""}`} />,
      path: "/profile",
    },
  ];

  const handleClick = (index: number) => {
    setActive(index);
  };

  useEffect(() => {
    const currentRoute = Menus.findIndex((menu) => window.location.pathname === menu.path);
    if (currentRoute !== -1) {
      setActive(currentRoute);
    }
  }, [Menus]);

  return (
    <div className="flex justify-center items-center fixed bottom-0 left-0 w-full z-10">
      {collapsed ? (
        <div className="fixed right-0 bottom-1 bg-gradient-to-r from-sky-400 to-indigo-400 max-h-[5rem] p-6 rounded-xl shadow-lg transition-all duration-2000 ease-in-out block md:hidden lg:hidden">
          <div onClick={() => setCollapsed(false)}>
            <AiOutlineMenu className="text-white cursor-pointer" />
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-yellow-300 to-orange-400 max-h-[5rem] px-6 relative rounded-xl shadow-lg transition-all duration-2000 ease-in-out block md:hidden lg:hidden">
       
        
          <ul className="flex relative w-full">
            {Menus.map((menu, i) => (
              <li key={i} className="w-16">
                <div
                  className="flex flex-col text-center p-6"
                  onClick={() => handleClick(i)}
                >
                  <Link href={menu.path}>
                    <span
                      className={`text-xl cursor-pointer duration-500 flex align-middle justify-center m-auto ${
                        i === active ? "text-white z-10 m-auto" : "text-gray-500"
                      }`}
                    >
                      {menu.path === "/profile" ? (
                        session ? (
                          <Image
                            src={session.user?.image || ""}
                            alt="User profile"
                            className="rounded-full h-full w-full"
                            width={50}
                            height={50}
                            onClick={() =>
                              session.user?.role === "admin"
                                ? "/admin/dashboard"
                                : "/profile"
                            }
                          />
                        ) : (
                          <div onClick={() => signIn()}>{menu.icon}</div>
                        )
                      ) : menu.path === "/cart" ? (
                        <div className="relative">
                          {menu.icon}
                          <div className="absolute -top-3 -right-3 rounded-full text-white bg-indigo-500 p-1 flex items-center justify-center text-xs font-extrabold">
                            {items?.length}
                          </div>
                        </div>
                      ) : (
                        menu.icon
                      )}
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div
            className="absolute -top-3 -right-1 rounded-full text-white bg-red-500 p-1 flex items-center justify-center text-xs font-extrabold"
            onClick={() => setCollapsed(true)}
          >
            <AiOutlineClose className="text-white cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;