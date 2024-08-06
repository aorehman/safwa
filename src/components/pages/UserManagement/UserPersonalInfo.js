import React, { useEffect, useRef, useState } from "react";
import UserProfileImg from "./UserProfileImg";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "primereact/divider";
import { useTranslation } from "react-i18next";
import UserGeneralInfo from "./UserPersonalInfoForm";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editUserPersonalData } from "../../../store/AsyncMethod/UserManagementMethod";

export default function UserPersonalInfo() {
  const [editable, setEditable] = useState(true);
  const { user } = useSelector((state) => state.AuthReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      if (user?.first_name) {
        formik.setFieldValue("first_name", user.first_name);
      } else {
        formik.setFieldValue("first_name", "");
      }

      if (user?.first_name) {
        formik.setFieldValue("last_name", user.last_name);
      } else {
        formik.setFieldValue("last_name", "");
      }

      // if (user?.email) {
      //   formik.setFieldValue("email", user.email);
      // } else {
      //   formik.setFieldValue("email", "");
      // }

      // if (user?.phone) {
      //   formik.setFieldValue("phone", user.phone);
      // } else {
      //   formik.setFieldValue("phone", "");
      // }

      if (user?.id_type) {
        formik.setFieldValue("id_type", user.id_type);
      } else {
        formik.setFieldValue("id_type", "");
      }

      if (user?.id_number) {
        formik.setFieldValue("id_number", user.id_number);
      } else {
        formik.setFieldValue("id_number", "");
      }

      if (user?.passport_number) {
        formik.setFieldValue("passport_number", user.passport_number);
      } else {
        formik.setFieldValue("passport_number", "");
      }
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      // email: "",
      // phone: "",
      id_type: "citizen",
      id_number: "",
      passport_number: "",
    },
    validationSchema: () => {
      return Yup.object({
        first_name: Yup.string()
          .required(t("first_name_required"))
          .min(3, t("first_name_char_required", { char_len: 3 })),
        last_name: Yup.string()
          .required(t("last_name_required"))
          .min(3, t("last_name_char_required", { char_len: 3 })),
        // email: Yup.string()
        //   .email(t("invalid_email"))
        //   .required(t("email_required")),
        // phone: Yup.string()
        //   .required(t("phone_required"))
        //   .matches(/^[05]\d{9}$/, t("phone_start_number_required")),
        id_type: Yup.string().required(t("id_type_required")),
        id_number:
          formik.values?.id_type === "citizen"
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
          formik.values?.id_type === "passport"
            ? Yup.number()
                .integer()
                .required(t("id_required"))
                .test("len", t("id_length_error"), (value) => {
                  if (!value) return false;
                  const stringValue = value.toString();
                  return stringValue.length === 10;
                })
            : Yup.number(),
      });
    },

    onSubmit: async (data) => {
      dispatch(editUserPersonalData(data)).then((success) => {
        if (success) {
          setEditable(!editable);
        }
      });
    },
  });

  useEffect(() => {
    if (formik.values?.id_type === "passport") {
      formik.setFieldValue("id_number", "");
    } else {
      formik.setFieldValue("passport_number", "");
    }
  }, [formik.values?.id_type]);
  return (
    <div className="my-4">
      <div className="card pt-1 pb-5 shadow-md rounded-lg px-4">
        <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1 dark:text-white">
            {t("personal_information")}
          </span>
        </Divider>

        <div className="flex mb-3 justify-end">
          <Button
            label={t("Edit Profile")}
            className="p-primary-btn dark:text-white dark:bg-primary"
            onClick={() => setEditable(!editable)}
            icon="pi pi-pencil"
            type="button"
            pt={{
              icon: { className: "rtl:mx-2" },
            }}
          />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4">
            <div className="flex justify-center items-center lg:col-span-2 xl:col-span-1">
              <UserProfileImg />
            </div>
            <div className="col-span-1 lg:col-span-4 xl:col-span-5 ">
              <UserGeneralInfo editable={editable} formik={formik} />
            </div>
          </div>

          {!editable && (
            <div className="my-6">
              <div className=" flex justify-center lg:justify-end gap-8">
                <Button
                  label={t("cancel")}
                  className="p-orange-btn dark:text-white p-orange-btn"
                  icon="pi pi-times"
                  type="button"
                  pt={{
                    icon: { className: "rtl:mx-2" },
                  }}
                  onClick={() => setEditable(true)}
                />
                <Button
                  disabled={loading}
                  label={t("edit")}
                  className="p-primary-btn dark:text-white dark:bg-primary"
                  icon="pi pi-check"
                  type="submit"
                  pt={{
                    icon: { className: "rtl:mx-2" },
                  }}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
