import React, { useEffect, useState } from "react";
import { Steps } from "primereact/steps";
import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import CompanyInfo from "./CompanyInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  getNeighborhoodsById,
  getZonessById,
} from "../../../store/AsyncMethod/GetDataMethod";
import { userRegister } from "../../../store/AsyncMethod/AuthMethod";
import { useNavigate } from "react-router-dom";
import { ScrollPanel } from "primereact/scrollpanel";
import Verification from "./Verification";
import OrderStepper from "../../OtherComponents/OrderStepper";

export default function SignUpStepForm({ registerType, onBack }) {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const steps =
    registerType === "personal"
      ? [
          { label: t("personal_info") },
          { label: t("address_info") },
          { label: t("verification") },
        ]
      : [
          { label: t("personal_info") },
          { label: t("address_info") },
          { label: t("company_info") },
          { label: t("verification") },
        ];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      personalInfo: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        id_type: "citizen",
        id_number: "",
        passport_number: "",
        password: "",
        cPassword: "",
        fcm: "klkakskdfkl",
        role_id:
          registerType === "personal"
            ? 3
            : registerType === "business"
            ? 2
            : "",
      },
      addressInfo: {
        title: "",
        city_id: "",
        neighborhood_id: "",
        postal_code: "",
        street: "",
        building: "",
        full_address: "",
        description: "",
        // zone_id: "",
      },
      companyInfo: {
        company_name: "",
        registration_number: "",
        vat_number: "",
        store_id: null,
      },
    },
    validationSchema: () => {
      return Yup.object({
        personalInfo: Yup.object().shape({
          first_name: Yup.string()
            .required(t("first_name_required"))
            .min(3, t("first_name_char_required", { char_len: 3 })),
          last_name: Yup.string()
            .required(t("last_name_required"))
            .min(3, t("last_name_char_required", { char_len: 3 })),
          email: Yup.string()
            .email(t("invalid_email"))
            .required(t("email_required")),
          phone: Yup.string()
            .required(t("phone_required"))
            .matches(/^[05]\d{9}$/, t("phone_start_number_required")),
          id_type: Yup.string().required(t("id_type_required")),
          id_number:
            formik.values?.personalInfo?.id_type === "citizen"
              ? Yup.number()
                  .integer()
                  .required(t("id_required"))
                  .test("len", t("id_length_error"), (value) => {
                    if (!value) return false;
                    const stringValue = value.toString();
                    return stringValue.length === 10;
                  })
              : Yup.number(),
          passport_number:
            formik.values?.personalInfo?.id_type === "passport"
              ? Yup.number()
                  .integer()
                  .required(t("id_required"))
                  .test("len", t("id_length_error"), (value) => {
                    if (!value) return false;
                    const stringValue = value.toString();
                    return stringValue.length === 10;
                  })
              : Yup.number(),
          password: Yup.string()
            .required(t("password_required"))
            .min(8, t("password_char_required", { char_len: 8 }))
            .max(16, t("password_char_required", { char_len: 16 })),
          cPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], t("password_match"))
            .required(t("confirm_password_required")),
        }),
        addressInfo: Yup.object().shape({
          title: Yup.string().required(t("address_title_required")),
          city_id: Yup.number().required(t("city_required")),
          neighborhood_id: Yup.string().required(t("neighborhood_required")),
          postal_code: Yup.string().required(t("postal_code_required")),
          street: Yup.string().required(t("street_required")),
          building: Yup.string().required(t("building_required")),
          full_address: Yup.string().required(t("full_address_required")),
          description: Yup.string().required(t("description_required")),
          // zone_id: Yup.number().required(t("zone_required")),
        }),

        companyInfo:
          registerType === "business"
            ? Yup.object().shape({
                company_name: Yup.string().required(t("company_name_required")),
                registration_number: Yup.string().required(
                  t("registration_number_required")
                ),
                vat_number: Yup.string().required(t("vat_number_required")),
                store_id: Yup.string().nullable(),
              })
            : Yup.object({
                /* validation schema for verification form */
              }),
      });
    },
    onSubmit: async (data) => {
      //   let personalObj = {
      //     ...data.personalInfo,
      //     ...data.addressInfo,
      //   };
      //   let businessObj = {
      //     ...data.personalInfo,
      //     ...data.addressInfo,
      //     ...data.companyInfo,
      //   };
      //   const submittedData =
      //     registerType === "personal" ? personalObj : businessObj;
      //   dispatch(userRegister(submittedData, formik)).then((success) => {
      //     if (success) {
      //       navigate("/client/dashboard");
      //     }
      //   });
    },
  });

  // useEffect(() => {
  //   if (formik.values.addressInfo?.city_id) {
  //     dispatch(getZonessById(formik.values.addressInfo?.city_id));
  //   }
  // }, [formik.values.addressInfo?.city_id]);

  useEffect(() => {
    if (formik.values.addressInfo?.city_id) {
      dispatch(getNeighborhoodsById(formik.values.addressInfo?.city_id));
    }
  }, [formik.values.addressInfo?.city_id]);

  useEffect(() => {
    if (formik.values?.personalInfo?.id_type === "passport") {
      formik.setFieldValue("personalInfo.id_number", "");
    } else {
      formik.setFieldValue("personalInfo.passport_number", "");
    }
  }, [formik.values?.personalInfo?.id_type]);

  const renderBuisnessComponents = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfo onNext={handleNext} formik={formik} onBack={onBack} />
        );
      case 1:
        return (
          <AddressInfo
            onNext={handleNext}
            onBack={handleBack}
            formik={formik}
            registerType={registerType}
          />
        );
      case 2:
        return (
          <CompanyInfo
            onNext={handleNext}
            onBack={handleBack}
            formik={formik}
          />
        );
      case 3:
        return (
          <Verification
            onNext={handleNext}
            onBack={handleBack}
            formik={formik}
            type={registerType}
          />
        );
      default:
        return null;
    }
  };
  const renderPersonalComponents = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfo onNext={handleNext} formik={formik} onBack={onBack} />
        );
      case 1:
        return (
          <AddressInfo
            onNext={handleNext}
            onBack={handleBack}
            formik={formik}
            registerType={registerType}
          />
        );
      case 2:
        return (
          <Verification
            onNext={handleNext}
            onBack={handleBack}
            formik={formik}
            type={registerType}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="">
      <OrderStepper
        model={steps}
        activeIndex={activeStep}
        readOnly={true}
        registerType={registerType}
      />
      <div className="w-full mt-8">
        <form onSubmit={formik.handleSubmit}>
          {registerType === "business"
            ? renderBuisnessComponents()
            : renderPersonalComponents()}
        </form>
      </div>
    </div>
  );
}
