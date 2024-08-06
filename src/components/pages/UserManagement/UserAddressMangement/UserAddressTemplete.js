import { Button } from "primereact/button";
import React, { useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { LiaTruckPickupSolid } from "react-icons/lia";
import { HiOutlineHome } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { ConfirmDialog } from "primereact/confirmdialog";
import { deleteAddress } from "../../../../store/AsyncMethod/UserManagementMethod";
import { getUserAddresses } from "../../../../store/AsyncMethod/GetDataMethod";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";

export default function UserAddressTemplete({ address }) {
  const { t } = useTranslation();
  const [showDelDialog, setShowDelDialog] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const accept = () => {
    dispatch(deleteAddress(address?.id)).then((success) => {
      if (success) {
        setShowDelDialog(false);
        dispatch(getUserAddresses());
      }
    });
  };

  const reject = () => {
    setShowDelDialog(false);
  };
  return user?.role_id == 3 || user?.role_id == 2
    ? [
        <div className="card border border-gray-300 p-4 rounded-md hover:shadow-lg">
          <div>
            <div className="flex justify-between">
              <div className="flex gap-2 font-bold text-primary">
                {address.title === "HOME" ? (
                  <HiOutlineHome className="text-xl my-auto" />
                ) : address.title === "WORK" ? (
                  <BsPersonWorkspace className="text-xl my-auto" />
                ) : address.title === "PICKUP" ? (
                  <LiaTruckPickupSolid className="text-xl my-auto" />
                ) : address.title === "DELIVERY" ? (
                  <MdOutlineDeliveryDining className="text-xl my-auto" />
                ) : null}
                <div className="text-lg my-auto">{address.title}</div>
              </div>

              <div className="flex">
                <Button
                  icon="pi pi-trash"
                  text
                  rounded
                  className="text-orange hover:bg-orange/10 dark:text-orange"
                  onClick={() => setShowDelDialog(true)}
                  pt={{
                    icon: { className: "w-full" },
                  }}
                />
                <Button
                  icon="pi pi-pencil"
                  text
                  rounded
                  className="text-primary hover:bg-primary/10 dark:text-primary"
                  pt={{
                    icon: { className: "w-full" },
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex gap-1 font-semibold dark:text-white">
                {t("address")}:{" "}
                <span className="font-normal">{address.full_address}</span>
              </div>
              <div className="flex gap-0 flex-col">
                <div className="flex gap-1 font-semibold dark:text-white">
                  {t("city")}:{" "}
                  <span className="font-normal">
                    {i18next.language === "en"
                      ? address.city.name_en
                      : address.city.name_ar}
                  </span>
                </div>
                <div className="flex gap-1 font-semibold dark:text-white">
                  {t("neighborhood")}:{" "}
                  <span className="font-normal">
                    {i18next.language === "en"
                      ? address.neighborhood.name_en
                      : address.neighborhood.name_ar}
                  </span>
                </div>
                {/* <div className="flex gap-1 font-semibold">
            Zone:{" "}
            <span className="font-normal">
              {address.zone.name_en}
            </span>
          </div> */}
              </div>
            </div>
          </div>
          <ConfirmDialog
            message={t("delete_this_record")}
            header={t("delete_confirmation")}
            headerClassName="text-2xl font-bold text-primary"
            icon="pi pi-info-circle"
            accept={accept}
            reject={reject}
            acceptLabel={t("yes")}
            rejectLabel={t("no")}
            visible={showDelDialog}
            onHide={() => setShowDelDialog(false)}
            pt={{
              acceptButton: {
                className: "p-orange-btn",
              },
              rejectButton: {
                className: "p-primary-btn",
              },
              root: {
                className:
                  "w-full sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mx-2",
              },
              icon: {
                className: "mx-2",
              },
            }}
          />
        </div>,
      ]
    : [
        <div className="card border border-gray-300 p-4 rounded-md hover:shadow-lg">
          <div>
            <div className="flex justify-between">
              <div className="flex gap-2 font-bold text-primary">
                {address.title === "HOME" ? (
                  <HiOutlineHome className="text-xl my-auto" />
                ) : address.title === "WORK" ? (
                  <BsPersonWorkspace className="text-xl my-auto" />
                ) : address.title === "PICKUP" ? (
                  <LiaTruckPickupSolid className="text-xl my-auto" />
                ) : address.title === "DELIVERY" ? (
                  <MdOutlineDeliveryDining className="text-xl my-auto" />
                ) : null}
                <div className="text-lg my-auto">{address.title}</div>
              </div>

              {/* <div className="flex">
            <Button
              icon="pi pi-trash"
              text
              rounded
              className="text-orange hover:bg-orange/10 dark:text-orange"
              onClick={() => setShowDelDialog(true)}
            />
            <Button
              icon="pi pi-pencil"
              text
              rounded
              className="text-primary hover:bg-primary/10 dark:text-primary"
            />
          </div> */}
            </div>

            <div>
              <div className="flex gap-1 font-semibold dark:text-white">
                {t("address")}:{" "}
                <span className="font-normal">{address.full_address}</span>
              </div>
              <div className="flex gap-0 flex-col">
                <div className="flex gap-1 font-semibold dark:text-white">
                  {t("city")}:{" "}
                  <span className="font-normal">
                    {i18next.language === "en"
                      ? address.city.name_en
                      : address.city.name_ar}
                  </span>
                </div>
                <div className="flex gap-1 font-semibold dark:text-white">
                  {t("neighborhood")}:{" "}
                  <span className="font-normal">
                    {i18next.language === "en"
                      ? address.neighborhood.name_en
                      : address.neighborhood.name_ar}
                  </span>
                </div>
                {/* <div className="flex gap-1 font-semibold">
            Zone:{" "}
            <span className="font-normal">
              {address.zone.name_en}
            </span>
          </div> */}
              </div>
            </div>
          </div>
          <ConfirmDialog
            message={t("delete_this_record")}
            header={t("delete_confirmation")}
            headerClassName="text-2xl font-bold text-primary"
            icon="pi pi-info-circle"
            accept={accept}
            reject={reject}
            acceptLabel={t("yes")}
            rejectLabel={t("no")}
            visible={showDelDialog}
            onHide={() => setShowDelDialog(false)}
            pt={{
              acceptButton: {
                className: "p-orange-btn",
              },
              rejectButton: {
                className: "p-primary-btn",
              },
              root: {
                className:
                  "w-full sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mx-2",
              },
              icon: {
                className: "mx-2",
              },
            }}
          />
        </div>,
      ];
}
