import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import i18next from "i18next";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";

export default function AddressInfoFields({ formik }) {
  const { t } = useTranslation();
  const { cities, neighborhoods, zones } = useSelector(
    (state) => state.GetDataReducer
  );
  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const addressTitles = [
    { name_en: "Home", name_ar: "الرئيسية", value: "home" },
    { name_en: "Work", name_ar: "العمل", value: "work" },
    { name_en: "Delivery", name_ar: "التوصيل", value: "delivery" },
    { name_en: "Pickup", name_ar: "الاستلام", value: "pickup" },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="">
        <span className="p-float-label w-full">
          <Dropdown
            id="addressInfo.title"
            name="addressInfo.title"
            value={formik.values.addressInfo.title}
            onChange={formik.handleChange}
            options={addressTitles}
            optionLabel={(option) =>
              i18next.language === "en" ? option.name_en : option.name_ar
            }
            optionValue="value"
            className="w-full text-lg"
            // className={`w-full text-lg ${
            //   validateErrors?.addressInfo.title?.length > 0
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
            htmlFor="addressInfo.title"
            className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
          >
            {t("address_title")}
          </label>
        </span>
        {formik.touched.addressInfo?.title &&
          formik.errors.addressInfo?.title && (
            <div className="p-error">{formik.errors.addressInfo?.title}</div>
          )}

        {validateErrors?.title?.length > 0
          ? validateErrors.title.map((err, index) => (
              <div key={index} className="p-error">
                {err}
              </div>
            ))
          : null}
      </div>
      <div className="">
        <span className="p-float-label w-full">
          <Dropdown
            id="addressInfo.city_id"
            name="addressInfo.city_id"
            value={formik.values.addressInfo.city_id}
            onChange={formik.handleChange}
            options={cities}
            optionLabel={(option) =>
              i18next.language === "en" ? option.name_en : option.name_ar
            }
            optionValue="id"
            className="w-full text-lg"
            // className={`w-full text-lg ${
            //   validateErrors?.addressInfo.city_id?.length > 0
            //     ? "border-vError"
            //     : ""
            // }`}
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
            htmlFor="addressInfo.city_id"
            className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
          >
            {t("select_city")}
          </label>
        </span>
        {formik.touched.addressInfo?.city_id &&
          formik.errors.addressInfo?.city_id && (
            <div className="p-error">{formik.errors.addressInfo?.city_id}</div>
          )}

        {validateErrors?.city_id?.length > 0
          ? validateErrors.city_id.map((err, index) => (
              <div key={index} className="p-error">
                {err}
              </div>
            ))
          : null}
      </div>

      {/* <div className="">
        <span className="p-float-label w-full">
          <Dropdown
            id="addressInfo.zone_id"
            name="addressInfo.zone_id"
            value={formik.values.addressInfo.zone_id}
            onChange={formik.handleChange}
            options={zones}
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
            htmlFor="addressInfo.zone_id"
            className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
          >
            {t("select_zone")}
          </label>
        </span>
        {formik.touched.addressInfo?.zone_id &&
          formik.errors.addressInfo?.zone_id && (
            <div className="p-error">{formik.errors.addressInfo?.zone_id}</div>
          )}

        {validateErrors?.zone_id?.length > 0
          ? validateErrors.zone_id.map((err, index) => (
              <div key={index} className="p-error">
                {err}
              </div>
            ))
          : null}
      </div> */}

      <div className="">
        <span className="p-float-label w-full">
          <Dropdown
            id="addressInfo.neighborhood_id"
            name="addressInfo.neighborhood_id"
            value={formik.values.addressInfo.neighborhood_id}
            onChange={formik.handleChange}
            options={neighborhoods}
            optionLabel={(option) =>
              i18next.language === "en" ? option.name_en : option.name_ar
            }
            optionValue="id"
            className="w-full text-lg"
            // className={`w-full text-lg ${
            //   validateErrors?.addressInfo.neighborhood_id?.length > 0
            //     ? "border-vError"
            //     : ""
            // }`}
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
            htmlFor="addressInfo.neighborhood_id"
            className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
          >
            {t("select_neighborhood")}
          </label>
        </span>
        {formik.touched.addressInfo?.neighborhood_id &&
          formik.errors.addressInfo?.neighborhood_id && (
            <div className="p-error">
              {formik.errors.addressInfo?.neighborhood_id}
            </div>
          )}

        {validateErrors?.neighborhood_id?.length > 0
          ? validateErrors.neighborhood_id.map((err, index) => (
              <div key={index} className="p-error">
                {err}
              </div>
            ))
          : null}
      </div>

      <div className="">
        <span className="p-float-label w-full">
          <InputText
            id="addressInfo.postal_code"
            name="addressInfo.postal_code"
            className="w-full text-lg p-primary-input"
            // className={`w-full text-lg p-primary-input ${
            //   validateErrors?.addressInfo.postal_code?.length > 0
            //     ? "border-vError"
            //     : ""
            // }`}
            value={formik.values.addressInfo.postal_code}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="addressInfo.postal_code"
            className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
          >
            {t("postal_code")}
          </label>
        </span>
        {formik.touched.addressInfo?.postal_code &&
          formik.errors.addressInfo?.postal_code && (
            <div className="p-error">
              {formik.errors.addressInfo?.postal_code}
            </div>
          )}

        {validateErrors?.postal_code?.length > 0
          ? validateErrors.postal_code.map((err, index) => (
              <div key={index} className="p-error">
                {err}
              </div>
            ))
          : null}
      </div>

      <div className="">
        <span className="p-float-label w-full">
          <InputText
            id="addressInfo.street"
            name="addressInfo.street"
            className="w-full text-lg p-primary-input"
            // className={`w-full text-lg p-primary-input ${
            //   validateErrors?.addressInfo.street?.length > 0
            //     ? "border-vError"
            //     : ""
            // }`}
            value={formik.values.addressInfo.street}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="addressInfo.street"
            className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
          >
            {t("street")}
          </label>
        </span>
        {formik.touched.addressInfo?.street &&
          formik.errors.addressInfo?.street && (
            <div className="p-error">{formik.errors.addressInfo?.street}</div>
          )}

        {validateErrors?.street?.length > 0
          ? validateErrors.street.map((err, index) => (
              <div key={index} className="p-error">
                {err}
              </div>
            ))
          : null}
      </div>

      <div className="">
        <span className="p-float-label w-full">
          <InputText
            id="addressInfo.building"
            name="addressInfo.building"
            className="w-full text-lg p-primary-input"
            // className={`w-full text-lg p-primary-input ${
            //   validateErrors?.addressInfo.building?.length > 0
            //     ? "border-vError"
            //     : ""
            // }`}
            value={formik.values.addressInfo.building}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="addressInfo.building"
            className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
          >
            {t("building")}
          </label>
        </span>
        {formik.touched.addressInfo?.building &&
          formik.errors.addressInfo?.building && (
            <div className="p-error">{formik.errors.addressInfo?.building}</div>
          )}

        {validateErrors?.building?.length > 0
          ? validateErrors.building.map((err, index) => (
              <div key={index} className="p-error">
                {err}
              </div>
            ))
          : null}
      </div>

      <div className="">
        <span className="p-float-label w-full">
          <InputText
            id="addressInfo.full_address"
            name="addressInfo.full_address"
            className="w-full text-lg p-primary-input"
            // className={`w-full text-lg p-primary-input ${
            //   validateErrors?.addressInfo.full_address?.length > 0
            //     ? "border-vError"
            //     : ""
            // }`}
            value={formik.values.addressInfo.full_address}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="addressInfo.full_address"
            className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
          >
            {t("full_address")}
          </label>
        </span>
        {formik.touched.addressInfo?.full_address &&
          formik.errors.addressInfo?.full_address && (
            <div className="p-error">
              {formik.errors.addressInfo?.full_address}
            </div>
          )}

        {validateErrors?.full_address?.length > 0
          ? validateErrors.full_address.map((err, index) => (
              <div key={index} className="p-error">
                {err}
              </div>
            ))
          : null}
      </div>

      <div className="">
        <span className="p-float-label w-full">
          <InputText
            id="addressInfo.description"
            name="addressInfo.description"
            className="w-full text-lg p-primary-input"
            // className={`w-full text-lg p-primary-input ${
            //   validateErrors?.addressInfo.description?.length > 0
            //     ? "border-vError"
            //     : ""
            // }`}
            value={formik.values.addressInfo.description}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="addressInfo.description"
            className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
          >
            {t("description")}
          </label>
        </span>
        {formik.touched.addressInfo?.description &&
          formik.errors.addressInfo?.description && (
            <div className="p-error">
              {formik.errors.addressInfo?.description}
            </div>
          )}

        {validateErrors?.description?.length > 0
          ? validateErrors.description.map((err, index) => (
              <div key={index} className="p-error">
                {err}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
