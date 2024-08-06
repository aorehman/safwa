import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Password } from "primereact/password";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "primereact/divider";
import { RESET_SPECIFIC_CLIENT } from "../../../../store/Types/AdminTypes";

export default function PersonalDetail({ formik, onNext, onBack }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { validateErrors } = useSelector((state) => state.AuthReducer);

  const options = [
    { name: t("citizen"), value: "citizen" },
    { name: t("passport"), value: "passport" },
  ];

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
          {t("Personal Detail")}
        </span>
      </Divider>

      {/* grid grid-cols-1 lg:grid-cols-2 gap-8 */}
      <div className="  grid grid-cols-1 lg:grid-cols-2  gap-3 mt-4">
        <div className="">
          <span className="p-float-label w-full">
            <InputText
              id="first_name"
              name="first_name"
              className="w-full text-lg p-primary-input"
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
              className="w-full text-lg p-primary-input"
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
              className="w-full text-lg p-primary-input"
              value={formik.values.email}
              onChange={formik.handleChange}
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
              className="w-full text-lg p-primary-input"
              value={formik.values.phone}
              onChange={formik.handleChange}
              minLength={10}
              maxLength={10}
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
            className="flex"
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
                className="w-full text-lg p-primary-input"
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
                className="w-full text-lg p-primary-input"
                value={formik.values.passport_number}
                onChange={formik.handleChange}
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
                <div className="p-error">{formik.errors?.passport_number}</div>
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
              id="password"
              name="password"
              className="w-full"
              autoComplete="off"
              feedback={false}
              toggleMask
              pt={{
                input: "w-full text-lg p-primary-input",
                showIcon: "mt-auto",
                hideIcon: "mt-auto",
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="password"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("password")}
            </label>
          </span>
          {formik.touched?.password && formik?.errors?.password && (
            <div className="p-error">{formik?.errors?.password}</div>
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
              id="cPassword"
              name="cPassword"
              className="w-full"
              feedback={false}
              toggleMask
              pt={{
                input: "w-full text-lg p-primary-input",
                showIcon: "mt-auto",
                hideIcon: "mt-auto",
              }}
              value={formik.values?.cPassword}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="cPassword"
              className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
            >
              {t("confirm_password")}
            </label>
          </span>
          {formik.touched?.cPassword && formik.errors?.cPassword && (
            <div className="p-error">{formik.errors?.cPassword}</div>
          )}
        </div>
      </div>

      {/* <div className="mt-10 flex justify-center gap-8">
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
      </div> */}
    </div>
  );
}
