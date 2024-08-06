import { Avatar } from "primereact/avatar";
import React, { useEffect, useRef, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguagueSwitcher from "./LanguagueSwitcher";
import { MdChevronLeft, MdChevronRight, MdMenu } from "react-icons/md";
import { classNames } from "primereact/utils";
import { Menu } from "primereact/menu";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { ConfirmDialog } from "primereact/confirmdialog";
import {
  logoutAll,
  userLogout,
} from "../../../../store/AsyncMethod/AuthMethod";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import ChangePasswordMain from "../../../Authentication/ChangePassword/ChangePasswordMain";
import i18next from "i18next";
import { Button } from "primereact/button";
export default function Navbar({ setOpen, sidebarItems }) {
  const menu = useRef(null);
  const { user } = useSelector((state) => state.AuthReducer);
  const location = useLocation();
  const currentPath = location.pathname;
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const { t } = useTranslation();
  const firstletter = user.first_name
    ?.split("")
    ?.splice(0, 1)
    ?.join("")
    ?.toUpperCase();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDelDialog) {
        if (
          event.target.closest(".p-dialog-content") === null &&
          event.target.closest(".p-dialog") === null
        ) {
          setShowDelDialog(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDelDialog]);

  const matchPath = sidebarItems.find((link) =>
    currentPath.startsWith(link.path)
  );

  const home = { icon: "pi pi-home", command: () => navigate("/") };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const generateBreadcrumbs = () => {
    if (!matchPath) {
      return [];
    }

    const breadcrumbs = [];

    if (matchPath.parents) {
      matchPath.parents.forEach((parent, index) => {
        const parentLink = sidebarItems.find((link) => link.name === parent);
        if (parentLink) {
          breadcrumbs.push({
            label: parentLink.name,
            icon: parentLink.icon,
            command: () => navigate(parentLink.path),
          });
        }
      });
    }

    breadcrumbs.push({
      label: matchPath.name,
      icon: matchPath.icon,
      className: "font-bold",
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // let items =
  //   user?.role_id == 3 || user?.role_id == 2
  //     ? [
  //         {
  //           label: t("change_Password"),
  //           icon: "pi pi-unlock",
  //           command: () => {
  //             setChangePasswordVisible(true);
  //           },
  //         },
  //         {
  //           label: t("Log_out"),
  //           icon: "pi pi-sign-out",
  //           command: () => {
  //             setShowDelDialog(true);
  //           },
  //         },
  //         { separator: true },
  //         {
  //           command: () => {
  //             navigate(`/client/user-profile`);
  //           },
  //           template: (item, options) => {
  //             return (
  //               <button
  //                 onClick={(e) => options.onClick(e)}
  //                 className={classNames(
  //                   options.className,
  //                   "w-full p-link flex align-items-center p-2 px-4 text-color hover:surface-200 border-noround"
  //                 )}
  //               >
  //                 <Avatar
  //                   label={user.profile_photo ? null : firstletter}
  //                   image={user.profile_photo ? user.profile_photo : null}
  //                   className="mx-2 dark:text-white dark:bg-primary cursor-pointer"
  //                   shape="circle"
  //                 />
  //                 <div className="flex flex-col align">
  //                   <span className="font-bold capitalize">
  //                     {user.first_name + " " + user.last_name}
  //                   </span>
  //                   <span className="text-sm capitalize">Client</span>
  //                 </div>
  //               </button>
  //             );
  //           },
  //         },
  //       ]
  //     : user?.role_id == 1
  //     ? [
  //         {
  //           label: t("change_Password"),
  //           icon: "pi pi-unlock",
  //           command: () => {
  //             setChangePasswordVisible(true);
  //           },
  //         },
  //         {
  //           label: t("Log_out"),
  //           icon: "pi pi-sign-out",
  //           command: () => {
  //             setShowDelDialog(true);
  //           },
  //         },
  //         { separator: true },
  //         {
  //           command: () => {
  //             navigate(`/admin/user-profile`);
  //           },
  //           template: (item, options) => {
  //             return (
  //               <button
  //                 onClick={(e) => options.onClick(e)}
  //                 className={classNames(
  //                   options.className,
  //                   "w-full p-link flex align-items-center p-2 px-4 text-color hover:surface-200 border-noround"
  //                 )}
  //               >
  //                 <Avatar
  //                   label={user.profile_photo ? null : "S"}
  //                   image={user.profile_photo ? user.profile_photo : null}
  //                   className="mx-2 dark:text-white dark:bg-primary cursor-pointer"
  //                   shape="circle"
  //                 />
  //                 <div className="flex flex-col align">
  //                   <span className="font-bold capitalize">
  //                     {user.first_name + " " + user.last_name}
  //                   </span>
  //                   <span className="text-sm capitalize">Admin</span>
  //                 </div>
  //               </button>
  //             );
  //           },
  //         },
  //       ]
  //     : [
  //         {
  //           label: t("change_Password"),
  //           icon: "pi pi-unlock",
  //           command: () => {
  //             setChangePasswordVisible(true);
  //           },
  //         },
  //         {
  //           label: t("Log_out"),
  //           icon: "pi pi-sign-out",
  //           command: () => {
  //             setShowDelDialog(true);
  //           },
  //         },
  //         { separator: true },
  //         {
  //           command: () => {
  //             navigate(`/keeper/user-profile`);
  //           },
  //           template: (item, options) => {
  //             return (
  //               <button
  //                 onClick={(e) => options.onClick(e)}
  //                 className={classNames(
  //                   options.className,
  //                   "w-full p-link flex align-items-center p-2 px-4 text-color hover:surface-200 border-noround"
  //                 )}
  //               >
  //                 <Avatar
  //                   label={user.profile_photo ? null : "S"}
  //                   image={user.profile_photo ? user.profile_photo : null}
  //                   className="mx-2 dark:text-white dark:bg-primary cursor-pointer"
  //                   shape="circle"
  //                 />
  //                 <div className="flex flex-col align">
  //                   <span className="font-bold capitalize">
  //                     {user.first_name + " " + user.last_name}
  //                   </span>
  //                   <span className="text-sm capitalize">Keeper</span>
  //                 </div>
  //               </button>
  //             );
  //           },
  //         },
  //       ];

  let items = [
    {
      label: t("change_Password"),
      icon: "pi pi-unlock",
      command: () => {
        setChangePasswordVisible(true);
      },
    },
    {
      label: t("Log_out"),
      icon: "pi pi-sign-out",
      command: () => {
        setShowDelDialog(true);
      },
    },
    { separator: true },
    {
      command: () => {
        if (user?.role_id == 2 || user?.role_id == 3) {
          navigate(`/client/user-profile`);
        } else if (user?.role_id == 1) {
          navigate(`/admin/user-profile`);
        } else if (user?.role_id == 8) {
          navigate(`/customer-care/user-profile`);
        } else if (user?.role_id == 10) {
          navigate(`/keeper/user-profile`);
        } else {
          navigate("/client/dashboard");
        }
      },
      template: (item, options) => {
        return (
          <button
            onClick={(e) => options.onClick(e)}
            className={classNames(
              options.className,
              "w-full p-link flex align-items-center p-2 px-4 text-color hover:surface-200 border-noround"
            )}
          >
            <Avatar
              label={user.profile_photo ? null : firstletter}
              image={user.profile_photo ? user.profile_photo : null}
              className="mx-2 dark:text-white dark:bg-primary cursor-pointer"
              shape="circle"
            />
            <div className="flex flex-col align">
              <span className="font-bold capitalize">
                {user.first_name + " " + user.last_name}
              </span>
              <span className="text-sm capitalize">Client</span>
            </div>
          </button>
        );
      },
    },
  ];

  const handleLogoutAll = () => {
    dispatch(logoutAll(user.token));
  };
  const handleLogoutCurrent = () => {
    dispatch(userLogout(user.token));
  };
  const renderFooter = () => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          label="Logout from all devices"
          onClick={() => {
            handleLogoutAll();
          }}
        />
        <Button
          label="Logout"
          className="bg-red-500 hover:bg-red-600 border-red-500"
          onClick={() => {
            handleLogoutCurrent();
          }}
        />
        {/* <Button label="Cancel" /> */}
      </div>
    );
  };

  const footer = renderFooter();
  return (
    <nav className="sticky top-0 z-40 flex flex-row flex-wrap items-center justify-between gap-3 bg-white/10  backdrop-blur-xl p-2 pr-4 pl-2 dark:bg-[#0b14374d]">
      <div>
        <div>
          <BreadCrumb
            model={breadcrumbItems}
            home={home}
            separatorIcon={
              i18next.language === "ar" ? (
                <MdChevronLeft size={"1.5rem"} className="text-primary" />
              ) : (
                <MdChevronRight size={"1.5rem"} className="text-primary" />
              )
            }
            pt={{
              root: { className: "bg-inherit" },
              label: { className: "text-primary text-xl dark:text-white/70" },
              icon: { className: "text-primary text-xl dark:text-white/70" },
            }}
          />
        </div>
      </div>
      <div className="flex gap-6 items-center card p-2 px-4 shadow-lg rounded-full">
        <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
          <MdMenu size={25} />
        </div>
        <div>
          <LanguagueSwitcher />
        </div>
        <div className="cursor-pointer">
          <ThemeSwitcher />
        </div>
        <div className="h-10 w-10">
          <Avatar
            label={user.profile_photo ? null : firstletter}
            image={user.profile_photo ? user.profile_photo : null}
            size="large"
            shape="circle"
            className="dark:text-white dark:bg-primary cursor-pointer !h-10 !w-10 "
            onClick={(e) => menu.current.toggle(e)}
          />
          <Menu
            model={items}
            popup
            ref={menu}
            className="p-0 profile-menu"
            pt={{
              icon: { className: "text-start" },
              label: { className: "mx-2 dark:text-white" },
              menuitem: { className: "hover:bg-secondary" },
            }}
          />
        </div>
      </div>
      <ConfirmDialog
        message={t("Log_out_of_your_acount?")}
        header={t("Log_out_confirmation")}
        icon="pi pi-power-off"
        headerClassName="text-2xl font-bold text-primary"
        footer={footer}
        visible={showDelDialog}
        onHide={() => setShowDelDialog(false)}
        className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12"
      />

      <Dialog
        header="Change Password"
        headerClassName="text-2xl font-bold text-primary"
        className=" !w-11/12 sm:!w-1/2"
        visible={changePasswordVisible}
        onHide={() => setChangePasswordVisible(false)}
        pt={{
          root: {
            className: "w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12",
          },
        }}
      >
        <ChangePasswordMain
          setChangePasswordVisible={setChangePasswordVisible}
        />
      </Dialog>
    </nav>
  );
}
