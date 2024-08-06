import i18next from "i18next";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { InputNumber } from "primereact/inputnumber";

export default function ShipmentInfo({ formik }) {
  const { t } = useTranslation();
  const { packageTypes } = useSelector((state) => state.GetDataReducer);
  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const paymentType = [
    { name_en: "Sender Pay", name_ar: "دفع الراسل", id: 1 },
    { name_en: "Receiver Pay", name_ar: "دفع العائد", id: 2 },
  ];

  const options = [
    { name: t("yes"), value: true },
    { name: t("no"), value: false },
  ];

  return (
    <>
      <Divider>
        <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
          {t("shipment_detail")}
        </span>
      </Divider>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-4">
        <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="package_type_id"
              name="package_type_id"
              value={formik.values.package_type_id}
              onChange={formik.handleChange}
              options={packageTypes}
              optionLabel={(option) =>
                i18next.language === "en" ? option.name_en : option.name_ar
              }
              optionValue="id"
              className="w-full text-lg"
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
              htmlFor="package_type_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("package_type")}
            </label>
          </span>
          {formik.touched.package_type_id && formik.errors.package_type_id && (
            <div className="p-error">{formik.errors.package_type_id}</div>
          )}

          {validateErrors?.package_type_id?.length > 0
            ? validateErrors.package_type_id.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="payment_type_id"
              name="payment_type_id"
              value={formik.values.payment_type_id}
              onChange={formik.handleChange}
              options={paymentType}
              optionLabel={(option) =>
                i18next.language === "en" ? option.name_en : option.name_ar
              }
              optionValue="id"
              className="w-full text-lg"
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
              htmlFor="payment_type_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("payment_type")}
            </label>
          </span>
          {formik.touched.payment_type_id && formik.errors.payment_type_id && (
            <div className="p-error">{formik.errors.payment_type_id}</div>
          )}

          {validateErrors?.payment_type_id?.length > 0
            ? validateErrors.payment_type_id.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              type="number"
              id="quantity"
              name="quantity"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.quantity?.length > 0 ? "border-vError" : ""
              }`}
              value={formik.values.quantity}
              onChange={formik.handleChange}
              min={1}
            />
            <label
              htmlFor="quantity"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("quantity")}
            </label>
          </span>
          {formik.touched.quantity && formik.errors.quantity && (
            <div className="p-error">{formik.errors.quantity}</div>
          )}
          {validateErrors?.quantity?.length > 0
            ? validateErrors.quantity.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <span className="p-float-label w-full">
            <InputNumber
              id="weight"
              name="weight"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.weight?.length > 0 ? "border-vError" : ""
              }`}
              suffix=" kg"
              minFractionDigits={2}
              min={0.5}
              useGrouping={false}
              value={formik.values.weight}
              onValueChange={formik.handleChange}
            />
            <label
              htmlFor="package_type_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("weight")}
            </label>
          </span>
          {formik.touched.weight && formik.errors.weight && (
            <div className="p-error">{formik.errors.weight}</div>
          )}
          {validateErrors?.weight?.length > 0
            ? validateErrors.weight.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className=" col-span-1">
          <span className="p-float-label w-full">
            <InputText
              id="personalInfo.phone"
              name="personalInfo.phone"
              className="w-full text-lg p-primary-input"
            />
            <label
              htmlFor="personalInfo.phone"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("description")}
            </label>
          </span>
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="cod"
              name="cod"
              value={formik.values.cod}
              onChange={formik.handleChange}
              options={options}
              // optionLabel={(option) =>
              //   i18next.language === "en" ? option.name_en : option.name_ar
              // }
              optionLabel="name"
              optionValue="value"
              className="w-full text-lg"
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
              htmlFor="cod"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("cod")}
            </label>
          </span>
          {formik.touched.cod && formik.errors.cod && (
            <div className="p-error">{formik.errors.cod}</div>
          )}

          {validateErrors?.cod?.length > 0
            ? validateErrors.cod.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        {formik.values.cod == true ? (
          <div className="">
            <span className="p-float-label w-full">
              <InputText
                type="number"
                id="cod_amount"
                name="cod_amount"
                // className="w-full text-lg p-primary-input"
                className={`w-full text-lg p-primary-input ${
                  validateErrors?.cod_amount?.length > 0 ? "border-vError" : ""
                }`}
                value={formik.values.cod_amount}
                onChange={formik.handleChange}
                min={1}
              />
              <label
                htmlFor="cod_amount"
                className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
              >
                {t("cod_amount")}
              </label>
            </span>
            {formik.touched.cod_amount && formik.errors.cod_amount && (
              <div className="p-error">{formik.errors.cod_amount}</div>
            )}
            {validateErrors?.cod_amount?.length > 0
              ? validateErrors.cod_amount.map((err, index) => (
                  <div key={index} className="p-error">
                    {err}
                  </div>
                ))
              : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
