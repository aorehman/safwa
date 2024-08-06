import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getkeeperTransitDestination } from "../../../../store/AsyncMethod/KeeperMethod";
import { SET_KEEPER_ORDERS_DESTINATION } from "../../../../store/Types/KeeperTypes";
import i18next from "i18next";

export default function DestinationOrders({
  setDialogVisible,
  orders,
  setselectedOrders,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading, validateErrors } = useSelector((state) => state.AuthReducer);
  const { keeperOrdersDestination } = useSelector(
    (state) => state.KeeperReducer
  );
  const { stores } = useSelector((state) => state.GetDataReducer);

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

  const handleTransitChange = () => {
    dispatch(getkeeperTransitDestination());
  };

  const formik = useFormik({
    initialValues: {
      store_id: "",
      order_codes: [],
    },
    validationSchema: () => {
      return Yup.object({
        store_id: Yup.string().required(t("store is required")),
        order_codes: Yup.array().required(t("orders is required")),
      });
    },

    onSubmit: async (data) => {
      dispatch(getkeeperTransitDestination(data)).then((success) => {
        if (success) {
          setDialogVisible(false);
          formik.resetForm();
          setselectedOrders([]);

          const pendingOrders = extractOrdersByOrderCode(
            keeperOrdersDestination,
            data.order_codes
          );
          dispatch({
            type: SET_KEEPER_ORDERS_DESTINATION,
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
                      id="store_id"
                      name="store_id"
                      value={formik.values.store_id}
                      onChange={formik.handleChange}
                      options={stores}
                      optionLabel={
                        i18next.language === "ar" ? "name_ar" : "name_en"
                      }
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
                      htmlFor="store_id"
                      className="dark:text-white dark:bg-cardDarkBackground rtl:right-4 rtl:left-auto"
                    >
                      {t("stores")}
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
                  label={loading ? "..." : t("transit_destination")}
                  className="p-primary-btn px-10 w-full dark:text-white dark:bg-primary"
                  onClick={handleTransitChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
