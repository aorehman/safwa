import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  getkeeperOrders,
  getkeeperPickupOrders,
} from "../../../../store/AsyncMethod/KeeperMethod";
import { fcm } from "../../../../store/AsyncMethod/AuthMethod";

export default function AssignForPickup({
  setDialogVisible,
  orders,
  page,
  rows,
  setselectedOrders,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading, validateErrors } = useSelector((state) => state.AuthReducer);
  const { couriers } = useSelector((state) => state.KeeperReducer);

  const formik = useFormik({
    initialValues: {
      courier_id: "",
      order_codes: [],
    },
    validationSchema: () => {
      return Yup.object({
        courier_id: Yup.string().required(t("courier is required")),
        order_codes: Yup.array().required(t("orders is required")),
      });
    },

    onSubmit: async (data) => {
      dispatch(getkeeperPickupOrders(data)).then((success) => {
        if (success) {
          setDialogVisible(false);
          formik.resetForm();
          setselectedOrders([]);
          dispatch(getkeeperOrders(page, rows));
        }
      });
    },
  });

  useEffect(() => {
    if (orders.length > 0) {
      formik.setFieldValue("order_codes", orders);
    }
  }, [orders]);

  const handlePickupChange = () => {
    dispatch(getkeeperPickupOrders()).then((response) => {
      let courierFcm = couriers.find((x) => x.id === formik.values.courier_id);
      if (courierFcm.fcm != null) {
        dispatch(
          fcm(courierFcm.fcm, "pickup", "New order is ready for pick up")
        );
      }
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full">
        <div className="w-full mt-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <div className="grid grid-cols-2 ">
                <div className="">
                  <span className="p-float-label w-full">
                    <Dropdown
                      id="courier_id"
                      name="courier_id"
                      value={formik.values.courier_id}
                      onChange={formik.handleChange}
                      options={couriers}
                      optionLabel="fullName"
                      optionValue="id"
                      className="w-full text-lg"
                      filter
                      pt={{
                        root: { className: "w-full md:w-full p-primary-input" },
                        input: { className: "w-full p-primary-input" },
                        filterInput: { className: "mr-0" },
                        filterIcon: {
                          className:
                            "rtl:right-auto rtl:left-4 dark:text-white",
                        },
                      }}
                    />
                    <label
                      htmlFor="courier_id"
                      className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                    >
                      {t("select_courier")}
                    </label>
                  </span>
                  {formik.touched.courier_id && formik.errors.courier_id && (
                    <div className="p-error">{formik.errors.courier_id}</div>
                  )}
                  {validateErrors?.courier_id?.length > 0
                    ? validateErrors.courier_id.map((err, index) => (
                        <div key={index} className="p-error">
                          {err}
                        </div>
                      ))
                    : null}
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-6 w-full">
                <Button
                  type="button"
                  label={t("cancel")}
                  className="p-orange-btn px-10 w-full"
                  onClick={() => {
                    setDialogVisible(false);
                    formik.resetForm();
                  }}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  label={loading ? "..." : t("assign_courier")}
                  className="p-primary-btn px-10 w-full dark:text-white dark:bg-primary"
                  onClick={handlePickupChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
