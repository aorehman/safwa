import React, { useState, useEffect } from "react";
import { Formik, Form, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  ForgotPassword,
  sendOtpForgot,
} from "../../../store/AsyncMethod/AuthMethod";
import OTPInput from "react-otp-input";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { useLocation, useNavigate } from "react-router-dom";

const ResetForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, validateErrors } = useSelector((state) => state.AuthReducer);
  const [time, setTime] = useState(40);
  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 0) {
        clearInterval(interval);
      } else {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formik = useFormik({
    initialValues: {
      phone: location?.state?.formik,
      password: "",
      new_password: "",
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required(t("Otp is required")),
      password: Yup.string().required(t("Password is required")),
      new_password: Yup.string()
        .oneOf([Yup.ref("password"), null], t("Passwords must match"))
        .required(t("Confirm Password is required")),
    }),

    onSubmit: async (data) => {
      console.log(data);
      dispatch(ForgotPassword(data)).then((success) => {
        if (success) {
          navigate("/login");
        }
      });
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="card w-11/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12 px-4 py-8 shadow-md rounded-lg m-auto mt-10">
        <h1 className="text-3xl font-bold text-center dark:text-white">
          {t("Reset Password")}
        </h1>
        <div className="w-full mt-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <div className="grid grid-cols-1 px-3 gap-6">
                <div className="relative">
                  <span className="p-float-label w-full">
                    <OTPInput
                      id="otp"
                      shouldAutoFocus
                      value={formik.values.otp}
                      containerStyle={{
                        paddingTop: "35px",
                        justifyContent: "space-between",
                      }}
                      onChange={(e) => formik.setFieldValue("otp", e)}
                      numInputs={4}
                      renderInput={(props) => (
                        <InputText type="number" {...props} />
                      )}
                      inputStyle={{
                        width: "4rem",
                        height: "3rem",
                      }}
                    />
                  </span>
                  <label
                    htmlFor="otp"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto absolute top-0"
                  >
                    {t("Enter Otp")}
                  </label>
                  {formik.touched?.otp && formik.errors?.otp && (
                    <div className="p-error">{formik.errors?.otp}</div>
                  )}
                  {validateErrors?.otp?.length > 0 &&
                    validateErrors.otp.map((err, index) => (
                      <div key={index} className="p-error">
                        {err}
                      </div>
                    ))}
                </div>
                <div className="">
                  <span className="p-float-label w-full">
                    <Password
                      id="password"
                      name="password"
                      className="w-full"
                      feedback={false}
                      toggleMask
                      pt={{
                        input: "w-full text-lg p-primary-input",
                        showIcon: "mt-auto",
                        hideIcon: "mt-auto",
                      }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />

                    <label
                      htmlFor="password"
                      className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                    >
                      {t("password")}
                    </label>
                  </span>
                  {formik.touched?.password && formik.errors?.password && (
                    <div className="p-error">{formik.errors?.password}</div>
                  )}
                  {validateErrors?.password?.length > 0
                    ? validateErrors.password.map((err) => (
                        <div className="p-error">{err}</div>
                      ))
                    : null}
                </div>

                <div className="">
                  <span className="p-float-label w-full">
                    <Password
                      id="new_password"
                      name="new_password"
                      className="w-full"
                      feedback={false}
                      toggleMask
                      pt={{
                        input: "w-full text-lg p-primary-input",
                        showIcon: "mt-auto",
                        hideIcon: "mt-auto",
                      }}
                      value={formik.values.new_password}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="new_password">
                      {t("Confirm Password")}
                    </label>
                  </span>
                  {formik.touched?.new_password &&
                    formik.errors?.new_password && (
                      <div className="p-error">
                        {formik.errors?.new_password}
                      </div>
                    )}
                  {validateErrors?.new_password?.length > 0 &&
                    validateErrors.new_password.map((err, index) => (
                      <div key={index} className="p-error">
                        {err}
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-6 w-full px-3">
                <Button
                  disabled={loading}
                  type="submit"
                  label={loading ? "..." : t("Reset")}
                  className="p-primary-btn px-10 w-full dark:text-white dark:bg-primary"
                />
              </div>
              <div className="flex mt-4 px-3 gap-2">
                <Button
                  type="button"
                  label={t("Back")}
                  onClick={() => navigate("/forgot")}
                  className=" !bg-rose-500  border border-red-500 hover:!bg-red-600 hover:border-red-600 px-10 w-full dark:text-white dark:bg-primary"
                />
                <Button
                  disabled={loading || time !== 0}
                  type="button"
                  label={`${t("ResendCode")} ${minutes ? minutes : ""}${
                    minutes ? ":" : ""
                  }${time ? `${seconds}s` : ""}`}
                  onClick={() => {
                    dispatch(
                      sendOtpForgot({ phone: location?.state?.formik })
                    ).then((success) => {
                      if (success) {
                        setTime(40);
                      }
                    });
                  }}
                  className="p-primary-btn px-10 w-full dark:text-white dark:bg-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetForm;
