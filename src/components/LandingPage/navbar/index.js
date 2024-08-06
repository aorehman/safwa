import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguagueSwitcher from "../../layouts/RootLayout/navbar/LanguagueSwitcher";
import ThemeSwitcher from "../../layouts/RootLayout/navbar/ThemeSwitcher";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { IoLogoIonic } from "react-icons/io";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

export default function Navbar() {
  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.AuthReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  let isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [openj, setOpenj] = useState(isMobile ? false : true);
  let Links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  return (
    <nav className=" w-full z-10 fixed shadow-md top-0 left-0 bg-white/10  backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="md:flex items-center justify-between py-4 md:!py-0 px-7 ">
        <div className="font-bold text-2xl cursor-pointer flex dark:text-white items-center text-gray-500">
          <span className="text-3xl text-indigo-600 mr-1 rtl:mr-0 rtl:ml-2">
            {/* <IoLogoIonic /> */}
            <img src="/images/logo.png" width={45} alt="" />
          </span>
          {t("safwa")}
        </div>

        <div className="text-3xl absolute right-8 rtl:right-auto rtl:left-8 top-4 cursor-pointer md:hidden">
          {open ? (
            <IoCloseSharp onClick={() => setOpen(false)} />
          ) : (
            <HiMenuAlt2 onClick={() => setOpen(true)} />
          )}
          <div className="text-3xl flex items-center px-2 absolute right-10 rtl:right-auto rtl:left-10 top-0 gap-4 md:hidden">
            <LanguagueSwitcher />
            <ThemeSwitcher />
          </div>
        </div>

        <ul
          className={`md:flex md:items-center md:p-0 lg:bg-transparent md:bg-transparent lg:shadow-none md:shadow-none bg-white shadow-sm absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 p-2 transition-all duration-500 ease-in ${
            open ? "top-20 opacity-100" : "top-[-490px]"
          } md:opacity-100 opacity-0`}
        >
          {/* {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))} */}

          <div className="lg:flex md:flex items-center hidden gap-4 py-2 px-0 md:ml-8">
            <ThemeSwitcher />
            <LanguagueSwitcher />
          </div>
          <div className="flex flex-col py-3 gap-3">
            {token ? (
              <>
                {/* <div className="flex justify-evenly items-center ">
                  {Links.map((link) => (
                    <a>{link.name}</a>
                  ))}
                </div> */}
                <Link
                  to={"/client/dashboard"}
                  className="p-primary-btn text-white rounded py-2 px-6 md:ml-8  dark:text-white dark:bg-primary text-center"
                >
                  {t("dashboard")}
                </Link>
              </>
            ) : (
              <Button
                disabled={loading}
                type="submit"
                label={loading ? "..." : t("signin")}
                className="p-primary-btn py-2 px-6 md:ml-8 dark:text-white dark:bg-primary "
                onClick={() => navigate("/login")}
              />
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}
