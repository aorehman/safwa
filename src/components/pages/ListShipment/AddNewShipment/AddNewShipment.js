import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getCities,
  getNeighborhoodsById,
  getPackageTypes,
  getUserAddresses,
} from "../../../../store/AsyncMethod/GetDataMethod";
import SenderAddress from "./SenderAddress";
import ReciverInfo from "./ReciverInfo";
import ShipmentInfo from "./ShipmentInfo";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../../store/AsyncMethod/ShipmentMethod";

export default function AddNewShipment() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newSender, setNewSender] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer);
  const { loading } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    dispatch(getUserAddresses());
    dispatch(getCities());
    dispatch(getPackageTypes());
  }, []);

  useEffect(() => {
    if (newSender || user?.role_id === "1" || user?.role_id === "10") {
      formik.setFieldValue("pickup_address_id", 0);
    } else {
      formik.setFieldValue("pickup_address_id", "");
      formik.setFieldValue("sender_first_name", "");
      formik.setFieldValue("sender_last_name", "");
      formik.setFieldValue("sender_phone", "");
      formik.setFieldValue("sender_city_id", "");
      formik.setFieldValue("sender_neighborhood_id", "");
      formik.setFieldValue("sender_full_address", "");
    }
  }, [newSender]);

  const formik = useFormik({
    initialValues: {
      pickup_address_id: "",
      sender_first_name: "",
      sender_last_name: "",
      sender_phone: "",
      sender_city_id: "",
      sender_neighborhood_id: "",
      sender_full_address: "",
      receiver_first_name: "",
      receiver_last_name: "",
      receiver_phone: "",
      receiver_city_id: "",
      receiver_neighborhood_id: "",
      receiver_full_address: "",
      payment_type_id: "",
      package_type_id: "",
      cod: "",
      cod_amount: "",
      quantity: "1",
      weight: "1",
      pay_by: true,
    },
    validationSchema: () => {
      return Yup.object({
        pickup_address_id:
          newSender || user?.role_id == 1 || user?.role_id == 10
            ? Yup.number()
            : Yup.number().required(t("pickup_address_required")),
        sender_city_id: newSender
          ? Yup.number().required(t("city_required"))
          : Yup.number(),
        sender_neighborhood_id: newSender
          ? Yup.number().required(t("neighborhood_required"))
          : Yup.number(),
        sender_first_name: newSender
          ? Yup.string().required(t("first_name_required"))
          : Yup.string(),
        sender_last_name: newSender
          ? Yup.string().required(t("last_name_required"))
          : Yup.string(),
        sender_phone: newSender
          ? Yup.string().required(t("phone_required"))
          : Yup.string(),
        sender_full_address: newSender
          ? Yup.string().required(t("full_address_required"))
          : Yup.string(),
        receiver_city_id: Yup.number().required(t("city_required")),
        receiver_neighborhood_id: Yup.number().required(
          t("neighborhood_required")
        ),
        receiver_first_name: Yup.string().required(t("first_name_required")),
        receiver_last_name: Yup.string().required(t("last_name_required")),
        receiver_phone: Yup.string().required(t("phone_required")),
        receiver_full_address: Yup.string().required(
          t("full_address_required")
        ),
        payment_type_id: Yup.number().required(t("payment_type_required")),
        package_type_id: Yup.number().required(t("package_type_required")),
        quantity: Yup.number().required(t("quantity_required")),
        weight: Yup.number().required(t("weight_required")),
        cod: Yup.boolean().required(t("cod_required")),
        cod_amount:
          formik.values.cod == true
            ? Yup.number().required(t("cod_amount_required"))
            : null,
      });
    },

    onSubmit: async (data) => {
      if (!newSender && user.role_id !== "1" && user.role_id !== "10") {
        const {
          sender_first_name,
          sender_last_name,
          sender_phone,
          sender_city_id,
          sender_neighborhood_id,
          sender_zone_id,
          sender_full_address,
          ...restOfDataWithoutSender
        } = data;

        dispatch(createOrder(restOfDataWithoutSender)).then((success) => {
          if (success) {
            formik.resetForm();

            navigate(
              user.role_id === "1"
                ? "/admin/shipment-all"
                : user.role_id === "10"
                ? "/keeper/shipment-all"
                : "/client/shipment-all"
            );
          }
        });
      } else {
        dispatch(createOrder(data)).then((success) => {
          if (success) {
            formik.resetForm();
            navigate(
              user.role_id === "1"
                ? "/admin/shipment-all"
                : user.role_id === "10"
                ? "/keeper/shipment-all"
                : "/client/shipment-all"
            );
          }
        });
      }
    },
  });

  useEffect(() => {
    if (formik.values.sender_city_id) {
      dispatch(getNeighborhoodsById(formik.values.sender_city_id));
    }
  }, [formik.values.sender_city_id]);

  useEffect(() => {
    if (formik.values.receiver_city_id) {
      dispatch(getNeighborhoodsById(formik.values.receiver_city_id));
    }
  }, [formik.values.receiver_city_id]);

  return (
    <div className="rtl:ml-5">
      <form onSubmit={formik.handleSubmit} className="py-3 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="card pb-2 px-4 shadow-md rounded-lg">
            <SenderAddress
              formik={formik}
              newSender={newSender}
              setNewSender={setNewSender}
            />
          </div>

          <div className="card pb-2 shadow-md rounded-lg px-4">
            <ReciverInfo formik={formik} />
          </div>
        </div>

        <div className="card pt-2 pb-4  shadow-md rounded-lg px-4 mt-2">
          <ShipmentInfo formik={formik} />
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
              onClick={() => formik.resetForm()}
            />
            <Button
              disable={loading}
              label={t("create")}
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
  );
}
