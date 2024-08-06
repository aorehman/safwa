import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function UserGeneralInfo({ editable, formik }) {
  const { t } = useTranslation();
  const { validateErrors, user } = useSelector((state) => state.AuthReducer);

  const options = [
    { name: t("citizen"), value: "citizen" },
    { name: t("passport"), value: "passport" },
  ];

  return user?.role_id == 3 || user?.role_id == 2
    ? [
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-2">
            <div className="">
              <span className="p-float-label w-full">
                <InputText
                  id="first_name"
                  name="first_name"
                  className="w-full text-lg p-primary-input !opacity-100"
                  disabled={editable}
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
              {formik.touched?.first_name && formik.errors?.first_name && (
                <div className="p-error">{formik.errors?.first_name}</div>
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
                  className="w-full text-lg p-primary-input !opacity-100"
                  disabled={editable}
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
              {formik.touched?.last_name && formik.errors?.last_name && (
                <div className="p-error">{formik.errors?.last_name}</div>
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
                  id="email"
                  name="email"
                  className="w-full text-lg p-primary-input !opacity-100"
                  disabled={true}
                  value={user.email}
                  // onChange={formik.handleChange}
                />
                <label
                  htmlFor="email"
                  className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                >
                  {t("email")}
                </label>
              </span>
              {formik.touched?.email && formik.errors?.email && (
                <div className="p-error">{formik.errors?.email}</div>
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
              <span className="p-float-label w-full">
                <InputText
                  id="phone"
                  name="phone"
                  className="w-full text-lg p-primary-input !opacity-100"
                  disabled={true}
                  value={user.phone}
                  // onChange={formik.handleChange}
                />
                <label
                  htmlFor="phone"
                  className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                >
                  {t("phone")}
                </label>
              </span>
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
            </div>

            <div className="">
              <SelectButton
                name="id_type"
                id="id_type"
                options={options}
                optionLabel="name"
                className="flex !opacity-100"
                disabled={editable}
                pt={{
                  button: ({ context }) => ({
                    className: context.selected
                      ? "p-primary-highlight-btn w-full text-lg"
                      : "w-full text-lg",
                  }),
                }}
                value={formik.values.id_type}
                onChange={formik.handleChange}
              />
              {formik.touched?.id_type && formik.errors?.id_type && (
                <div className="p-error">{formik.errors?.id_type}</div>
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
                    className="w-full text-lg p-primary-input !opacity-100"
                    disabled={editable}
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
                {formik.touched?.id_number && formik.errors?.id_number && (
                  <div className="p-error">{formik.errors?.id_number}</div>
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
                    className="w-full text-lg p-primary-input !opacity-100"
                    value={formik.values.passport_number}
                    onChange={formik.handleChange}
                    disabled={editable}
                  />
                  <label
                    htmlFor="passport_number"
                    className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                  >
                    {t("passport_number")}
                  </label>
                </span>
                {formik.touched?.passport_number &&
                  formik.errors?.passport_number && (
                    <div className="p-error">
                      {formik.errors?.passport_number}
                    </div>
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
          </div>
        </div>,
      ]
    : [
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-2">
            <div className="">
              <span className="p-float-label w-full">
                <InputText
                  id="first_name"
                  name="first_name"
                  className="w-full text-lg p-primary-input !opacity-100"
                  disabled={editable}
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
              {formik.touched?.first_name && formik.errors?.first_name && (
                <div className="p-error">{formik.errors?.first_name}</div>
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
                  className="w-full text-lg p-primary-input !opacity-100"
                  disabled={editable}
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
              {formik.touched?.last_name && formik.errors?.last_name && (
                <div className="p-error">{formik.errors?.last_name}</div>
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
                  id="email"
                  name="email"
                  className="w-full text-lg p-primary-input !opacity-100"
                  disabled={true}
                  value={user.email}
                  // onChange={formik.handleChange}
                />
                <label
                  htmlFor="email"
                  className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                >
                  {t("email")}
                </label>
              </span>
              {formik.touched?.email && formik.errors?.email && (
                <div className="p-error">{formik.errors?.email}</div>
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
              <span className="p-float-label w-full">
                <InputText
                  id="phone"
                  name="phone"
                  className="w-full text-lg p-primary-input !opacity-100"
                  disabled={true}
                  value={user.phone}
                  // onChange={formik.handleChange}
                />
                <label
                  htmlFor="phone"
                  className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                >
                  {t("phone")}
                </label>
              </span>
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
            </div>
          </div>
        </div>,
      ];
}
