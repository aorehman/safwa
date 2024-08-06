import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import i18next from "i18next";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

export default function NewSenderInfo({ formik, setNewSender }) {
  const { t } = useTranslation();
  const { cities, neighborhoods, zones } = useSelector(
    (state) => state.GetDataReducer
  );
  const { validateErrors, user } = useSelector((state) => state.AuthReducer);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="sender_first_name"
              name="sender_first_name"
              // className="w-full text-lg p-primary-input "
              className={`w-full text-lg p-primary-input ${
                validateErrors?.sender_first_name?.length > 0
                  ? "border-vError"
                  : ""
              }`}
              value={formik.values.sender_first_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="sender_first_name"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto "
            >
              {t("first_name")}
            </label>
          </span>
          {formik.touched.sender_first_name &&
            formik.errors.sender_first_name && (
              <div className="p-error">{formik.errors.sender_first_name}</div>
            )}

          {validateErrors?.sender_first_name?.length > 0
            ? validateErrors.sender_first_name.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="sender_last_name"
              name="sender_last_name"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.sender_last_name?.length > 0
                  ? "border-vError"
                  : ""
              }`}
              value={formik.values.sender_last_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="sender_last_name"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("last_name")}
            </label>
          </span>
          {formik.touched.sender_last_name &&
            formik.errors.sender_last_name && (
              <div className="p-error">{formik.errors.sender_last_name}</div>
            )}
          {validateErrors?.sender_last_name?.length > 0
            ? validateErrors.sender_last_name.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="sender_phone"
              name="sender_phone"
              // className="w-full text-lg p-primary-input"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.sender_phone?.length > 0 ? "border-vError" : ""
              }`}
              value={formik.values.sender_phone}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="sender_phone"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("phone")}
            </label>
          </span>
          {formik.touched.sender_phone && formik.errors.sender_phone && (
            <div className="p-error">{formik.errors.sender_phone}</div>
          )}
          {validateErrors?.sender_phone?.length > 0
            ? validateErrors.sender_phone.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="sender_city_id"
              name="sender_city_id"
              value={formik.values.sender_city_id}
              onChange={formik.handleChange}
              options={cities}
              optionLabel={(option) =>
                i18next.language === "en" ? option.name_en : option.name_ar
              }
              optionValue="id"
              // className="w-full text-lg"
              className={`w-full text-lg ${
                validateErrors?.sender_city_id?.length > 0
                  ? "border-vError"
                  : ""
              }`}
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
              htmlFor="sender_city_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("select_city")}
            </label>
          </span>
          {formik.touched.sender_city_id && formik.errors.sender_city_id && (
            <div className="p-error">{formik.errors.sender_city_id}</div>
          )}

          {validateErrors?.sender_city_id?.length > 0
            ? validateErrors.sender_city_id.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        {/* <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="sender_zone_id"
              name="sender_zone_id"
              value={formik.values.sender_zone_id}
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
              htmlFor="sender_zone_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("select_zone")}
            </label>
          </span>
          {formik.touched.sender_zone_id && formik.errors.sender_zone_id && (
            <div className="p-error">{formik.errors.sender_zone_id}</div>
          )}

          {validateErrors?.sender_zone_id?.length > 0
            ? validateErrors.sender_zone_id.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div> */}

        <div className="">
          <span className="p-float-label w-full">
            <Dropdown
              id="sender_neighborhood_id"
              name="sender_neighborhood_id"
              value={formik.values.sender_neighborhood_id}
              onChange={formik.handleChange}
              options={neighborhoods}
              optionLabel={(option) =>
                i18next.language === "en" ? option.name_en : option.name_ar
              }
              optionValue="id"
              // className="w-full text-lg"
              className={`w-full text-lg ${
                validateErrors?.sender_neighborhood_id?.length > 0
                  ? "border-vError"
                  : ""
              }`}
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
              htmlFor="sender_neighborhood_id"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("select_neighborhood")}
            </label>
          </span>
          {formik.touched.sender_neighborhood_id &&
            formik.errors.sender_neighborhood_id && (
              <div className="p-error">
                {formik.errors.sender_neighborhood_id}
              </div>
            )}

          {validateErrors?.sender_neighborhood_id?.length > 0
            ? validateErrors.sender_neighborhood_id.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="sender_full_address"
              name="sender_full_address"
              className={`w-full text-lg p-primary-input ${
                validateErrors?.sender_full_address?.length > 0
                  ? "border-vError"
                  : ""
              }`}
              // className="w-full text-lg p-primary-input"
              value={formik.values.sender_full_address}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="sender_full_address"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("full_address")}
            </label>
          </span>
          {formik.touched.sender_full_address &&
            formik.errors.sender_full_address && (
              <div className="p-error">{formik.errors.sender_full_address}</div>
            )}

          {validateErrors?.sender_full_address?.length > 0
            ? validateErrors.sender_full_address.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>
      </div>

      {user.role_id !== "1" && user.role_id !== "10" ? (
        <div className="text-center font-medium text-lg mt-4 dark:text-white">
          {t("would_you_like_to_choose")}{" "}
          <span
            className="font-semibold text-primary cursor-pointer dark:text-white"
            onClick={() => setNewSender(false)}
          >
            {t("click_here")}
          </span>
        </div>
      ) : null}

      {/* <div className="text-center font-medium text-lg mt-4 dark:text-white">
        {t("would_you_like_to_choose")}{" "}
        <span
          className="font-semibold text-primary cursor-pointer dark:text-white"
          onClick={() => setNewSender(false)}
        >
          {t("click_here")}
        </span>
      </div> */}
    </>
  );
}
