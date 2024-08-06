import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Password } from "primereact/password";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function PersonalInfo({ formik, onNext, onBack }) {
  const { t } = useTranslation();
  const { validateErrors } = useSelector((state) => state.AuthReducer);

  const options = [
    { name: t("citizen"), value: "citizen" },
    { name: t("passport"), value: "passport" },
  ];

  const handleNextClick = () => {
    formik.validateForm().then(({ personalInfo }) => {
      if (!personalInfo) {
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
              id="personalInfo.first_name"
              name="personalInfo.first_name"
              className="w-full text-lg p-primary-input"
              // className={`w-full text-lg p-primary-input ${
              //   formik.errors.personalInfo.first_name ||
              //   validateErrors?.personalInfo.first_name?.length > 0
              //     ? "border-vError"
              //     : ""
              // }`}
              value={formik.values.personalInfo.first_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="personalInfo.first_name"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto "
            >
              {t("first_name")}
            </label>
          </span>
          {formik.touched.personalInfo?.first_name &&
            formik.errors.personalInfo?.first_name && (
              <div className="p-error">
                {formik.errors.personalInfo?.first_name}
              </div>
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
              id="personalInfo.last_name"
              name="personalInfo.last_name"
              className="w-full text-lg p-primary-input"
              // className={`w-full text-lg p-primary-input ${
              //   formik.errors.personalInfo.last_name ||
              //   validateErrors?.personalInfo.last_name?.length > 0
              //     ? "border-vError"
              //     : ""
              // }`}
              value={formik.values.personalInfo.last_name}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="personalInfo.last_name"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("last_name")}
            </label>
          </span>
          {formik.touched.personalInfo?.last_name &&
            formik.errors.personalInfo?.last_name && (
              <div className="p-error">
                {formik.errors.personalInfo?.last_name}
              </div>
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
              id="personalInfo.email"
              name="personalInfo.email"
              className="w-full text-lg p-primary-input"
              // className={`w-full text-lg p-primary-input ${
              //   formik.errors?.personalInfo?.email ||
              //   validateErrors?.email?.length > 0
              //     ? "border-vError"
              //     : ""
              // }`}
              value={formik.values.personalInfo.email}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="personalInfo.email"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("email")}
            </label>
          </span>
          {formik.touched.personalInfo?.email &&
            formik.errors.personalInfo?.email && (
              <div className="p-error">{formik.errors.personalInfo?.email}</div>
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
              id="personalInfo.phone"
              name="personalInfo.phone"
              className="w-full text-lg p-primary-input"
              // className={`w-full text-lg p-primary-input ${
              //   formik.errors.personalInfo.phone ||
              //   validateErrors?.personalInfo.phone?.length > 0
              //     ? "border-vError"
              //     : ""
              // }`}
              value={formik.values.personalInfo.phone}
              onChange={formik.handleChange}
              minLength={10}
              maxLength={10}
            />
            <label
              htmlFor="personalInfo.phone"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("phone")}
            </label>
          </span>
          {formik.touched.personalInfo?.phone &&
            formik.errors.personalInfo?.phone && (
              <div className="p-error">{formik.errors.personalInfo?.phone}</div>
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
            name="personalInfo.id_type"
            id="personalInfo.id_type"
            options={options}
            optionLabel="name"
            className="flex"
            pt={{
              button: ({ context }) => ({
                className: context.selected
                  ? "p-primary-highlight-btn w-full text-lg"
                  : "w-full text-lg",
              }),
            }}
            value={formik.values.personalInfo.id_type}
            onChange={formik.handleChange}
          />
          {formik.touched.personalInfo?.id_type &&
            formik.errors.personalInfo?.id_type && (
              <div className="p-error">
                {formik.errors.personalInfo?.id_type}
              </div>
            )}

          {validateErrors?.id_type?.length > 0
            ? validateErrors.id_type.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        {formik.values?.personalInfo?.id_type === "citizen" ? (
          <div className="">
            <span className="p-float-label w-full">
              <InputText
                type="number"
                id="personalInfo.id_number"
                name="personalInfo.id_number"
                className="w-full text-lg p-primary-input"
                // className={`w-full text-lg p-primary-input ${
                //   formik.errors.personalInfo.id_number ||
                //   validateErrors?.personalInfo.id_number?.length > 0
                //     ? "border-vError"
                //     : ""
                // }`}
                value={formik.values.personalInfo.id_number}
                onChange={formik.handleChange}
              />
              <label
                htmlFor="personalInfo.id_number"
                className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
              >
                {t("id_number")}
              </label>
            </span>
            {formik.touched.personalInfo?.id_number &&
              formik.errors.personalInfo?.id_number && (
                <div className="p-error">
                  {formik.errors.personalInfo?.id_number}
                </div>
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
                id="personalInfo.passport_number"
                name="personalInfo.passport_number"
                className="w-full text-lg p-primary-input"
                // className={`w-full text-lg p-primary-input ${
                //   formik.errors.personalInfo.passport_number ||
                //   validateErrors?.personalInfo.passport_number?.length > 0
                //     ? "border-vError"
                //     : ""
                // }`}
                value={formik.values.personalInfo.passport_number}
                onChange={formik.handleChange}
              />
              <label
                htmlFor="personalInfo.passport_number"
                className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
              >
                {t("passport_number")}
              </label>
            </span>
            {formik.touched.personalInfo?.passport_number &&
              formik.errors.personalInfo?.passport_number && (
                <div className="p-error">
                  {formik.errors.personalInfo?.passport_number}
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

        <div className="">
          <span className="p-float-label w-full">
            <Password
              id="personalInfo.password"
              name="personalInfo.password"
              className="w-full"
              feedback={false}
              toggleMask
              pt={{
                input: "w-full text-lg p-primary-input",
                showIcon: "mt-auto",
                hideIcon: "mt-auto",
              }}
              value={formik.values.personalInfo.password}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="personalInfo.password"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("password")}
            </label>
          </span>
          {formik.touched.personalInfo?.password &&
            formik.errors.personalInfo?.password && (
              <div className="p-error">
                {formik.errors.personalInfo?.password}
              </div>
            )}

          {validateErrors?.password?.length > 0
            ? validateErrors.password.map((err, index) => (
                <div key={index} className="p-error">
                  {err}
                </div>
              ))
            : null}
        </div>

        <div className="">
          <span className="p-float-label w-full">
            <Password
              id="personalInfo.cPassword"
              name="personalInfo.cPassword"
              className="w-full"
              feedback={false}
              toggleMask
              pt={{
                input: "w-full text-lg p-primary-input",
                showIcon: "mt-auto",
                hideIcon: "mt-auto",
              }}
              value={formik.values.personalInfo.cPassword}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="personalInfo.cPassword"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("confirm_password")}
            </label>
          </span>
          {formik.touched.personalInfo?.cPassword &&
            formik.errors.personalInfo?.cPassword && (
              <div className="p-error">
                {formik.errors.personalInfo?.cPassword}
              </div>
            )}
        </div>
      </div>

      <div className="mt-10 flex justify-center gap-8">
        <Button
          type="button"
          label={t("back")}
          className="p-orange-btn px-10 dark:text-white"
          onClick={onBack}
        />
        <Button
          type="submit"
          label={t("next")}
          className="p-primary-btn px-10 dark:text-white dark:bg-primary"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
}
