import { Button } from "primereact/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux"; // Added useDispatch
import AddressInfoFields from "./AddressInfoFields";
import { sendOtp } from "../../../store/AsyncMethod/AuthMethod";

export default function AddressInfo({ formik, onNext, onBack, registerType }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.AuthReducer);
  const data = { phone: formik.values.personalInfo.phone };
  const handleNextClick = () => {
    formik.validateForm().then(({ addressInfo }) => {
      if (!addressInfo) {
        if (registerType === "personal") {
          dispatch(sendOtp(data)).then((success) => {
            if (success) {
              onNext();
            }
          });
        } else {
          onNext();
        }
      }
    });
  };

  return (
    <div className="w-full">
      <AddressInfoFields formik={formik} />
      <div className="mt-10 flex justify-center gap-8">
        <Button
          type="button"
          label={t("back")}
          className="p-orange-btn px-10 dark:bg-orange dark:border-orange"
          onClick={onBack}
        />
        <Button
          type="button"
          label={
            loading
              ? "..."
              : registerType === "business"
              ? t("next")
              : t("next")
          }
          className="p-primary-btn px-10"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
}
