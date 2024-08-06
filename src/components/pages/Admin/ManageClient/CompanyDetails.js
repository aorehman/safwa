import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Password } from "primereact/password";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "primereact/divider";
import { RESET_SPECIFIC_CLIENT } from "../../../../store/Types/AdminTypes";
import { Dropdown } from "primereact/dropdown";
import i18next from "i18next";


function CompanyDetails({ formik }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const { cities, neighborhoods, zones, stores } = useSelector(
    (state) => state.GetDataReducer
  );

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

  //   const handleNextClick = () => {
  //     formik.validateForm().then(({ personalInfo }) => {
  //       if (!personalInfo) {
  //         onNext();
  //       }
  //     });
  //   };
  return (
    <div className="card shadow-md rounded-lg p-4 border-gray-300 border">
      <Divider className="!m-0">
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("Company Detail")}
        </span>
      </Divider>

      {/* grid grid-cols-1 lg:grid-cols-2 gap-8 */}
      <div className="  grid grid-cols-1 lg:grid-cols-4 gap-3 mt-4">
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="company_name"
              name="company_name"
              className="w-full text-lg p-primary-input"
              value={formik.values.company_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="company_name"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto "
            >
              {t("Company Name")}
            </label>
          </span>
          {formik.touched?.company_name && formik.errors?.company_name && (
            <div className="p-error">{formik.errors?.company_name}</div>
          )}

          {validateErrors?.company_name?.length > 0
            ? validateErrors.company_name.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="vat_number"
              name="vat_number"
              className="w-full text-lg p-primary-input"
              value={formik.values.vat_number}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="vat_number"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("Vat Number")}
            </label>
          </span>
          {formik.touched?.vat_number && formik.errors?.vat_number && (
            <div className="p-error">{formik.errors?.vat_number}</div>
          )}
          {validateErrors?.vat_number?.length > 0
            ? validateErrors.vat_number.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="registration_number"
              name="registration_number"
              className="w-full text-lg p-primary-input"
              value={formik.values.registration_number}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="registration_number"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("Registration Number")}
            </label>
          </span>
          {formik.touched?.registration_number &&
            formik.errors?.registration_number && (
              <div className="p-error">
                {formik.errors?.registration_number}
              </div>
            )}

          {validateErrors?.registration_number?.length > 0
            ? validateErrors.registration_number.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="store_id"
              name="store_id"
              value={formik.values.store_id}
              onChange={formik.handleChange}
              options={stores}
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
              htmlFor="store_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("Store")}
            </label>
          </span>
          {formik.touched?.store_id && formik.errors?.store_id && (
            <div className="p-error">{formik.errors?.store_id}</div>
          )}

          {validateErrors?.store_id?.length > 0
            ? validateErrors.store_id.map((err, index) => (
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

export default CompanyDetails;
