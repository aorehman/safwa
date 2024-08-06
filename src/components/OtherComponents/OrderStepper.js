import React, { useEffect, useState } from "react";
import { Steps } from "primereact/steps";
import { FaAddressCard } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { TbPackageExport, TbTruckDelivery, TbCheck } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

export default function OrderStepper({ model, activeIndex, registerType }) {
  const itemRenderer = (item, itemIndex) => {
    const isActiveItem = activeIndex === itemIndex;
    const isLastItem = itemIndex === items.length - 1;
    const backgroundColor = item.greenBackground
      ? "bg-green-500"
      : isActiveItem
      ? "bg-primary"
      : "bg-gray-100";

    const textColor = item.greenBackground
      ? "text-white"
      : isActiveItem
      ? "text-gray-100"
      : "text-primary";

    const additionalClass = isLastItem
      ? "before:border-t before:border-gray-300 before:dark:border-blue-900/40 before:w-full before:absolute before:top-1/4 before:left-0 before:transform before:-translate-y-1/2"
      : "";
    return (
      <div className={`flex flex-col items-center ${additionalClass}`}>
        <span
          className={`flex items-center justify-center rounded-full border-primary border-1 h-12 w-12 z-10 cursor-pointer ${backgroundColor} ${textColor}`}
          // onClick={() => setActiveIndex(itemIndex)}
        >
          <item.myIcon className="text-2xl" />
        </span>
        <span className="mt-1 text-sm">{item.label}</span>
      </div>
    );
  };

  const items =
    registerType === "business"
      ? [
          {
            template: (model) => itemRenderer(model, 0),
            label: "Personal Info",
            myIcon: activeIndex > 0 ? TbCheck : IoPersonSharp,
            greenBackground: activeIndex > 0 ? true : false,
          },
          {
            template: (model) => itemRenderer(model, 1),
            label: "Address Info",
            myIcon: activeIndex > 1 ? TbCheck : FaAddressCard,
            greenBackground: activeIndex > 1 ? true : false,
          },
          {
            template: (model) => itemRenderer(model, 2),
            label: "Company Info",
            myIcon: activeIndex > 2 ? TbCheck : FaBuilding,
            greenBackground: activeIndex > 2 ? true : false,
          },
          {
            template: (model) => itemRenderer(model, 3),
            label: "Verification",
            myIcon:  MdVerifiedUser,
            greenBackground: false,
          },
        ]
      : [
          {
            template: (model) => itemRenderer(model, 0),
            label: "Personal Info",
            myIcon: activeIndex > 0 ? TbCheck : IoPersonSharp,
            greenBackground: activeIndex > 0 ? true : false,
          },
          {
            template: (model) => itemRenderer(model, 1),
            label: "Address Info",
            myIcon: activeIndex > 1 ? TbCheck : FaAddressCard,
            greenBackground: activeIndex > 1 ? true : false,
          },
          {
            template: (model) => itemRenderer(model, 2),
            label: "Verification",
            myIcon: MdVerifiedUser,
            greenBackground: false,
          },
        ];

  return (
    <>
      <div className="card">
        <Steps
          model={items}
          activeIndex={activeIndex}
          readOnly={false}
          className="m-2 pt-4"
          pt={{
            menu: { className: "!before:top-1/2" },
          }}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </>
  );
}
