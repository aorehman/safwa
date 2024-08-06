import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getCities,
  getNeighborhoodsById,
  getStores,
} from "../../../../store/AsyncMethod/GetDataMethod";
import AddressDetails from "./AddressDetails";
import {
  addCashier,
  editCashier,
  getAccountantList,
  getSpecificKeeperById,
} from "../../../../store/AsyncMethod/AdminMethod";
import { RESET_SPECIFIC_KEEPER } from "../../../../store/Types/AdminTypes";
import { Dialog } from "primereact/dialog";
import PersonalDetail from "./PersonalDetails";

export default function AddCashier({
  setDialogVisible,
  dialogVisible,
  selectedRow,
  setSelectedRow,
  setSelectedProducts,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.AdminReducer);

  useEffect(() => {
    dispatch(getCities());
    dispatch(getStores());
  }, []);

  useEffect(() => {
    if (selectedRow) {
      formik.setFieldValue("first_name", selectedRow?.first_name);
      formik.setFieldValue("last_name", selectedRow?.last_name);
      formik.setFieldValue("phone", selectedRow?.phone);
      formik.setFieldValue("city_id", selectedRow?.city_id);
      formik.setFieldValue("neighborhood_id", selectedRow?.neighborhood_id);
      formik.setFieldValue("full_address", selectedRow?.full_address);
      formik.setFieldValue("postal_code", selectedRow?.postal_code);
      formik.setFieldValue("street", selectedRow?.street);
      formik.setFieldValue("building", selectedRow?.building);
      formik.setFieldValue("store_id", selectedRow?.store_id);
      formik.setFieldValue("email", selectedRow?.email);
    }
  }, [selectedRow]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      city_id: "",
      neighborhood_id: "",
      full_address: "",
      password: "",
      postal_code: "",
      street: "",
      building: "",
      email: "",
      cPassword: "",
      id_type: "citizen",
      id_number: "",
      passport_number: "",
      password: "",
    },
    validationSchema: () => {
      return Yup.object({
        first_name: Yup.string().required(t("first_name_required")),
        last_name: Yup.string().required(t("last_name_required")),
        phone: Yup.string().required(t("phone_required")),
        password: selectedRow
          ? Yup.string()
          : Yup.string().required(t("password_required")),

        email: Yup.string()
          .email(t("email_invalid"))
          .required(t("email_required")),
        cPassword: selectedRow
          ? Yup.string()
          : Yup.string()
              .oneOf([Yup.ref("password"), null], t("password_not_match"))
              .required(t("confirm_password_required")),
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
        city_id: selectedRow
          ? Yup.number()
          : Yup.number().required(t("city_required")),
        neighborhood_id: selectedRow
          ? Yup.number()
          : Yup.number().required(t("neighborhood_required")),
        full_address: selectedRow
          ? Yup.number()
          : Yup.string().required(t("full_address_required")),
        postal_code: selectedRow
          ? Yup.number()
          : Yup.string().required(t("postal_code_required")),
        street: selectedRow
          ? Yup.number()
          : Yup.string().required(t("street_required")),
        building: selectedRow
          ? Yup.number()
          : Yup.string().required(t("building_required")),
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
        dispatch(editCashier(updateData)).then((success) => {
          if (success) {
            formik.resetForm();
            setDialogVisible(false);
            dispatch(getAccountantList(1, 10));
            setSelectedRow(null);
            setSelectedProducts(null);
          }
        });
      } else {
        dispatch(addCashier(data)).then((success) => {
          if (success) {
            formik.resetForm();
            setDialogVisible(false);
            dispatch(getAccountantList(1, 10));
            setSelectedRow(null);
            setSelectedProducts(null);
          }
        });
      }
    },
  });

  useEffect(() => {
    if (formik.values.city_id) {
      dispatch(getNeighborhoodsById(formik.values.city_id));
    }
  }, [formik.values.city_id]);

  //   useEffect(() => {
  //     if (selectedRow?.id) {
  //       dispatch(getSpecificKeeperById(selectedRow?.id));
  //     }
  //   }, [selectedRow?.id]);
  return (
    <Dialog
      header={selectedRow ? "Edit Cashier" : "Add Cashier"}
      visible={dialogVisible}
      className=" lg:!w-3/4"
      style={{ width: "90vw" }}
      onHide={() => {
        setDialogVisible(false);
        formik.resetForm();
        setSelectedRow(null);
        setSelectedProducts(null);
      }}
      pt={{
        content: { className: "!px-3 !py-0 " },
        header: { className: "!p-3 !py-3" },
      }}
    >
      <div className="rtl:ml-5">
        <form onSubmit={formik.handleSubmit} className=" ">
          <div
            className={`grid grid-cols-1 ${
              !selectedRow ? "lg:grid-cols-2" : null
            } gap-2`}
          >
            <div className="card pb-2 px-4  rounded-lg">
              <PersonalDetail formik={formik} />
            </div>

            {!selectedRow ? (
              <div className="card pb-2 rounded-lg px-4">
                <AddressDetails formik={formik} />
              </div>
            ) : null}
          </div>

          <div className="my-4">
            <div className=" flex justify-end gap-3">
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
                  setDialogVisible(false);
                  setSelectedProducts(null);
                }}
              />
              <Button
                disabled={loading}
                label={selectedRow ? t("update") : t("create")}
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
