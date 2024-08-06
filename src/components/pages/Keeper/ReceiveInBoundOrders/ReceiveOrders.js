import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getkeeperReceiveBound } from "../../../../store/AsyncMethod/KeeperMethod";
import { SET_KEEPER_ORDERS_RECEIVE } from "../../../../store/Types/KeeperTypes";

export default function ReceiveOrders({
  setDialogVisible,
  orders,
  setselectedOrders,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading, validateErrors } = useSelector((state) => state.AuthReducer);
  const { couriers, keeperOrdersReceive } = useSelector(
    (state) => state.KeeperReducer
  );

  const extractOrdersByOrderCode = (orders, orderCodes) => {
    const foundOrders = [];
    const notFoundOrders = [];

    orders.forEach((order) => {
      if (orderCodes.includes(order.order_code)) {
        foundOrders.push(order);
      } else {
        notFoundOrders.push(order);
      }
    });

    return notFoundOrders;
  };

  const handleReceiveBoundChange = () => {
    dispatch(getkeeperReceiveBound());
  };

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
      dispatch(getkeeperReceiveBound(data)).then((success) => {
        if (success) {
          setDialogVisible(false);
          formik.resetForm();
          setselectedOrders([]);

          const pendingOrders = extractOrdersByOrderCode(
            keeperOrdersReceive,
            data.order_codes
          );
          dispatch({
            type: SET_KEEPER_ORDERS_RECEIVE,
            payLoad: pendingOrders,
          });
        }
      });
    },
  });

  useEffect(() => {
    if (orders.length > 0) {
      formik.setFieldValue("order_codes", orders);
    }
  }, [orders]);

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
                  label={loading ? "..." : t("receive_orders")}
                  className="p-primary-btn px-10 w-full dark:text-white dark:bg-primary"
                  onClick={handleReceiveBoundChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
