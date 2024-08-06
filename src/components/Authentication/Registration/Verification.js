import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp } from "../../../store/AsyncMethod/AuthMethod";
import { useNavigate } from "react-router-dom";

export default function Verification({ onBack, formik, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = { phone: formik?.values?.personalInfo?.phone };
  let personalObj = {
    ...formik?.values?.personalInfo,
    ...formik?.values?.addressInfo,
  };

  let businessObj = {
    ...formik?.values?.personalInfo,
    ...formik?.values?.addressInfo,
    ...formik?.values?.companyInfo,
  };

  const userdata = type === "business" ? businessObj : personalObj;

  const Veifyformik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: yup.object().shape({
      otp: yup.string().required("otp is required"),
    }),
    onSubmit: () => {
      const data = {
        otp: Veifyformik.values.otp,
        phone: formik.values.personalInfo.phone,
      };
      dispatch(verifyOtp({ data, formik, userdata, navigate }));
    },
  });

  const { t } = useTranslation();
  const [time, setTime] = useState(120);
  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 0) {
        clearInterval(interval);
      } else {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (Veifyformik.values.otp.length === 4) {
      const data = {
        otp: parseInt(Veifyformik.values.otp),
        phone: formik.values.personalInfo.phone,
      };
      dispatch(verifyOtp({ data, formik, userdata, navigate }));
    }
  }, [Veifyformik.values.otp.length === 4]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div>
      <div className="flex items-center  flex-col ">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center dark:text-white">
            {t("EnterVerificationCode")}
          </h1>
        </div>
        <div>
          <OtpInput
            shouldAutoFocus
            value={Veifyformik.values.otp}
            onChange={(e) => Veifyformik.setFieldValue("otp", e)}
            numInputs={4}
            renderInput={(props) => <InputText type="number" {...props} />}
            inputStyle={{
              width: "4rem",
              height: "4rem",
              margin: "0 0.5rem",
              borderColor: `${
                Veifyformik.errors.otp && Veifyformik.touched.otp ? "red" : ""
              }`,
            }}
          />

          <div className=" mt-12 flex w-full gap-3 items-center justify-between">
            <Button
              type="button"
              label={t("back")}
              className="bg-red-600 px-10 w-1/2 hover:border-red-600 border-red-600 hover:bg-red-500 dark:text-white dark:bg-red-600"
              onClick={onBack}
            />
            {/* <Button
              label={t("submit")}
              type="button"
              onClick={Veifyformik.handleSubmit}
              className="p-primary-btn px-10 w-1/2 dark:text-white dark:bg-primary"
            /> */}
            <Button
              disabled={time !== 0}
              label={`${t("ResendCode")} ${time ? minutes : ""}${
                time ? ":" : ""
              }${time ? seconds : ""}`}
              className="p-primary-btn px-10 w-1/2 disabled:!bg-primary dark:text-white disabled:text-white dark:bg-primary"
              onClick={() => {
                setTime(120);
                dispatch(sendOtp(data));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
