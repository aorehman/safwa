import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../../store/AsyncMethod/AuthMethod";
import { Dropdown } from "primereact/dropdown";
import i18next from "i18next";

export default function CompanyInfo({ formik, onNext, onBack }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { validateErrors, loading } = useSelector((state) => state.AuthReducer);
  const data = { phone: formik.values.personalInfo.phone };
  const { cities, neighborhoods, zones, stores } = useSelector(
    (state) => state.GetDataReducer
  );
  const handleNext = () => {
    formik.validateForm().then(({ companyInfo }) => {
      if (!companyInfo) {
        dispatch(sendOtp(data));
        onNext();
      }
    });
  };
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="companyInfo.company_name"
              name="companyInfo.company_name"
              className="w-full text-lg p-primary-input "
              value={formik.values.companyInfo.company_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="companyInfo.company_name"
              className="dark:text-white dark:bg-cardDarkBackground"
            >
              {t("company")}
            </label>
          </span>
          {formik.touched.companyInfo?.company_name &&
            formik.errors.companyInfo?.company_name && (
              <div className="p-error">
                {formik.errors.companyInfo?.company_name}
              </div>
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
              id="companyInfo.registration_number"
              name="companyInfo.registration_number"
              className="w-full text-lg p-primary-input"
              value={formik.values.companyInfo.registration_number}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="companyInfo.registration_number"
              className="dark:text-white dark:bg-cardDarkBackground"
            >
              {t("company_registration_no")}
            </label>
          </span>
          {formik.touched.companyInfo?.registration_number &&
            formik.errors.companyInfo?.registration_number && (
              <div className="p-error">
                {formik.errors.companyInfo?.registration_number}
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
            <InputText
              id="companyInfo.vat_number"
              name="companyInfo.vat_number"
              className="w-full text-lg p-primary-input"
              value={formik.values.companyInfo.vat_number}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="companyInfo.vat_number"
              className="dark:text-white dark:bg-cardDarkBackground"
            >
              {t("vat_no")}
            </label>
          </span>
          {formik.touched.companyInfo?.vat_number &&
            formik.errors.companyInfo?.vat_number && (
              <div className="p-error">
                {formik.errors.companyInfo?.vat_number}
              </div>
            )}
          {validateErrors?.vat_number?.length > 0
            ? validateErrors.vat_number.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        {/* <div className="">
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
          {formik.touched?.companyInfo?.store_id &&
            formik.errors?.companyInfo?.store_id && (
              <div className="p-error">
                {formik.errors?.companyInfo?.store_id}
              </div>
            )}

          {validateErrors?.store_id?.length > 0
            ? validateErrors.store_id.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div> */}
      </div>

      <div className="mt-10 flex justify-center gap-8">
        <Button
          type="button"
          label={t("back")}
          className="p-orange-btn px-10 dark:bg-orange dark:border-orange"
          onClick={onBack}
        />
        <Button
          type="button"
          label={loading ? "..." : t("next")}
          className="p-primary-btn px-10"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
