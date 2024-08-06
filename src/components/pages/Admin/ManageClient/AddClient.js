import { useFormik } from "formik";
import i18next from "i18next";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {
  addClient,
  editClient,
  getClientList,
  getSpecificClientById,
} from "../../../../store/AsyncMethod/AdminMethod";
import { RESET_SPECIFIC_CLIENT } from "../../../../store/Types/AdminTypes";
import {
  getCities,
  getNeighborhoodsById,
  getStores,
} from "../../../../store/AsyncMethod/GetDataMethod";
import PersonalDetail from "./PersonalDetail";
import AddressDetail from "./AddressDetail";
import { Dialog } from "primereact/dialog";
import CompanyDetails from "./CompanyDetails";

export default function AddClient({
  setShowForm,
  showForm,
  selectedRow,
  setSelectedRow,
  selectedForm,
  setSelectedForm,
  setSelectedProducts,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientId } = useParams();
  const { validateErrors } = useSelector((state) => state.AuthReducer);
  const { specificClient } = useSelector((state) => state.AdminReducer);
  const { loading } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    dispatch(getCities());
    dispatch(getStores());
  }, []);

  useEffect(() => {
    if (selectedRow) {
      formik.setFieldValue("first_name", selectedRow?.first_name);
      formik.setFieldValue("last_name", selectedRow?.last_name);
      formik.setFieldValue("email", selectedRow?.email);
      formik.setFieldValue("phone", selectedRow?.phone);
      formik.setFieldValue("id_type", selectedRow?.id_type);
      formik.setFieldValue("id_number", selectedRow?.id_number);
      formik.setFieldValue("passport_number", selectedRow?.passport_number);
      // formik.setFieldValue("password", selectedRow?.password);
      // formik.setFieldValue("cPassword", selectedRow?.cPassword);
      formik.setFieldValue("city_id", selectedRow?.city_id);
      formik.setFieldValue("neighborhood_id", selectedRow?.neighborhood_id);
      formik.setFieldValue("postal_code", selectedRow?.postal_code);
      formik.setFieldValue("street", selectedRow?.street);
      formik.setFieldValue("building", selectedRow?.building);
      formik.setFieldValue("full_address", selectedRow?.full_address);
      formik.setFieldValue("description", selectedRow?.description);
      formik.setFieldValue("company_name", selectedRow?.company_name);
      formik.setFieldValue("vat_number", selectedRow?.vat_number);
      formik.setFieldValue(
        "registration_number",
        selectedRow?.registration_number
      );
      formik.setFieldValue("store_id", +selectedRow?.store_id);

      dispatch({ type: RESET_SPECIFIC_CLIENT });
    }
  }, [selectedRow]);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      id_type: "citizen",
      id_number: "",
      passport_number: "",
      password: "",
      cPassword: "",
      city_id: "",
      neighborhood_id: "",
      postal_code: "",
      street: "",
      building: "",
      full_address: "",
      description: "",
      company_name: "",
      vat_number: "",
      registration_number: "",
      store_id: "",
    },

    validationSchema: () => {
      return Yup.object({
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

        id_type: Yup.string().required(t("Id Type is required")),

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
            : "",
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
            : "",

        password:
          formik.values.password.length > 0 || !selectedRow
            ? Yup.string()
                .required(t("password_required"))
                .min(8, t("password_char_required", { char_len: 8 }))
                .max(16, t("password_char_required", { char_len: 16 }))
            : Yup.string(),
        cPassword:
          formik.values.password > 0 || !selectedRow
            ? Yup.string()
                .oneOf([Yup.ref("password"), null], t("password_match"))
                .required(t("confirm_password_required"))
            : Yup.string(),

        city_id: !selectedRow
          ? Yup.number().required(t("city_required"))
          : Yup.number(),
        neighborhood_id: !selectedRow
          ? Yup.number().required(t("neighborhood_required"))
          : "",
        postal_code: !selectedRow
          ? Yup.number().required(t("postal_code_required"))
          : "",
        street: !selectedRow ? Yup.string().required(t("street_required")) : "",
        building: !selectedRow
          ? Yup.string().required(t("building_required"))
          : "",
        full_address: !selectedRow
          ? Yup.string().required(t("full_address_required"))
          : "",
        description: !selectedRow
          ? Yup.string().required(t("description_required"))
          : "",

        company_name:
          selectedForm === "3"
            ? null
            : Yup.string().required(t("company_name_required")),
        registration_number:
          selectedForm === "3"
            ? null
            : Yup.string().required(t("registration_number_required")),
        vat_number:
          selectedForm === "3"
            ? null
            : Yup.string().required(t("vat_number_required")),
        store_id:
          selectedForm === "3"
            ? null
            : Yup.string().required(t("Store is required")),
      });
    },

    onSubmit: async (data) => {
      const updatedData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== "") {
          acc[key] = value;
        }
        return acc;
      }, {});
      if (selectedRow) {
        const updateData = { ...updatedData, user_id: selectedRow?.id };
        dispatch(editClient(updateData)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getClientList(1, 10));
            setShowForm(false);
            setSelectedRow(null);
            setSelectedProducts(null);
          }
        });
      } else {
        const updated = {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          id_type: data.id_type,
          id_number: data.id_number,
          passport_number: data.passport_number,
          password: data.password,
          cPassword: data.cPassword,
          city_id: data.city_id,
          neighborhood_id: data.neighborhood_id,
          postal_code: data.postal_code,
          street: data.street,
          building: data.building,
          full_address: data.full_address,
          description: data.description,
        };
        {
          selectedForm === "3"
            ? dispatch(addClient({ ...updated, role_id: 3 })).then(
                (success) => {
                  if (success) {
                    formik.resetForm();
                    dispatch(getClientList(1, 10));
                    setShowForm(false);
                    setSelectedProducts(null);
                  }
                }
              )
            : dispatch(addClient({ ...data, role_id: 2 })).then((success) => {
                if (success) {
                  formik.resetForm();
                  dispatch(getClientList(1, 10));
                  setShowForm(false);
                  setSelectedProducts(null);
                }
              });
        }
      }
    },
  });

  // useEffect(() => {
  //   if (selectedRow?.id) {
  //     dispatch(getSpecificClientById(selectedRow?.id));
  //   }
  // }, [selectedRow?.id]);

  useEffect(() => {
    if (formik.values?.city_id) {
      dispatch(getNeighborhoodsById(formik.values?.city_id));
    }
  }, [formik.values?.city_id]);

  const handleClick = (index) => {
    setSelectedForm(index);
  };
  const array = [
    { label: "Personal", icon: "pi pi-user", role_id: "3" },

    { label: "Buisness", icon: "pi pi-home", role_id: "2" },
  ];
  useEffect(() => {
    setSelectedForm(selectedRow?.role_id);
    formik.setFieldValue("password", "");
  }, [selectedRow?.role_id]);
  return (
    <Dialog
      header={selectedRow ? "Edit Client" : "Add Client"}
      visible={showForm}
      className=" lg:!w-3/4"
      style={{ width: "90vw" }}
      onHide={() => {
        setShowForm(false);
        formik.resetForm();
        setTimeout(() => setSelectedRow(null), 200);
        setSelectedProducts(null);
      }}
      pt={{
        content: { className: "!px-3 !py-0 " },
        header: { className: "!pt-3 !pr-3 !pl-3 !pb-0 " },
      }}
    >
      {selectedRow?.role_id ? null : (
        <div>
          <ul
            className={`grid grid-flow-col text-center text-primary bg-primary/10 shadow-inner shadow-primary/30  border border-gray-300 my-3  rounded-lg p-1`}
          >
            {array.map((item, index) => (
              <li
                className={`flex justify-center gap-2 items-center  py-2 font-semibold ${
                  item?.role_id === selectedForm
                    ? "bg-primary rounded-lg shadow text-white"
                    : ""
                }`}
                key={index}
                onClick={() => handleClick(item.role_id)}
              >
                <i className={item.icon}></i>
                <a href={`#-Manage-${item.label}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={`rtl:ml-5 ${selectedRow?.role_id ? "mt-2" : ""}`}>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <div
            className={`grid grid-cols-1 ${
              !selectedRow ? "lg:grid-cols-2" : ""
            } `}
          >
            <div className={` pb-2 pr-2 `}>
              <PersonalDetail formik={formik} />
            </div>

            {!selectedRow ? (
              <div className=" pb-2  pl-2">
                <AddressDetail formik={formik} />
              </div>
            ) : null}
          </div>

          {selectedForm === "2" || selectedRow?.role_id === "2" ? (
            <div className={` pt-2  `}>
              <CompanyDetails formik={formik} />
            </div>
          ) : null}

          <div className="my-3">
            <div className=" flex justify-end gap-4">
              <Button
                label={t("cancel")}
                className="p-orange-btn dark:text-white"
                icon="pi pi-times"
                type="button"
                pt={{
                  icon: { className: "rtl:mx-2" },
                }}
                onClick={() => {
                  formik.resetForm();
                  setShowForm(false);
                  setTimeout(() => setSelectedRow(null), 200);
                  setSelectedProducts(null);
                }}
              />
              <Button
                disabled={loading}
                label={selectedRow ? t("Update") : t("Add")}
                className="p-primary-btn dark:text-white dark:bg-primary"
                icon="pi pi-check"
                type="submit"
                pt={{
                  icon: { className: "rtl:mx-2" },
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
