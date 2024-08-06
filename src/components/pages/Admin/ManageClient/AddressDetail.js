import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import i18next from "i18next";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { Divider } from "primereact/divider";
import { RESET_SPECIFIC_CLIENT } from "../../../../store/Types/AdminTypes";

export default function AddressDetail({ formik }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { cities, neighborhoods, zones } = useSelector(
    (state) => state.GetDataReducer
  );
  const { validateErrors } = useSelector((state) => state.AuthReducer);

  const { specificClient } = useSelector((state) => state.AdminReducer);

  // useEffect(() => {
  //   if (specificClient) {
  //     formik.setFieldValue("first_name", specificClient?.first_name);
  //     formik.setFieldValue("last_name", specificClient?.last_name);
  //     formik.setFieldValue("email", specificClient?.email);
  //     formik.setFieldValue("phone", specificClient?.phone);
  //     formik.setFieldValue("id_type", specificClient?.id_type);
  //     formik.setFieldValue("id_number", specificClient?.id_number);
  //     formik.setFieldValue("passport_number", specificClient?.passport_number);
  //     formik.setFieldValue("password", specificClient?.password);
  //     formik.setFieldValue("cPassword", specificClient?.cPassword);
  //     formik.setFieldValue("city_id", specificClient?.city_id);
  //     formik.setFieldValue("neighborhood_id", specificClient?.neighborhood_id);
  //     formik.setFieldValue("postal_code", specificClient?.postal_code);
  //     formik.setFieldValue("street", specificClient?.street);
  //     formik.setFieldValue("building", specificClient?.building);
  //     formik.setFieldValue("full_address", +specificClient?.full_address);
  //     formik.setFieldValue("description", +specificClient?.description);
  //     dispatch({ type: RESET_SPECIFIC_CLIENT });
  //   }
  // }, [specificClient]);

  return (
    <div className="card shadow-md rounded-lg p-4 border-gray-300 border">
      <Divider className="!m-0">
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("Address Detail")}
        </span>
      </Divider>
      {/* grid grid-cols-1 lg:grid-cols-2 gap-8 */}
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
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
          {formik.touched?.city_id && formik.errors?.city_id && (
            <div className="p-error">{formik.errors?.city_id}</div>
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
          {formik.touched?.neighborhood_id &&
            formik.errors?.neighborhood_id && (
              <div className="p-error">{formik.errors?.neighborhood_id}</div>
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
              id="postal_code"
              name="postal_code"
              className="w-full text-lg p-primary-input"
              value={formik.values.postal_code}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="postal_code"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("postal_code")}
            </label>
          </span>
          {formik.touched?.postal_code && formik.errors?.postal_code && (
            <div className="p-error">{formik.errors?.postal_code}</div>
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
              id="street"
              name="street"
              className="w-full text-lg p-primary-input"
              value={formik.values.street}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="street"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("street")}
            </label>
          </span>
          {formik.touched?.street && formik.errors?.street && (
            <div className="p-error">{formik.errors?.street}</div>
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
              className="w-full text-lg p-primary-input"
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
          {formik.touched?.building && formik.errors?.building && (
            <div className="p-error">{formik.errors?.building}</div>
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
              id="full_address"
              name="full_address"
              className="w-full text-lg p-primary-input"
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
          {formik.touched?.full_address && formik.errors?.full_address && (
            <div className="p-error">{formik.errors?.full_address}</div>
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
              id="description"
              name="description"
              className="w-full text-lg p-primary-input"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="description"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("description")}
            </label>
          </span>
          {formik.touched?.description && formik.errors?.description && (
            <div className="p-error">{formik.errors?.description}</div>
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
    </div>
  );
}
