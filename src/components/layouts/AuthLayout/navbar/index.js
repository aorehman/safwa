import React from "react";
import LanguagueSwitcher from "../../RootLayout/navbar/LanguagueSwitcher";
import ThemeSwitcher from "../../RootLayout/navbar/ThemeSwitcher";

export default function Navbar() {
  return (
    <nav className="sticky top-3 z-40 flex flex-row flex-wrap items-center justify-end gap-3 bg-white/10  backdrop-blur-xl p-2 dark:bg-[#0b14374d]">
      <div className="flex gap-5 items-center card p-2 shadow-lg rounded-full px-6">
        <div>
          <LanguagueSwitcher />
        </div>
        <div className="cursor-pointer">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
