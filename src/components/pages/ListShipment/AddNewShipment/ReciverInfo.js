import i18next from "i18next";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ReciverInfo({ formik }) {
  const { t } = useTranslation();
  const { cities, neighborhoods, zones } = useSelector(
    (state) => state.GetDataReducer
  );
  const { validateErrors } = useSelector((state) => state.AuthReducer);

  return (
    <>
      <Divider>
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("receiver_detail")}
        </span>
      </Divider>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="receiver_first_name"
              name="receiver_first_name"
              // className="w-full text-lg p-primary-input "
              className={`w-full text-lg p-primary-input ${
                validateErrors?.receiver_first_name?.length > 0
                  ? "border-vError"
                  : ""
              }`}
              value={formik.values.receiver_first_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="receiver_first_name"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto "
            >
              {t("first_name")}
            </label>
          </span>
          {formik.touched.receiver_first_name &&
            formik.errors.receiver_first_name && (
              <div className="p-error">{formik.errors.receiver_first_name}</div>
            )}

          {validateErrors?.receiver_first_name?.length > 0
            ? validateErrors.receiver_first_name.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="receiver_last_name"
              name="receiver_last_name"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.receiver_last_name?.length > 0
                  ? "border-vError"
                  : ""
              }`}
              value={formik.values.receiver_last_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="receiver_last_name"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("last_name")}
            </label>
          </span>
          {formik.touched.receiver_last_name &&
            formik.errors.receiver_last_name && (
              <div className="p-error">{formik.errors.receiver_last_name}</div>
            )}
          {validateErrors?.receiver_last_name?.length > 0
            ? validateErrors.receiver_last_name.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="receiver_phone"
              name="receiver_phone"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.receiver_phone?.length > 0
                  ? "border-vError"
                  : ""
              }`}
              value={formik.values.receiver_phone}
              onChange={formik.handleChange}
              minLength={10}
              maxLength={10}
            />
            <label
              htmlFor="receiver_phone"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("phone")}
            </label>
          </span>
          {formik.touched.receiver_phone && formik.errors.receiver_phone && (
            <div className="p-error">{formik.errors.receiver_phone}</div>
          )}
          {validateErrors?.receiver_phone?.length > 0
            ? validateErrors.receiver_phone.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="receiver_city_id"
              name="receiver_city_id"
              value={formik.values.receiver_city_id}
              onChange={formik.handleChange}
              options={cities}
              optionLabel={(option) =>
                i18next.language === "en" ? option.name_en : option.name_ar
              }
              optionValue="id"
              className="w-full text-lg"
              filter
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
              htmlFor="receiver_city_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("select_city")}
            </label>
          </span>
          {formik.touched.receiver_city_id &&
            formik.errors.receiver_city_id && (
              <div className="p-error">{formik.errors.receiver_city_id}</div>
            )}

          {validateErrors?.receiver_city_id?.length > 0
            ? validateErrors.receiver_city_id.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="receiver_neighborhood_id"
              name="receiver_neighborhood_id"
              value={formik.values.receiver_neighborhood_id}
              onChange={formik.handleChange}
              options={neighborhoods}
              optionLabel={(option) =>
                i18next.language === "en" ? option.name_en : option.name_ar
              }
              optionValue="id"
              className="w-full text-lg"
              filter
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
              htmlFor="receiver_neighborhood_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("select_neighborhood")}
            </label>
          </span>
          {formik.touched.receiver_neighborhood_id &&
            formik.errors.receiver_neighborhood_id && (
              <div className="p-error">
                {formik.errors.receiver_neighborhood_id}
              </div>
            )}

          {validateErrors?.receiver_neighborhood_id?.length > 0
            ? validateErrors.receiver_neighborhood_id.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="receiver_full_address"
              name="receiver_full_address"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.receiver_full_address?.length > 0
                  ? "border-vError"
                  : ""
              }`}
              value={formik.values.receiver_full_address}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="receiver_full_address"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("full_address")}
            </label>
          </span>
          {formik.touched.receiver_full_address &&
            formik.errors.receiver_full_address && (
              <div className="p-error">
                {formik.errors.receiver_full_address}
              </div>
            )}

          {validateErrors?.receiver_full_address?.length > 0
            ? validateErrors.receiver_full_address.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
