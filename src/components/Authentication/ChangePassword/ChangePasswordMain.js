import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userChangePassword } from "../../../store/AsyncMethod/AuthMethod";
import { RESET_VALIDATE_ERROR } from "../../../store/Types/AuthTypes";

export default function ChangePasswordMain({ setChangePasswordVisible }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading, validateErrors } = useSelector((state) => state.AuthReducer);

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required(t("Old password required")),
      new_password: Yup.string()
        .required(t("password_required"))
        .min(8, t("password_char_required", { char_len: 8 }))
        .max(16, t("password_char_required", { char_len: 16 })),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], t("password_match"))
        .required(t("confirm_password_required")),
    }),

    onSubmit: async (data) => {
      dispatch(userChangePassword(data)).then((success) => {
        if (success) {
          formik.resetForm();
          setChangePasswordVisible(false);
        }
      });
    },
  });

  useEffect(() => {
    if (validateErrors) {
      setTimeout(() => {
        dispatch({ type: RESET_VALIDATE_ERROR });
      }, 5000);
    }
  }, [validateErrors]);
  return (
    <div className="flex justify-center items-center">
      <div className="w-full">
        <div className="w-full mt-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <div className="grid grid-cols-1 gap-6">
                <div className="">
                  <span className="p-float-label w-full">
                    <Password
                      id="old_password"
                      name="old_password"
                      className="w-full"
                      feedback={false}
                      toggleMask
                      pt={{
                        input: "w-full text-lg p-primary-input",
                        showIcon: "mt-auto",
                        hideIcon: "mt-auto",
                      }}
                      value={formik.values.old_password}
                      onChange={formik.handleChange}
                    />
                    <label
                      htmlFor="old_password"
                      className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                    >
                      {t("Old Password")}
                    </label>
                  </span>
                  {formik.touched?.old_password &&
                    formik.errors?.old_password && (
                      <div className="p-error">
                        {formik.errors?.old_password}
                      </div>
                    )}
                  {validateErrors?.old_password?.length > 0
                    ? validateErrors.old_password.map((err) => (
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
                    <label
                      htmlFor="new_password"
                      className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                    >
                      {t("password")}
                    </label>
                  </span>
                  {formik.touched?.new_password &&
                    formik.errors?.new_password && (
                      <div className="p-error">
                        {formik.errors?.new_password}
                      </div>
                    )}
                  {validateErrors?.new_password?.length > 0
                    ? validateErrors.new_password.map((err) => (
                        <div className="p-error">{err}</div>
                      ))
                    : null}
                </div>

                <div className="">
                  <span className="p-float-label w-full">
                    <Password
                      id="confirm_password"
                      name="confirm_password"
                      className="w-full"
                      feedback={false}
                      toggleMask
                      pt={{
                        input: "w-full text-lg p-primary-input",
                        showIcon: "mt-auto",
                        hideIcon: "mt-auto",
                      }}
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                    />
                    <label
                      htmlFor="confirm_password"
                      className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                    >
                      {t("confirm_password")}
                    </label>
                  </span>
                  {formik.touched?.confirm_password &&
                    formik.errors?.confirm_password && (
                      <div className="p-error">
                        {formik.errors?.confirm_password}
                      </div>
                    )}
                  {validateErrors?.confirm_password?.length > 0
                    ? validateErrors.confirm_password.map((err) => (
                        <div className="p-error">{err}</div>
                      ))
                    : null}
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-6 w-full">
                <Button
                  type="button"
                  label={t("cancel")}
                  className="p-orange-btn px-10 w-full"
                  onClick={() => {
                    setChangePasswordVisible(false);
                    formik.resetForm();
                  }}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  label={loading ? "..." : t("Change Password")}
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
