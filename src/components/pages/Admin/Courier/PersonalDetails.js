import i18next from "i18next";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";

export default function CourierPersonalDetail({ formik }) {
  const { t } = useTranslation();
  const { keeperId } = useParams();
  const { stores } = useSelector((state) => state.GetDataReducer);
  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const options = [
    { name: t("citizen"), value: "citizen" },
    { name: t("passport"), value: "passport" },
  ];

  return (
    <>
      <Divider className="!m-0">
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("Person Details")}
        </span>
      </Divider>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 mt-4">
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="first_name"
              name="first_name"
              // className="w-full text-lg p-primary-input "
              className={`w-full text-lg p-primary-input ${
                validateErrors?.first_name?.length > 0 ? "border-vError" : ""
              }`}
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="first_name"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto "
            >
              {t("first_name")}
            </label>
          </span>
          {formik.touched.first_name && formik.errors.first_name && (
            <div className="p-error">{formik.errors.first_name}</div>
          )}

          {validateErrors?.first_name?.length > 0
            ? validateErrors.first_name.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="last_name"
              name="last_name"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.last_name?.length > 0 ? "border-vError" : ""
              }`}
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="last_name"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("last_name")}
            </label>
          </span>
          {formik.touched.last_name && formik.errors.last_name && (
            <div className="p-error">{formik.errors.last_name}</div>
          )}
          {validateErrors?.last_name?.length > 0
            ? validateErrors.last_name.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="phone"
              name="phone"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.phone?.length > 0 ? "border-vError" : ""
              }`}
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
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="email"
              name="email"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.email?.length > 0 ? "border-vError" : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="email"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("Email")}
            </label>
          </span>
          {formik.touched.email && formik.errors.email && (
            <div className="p-error">{formik.errors.email}</div>
          )}

          {validateErrors?.email?.length > 0
            ? validateErrors.email.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <SelectButton
            name="id_type"
            id="id_type"
            options={options}
            optionLabel="name"
            className="flex"
            pt={{
              button: ({ context }) => ({
                className: context.selected
                  ? "p-primary-highlight-btn w-full text-lg"
                  : "w-full text-lg ",
              }),
            }}
            value={formik.values.id_type}
            onChange={formik.handleChange}
          />
          {formik.touched.id_type && formik.errors.id_type && (
            <div className="p-error">{formik.errors.id_type}</div>
          )}

          {validateErrors?.id_type?.length > 0
            ? validateErrors.id_type.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        {formik.values?.id_type === "citizen" ? (
          <div className="">
            <span className="p-float-label w-full">
              <InputText
                type="number"
                id="id_number"
                name="id_number"
                className="w-full text-lg p-primary-input"
                // className={`w-full text-lg p-primary-input ${
                //   formik.errors.id_number ||
                //   validateErrors?.id_number?.length > 0
                //     ? "border-vError"
                //     : ""
                // }`}
                value={formik.values.id_number}
                onChange={formik.handleChange}
              />
              <label
                htmlFor="id_number"
                className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
              >
                {t("id_number")}
              </label>
            </span>
            {formik.touched.id_number && formik.errors.id_number && (
              <div className="p-error">{formik.errors.id_number}</div>
            )}

            {validateErrors?.id_number?.length > 0
              ? validateErrors.id_number.map((err, index) => (
                  <div key={index} className="p-error">
                    {err}
                  </div>
                ))
              : null}
          </div>
        ) : (
          <div className="">
            <span className="p-float-label w-full">
              <InputText
                type="number"
                id="passport_number"
                name="passport_number"
                className="w-full text-lg p-primary-input"
                // className={`w-full text-lg p-primary-input ${
                //   formik.errors.passport_number ||
                //   validateErrors?.passport_number?.length > 0
                //     ? "border-vError"
                //     : ""
                // }`}
                value={formik.values.passport_number}
                onChange={formik.handleChange}
              />
              <label
                htmlFor="passport_number"
                className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
              >
                {t("passport_number")}
              </label>
            </span>
            {formik.touched.passport_number &&
              formik.errors.passport_number && (
                <div className="p-error">{formik.errors.passport_number}</div>
              )}

            {validateErrors?.passport_number?.length > 0
              ? validateErrors.passport_number.map((err, index) => (
                  <div key={index} className="p-error">
                    {err}
                  </div>
                ))
              : null}
          </div>
        )}
        {keeperId ? null : (
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
        )}
        <div className="">
          <span className="p-float-label w-full">
            <Password
              id="cPassword"
              name="cPassword"
              className="w-full"
              feedback={false}
              toggleMask
              pt={{
                input: "w-full text-lg p-primary-input",
                showIcon: "mt-auto",
                hideIcon: "mt-auto",
              }}
              value={formik.values.cPassword}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="cPassword"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("confirm_password")}
            </label>
          </span>
          {formik.touched.cPassword && formik.errors.cPassword && (
            <div className="p-error">{formik.errors.cPassword}</div>
          )}
        </div>
      </div>
    </>
  );
}
