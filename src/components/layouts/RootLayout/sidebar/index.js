import { motion } from "framer-motion";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { MdSearch } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Sidebar = ({
  Nav_animation,
  open,
  setOpen,
  sidebarRef,
  isTabletMid,
  sidebarItems,
  Arrow,
  setArrow,
  elementRef,
}) => {
  const { t } = useTranslation();
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    if (!open) {
      setFilterText("");
    } else {
      setFilterText(filterText);
    }
  }, [open]);
  const [downArrow, setDownArrow] = useState(true);
  useEffect(() => {
    const element = elementRef.current;

    const handleScroll = () => {
      const max =
        element.scrollHeight - Math.floor(element.scrollTop) ===
        element.clientHeight +
          (element.scrollHeight - element.scrollTop === element.clientHeight
            ? 0
            : 1);

      setDownArrow(!max);
    };

    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleUpButtonClick = () => {
    const element = elementRef.current;
    element.scrollTop = 0;
  };
  const handleDownButtonClick = () => {
    const element = elementRef.current;
    element.scrollTop = element.scrollHeight - element.clientHeight;
  };
  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white dark:bg-cardDarkBackground text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-3 font-medium border-b py-3 border-slate-300  mx-3">
          <img src="/images/logo.png" width={45} alt="" />
          <span className="text-2xl font-semibold whitespace-pre text-primary">
            {t("safwa")}
          </span>
        </div>

        <div className="flex flex-col  h-full">
          <ul
            ref={elementRef}
            className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white  scrollbar-thumb-slate-100   md:h-[68%] h-[70%]"
            style={{ scrollbarWidth: "none" }}
          >
            <>
              <Tooltip
                className={i18next.language === "ar" ? "mr-4" : "ml-4"}
                target=".icon-tooltip"
                position={i18next.language === "ar" ? "left" : "right"}
                pt={{
                  root: { className: " shadow-transparent" },
                  arrow: { className: "block" },
                }}
                autoHide={false}
              />
              <li
                onClick={() => setOpen(true)}
                className={`${
                  open
                    ? ""
                    : "hover:bg-blue-100 hover:rounded-md p-2 bg-slate-200 rounded-md hover:cursor-pointer"
                } w-full`}
              >
                {open ? (
                  <span className="p-input-icon-right w-full mb-2">
                    <i className="pi pi-search dark:text-white  rtl:right-auto rtl:left-0 rtl:ml-2 text-gray-400" />
                    <InputText
                      placeholder="Search..."
                      autoFocus
                      className="!w-full "
                      onChange={(e) => setFilterText(e.target.value)}
                      data-pr-tooltip="search"
                    />
                  </span>
                ) : (
                  <MdSearch
                    size={23}
                    className="min-w-full"
                    data-pr-tooltip="Search"
                  />
                )}
              </li>
            </>

            {sidebarItems
              .filter((itm) =>
                itm.name
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(filterText.toLowerCase().replace(/\s/g, ""))
              )
              .map((link, index) =>
                link.showInSidebar ? (
                  <span key={index}>
                    <Tooltip
                      className={i18next.language === "ar" ? "mr-4" : "ml-4"}
                      target=".icon-tooltip"
                      position={i18next.language === "ar" ? "left" : "right"}
                      pt={{
                        root: { className: " shadow-transparent" },
                        arrow: { className: "block" },
                      }}
                      autoHide={false}
                    />
                    <li className="hover:bg-blue-100 hover:rounded-md ">
                      <NavLink
                        to={link.path}
                        className="link icon-tooltip"
                        data-pr-tooltip={link.name}
                      >
                        <link.icon size={23} className="min-w-max " />
                        {link.name}
                      </NavLink>
                    </li>
                  </span>
                ) : null
              )}
          </ul>
          <div className="flex items-center justify-center mt-1">
            <p>
              {Arrow ? (
                downArrow ? (
                  <IoIosArrowDown
                    size={18}
                    className=" cursor-pointer"
                    onClick={handleDownButtonClick}
                  />
                ) : (
                  <IoIosArrowUp
                    size={18}
                    className=" cursor-pointer"
                    onClick={handleUpButtonClick}
                  />
                )
              ) : null}
            </p>
          </div>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            i18next.language === "ar"
              ? open
                ? {
                    x: -183,
                    y: 0,
                    rotate: 180,
                  }
                : {
                    x: -20,
                    y: 0,
                    rotate: 0,
                  }
              : open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: 0,
                  y: 0,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer text-primary dark:text-white"
        >
          <div className="p-2 shadow-sm rounded bg-primary">
            <IoIosArrowBack size={25} className="text-white" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
