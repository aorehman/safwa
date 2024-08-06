import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getSearchOtp } from "../../../../store/AsyncMethod/AdminMethod";
import { useLocation } from "react-router-dom";
import { RESET_SEARCH_OTP } from "../../../../store/Types/AdminTypes";

export default function SearchOtpMain() {
  const { t } = useTranslation();
  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const { searchOtp } = useSelector((state) => state.AdminReducer);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: () => {
      return Yup.object({
        phone: Yup.number().required(t("Phone Number required")),
      });
    },

    onSubmit: async (data) => {
      dispatch(getSearchOtp(data)).then((success) => {
        if (success) {
          formik.resetForm();
        }
      });
    },
  });

  const location = useLocation();

  useEffect(() => {
    dispatch({ type: RESET_SEARCH_OTP });
  }, [location]);
  return (
    <div>
      <div className="card py-2 px-4 shadow-md rounded-lg">
        <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
            {t("Search OTP")}
          </span>
        </Divider>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="flex gap-2">
              <span className="p-float-label p-input-icon-left w-full">
                <i className="pi pi-search dark:text-white" />
                <InputText
                  id="phone"
                  name="phone"
                  className="w-full text-lg p-primary-input !pl-9"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                <label
                  htmlFor="phone"
                  className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto "
                >
                  {t("Enter Phone Number")}
                </label>
              </span>
              <Button
                icon="pi pi-arrow-right dark:text-white"
                className="p-primary-btn dark:bg-primary"
                pt={{
                  icon: { className: "w-full" },
                }}
              />
            </div>
          </div>

          {formik.touched?.phone && formik.errors?.phone && (
            <div className="p-error">{formik.errors?.phone}</div>
          )}
          {validateErrors?.phone?.length > 0
            ? validateErrors.phone.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </form>

        <div className="my-4">
          <div className="text-center font-bold text-4xl">{searchOtp}</div>
        </div>
      </div>
    </div>
  );
}
