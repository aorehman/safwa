import i18next from "i18next";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function AddressDetails({ formik }) {
  const { t } = useTranslation();
  const { cities, neighborhoods } = useSelector(
    (state) => state.GetDataReducer
  );
  const { validateErrors } = useSelector((state) => state.AuthReducer);

  return (
    <>
      <Divider className="!m-0">
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("Address Detail")}
        </span>
      </Divider>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 mt-4">
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="street"
              name="street"
              // className="w-full text-lg p-primary-input "
              className={`w-full text-lg p-primary-input ${
                validateErrors?.street?.length > 0 ? "border-vError" : ""
              }`}
              value={formik.values.street}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="street"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto "
            >
              {t("street")}
            </label>
          </span>
          {formik.touched.street && formik.errors.street && (
            <div className="p-error">{formik.errors.street}</div>
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
              id="building"
              name="building"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.building?.length > 0 ? "border-vError" : ""
              }`}
              value={formik.values.building}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="building"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("building")}
            </label>
          </span>
          {formik.touched.building && formik.errors.building && (
            <div className="p-error">{formik.errors.building}</div>
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
              id="postal_code"
              name="postal_code"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.postal_code?.length > 0 ? "border-vError" : ""
              }`}
              value={formik.values.postal_code}
              onChange={formik.handleChange}
              minLength={10}
              maxLength={10}
            />
            <label
              htmlFor="postal_code"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("postal_code")}
            </label>
          </span>
          {formik.touched.postal_code && formik.errors.postal_code && (
            <div className="p-error">{formik.errors.postal_code}</div>
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
            <Dropdown
              id="city_id"
              name="city_id"
              value={formik.values.city_id}
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
              htmlFor="city_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("select_city")}
            </label>
          </span>
          {formik.touched.city_id && formik.errors.city_id && (
            <div className="p-error">{formik.errors.city_id}</div>
          )}

          {validateErrors?.city_id?.length > 0
            ? validateErrors.city_id.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="neighborhood_id"
              name="neighborhood_id"
              value={formik.values.neighborhood_id}
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
              htmlFor="neighborhood_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("select_neighborhood")}
            </label>
          </span>
          {formik.touched.neighborhood_id && formik.errors.neighborhood_id && (
            <div className="p-error">{formik.errors.neighborhood_id}</div>
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
              autoComplete="off"
              id="full_address"
              name="full_address"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.full_address?.length > 0 ? "border-vError" : ""
              }`}
              value={formik.values.full_address}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="full_address"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("full_address")}
            </label>
          </span>
          {formik.touched.full_address && formik.errors.full_address && (
            <div className="p-error">{formik.errors.full_address}</div>
          )}

          {validateErrors?.full_address?.length > 0
            ? validateErrors.full_address.map((err, index) => (
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

export default AddressDetails;
