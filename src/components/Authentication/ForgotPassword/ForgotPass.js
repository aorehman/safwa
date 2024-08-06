import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { sendOtpForgot } from "../../../store/AsyncMethod/AuthMethod";

export default function ForgotPass() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState(false);

  const { loading, validateErrors } = useSelector((state) => state.AuthReducer);

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string().required(t("phone_required")),
    }),

    onSubmit: async (data) => {
      dispatch(sendOtpForgot({ phone: data.phone })).then((success) => {
        if (success) {
          navigate("/reset", { state: { formik: formik.values.phone } });
        }
      });
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="card w-11/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12 px-4 py-8 shadow-md rounded-lg m-auto mt-10">
        <h1 className="text-3xl font-bold text-center dark:text-white">
          {t("Forgot Password")}
        </h1>
        <div className="w-full mt-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <div className="grid grid-cols-1 px-3 gap-6">
                <div className="">
                  <span className="p-float-label w-full">
                    <InputText
                      id="phone"
                      name="phone"
                      // className="w-full text-lg p-primary-input"
                      className={`w-full text-lg p-primary-input ${
                        validateErrors?.phone?.length > 0 ? "border-vError" : ""
                      }`}
                      // className={`w-full text-lg p-primary-input ${
                      //   formik.errors.phone || validateErrors?.phone?.length > 0
                      //     ? "border-vError"
                      //     : ""
                      // }`}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      minLength={10}
                      maxLength={10}
                    />
                    <label
                      htmlFor="phone"
                      className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                    >
                      {t("phone")}
                    </label>
                  </span>
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="p-error">{formik.errors.phone}</div>
                  )}

                  {validateErrors?.phone?.length > 0
                    ? validateErrors.phone.map((err, index) => (
                        <div key={index} className="p-error">
                          {err}
                        </div>
                      ))
                    : null}
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-3 w-full px-3">
                <Button
                  type="button"
                  label={t("back")}
                  className=" !bg-rose-500  border border-red-500 hover:!bg-red-600 hover:border-red-600 px-10 w-full dark:text-white dark:bg-primary"
                  onClick={() => navigate("/login")}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  label={loading ? "..." : t("next")}
                  className="p-primary-btn px-10 w-full dark:text-white dark:bg-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
