import React, { useEffect, useRef, useState } from "react";
import SignUpStepForm from "./SignUpStepForm";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getStores } from "../../../store/AsyncMethod/GetDataMethod";

export default function RegistrationMain() {
  const [registerType, setRegisterType] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities());
    // dispatch(getStores());
  }, []);

  return (
    <div className="flex justify-center items-center">
      {/* <ScrollPanel
        style={{ width: "100%", height: "100%" }}
        pt={{
          barY: {
            className: "bg-secondary",
          },
        }}
      > */}
      <div className="card w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 p-8 my-16 shadow-md rounded-lg m-auto">
        {registerType === null ? (
          <>
            <h1 className="text-5xl font-bold text-primary text-center my-12 capitalize dark:text-white">
              {t("safwa")}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-28">
              <Button
                type="button"
                label={t("personal")}
                icon="pi pi-user"
                className="p-primary-btn dark:text-white dark:bg-primary"
                pt={{
                  root: { className: "justify-center gap-4" },
                  icon: { className: "text-3xl " },
                  label: { className: "text-3xl grow-0" },
                }}
                onClick={() => setRegisterType("personal")}
              />
              <Button
                type="button"
                label={t("business")}
                icon="pi pi-home"
                pt={{
                  root: { className: "justify-center gap-4" },
                  icon: { className: "text-3xl " },
                  label: { className: "text-3xl grow-0" },
                }}
                className="p-primary-btn dark:text-white dark:bg-primary"
                onClick={() => setRegisterType("business")}
              />
            </div>
            <div className="text-center text-lg dark:text-white">
              {t("have_account")}
              <Link to={"/login"}>
                <span className="text-orange text-semibold cursor-pointer">
                  {t("click_to_login")}
                </span>
              </Link>
            </div>
          </>
        ) : (
          <SignUpStepForm
            registerType={registerType}
            onBack={() => setRegisterType(null)}
          />
        )}
      </div>
      {/* </ScrollPanel> */}
    </div>
  );
}
