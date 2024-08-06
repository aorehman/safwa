import i18next from "i18next";
import { Menu } from "primereact/menu";
import React, { useEffect, useRef, useState } from "react";

export default function LanguagueSwitcher() {
  const [language, setLanguage] = useState(i18next.language);
  const menu = useRef(null);

  let items = [
    {
      label: "English",
      icon: "fi fi-gb",
      command: () => {
        i18next.changeLanguage("en");
      },
    },
    {
      label: "العربية",
      icon: "fi fi-sa",
      command: () => {
        i18next.changeLanguage("ar");
      },
    },
  ];

  const handleLanguageChange = () => {
    setLanguage(i18next.language);
  };

  useEffect(() => {
    document.body.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    i18next.on("languageChanged", handleLanguageChange);

    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, []);
  return (
    <div>
      <Menu
        model={items}
        popup
        ref={menu}
        className="p-0"
        pt={{
          icon: { className: "mx-2" },
          label: { className: "dark:text-white" },
        }}
      />
      <div
        onClick={(e) => menu.current.toggle(e)}
        className="cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-200 transition-all hover:dark:bg-blue-100 rounded-md p-1"
      >
        <i className="pi pi-globe text-lg sm:text-lg text-gray-500 dark:text-white"></i>
        <p className="  dark:text-white text-sm sm:text-base hidden sm:inline-block ">
          {i18next.language === "en" ? "English" : "العربية"}
        </p>
      </div>
    </div>
  );
}
