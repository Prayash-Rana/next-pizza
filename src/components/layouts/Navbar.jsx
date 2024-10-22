import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegLightbulb } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { CartContext } from "../utils/contextNewReducer";

const Navbar = ({ changeTheme, theme }) => {
  const { state } = useContext(CartContext);
  console.log("state is :", state.length);

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [admin,setAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");


    if (token) {
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    const isadminValue = localStorage.getItem("isAdmin");
    

    if (isadminValue === "true") {
      setAdmin(true)
    }
    else{
      setAdmin(false)
    }
  }, []);


  const handleLogout = () => {
    setIsLoggedin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");

  };

  return (
    <header
      className={`text-white sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 `}
    >
      <div className="container mx-auto flex flex-wrap py-2 flex-col md:flex-row items-center">
        {/* logo  */}
        <Link href={"/"} className="flex items-center">
          <Image alt="navbar logo" src={"/Pizza.svg"} width={60} height={60} />
          <p className="font-bold text-xl mx-4">Pizza Wizza</p>
        </Link>

        {/* nav items  */}

        <nav className="flex flex-wrap space-x-4 items-center text-base justify-center md:ml-auto">
          {/* link 01 */}

          <Link
            href={"/cart"}
            className="text-white mr-5 hover:text-gray-200 flex items-center "
          >
            <p className="text-lg font-semibold">cart</p>

            <div className="relative">
              <TiShoppingCart className="text-3xl ml-1" />
              <span className=" bg-white text-black rounded-full text-sm w-5 h-5 flex  items-center justify-center ml-1 absolute left-6 -top-2  ">
                {state.length}
              </span>
            </div>
          </Link>

          {isLoggedin ? (
            <>
              <Link
                href={"/orders"}
                className="text-white mr-5 hover:text-gray-200 flex items-center "
              >
                <p className="text-md font-semibold">My Orders</p>
              </Link>

              {(admin)? <Link href={"/admin"}>Admin</Link> : ""}

              <Link
                href={"/"}
                className="text-white mr-5 hover:text-gray-200 flex items-center "
              >
                <p className="text-md font-semibold" onClick={handleLogout}>
                  Logout
                </p>
              </Link>
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className="text-white mr-5 hover:text-gray-200 flex items-center "
              >
                <p className="text-md font-semibold">LogIn</p>
              </Link>

              <Link
                href={"/signup"}
                className="text-white mr-5 hover:text-gray-200 flex items-center "
              >
                <p className="text-md font-semibold">Sign Up</p>
              </Link>
            </>
          )}
        </nav>

        <button onClick={changeTheme} className="mx-4 px-4 py-2">
          {theme === "light" ? (
            <MdDarkMode className="text-3xl" />
          ) : (
            <FaRegLightbulb className="text-3xl" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
