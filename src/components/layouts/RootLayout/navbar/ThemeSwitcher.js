import i18next from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

export default function ThemeSwitcher({ openj }) {
  const [darkMode, setDarkMode] = useState(false);
  const { t } = useTranslation();
  const onThemeToggler = () => {
    const root = document.getElementsByTagName("html")[0];

    root.classList.toggle("dark");
    setDarkMode(!darkMode);
  };
  return (
    <div
      onClick={onThemeToggler}
      className="cursor-pointer flex items-center justify-center  gap-1  hover:bg-gray-200 transition-all hover:dark:bg-blue-100 rounded-md"
    >
      {darkMode ? (
        <>
          <RiSunFill className=" text-lg  text-gray-500 dark:text-white" />
          <p className="dark:text-white text-sm sm:text-base hidden sm:inline-block ">
            {t("light")}
          </p>
        </>
      ) : (
        <>
          <RiMoonFill className=" text-lg text-gray-500 dark:text-white" />
          <p className="dark:text-white text-sm sm:text-base hidden sm:inline-block">
            {t("dark")}
          </p>
        </>
      )}
    </div>
  );
}
