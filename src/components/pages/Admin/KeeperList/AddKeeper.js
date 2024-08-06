import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCities,
  getNeighborhoodsById,
  getStores,
} from "../../../../store/AsyncMethod/GetDataMethod";
import PersonalDetail from "./PersonalDetail";
import AddressDetail from "./AddressDetail";
import {
  addKeeper,
  editKeeper,
  getKeeperList,
  getSpecificKeeperById,
} from "../../../../store/AsyncMethod/AdminMethod";
import { RESET_SPECIFIC_KEEPER } from "../../../../store/Types/AdminTypes";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";

export default function AddKeeper({
  setDialogVisible,
  dialogVisible,
  selectedRow,
  setSelectedRow,
  setSelectedProducts,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { specificKeeper } = useSelector((state) => state.AdminReducer);
  const { loading } = useSelector((state) => state.AuthReducer);

  const { keeperId } = useParams();

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
      formik.setFieldValue(
        "full_address",
        selectedRow?.address[0]?.full_address
      );
      formik.setFieldValue("postal_code", selectedRow?.address[0]?.postal_code);
      formik.setFieldValue("street", selectedRow?.address[0]?.street);
      formik.setFieldValue("building", selectedRow?.address[0]?.building);
      formik.setFieldValue("store_id", selectedRow?.store?.id);
      formik.setFieldValue("email", selectedRow?.email);

      dispatch({ type: RESET_SPECIFIC_KEEPER });
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
      store_id: "",
      email: "",
    },
    validationSchema: () => {
      return Yup.object({
        first_name: Yup.string().required(t("first_name_required")),
        last_name: Yup.string().required(t("last_name_required")),
        phone: Yup.string().required(t("phone_required")),
        store_id: Yup.number().required(t("store_id_required")),
        email: Yup.string()
          .email(t("email_invalid"))
          .required(t("email_required")),
        password: selectedRow
          ? Yup.string()
          : Yup.string().required(t("password_required")),
        city_id: selectedRow
          ? Yup.number()
          : Yup.number().required(t("city_required")),
        neighborhood_id: selectedRow
          ? Yup.number()
          : Yup.number().required(t("neighborhood_required")),
        full_address: selectedRow
          ? Yup.string()
          : Yup.string().required(t("full_address_required")),

        postal_code: selectedRow
          ? Yup.string()
          : Yup.string().required(t("postal_code_required")),
        street: selectedRow
          ? Yup.string()
          : Yup.string().required(t("street_required")),
        building: selectedRow
          ? Yup.string()
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
        dispatch(editKeeper(updateData)).then((success) => {
          if (success) {
            formik.resetForm();
            setDialogVisible(false);
            setSelectedRow(null);
            dispatch(getKeeperList(1, 10));
            setSelectedProducts(null);
          }
        });
      } else {
        dispatch(addKeeper(data)).then((success) => {
          if (success) {
            formik.resetForm();
            setDialogVisible(false);
            setSelectedRow(null);
            dispatch(getKeeperList(1, 10));
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

  useEffect(() => {
    if (selectedRow?.id) {
      // dispatch(getSpecificKeeperById(selectedRow?.id));
    }
  }, [selectedRow?.id]);
  return (
    <Dialog
      header={selectedRow ? "Edit Keeper" : "Add Keeper"}
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
        content: { className: "!px-3 !py-2 " },
        header: { className: "!p-3 !py-2 !pb-0" },
      }}
    >
      <div className="rtl:ml-5">
        <form onSubmit={formik.handleSubmit} className="py-3 ">
          <div
            className={`grid grid-cols-1 ${
              selectedRow ? null : "lg:grid-cols-2"
            } gap-2`}
          >
            <div className="card pb-2 px-4  rounded-lg">
              <PersonalDetail formik={formik} />
            </div>

            {!selectedRow && (
              <div className="card pb-2 rounded-lg px-4">
                <AddressDetail formik={formik} />
              </div>
            )}
          </div>

          <div className="my-4">
            <div className=" flex justify-end gap-8">
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
