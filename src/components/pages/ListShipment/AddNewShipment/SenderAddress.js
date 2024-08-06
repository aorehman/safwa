import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AddNewAddress from "../../UserManagement/UserAddressMangement/AddNewAddress";
import NewSenderInfo from "./NewSenderInfo";
import * as Yup from "yup";

export default function SenderAddress({ formik, setNewSender, newSender }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userAddresses } = useSelector((state) => state.GetDataReducer);
  const { validateErrors, user } = useSelector((state) => state.AuthReducer);

  return (
    <>
      <Divider>
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("sender_detail")}
        </span>
      </Divider>

      {/* {!newSender && user.role_id !== "1" && user.role_id !== "10" ? ( */}
      {!newSender && user.role_id !== "1" && user.role_id !== "10" ? (
        <>
          <div className="mb-2 flex gap-6 justify-end">
            <Button
              label={t("add_new_sender")}
              icon="pi pi-plus"
              className="p-primary-btn dark:text-white dark:bg-primary"
              onClick={() => setNewSender(true)}
              type="button"
              pt={{
                icon: { className: "rtl:mx-2" },
              }}
            />
            <AddNewAddress />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-8">
            <div className="">
              <span className="p-float-label w-full">
                <Dropdown
                  id="pickup_address_id"
                  name="pickup_address_id"
                  value={formik.values.pickup_address_id}
                  onChange={formik.handleChange}
                  options={userAddresses}
                  optionLabel="title"
                  optionValue="id"
                  className="w-full text-lg"
                  // className={`w-full text-lg ${
                  //   validateErrors?.pickup_address_id?.length > 0
                  //     ? "border-vError"
                  //     : ""
                  // }`}
                  pt={{
                    root: { className: "w-full md:w-full p-primary-input" },
                    input: { className: "w-full p-primary-input" },
                    filterInput: { className: "mr-0" },
                    filterIcon: {
                      className: "rtl:right-auto rtl:left-4 dark:text-white",
                    },
                  }}
                />
                <label
                  htmlFor="pickup_address_id"
                  className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                >
                  {t("select_pickup_address")}
                </label>
              </span>
              {formik.touched.pickup_address_id &&
                formik.errors.pickup_address_id && (
                  <div className="p-error">
                    {formik.errors.pickup_address_id}
                  </div>
                )}

              {validateErrors?.pickup_address_id?.length > 0
                ? validateErrors.pickup_address_id.map((err, index) => (
                    <div key={index} className="p-error">
                      {err}
                    </div>
                  ))
                : null}
              {/* {user.role_id !== "1" &&
                user.role_id !== "10" &&
                (validateErrors?.pickup_address_id?.length > 0
                  ? validateErrors.pickup_address_id.map((err, index) => (
                      <div key={index} className="p-error">
                        {err}
                      </div>
                    ))
                  : null)} */}
              {/* {user.role_id !== "1" && user.role_id !== "10" && (
                <>
                  {validateErrors?.pickup_address_id?.length > 0
                    ? validateErrors.pickup_address_id.map((err, index) => (
                        <div key={index} className="p-error">
                          {err}
                        </div>
                      ))
                    : null}
                </>
              )} */}
            </div>
          </div>
        </>
      ) : (
        <NewSenderInfo formik={formik} setNewSender={setNewSender} />
      )}
    </>
  );
}
