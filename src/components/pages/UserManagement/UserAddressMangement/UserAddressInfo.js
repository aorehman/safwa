import { Divider } from "primereact/divider";
import React from "react";
import { useTranslation } from "react-i18next";
import AddNewAddress from "./AddNewAddress";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import UserAddressTemplete from "./UserAddressTemplete";
import NotFoundRecord from "../../../PageNotFound/NotFoundRecord";

export default function UserAddressInfo() {
  const { t } = useTranslation();
  const { userAddresses } = useSelector((state) => state.GetDataReducer);

  return (
    <div className="my-4">
      <div className="card pt-1 pb-5 shadow-md rounded-lg px-4">
        <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
            {t("address_information")}
          </span>
        </Divider>

        <div>
          <AddNewAddress />
        </div>
        <div className="my-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {userAddresses && userAddresses.length > 0 ? (
              userAddresses.map((address, index) => (
                <UserAddressTemplete key={address.id} address={address} />
              ))
            ) : (
              <div className="col-span-1 lg:col-span-2 xl:col-span-3 ">
                <NotFoundRecord />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
